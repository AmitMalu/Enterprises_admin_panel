import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert" className="p-2 text-center">
      <h2>Something Went Wrong</h2>
      <pre className="text-red-700">{error.message}</pre>

      <button onClick={resetErrorBoundary} className="w-fit bg-[#DB2729] text-white px-4 py-2 rounded-lg mt-4">
        Try Again
      </button>
    </div>
  );
}
