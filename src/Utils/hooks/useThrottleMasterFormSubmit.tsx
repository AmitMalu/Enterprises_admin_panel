import { useCallback } from "react";
import { handleMasterFormSubmit } from "../utils";
import { useThrottledFormSubmit } from "./useThrottleFormSubmit";

type UseThrottleMasterFormSubmitProps<T> = {
    mode?: "add" | "edit";
    id?: string;
    useFormData?: boolean;
    dispatch: any;
    navigate: any;
    resetFormData?: () => void;
    masterKey: string;
    addUrl: string;
    updateUrl: string;
    transformCreatePayload?: (values: T) => any;
    transformUpdatePayload?: (values: T) => any;
    successNavigatePath?: string;
    entityName: string;
    delay?: number;
    toastOptions?: {
        successAutoClose?: number | false;
        errorAutoClose?: number | false;
    };
};

export function useThrottleMasterFormSubmit<T>({
    mode = "add",
    id,
    useFormData = false,
    dispatch,
    navigate,
    resetFormData,
    masterKey,
    addUrl,
    updateUrl,
    transformCreatePayload,
    transformUpdatePayload,
    successNavigatePath,
    entityName,
    delay = 3000,
    toastOptions,
}: UseThrottleMasterFormSubmitProps<T>) {
    const submitFn = useCallback(
        (values: T) => {
            handleMasterFormSubmit({
                mode,
                id,
                useFormData,
                values,
                dispatch,
                navigate,
                resetFormData,
                masterKey,
                addUrl,
                updateUrl,
                transformCreatePayload,
                transformUpdatePayload,
                successNavigatePath,
                entityName,
                toastOptions
            });
        },
        [
            mode,
            id,
            dispatch,
            navigate,
            resetFormData,
            masterKey,
            addUrl,
            updateUrl,
            transformCreatePayload,
            transformUpdatePayload,
            successNavigatePath,
            entityName,
            toastOptions
        ]
    );

    return useThrottledFormSubmit<T>(submitFn, delay);
}