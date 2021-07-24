import useTranslation from "next-translate/useTranslation";

import Date from "components/Date";

import { formatISO } from "utils/date";

export default function PostDate({ published, updated }) {
  const { t } = useTranslation("common");
  const isUpdated = published !== updated;
  const tooltip = isUpdated
    ? t("date.tooltip", { date: formatISO(updated) })
    : null;

  return <Date dateString={published} title={tooltip} />;
}
