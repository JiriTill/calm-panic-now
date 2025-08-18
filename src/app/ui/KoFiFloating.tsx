"use client";
import Script from "next/script";
import { useCallback, useRef } from "react";

declare global {
  interface Window {
    kofiWidgetOverlay: any;
  }
}

export default function KoFiFloating() {
  const drawn = useRef(false);

  const onLoad = useCallback(() => {
    if (drawn.current) return;
    try {
      window.kofiWidgetOverlay.draw("calmpanicnow", {
        type: "floating-chat",
        "floating-chat.donateButton.text": "Support Calm Panic Now",
        "floating-chat.donateButton.background-color": "#00b9fe",
        "floating-chat.donateButton.text-color": "#fff",
      });
      drawn.current = true;
    } catch {}
  }, []);

  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
}
