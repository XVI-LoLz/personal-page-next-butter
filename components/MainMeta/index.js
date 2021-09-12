import Head from "next/head";

const metadata = {
  title: "16th",
  author: "Elihu Munguía",
  url: "https://www.16th.me/",
  image: "images/comic-hi-min.jpg",
  description: {
    en:
      "Hi, I'm LoLz. I'm a web/game developer and language learner. I'd love to share some of my learning process with you!",
    es:
      "Hola, soy LoLz. Soy un programador web y de videojuegos, así como estudiante de idiomas. Quiero compartir contigo mi proceso de aprendizaje.",
  },
  keywords: {
    en: "Web dev, Game dev, Programming, Languages, English, Spanish, Japanese",
    es:
      "Desarrollo web, Desarrollo de videojuegos, Idiomas, Inglés, Español, Japonés",
  },
};

export default function MainMeta() {
  return (
    <Head>
      {/* MAIN TAGS */}
      <title>{metadata.title}</title>
      <meta name="title" content={metadata.title} key="title" />
      <meta name="author" content={metadata.author} />
      <meta name="robots" content="index, follow" />

      {/* META TAGS FOR EN LOCALE */}
      <meta
        name="description"
        lang="en"
        content={metadata.description.en}
        key="description"
      />
      <meta
        name="keywords"
        lang="en"
        content={metadata.keywords.en}
        key="keywords"
      />
      {/* META TAGS FOR ES LOCALE */}
      <meta
        name="description"
        lang="es"
        content={metadata.description.es}
        key="description"
      />
      <meta name="keywords" lang="es" content={metadata.keywords.es} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.url} key="og:url" />
      <meta property="og:title" content={metadata.title} key="og:title" />
      <meta
        property="og:description"
        lang="en"
        content={metadata.description.en}
        key="og:description"
      />
      <meta property="og:image" content={metadata.image} key="og:image" />

      {/* <!-- Twitter --> */}
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta property="twitter:url" content={metadata.url} key="twitter:url" />
      <meta
        property="twitter:title"
        content={metadata.title}
        key="twitter:title"
      />
      <meta
        property="twitter:description"
        content={metadata.description.en}
        key="twitter:description"
      />
      <meta
        property="twitter:image"
        content={metadata.image}
        key="twitter:image"
      />
    </Head>
  );
}
