import { useNavigate } from "react-router-dom";
import {
  makeSelectMasterMeta,
  setPagination,
} from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { fetchMasterList } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";

type FilterType = { key: string; value: any } | null;

interface UseMasterListProps<T> {
  key: string;
  url: string;
  transformDataFn?: (item: any) => T;
  filter: FilterType;
  refreshKey: number;
}

export function useFetchMasterList<T>({
  key,
  url,
  transformDataFn,
  filter,
  refreshKey,
}: UseMasterListProps<T>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(makeSelectMasterMeta(key));

  const pagination = meta?.pagination || {
    pageSize: 5,
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
  };
  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPage = (page: number) => {
    if (page !== currentPage) {
      dispatch(
        setPagination({
          key: key,
          pagination: {
            ...pagination,
            currentPage: page,
          },
        })
      );
    }
  };

  const setPageSize = (size: number) => {
    dispatch(
      setPagination({
        key: key,
        pagination: { ...pagination, currentPage: 1, pageSize: size },
      })
    );
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await dispatch(
        fetchMasterList({
          key,
          url,
          page: pagination.currentPage,
          size: pagination.pageSize,
          filter,
        })
      ).unwrap();

      const transformed = transformDataFn
        ? response.map(transformDataFn)
        : response;
      setData(transformed);
    } catch (err: any) {
      setError(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    key,
    url,
    pagination.currentPage,
    pagination.pageSize,
    filter,
    refreshKey,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    pagination,
    setPage,
    setPageSize,
  };
}
