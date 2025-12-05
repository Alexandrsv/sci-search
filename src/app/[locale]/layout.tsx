import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";
import { TRPCReactProvider } from "@/trpc/react";
import { AuthGate } from "../_components/AuthGate";
import { CipherBackground } from "../_components/CipherBackground";
import { HexagonalGridBackground } from "../_components/HexagonalGridBackground";
import { Metrika } from "../_components/Metrika";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getMessages({ locale });
	const metadata = t.Metadata as Record<string, string>;

	return {
		title: metadata.title,
		description: metadata.description,
		icons: [{ rel: "icon", url: "/fav.jpg" }],
	};
}

const geist = Geist({
	subsets: ["latin", "cyrillic"],
	variable: "--font-geist-sans",
});

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!["en", "ru"].includes(locale as string)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html className={`${geist.variable}`} lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					<HexagonalGridBackground />
					<CipherBackground />
					<TRPCReactProvider>
						<AuthGate>{children}</AuthGate>
					</TRPCReactProvider>
					<Suspense>
						<Metrika />
					</Suspense>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
