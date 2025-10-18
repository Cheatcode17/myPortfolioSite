import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    const atOptions = {
      key: "80090df7bef04d2206497a1eb360db17",
      format: "iframe",
      height: 60,
      width: 468,
      params: {}
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.highperformanceformat.com/80090df7bef04d2206497a1eb360db17/invoke.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="ad-container" style={{ textAlign: "center", margin: "20px 0" }}></div>;
};

export default AdBanner;
