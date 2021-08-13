import CodeHighlighter from "components/CodeHighlighter";
import Zoomable from "components/Zoomable";

const getNodeAttributes = (node) => node.attribs;

const getCodeLanguage = (codeNode) =>
  getNodeAttributes(codeNode).class.split("-")[1];

const getCodeBody = (codeNode) => codeNode.children[0].data;

export const transform = (node, index) => {
  switch (node.name) {
    case "img": {
      const { attribs } = node;
      return (
        <div className="image-wrapper">
          <Zoomable key={index}>
            <img src={attribs.src} alt={attribs.alt} />
          </Zoomable>
        </div>
      );
    }
    case "pre": {
      const first = node.children[0];
      console.log(first);
      const language = getCodeLanguage(first);
      const code = getCodeBody(first);
      return <CodeHighlighter language={language} code={code} />;
    }
    default:
      return undefined;
  }
};
