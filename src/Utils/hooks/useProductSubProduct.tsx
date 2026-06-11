import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
interface UseProductSubProductProps {
  selectedProductId?: string;
  selectedSubProductId?: string;
  onSubProductReset?: () => void;
  isSettlement?: boolean;
}

export const useProductSubProduct = ({
  selectedProductId,
  selectedSubProductId,
  onSubProductReset,
  isSettlement = false,
}: UseProductSubProductProps) => {
  const dispatch = useAppDispatch();

  const [productDropdownData, setProductDropdownData] = useState([]);
  const [subProductDropdownData, setSubProductDropdownData] = useState([]);
  const [loadingProductList, setLoadingProductList] = useState(false);
  const [loadingSubProductList, setLoadingSubProductList] = useState(false);
  const [subProductKey, setSubProductKey] = useState(Date.now());

  const [productError, setProductError] = useState<string | null>(null);
  const [subProductError, setSubProductError] = useState<string | null>(null);

  const fetchProductList = useCallback(async () => {
    setLoadingProductList(true);
    setProductError(null);

    try {
      const result = await dispatch(
        fetchMasterDropdown({
          url: `${API_ENDPOINTS?.MASTER?.PRODUCTS}/dropdown/active`,
        })
      ).unwrap();

      const filteredData = (result || [])?.map((item: any) => ({
        label: item.productName,
        value: String(item.id),
      }));

      setProductDropdownData(filteredData);
    } catch (err: any) {
      console.error("Failed to fetch product list", err);
      toast.error(err);
      setProductError(err);

      setProductDropdownData([]);
    } finally {
      setLoadingProductList(false);
    }
  }, [dispatch]);

  // Fetch product list (always)
  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  // Fetch sub-product list (only if productId is given)
  useEffect(() => {
    if (!selectedProductId) return;

    const fetchSubProductList = async () => {
      setLoadingSubProductList(true);
      setSubProductError(null);

      try {
        const url = `${API_ENDPOINTS?.MASTER?.SUB_PRODUCT}/dropdown/${selectedProductId}${isSettlement ? "?isSettlement=true" : ""
          }`;

        const result = await dispatch(fetchMasterDropdown({ url })).unwrap();

        const filteredData = (result || [])?.map((item: any) => ({
          label: item.subProduct_name,
          value: String(item.id),
        }));

        setSubProductDropdownData(filteredData);
        setSubProductKey(Date.now());
        if (
          selectedSubProductId &&
          !filteredData.some((item: any) => item.value === String(selectedSubProductId))
        ) {
          if (onSubProductReset) onSubProductReset();
        }
        
      } catch (err: any) {
        console.error("Failed to fetch sub-product list", err);
        setSubProductError(err);

        toast.error(err);
        setSubProductDropdownData([]);
        if (onSubProductReset) onSubProductReset();
      } finally {
        setLoadingSubProductList(false);
      }
    };

    fetchSubProductList();
  }, [selectedProductId, dispatch, productDropdownData]);

  return {
    productDropdownData,
    loadingProductList,
    subProductDropdownData,
    loadingSubProductList,
    subProductKey,
    productSubproductError: productError || subProductError, // <- combined error
    refetchProducts: fetchProductList
  };
};
