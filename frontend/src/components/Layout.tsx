import React from "react";
import { CategoryBar } from "./CategoryBar";
import { NavBar } from "./NavBar";
import { TopBar } from "./TopBar";
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
