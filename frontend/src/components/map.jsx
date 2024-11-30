import { useEffect, useState } from "react";

const Map = (data) => {
  const { mapData } = data;
  const [iframeWidth, setIframeWidth] = useState(600); // Default width
  const [iframeHeight, setIframeHeight] = useState(450); // Default height
  // Update iframe dimensions based on the window size
  useEffect(() => {
    const handleResize = () => {
      // Calculate the new width and height dynamically
      const newWidth = window.innerWidth * 0.8; // 80% of window width
      const newHeight = window.innerHeight * 0.4; // 60% of window height

      setIframeWidth(newWidth);
      setIframeHeight(newHeight);
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Initial call to set iframe dimensions
    handleResize();

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  // Dynamically set the iframe HTML with updated width and height
  const updatedMapData = mapData
    .replace(/width="\d+"/, `width="${iframeWidth}"`)
    .replace(/height="\d+"/, `height="${iframeHeight}"`);

  return (
    <div
      className="google-map-code flex justify-center"
      dangerouslySetInnerHTML={{ __html: updatedMapData }}
    />
  );
};

export default Map;

// // import { useState } from "react";

// const Map = (data) => {
//     const {mapData}= data
//     return (
//         <div className="google-map-code" dangerouslySetInnerHTML={{ __html: mapData }} />
//       );
// };

// export default Map;
