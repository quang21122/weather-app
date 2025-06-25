import { ConfigProvider } from "antd";
import { antdTheme } from "@/constants/theme";
import HomePage from "@/pages/HomePage";
import "./App.css";

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <HomePage />
    </ConfigProvider>
  );
}

export default App;
