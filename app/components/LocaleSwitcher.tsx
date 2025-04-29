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
        "relative text-green-400",
        isPending && "transition-opacity"
      )}
    >
      <select
        className="inline-flex appearance-none bg-transparent p-1"
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
    </label>
  );
}
