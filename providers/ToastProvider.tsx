"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      duration={3000}
      expand={false}
      toastOptions={{
        style: {
          borderRadius: "14px",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: 500,
        },
      }}
    />
  );
}
