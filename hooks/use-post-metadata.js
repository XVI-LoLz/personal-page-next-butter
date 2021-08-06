import kebabCase from "lodash.kebabcase";
import { useEffect, useState } from "react";

export default function usePostMetadata(post) {
  const [improved, setImproved] = useState(post);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (post?.body) {
      const auxNodes = [];
      const doc = new DOMParser().parseFromString(post?.body, "text/html");
      const headers = doc.querySelectorAll("h1,h2,h3,h4,h5,h6");

      headers.forEach((h, i) => {
        // eslint-disable-next-line no-param-reassign
        h.id = kebabCase(i + h.innerHTML);
        auxNodes.push({
          type: h.nodeName,
          label: h.innerHTML,
          slug: h.id,
        });
      });
      setToc(auxNodes);
      setImproved(doc.body.innerHTML);
    }
  }, [post?.body]);

  return { improved, toc };
}
