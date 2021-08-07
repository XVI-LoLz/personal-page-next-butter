import Head from "next/head";
import PropTypes from "prop-types";

export default function Meta({ title, description, image, keywords, url }) {
  return (
    <Head>
      {title ? (
        <>
          <title>{title}</title>
          <meta property="twitter:title" content={title} key="twitter:title" />
          <meta property="og:title" content={title} key="og:title" />
        </>
      ) : null}
      {description ? (
        <>
          <meta name="description" content={description} key="description" />
          <meta
            property="og:description"
            lang="en"
            content={description}
            key="og:description"
          />
          <meta
            property="twitter:description"
            content={description}
            key="twitter:description"
          />
        </>
      ) : null}
      {image ? (
        <>
          <meta property="og:image" content={image} key="og:image" />
          <meta property="twitter:image" content={image} key="twitter:image" />
        </>
      ) : null}
      {url ? (
        <>
          <meta property="og:url" content={url} key="og:url" />
          <meta property="twitter:url" content={url} key="twitter:url" />
        </>
      ) : null}
      {keywords ? (
        <meta name="keywords" lang="es" content={keywords} key="keywords" />
      ) : null}
    </Head>
  );
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  keywords: PropTypes.string,
};
Meta.defaultProps = {
  title: null,
  description: null,
  image: null,
  url: null,
  keywords: null,
};
