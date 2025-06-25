import { Layout as AntLayout } from "antd";
import type { LayoutProps } from "@/types";
import { cn } from "@/utils/styling";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = AntLayout;

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  title = "Weather App",
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <AntLayout className={cn("min-h-screen", className)}>
      {showHeader && <Header title={title} />}

      <Content className="flex-1 relative">
        <div className="min-h-full">{children}</div>
      </Content>

      {showFooter && <Footer />}
    </AntLayout>
  );
};

export default Layout;
