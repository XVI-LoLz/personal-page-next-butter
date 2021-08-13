import Zoom from "react-medium-image-zoom";

const options = {
  overlayBgColorStart: "rgba(0,0,0,0)",
  overlayBgColorEnd: "rgba(0,0,0,0.75)",
  zoomMargin: 32,
};

export default function Zoomable({ children }) {
  return <Zoom {...options}>{children}</Zoom>;
}
