import style from "./style.module.scss";

export default function PostBody({ content }) {
  return (
    <div
      className={style.PostBody}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
