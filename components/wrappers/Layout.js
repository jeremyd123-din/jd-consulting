import React from "react";
import HeaderVariant01 from "@/components/blocks/header/HeaderVariant01";
import Footer from "@/components/blocks/footer/Footer01";
import { getNavigationBySlug, getSiteSettings } from "@/sanity/utils/queries";

const Layout = async ({ children }) => {
  const data = await getNavigationBySlug(`header`);
  const siteSettings = await getSiteSettings();
  return (
    <>
      <HeaderVariant01 siteSettings={siteSettings} navigationSchema={data} />
      <main id="main-content" className="overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
