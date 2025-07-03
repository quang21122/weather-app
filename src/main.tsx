import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";
import { queryClient } from "./lib/query/queryClient";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: "#3b82f6",
    borderRadius: 8,
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Card: {
      borderRadius: 16,
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={antdTheme}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfigProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
