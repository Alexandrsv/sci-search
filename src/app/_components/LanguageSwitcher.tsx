"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export const LanguageSwitcher = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const toggleLanguage = () => {
		const nextLocale = locale === "ru" ? "en" : "ru";
		startTransition(() => {
			// Replace the locale segment in the pathname
			// Assuming the pathname starts with /ru or /en
			const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
			router.replace(newPathname);
		});
	};

	return (
		<button
			className="flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-slate-600 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
			disabled={isPending}
			onClick={toggleLanguage}
			type="button"
		>
			<span className={locale === "ru" ? "font-bold text-blue-600" : ""}>
				RU
			</span>
			<span className="text-slate-300">|</span>
			<span className={locale === "en" ? "font-bold text-blue-600" : ""}>
				EN
			</span>
		</button>
	);
};
