
// import { useState } from "react";

const Map = (data) => {
  const { longitude, latitude } = data;

  // State for latitude and longitude
   const url = "https://maps.app.goo.gl/UN6YsxR7dVKDhCUy7"
  console.log(latitude, longitude);
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <iframe
        title="Web Viewer"
        src={url}
        width="100%"
        height="500"
        style={{ border: "1px solid #ddd" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
