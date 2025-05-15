import { FallbackProps } from "react-error-boundary";
import CommonButton from "../Components/Atoms/CommonButton";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert" className="p-2 text-center">
      <h2>Something Went Wrong</h2>
      <pre className="text-red-700">{error.message}</pre>
      <CommonButton onClick={resetErrorBoundary} className="w-fit">
        Try Again
      </CommonButton>
    </div>
  );
}
