import { formatISO } from "utils/date";

export default function Date({ dateString, ...rest }) {
  return (
    <time dateTime={dateString} {...rest}>
      {formatISO(dateString)}
    </time>
  );
}
