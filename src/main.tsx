import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Utils/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      onReset={() => (window.location.href = "/login")}
    >
      <MantineProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>
);
