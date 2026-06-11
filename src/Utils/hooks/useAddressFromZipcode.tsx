import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface Location {
    country: string;
    state: string;
    district: string;
    city: string;
}

export const useAddressFromZipcode = (zipcode: string) => {
    const dispatch = useAppDispatch();
    const [location, setLocation] = useState<Location>({
        country: "",
        state: "",
        district: "",
        city: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const lastFetchedZipRef = useRef<string | null>(null); // 🚨 track last fetched pin


    useEffect(() => {
        const fetchAddressFromZipcode = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.MASTER.PINCODE_MASTER}/lookup/${zipcode}`,
                    })
                ).unwrap();

                const {
                    countryName = "",
                    stateName = "",
                    districtName = "",
                    cityName = "",
                } = result || {};

                setLocation({
                    country: countryName,
                    state: stateName,
                    district: districtName,
                    city: cityName,
                });
                lastFetchedZipRef.current = zipcode; //update after success

            } catch (err: any) {
                console.error("Failed to fetch address from zipcode", err);
                setError(err || "Something went wrong");
                toast.error(err || "Failed to get address");
                setLocation({
                    country: "",
                    state: "",
                    district: "",
                    city: "",
                });
                lastFetchedZipRef.current = null; // ❌ do not remember failed zip

            } finally {
                setLoading(false);
            }
        };

        if (zipcode?.length === 6 && zipcode !== lastFetchedZipRef.current) {
            fetchAddressFromZipcode();
        } else {
            setLocation({
                country: "",
                state: "",
                district: "",
                city: "",
            });
            setError(null);
            lastFetchedZipRef.current = null; // reset on invalid input

        }
    }, [zipcode, dispatch]);

    return { location, loading, error };
};
