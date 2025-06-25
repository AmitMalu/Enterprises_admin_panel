import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface UseOperatorSubOperatorProps {
  selectedOperatorCode?: string;
  selectedSubOperatorId?: string;
  onSubOperatorReset?: () => void;
}

export const useOperatorSubOperator = ({
  selectedOperatorCode,
  selectedSubOperatorId,
  onSubOperatorReset,
}: UseOperatorSubOperatorProps) => {
  const dispatch = useAppDispatch();
  const [operatorDropdownData, setOperatorDropdownData] = useState([]);
  const [subOperatorDropdownData, setSubOperatorDropdownData] = useState([]);
  const [loadingOperatorList, setLoadingOperatorList] = useState(false);
  const [loadingSubOperatorList, setLoadingSubOperatorList] = useState(false);
  const [subOperatorKey, setSubOperatorKey] = useState(Date.now());

  // Fetch operator list (always)
  useEffect(() => {
    const fetchOperatorList = async () => {
      setLoadingOperatorList(true);
      try {
        const result = await dispatch(
          fetchMasterDropdown({
            url: `${API_ENDPOINTS?.MASTER?.OPERATOR}/active`,
          })
        ).unwrap();

        const filteredData = (result || [])?.map((item: any) => ({
          label: item.operatorName,
          value: String(item.operatorCode),
        }));

        setOperatorDropdownData(filteredData);
      } catch (err: any) {
        console.error("Failed to fetch Operator list", err);
        toast.error(err);
        setOperatorDropdownData([]);
      } finally {
        setLoadingOperatorList(false);
      }
    };

    fetchOperatorList();
  }, [dispatch]);

  // Fetch Sub Operator list (only if operatorId is given)
  useEffect(() => {
    if (!selectedOperatorCode) return;

    const fetchSubOperatorList = async () => {
      setLoadingSubOperatorList(true);
      try {
        const result = await dispatch(
             fetchMasterDropdown({
            url: `${API_ENDPOINTS?.MASTER?.SUB_OPERATOR}/${selectedOperatorCode}`,
          })
        ).unwrap();

        const filteredData = (result || [])?.map((item: any) => ({
          label: item.subOperator_name,
          value: String(item.id),
        }));

        setSubOperatorDropdownData(filteredData);

        setSubOperatorKey(Date.now());
      } catch (err: any) {
        console.error("Failed to fetch sub-Operator list", err);
        toast.error(err);
        setSubOperatorDropdownData([]);
        if (onSubOperatorReset) onSubOperatorReset();
      } finally {
        setLoadingSubOperatorList(false);
      }
    };

    fetchSubOperatorList();
  }, [selectedOperatorCode, dispatch]);

  return {
    operatorDropdownData,
    loadingOperatorList,
    subOperatorDropdownData,
    loadingSubOperatorList,
    subOperatorKey,
  };
};
