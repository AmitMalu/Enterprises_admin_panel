import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./toast.css";
import { toastContainerProps } from "./Utils/toastSetup";
import LocationGuard from "./Components/LocationGuard";

function App() {

  const basePath = import.meta.env.VITE_BASE_PATH || "/";

  return (
    <BrowserRouter basename={basePath}>
      <LocationGuard />
      <AppRoutes />
      <ToastContainer {...toastContainerProps} />
    </BrowserRouter>
  );
}

export default App;
