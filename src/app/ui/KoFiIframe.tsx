export default function KoFiIframe() {
  const src = "https://ko-fi.com/calmpanicnow/?hidefeed=true&widget=true&embed=true";

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <iframe
        id="kofiframe"
        src={src}
        title="calmpanicnow"
        loading="lazy"
        style={{ border: "0", width: "100%", background: "transparent" }}
        height={620} 
      />
    </div>
  );
}
