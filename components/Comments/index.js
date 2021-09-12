import { createRef, useEffect } from "react";

export default function Comments() {
  const ref = createRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "xvi-lolz/16th.me-comments");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "github-dark");
    ref.current.appendChild(script);
  }, [ref]);

  return <div ref={ref} />;
}
