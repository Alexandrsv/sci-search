"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { env } from "@/env";

export function Metrika() {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const metrikaId = env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

	// biome-ignore lint/correctness/useExhaustiveDependencies: для вызова эффекта стоят
	useEffect(() => {
		if (metrikaId && typeof window !== "undefined" && window.ym) {
			window.ym(metrikaId, "hit", window.location.href);
		}
	}, [pathName, searchParams, metrikaId]);

	if (!metrikaId) {
		return null;
	}

	return (
		<Script id="yandex-metrika">
			{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${metrikaId}, "init", {
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });    
      `}
		</Script>
	);
}
