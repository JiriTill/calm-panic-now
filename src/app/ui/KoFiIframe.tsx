export default function KoFiIframe() {
  const src =
    "https://ko-fi.com/calmpanicnow/?hidefeed=true&widget=true&embed=true";

  return (
    <iframe
      id="kofiframe"
      src={src}
      title="calmpanicnow"
      loading="lazy"
      style={{ border: "none", width: "100%", padding: "4px", background: "#f9f9f9" }}
      height={712}
      className="rounded-xl border border-slate-200 dark:border-slate-800"
    />
  );
}
