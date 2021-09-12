import useTranslation from "next-translate/useTranslation";
import PropTypes from "prop-types";

import Date from "components/Date";

import { formatISO } from "utils/date";

export default function PostDate({ created, updated }) {
  const { t } = useTranslation("common");
  const isUpdated = created !== updated;
  const tooltip = isUpdated
    ? t("date.tooltip", { date: formatISO(updated) })
    : undefined;

  return <Date dateString={created} title={tooltip} />;
}

PostDate.propTypes = {
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};
