import { useCallback} from "react";
import { handleMasterFormSubmit } from "../utils";
import { useThrottledFormSubmit } from "./useThrottleFormSubmit";

type UseThrottleMasterFormSubmitProps<T> = {
    mode?: "add" | "edit";
    id?: string;
    dispatch: any;
    navigate: any;
    resetFormData: () => void;
    masterKey: string;
    masterUrl: string;
    transformCreatePayload: (values: T) => any;
    transformUpdatePayload: (values: T) => any;
    successNavigatePath: string;
    entityName: string;
    delay?: number;
};

export function useThrottleMasterFormSubmit<T>({
    mode = "add",
    id,
    dispatch,
    navigate,
    resetFormData,
    masterKey,
    masterUrl,
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
                values,
                dispatch,
                navigate,
                resetFormData,
                masterKey,
                masterUrl,
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
            masterUrl,
            transformCreatePayload,
            transformUpdatePayload,
            successNavigatePath,
            entityName,
        ]
    );

    return useThrottledFormSubmit<T>(submitFn, delay);
}
