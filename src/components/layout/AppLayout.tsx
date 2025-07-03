import React from "react";
import { Layout } from "antd";
import { Header } from "./Header";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
  onHeaderRefresh?: () => void;
  showHeaderRefresh?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onHeaderRefresh,
  showHeaderRefresh = false,
}) => {
  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header onRefresh={onHeaderRefresh} showRefresh={showHeaderRefresh} />

      {/* Main content */}
      <Content className="weather-gradient flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </Content>
    </Layout>
  );
};
