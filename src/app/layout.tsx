import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import { TRPCReactProvider } from "@/trpc/react";
import { Metrika } from "./_components/Metrika";

export const metadata: Metadata = {
	title: "Sci Search - поиск научных публикаций",
	description:
		"Полнотекстовый поиск по названиям и аннотациям научных публикаций. Возможность сортировки по цитируемости",
	icons: [{ rel: "icon", url: "/fav.jpg" }],
};

const geist = Geist({
	subsets: ["latin", "cyrillic"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
				<Suspense>
					<Metrika />
				</Suspense>
			</body>
		</html>
	);
}
