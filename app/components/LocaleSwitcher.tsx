"use client";
import clsx from "clsx";
import { Locale, useLocale } from "next-intl";
import { ChangeEvent, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        "relative hover:cursor-pointer",
        isPending && "transition-opacity"
      )}
    >
      <select
        className="hidden sm:inline-flex appearance-none bg-transparent p-1"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {routing.locales.map((cur) => (
          <option
            key={cur}
            value={cur}
            className="text-yellow-700 appearance-none bg-transparent"
          >
            {cur === "en"
              ? "English"
              : cur === "fa"
                ? "Farsi"
                : cur === "ar" && "Arabic"}
          </option>
        ))}
      </select>

      <ul className="sm:hidden flex items-center justify-between">
        {routing.locales.map((lang: "en" | "fa" | "ar") => (
          <li key={lang} onClick={() => onSelectChange({ target: { value: lang } } as ChangeEvent<HTMLSelectElement>)}>
            {lang === "en" ? (
              <span className={`border rounded-lg px-1 m-1 ${locale === lang && "text-sky-700"}`}>En</span>
            ) : lang === "fa" ? (
              <span className={`border rounded-lg px-1 m-1 ${locale === lang && "text-sky-700"}`}>Fa</span>
            ) : (
              lang === "ar" && (
                <span className={`border rounded-lg px-1 m-1 ${locale === lang && "text-sky-700"}`}>Ar</span>
              )
            )}
          </li>
        ))}
      </ul>
    </label>
  );
}
