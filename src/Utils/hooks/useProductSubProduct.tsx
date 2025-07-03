import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchSubProductsByProductId } from "../../Redux/Features/Masters/SubProductMaster/thunks";
import { fetchDropDownForProducts } from "../../Redux/Features/Masters/ProductMaster/thunks";
import { toast } from "react-toastify";
interface UseProductSubProductProps {
  selectedProductId?: string;
  selectedSubProductId?: string;
  onSubProductReset?: () => void;
}

export const useProductSubProduct = ({
  selectedProductId,
  selectedSubProductId,
  onSubProductReset,
}: UseProductSubProductProps) => {
  const dispatch = useAppDispatch();

  const [productDropdownData, setProductDropdownData] = useState([]);
  const [subProductDropdownData, setSubProductDropdownData] = useState([]);
  const [loadingProductList, setLoadingProductList] = useState(false);
  const [loadingSubProductList, setLoadingSubProductList] = useState(false);
  const [subProductKey, setSubProductKey] = useState(Date.now());

  // Fetch product list (always)
  useEffect(() => {
    const fetchProductList = async () => {
      setLoadingProductList(true);
      try {
        const result = await dispatch(fetchDropDownForProducts()).unwrap();

        const filteredData = (result || [])?.map((item: any) => ({
          label: item.productName,
          value: String(item.id),
        }));

        setProductDropdownData(filteredData);
      } catch (err: any) {
        console.error("Failed to fetch product list", err);
        toast.error(err);
        setProductDropdownData([]);
      } finally {
        setLoadingProductList(false);
      }
    };

    fetchProductList();
  }, [dispatch]);

  // Fetch sub-product list (only if productId is given)
  useEffect(() => {
    if (!selectedProductId) return;

    const fetchSubProductList = async () => {
      setLoadingSubProductList(true);
      try {
        const result = await dispatch(
          fetchSubProductsByProductId(selectedProductId)
        ).unwrap();

        const filteredData = (result || [])?.map((item: any) => ({
          label: item.subProduct_name,
          value: String(item.id),
        }));

        setSubProductDropdownData(filteredData);

        setSubProductKey(Date.now());
      } catch (err: any) {
        console.error("Failed to fetch sub-product list", err);
        toast.error(err);
        setSubProductDropdownData([]);
        if (onSubProductReset) onSubProductReset();
      } finally {
        setLoadingSubProductList(false);
      }
    };

    fetchSubProductList();
  }, [selectedProductId, dispatch]);

  return {
    productDropdownData,
    loadingProductList,
    subProductDropdownData,
    loadingSubProductList,
    subProductKey,
  };
};
