import ErrorFallback from "../Utils/ErrorFallback";

const TestComponent = () => {
    return (
        <ErrorFallback error={{ message: "intentional error" }} resetErrorBoundary={() => { }} />
    )
};
export default TestComponent;
