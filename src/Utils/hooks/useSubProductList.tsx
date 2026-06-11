import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

export interface DropdownOption {
    label: string;
    value: string;
}

export const useSubProductList = () => {
    const dispatch = useAppDispatch();
    const [subProductDropdownData, setSubProductDropdownData] = useState<DropdownOption[]>([]);
    const [loadingSubProductList, setLoadingSubProductList] = useState(false);
    const [subProductError, setSubProductError] = useState(null)

    // Fetch subProduct list (always)
    useEffect(() => {
        const fetchSubProductList = async () => {
            setLoadingSubProductList(true);
            setSubProductError(null)
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.MASTER?.SUB_PRODUCT}/dropdown`,
                    })
                ).unwrap();

                const filteredData = (result || [])?.map((item: any) => ({
                    label: item.subProduct_name,
                    value: String(item.id),     // dropdown binds to operatorId
                }));

                setSubProductDropdownData(filteredData);
            } catch (err: any) {
                console.error("Failed to fetch SubProduct list", err);
                toast.error(err);
                setSubProductError(err)
                setSubProductDropdownData([]);
            } finally {
                setLoadingSubProductList(false);
            }
        };

        fetchSubProductList();
    }, [dispatch]);

    return {
        subProductDropdownData,
        loadingSubProductList,
        subProductError
    };
};
