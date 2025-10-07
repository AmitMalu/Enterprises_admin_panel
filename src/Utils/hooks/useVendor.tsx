import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface UseVendorOptions {
    subProductId?: string;
    waitForSubProduct?: boolean; // default false
}

export const useVendor = ({
    subProductId,
    waitForSubProduct = false,
}: UseVendorOptions) => {
    const dispatch = useAppDispatch();
    const [vendorDropdownData, setVendorDropdownData] = useState([]);
    const [loadingVendorList, setLoadingVendorList] = useState(false);
    const [vendorError, setVendorError] = useState(null)

    // Fetch Vendor list (always)
    useEffect(() => {
        if (waitForSubProduct && !subProductId) {
            setVendorDropdownData([]); // reset if waiting and no subProductId yet
            return;
        }

        const fetchVendorList = async (url: string) => {
            setLoadingVendorList(true);
            setVendorDropdownData([]); // clear old while fetching new
            setVendorError(null)
            try {

                const result = await dispatch(fetchMasterDropdown({ url })).unwrap();

                const filteredData = (result || [])?.map((item: any) => ({
                    label: item.vendorName,
                    value: String(item.id),
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

        if (waitForSubProduct) {
            // Only fetch when subProductId is provided
            if (subProductId) {
                fetchVendorList(
                    `${API_ENDPOINTS?.MASTER?.VENDOR}/by-subProduct/${subProductId}`
                );
            }
        } else {
            const url = `${API_ENDPOINTS?.MASTER?.VENDOR}/active`;
            fetchVendorList(url);
        }

    }, [dispatch, subProductId, waitForSubProduct]);

    return {
        vendorDropdownData,
        loadingVendorList,
        vendorError
    };
};
