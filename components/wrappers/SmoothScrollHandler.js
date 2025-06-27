"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SmoothScrollHandler = () => {
  const searchParams = useSearchParams();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle smooth scroll links with __SMOOTH_SCROLL__ prefix
  const handleSmoothScrollClick = (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Handle both __SMOOTH_SCROLL__ and #__SMOOTH_SCROLL__ patterns
    let sectionId = null;

    if (href.startsWith("__SMOOTH_SCROLL__")) {
      sectionId = href.replace("__SMOOTH_SCROLL__", "");
    } else if (href.startsWith("#__SMOOTH_SCROLL__")) {
      sectionId = href.replace("#__SMOOTH_SCROLL__", "");
    }

    if (sectionId) {
      e.preventDefault();
      e.stopPropagation();
      scrollToSection(sectionId);
    }
  };

  // Handle scroll_to_section query parameter on page load
  useEffect(() => {
    const scroll_to_section = searchParams?.get("scroll_to_section");

    if (scroll_to_section) {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        scrollToSection(scroll_to_section);
      }, 100);
    }
  }, [searchParams]);

  // Add click event listener for smooth scroll links
  useEffect(() => {
    document.addEventListener("click", handleSmoothScrollClick);

    return () => {
      document.removeEventListener("click", handleSmoothScrollClick);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScrollHandler;
