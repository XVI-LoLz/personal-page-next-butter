import { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { getFilteredCategories } from "utils/locales";
import useTranslation from "next-translate/useTranslation";

export default function PostBreadcrumbs({ post }) {
  const { t } = useTranslation("common");

  const blogBreadcrumbs = [
    { label: t`navbar.home`, href: "/" },
    { label: t`navbar.blog`, href: "/blog" },
  ];

  const { categories = [] } = post || {};
  const [mainCategory] = getFilteredCategories(categories);
  const breadcrumbs = mainCategory
    ? [
        ...blogBreadcrumbs,
        {
          label: mainCategory.name,
          href: `/blog?category=${mainCategory.slug}`,
        },
      ]
    : blogBreadcrumbs;

  const Breadcrumb = ({ label, href }) => (
    <Link href={href}>
      <a>{label}</a>
    </Link>
  );

  return (
    <div className="breadcrumbs">
      {breadcrumbs?.map((breadcrumb, i) => (
        <Fragment key={breadcrumb.label}>
          {i > 0 ? (
            <Image
              src="/icons/ic_right_chevron.svg"
              alt=""
              width={8}
              height={8}
            />
          ) : null}
          <Breadcrumb {...breadcrumb} />
        </Fragment>
      ))}
    </div>
  );
}

PostBreadcrumbs.propTypes = {
  post: PropTypes.shape({ categories: PropTypes.arrayOf(PropTypes.shape({})) }),
};

PostBreadcrumbs.defaultProps = {
  post: {},
};
