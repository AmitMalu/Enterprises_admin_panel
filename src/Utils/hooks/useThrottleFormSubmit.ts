// hooks/useThrottledSubmit.ts
import { useMemo } from "react";
import throttle from "lodash.throttle";

export function useThrottledFormSubmit<T>(
  submitFn: (values: T) => void,
  delay: number = 1000
) {
  return useMemo(() => {
    return throttle(submitFn, delay, { trailing: false });
  }, [submitFn, delay]);
}
