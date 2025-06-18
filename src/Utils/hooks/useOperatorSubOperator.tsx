import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchDropDownForOperators } from "../../Redux/Features/Masters/OperatorMaster/thunks";
import { fetchSubOperatorByOperatorCode } from "../../Redux/Features/Masters/SubOperatorMaster/thunks";

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
        const result = await dispatch(fetchDropDownForOperators()).unwrap();

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
          fetchSubOperatorByOperatorCode(selectedOperatorCode)
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
