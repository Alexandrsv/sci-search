"use client";

import { SiTelegram } from "@icons-pack/react-simple-icons";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { env } from "@/env";

const BOT_USER_AGENTS = [
	"googlebot",
	"bingbot",
	"yandexbot",
	"duckduckbot",
	"baiduspider",
	"slurp",
	"facebot",
	"facebookexternalhit",
	"twitterbot",
	"telegrambot",
	"linkedinbot",
	"embedly",
	"quora link preview",
	"showyoubot",
	"outbrain",
	"pinterest/0.",
	"developers.google.com/+/web/snippet",
	"slackbot",
	"vkshare",
	"w3c_validator",
	"redditbot",
	"applebot",
	"whatsapp",
	"flipboard",
	"tumblr",
	"bitlybot",
	"skypeuripreview",
	"nuzzel",
	"discordbot",
	"google page speed",
	"qwantify",
	"pinterestbot",
	"bitrix link preview",
	"xing-contenttabreceiver",
	"chrome-lighthouse",
	"telegrambot",
];

export function AuthGate({ children }: { children: React.ReactNode }) {
	const [shouldShow, setShouldShow] = useState(false);
	const [timeAsserted, setTimeAsserted] = useState(false);
	const t = useTranslations("AuthGate");
	const locale = useLocale();

	const botUrl =
		locale === "ru"
			? env.NEXT_PUBLIC_TG_BOT_GATE_URL_RU
			: env.NEXT_PUBLIC_TG_BOT_GATE_URL;

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeAsserted(true);
		}, env.NEXT_PUBLIC_LOGIN_TIMEOUT);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		// 1. Check if it's a bot
		const userAgent = navigator.userAgent.toLowerCase();
		const isBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));
		if (isBot) {
			return;
		}

		// 2. Check for existing token
		const token = localStorage.getItem("token");
		if (token) {
			return;
		}

		// 3. Track visits
		const visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10);
		const sessionVisited = sessionStorage.getItem("sessionVisited");

		if (!sessionVisited) {
			const newVisitCount = visitCount + 1;
			localStorage.setItem("visitCount", newVisitCount.toString());
			sessionStorage.setItem("sessionVisited", "true");

			// If returning user (more than 1 visit), require login
			if (newVisitCount > 1) {
				setShouldShow(true);
			}
		} else {
			// Same session, but check if we already decided to show modal based on previous logic
			if (visitCount > 1) {
				setShouldShow(true);
			}
		}

		// 4. Track clicks
		const handleClick = () => {
			if (localStorage.getItem("token")) return;

			const clickCount = parseInt(
				localStorage.getItem("clickCount") || "0",
				10,
			);
			const newClickCount = clickCount + 1;
			localStorage.setItem("clickCount", newClickCount.toString());

			if (newClickCount > 5) {
				setShouldShow(true);
			}
		};

		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, []);

	if (!shouldShow || !timeAsserted) {
		return <>{children}</>;
	}

	return (
		<div className="relative">
			{children}
			{/* Unclosable Modal Overlay */}
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 p-4 backdrop-blur-sm">
				<div className="w-full max-w-md rounded-lg border border-blue-500 bg-white p-8 text-center shadow-blue-200/50 shadow-xl">
					<h2 className="mb-4 font-bold text-2xl text-slate-900">
						{t("title")}
					</h2>
					<p className="mb-8 text-slate-600">
						{t.rich("description", {
							b: (chunks) => (
								<b className="font-bold text-slate-900">{chunks}</b>
							),
						})}
					</p>
					<a
						className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-base text-white transition-colors duration-200 hover:bg-blue-700"
						href={botUrl || "#"}
					>
						<SiTelegram />
						{t("button")}
					</a>
				</div>
			</div>
		</div>
	);
}
