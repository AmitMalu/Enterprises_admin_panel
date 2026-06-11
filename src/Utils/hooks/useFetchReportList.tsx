import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchReport } from "../../Redux/Features/Masters/MastersThunk";
import { makeSelectMasterMeta, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";

interface UseReportListProps<T> {
    key: string;
    url: string;
    payload: Record<string, any>; // full body including filters + pagination
    transformDataFn?: (item: any) => T;
}

export function useFetchReportList<T>({
    key,
    url,
    payload,
    transformDataFn,
}: UseReportListProps<T>) {
    const dispatch = useAppDispatch();
    const meta = useAppSelector(makeSelectMasterMeta(key));

    const pagination = meta?.pagination || {
        pageSize: 10,
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
                    key,
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
                key,
                pagination: {
                    ...pagination,
                    pageSize: size,
                    currentPage: 1,
                },
            })
        );
    };

    const isPayloadValid = (payload: any) => {
        return payload && Object.keys(payload).length > 0;
    };

    const fetchData = useCallback(async () => {
        if (!isPayloadValid(payload)) return;

        try {
            setLoading(true);
            setError(null);

            const apiPayload = {
                ...payload,
                page: pagination.currentPage - 1, // zero-based
                size: pagination.pageSize,
            };

            const response = await dispatch(fetchReport({ key, url, data: apiPayload })).unwrap();

            const transformed = transformDataFn ? response.map(transformDataFn) : response;
            setData(transformed);
        } catch (err: any) {
            toast.error(err);
            setError(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [dispatch, key, url, payload, pagination.currentPage, pagination.pageSize]);

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
