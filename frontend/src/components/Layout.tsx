import React from "react";
import { CategoryBar } from "../components/Header/CategoryBar";
import { NavBar } from "./Header/NavBar";
import { TopBar } from "./Header/TopBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <TopBar />
      <NavBar />
      <CategoryBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
