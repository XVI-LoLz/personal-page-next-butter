import { useRouter } from "next/router";

export default function Comments() {
  const router = useRouter();

  return (
    <div
      key={`utterances-comments-${router.asPath}`}
      ref={(ref) => {
        if (!ref) {
          return;
        }
        const script = document.createElement("script");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("async", true);
        script.setAttribute("repo", "xvi-lolz/16th.me-comments");
        script.setAttribute("issue-term", "pathname");
        script.setAttribute("theme", "github-dark");
        ref.appendChild(script);
      }}
    />
  );
}
