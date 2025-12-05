"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useEffect } from "react";

function AuthCallbackContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const t = useTranslations("AuthCallback");

	useEffect(() => {
		const token = searchParams.get("token");
		if (token) {
			localStorage.setItem("token", token);
			router.push("/"); // Redirect to home
		}
	}, [searchParams, router]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-black text-white">
			<div className="text-center">
				<h1 className="mb-4 font-bold text-2xl">{t("loading")}</h1>
				<div className="mx-auto h-8 w-8 animate-spin rounded-full border-white border-t-2 border-b-2"></div>
			</div>
		</div>
	);
}

export default function AuthCallback() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthCallbackContent />
		</Suspense>
	);
}
