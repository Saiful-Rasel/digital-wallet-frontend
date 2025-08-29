import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/index.tsx";
;
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./provider/Theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
