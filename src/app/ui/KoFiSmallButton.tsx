"use client";
import Script from "next/script";
import { useCallback, useRef } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var kofiwidget2: any;
}

export default function KoFiSmallButton() {
  const drawn = useRef(false);

  const onLoad = useCallback(() => {
    if (drawn.current) return;
    try {
      // your label, brand color and Ko-fi code:
      window.kofiwidget2.init("Support us on Ko-fi", "#72a4f2", "T6T31JW6G3");
      window.kofiwidget2.draw();
      drawn.current = true;
    } catch {}
  }, []);

  return (
    <>
      {/* Ko-fi renders the button right where this <Script> sits */}
      <Script
        src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"
        strategy="afterInteractive"
        onLoad={onLoad}
      />
      {/* Optional: a tiny spacer so the button isn't glued to elements above it */}
      <div style={{ marginTop: 8 }} />
    </>
  );
}
