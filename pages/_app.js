import "modern-css-reset";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import "styles/variables.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
