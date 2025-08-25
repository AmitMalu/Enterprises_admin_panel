import { useCallback } from "react";
import { handleMasterFormSubmit } from "../utils";
import { useThrottledFormSubmit } from "./useThrottleFormSubmit";

type UseThrottleMasterFormSubmitProps<T> = {
    mode?: "add" | "edit";
    id?: string;
    useFormData? : boolean;
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
        ]
    );

    return useThrottledFormSubmit<T>(submitFn, delay);
}