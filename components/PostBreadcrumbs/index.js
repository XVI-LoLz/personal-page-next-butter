import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

const blogBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function PostBreadcrumbs({ post }) {
  const { categories } = post;
  const [mainCategory] = categories;
  const breadcrumbs = [
    ...blogBreadcrumbs,
    { label: mainCategory.name, href: `/blog?category=${mainCategory.slug}` },
  ];

  const Breadcrumb = ({ label, href }) => (
    <Link href={href}>
      <a>{label}</a>
    </Link>
  );

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, i) => (
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
