import {
  makeSelectMasterMeta,
  setPagination,
} from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { fetchMasterList } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";

type FilterType = Record<string, any> | null;

interface UseMasterListProps<T> {
  key: string;
  url?: string;
  transformDataFn?: (item: any) => T;
  filter?: FilterType;
  refreshKey?: number;
  method?: "GET" | "POST";
  defaultPageSize?: number;
  payload?: any;
}

export function useFetchMasterList<T>({
  key,
  url,
  transformDataFn,
  filter = null,
  refreshKey,
  method = "GET",
  defaultPageSize,
  payload = null,
}: UseMasterListProps<T>) {
  const dispatch = useAppDispatch();
  const meta = useAppSelector(makeSelectMasterMeta(key));

  const pagination = meta?.pagination || {
    pageSize: defaultPageSize || 10,
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
  };
  const currentPage = pagination.currentPage;

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
    if (!url) {
      //Skip fetch if URL is empty (e.g., on initial load)
      return;
    }

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
          method,
          payload,
        })
      ).unwrap();

      const transformed = transformDataFn
        ? response.map(transformDataFn)
        : response;
      setData(transformed);
    } catch (err: any) {
      setData([]);
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
    JSON.stringify(filter),
    refreshKey,
    // payload,
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
