import  {clsx}  from "clsx";
import Link from "next/link";
import { lusitana } from "../lib/fonts";


interface Breadcrumb {
  href: string;
  label: string;
  active?: boolean;
}

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <div aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, "flex md:text-xl")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumbs;
