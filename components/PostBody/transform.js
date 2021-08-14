import CodeHighlighter from "components/CodeHighlighter";
import Zoomable from "components/Zoomable";

const getNodeAttributes = (node) => node.attribs;

const getCodeParams = (codeNode) => {
  const className = getNodeAttributes(codeNode)?.class || "";
  const match = className.match(/(?<=language-)(?<language>\w*)/gm) || {};
  const language = match[0] || "text";

  const params = className.match(/(?<= )(?<language>\w*)/gm) || [];

  const options = {
    showLineNumbers: !params?.includes("noln"),
    wrapLongLines: !params?.includes("noll"),
  };

  return { language, options };
};

const getCodeBody = (codeNode) => codeNode.children[0].data;

export const transform = (node, index) => {
  switch (node.name) {
    case "img": {
      const { attribs } = node;
      return (
        <div key={index} className="image-wrapper">
          <Zoomable>
            <img src={attribs.src} alt={attribs.alt} />
          </Zoomable>
        </div>
      );
    }
    case "pre": {
      const first = node?.children[0];
      if (first.name === "code") {
        const { language, options } = getCodeParams(first);
        const code = getCodeBody(first);
        return (
          <CodeHighlighter
            key={index}
            language={language}
            code={code}
            options={options}
          />
        );
      }
      return undefined;
    }
    default:
      return undefined;
  }
};
