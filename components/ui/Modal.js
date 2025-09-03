"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCleanValue } from "@/lib/helpers";

const Modal = ({ children, modalId, siteSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!modalId) return;

    const targetHash = `#trigger-modal:${getCleanValue(modalId)}`;

    // Function to handle clicks on anchors with the specific modal hash
    const handleAnchorClick = (event) => {
      const target = event.target.closest("a");
      if (target && getCleanValue(target.getAttribute("href")) === targetHash) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        setIsOpen(true);
        return false;
      }
    };

    // Add event listener to document with capture phase
    document.addEventListener("click", handleAnchorClick, true);

    // Also prevent hash changes if they somehow occur
    const preventHashChange = () => {
      if (window.location.hash === targetHash) {
        window.history.replaceState(
          null,
          null,
          window.location.pathname + window.location.search
        );
      }
    };

    window.addEventListener("hashchange", preventHashChange);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("hashchange", preventHashChange);
    };
  }, [modalId]);

  if (!modalId) {
    console.warn("Modal component requires a modalId prop");
    return null;
  }

  return (
    <>
      <Dialog className="c__modal" open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[90vw]  lg:max-w-[800px] max-h-[90vh] overflow-y-auto z-[99999999]">
          <DialogTitle className="sr-only">Modal</DialogTitle>
          <DialogDescription className="sr-only">
            Basic dialog
          </DialogDescription>
          <div>
            {siteSettings?.logo?.asset?.url && (
              <DialogHeader className="px-[1.5rem] py-[1rem] border-b ">
                <img
                  style={{ width: "150px" }}
                  src={siteSettings?.logo?.asset?.url}
                  alt={siteSettings?.logo?.alt}
                  loading="lazy"
                />
              </DialogHeader>
            )}
            <div className="px-[1.5rem] py-[1rem] pb-[3rem]">
              <div>{children}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
