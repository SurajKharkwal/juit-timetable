"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdComponent() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []; // Ensure it's defined
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("Ads error: ", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2058203127983865"
      data-ad-slot="3005074927"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
