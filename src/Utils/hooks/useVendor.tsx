import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

export const useVendor = () => {
    const dispatch = useAppDispatch();
    const [vendorDropdownData, setVendorDropdownData] = useState([]);
    const [loadingVendorList, setLoadingVendorList] = useState(false);
    const [vendorError, setVendorError] = useState(null)

    // Fetch Vendor list (always)
    useEffect(() => {
        const fetchVendorList = async () => {
            setLoadingVendorList(true);
            setVendorError(null)
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.MASTER?.VENDOR}/active`,
                    })
                ).unwrap();

                const filteredData = (result || [])?.map((item: any) => ({
                    label: item.vendorName,
                    value: String(item.id),     // dropdown binds to operatorId
                }));

                setVendorDropdownData(filteredData);
            } catch (err: any) {
                console.error("Failed to fetch Vendor list", err);
                toast.error(err);
                setVendorError(err)
                setVendorDropdownData([]);
            } finally {
                setLoadingVendorList(false);
            }
        };

        fetchVendorList();
    }, [dispatch]);

    return {
        vendorDropdownData,
        loadingVendorList,
        vendorError
    };
};
