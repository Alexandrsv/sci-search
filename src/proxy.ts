import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const handleRequest = createMiddleware({
	// A list of all locales that are supported
	locales: ["en", "ru"],

	// Used when no locale matches
	defaultLocale: "ru",
});

export default function proxy(request: NextRequest) {
	return handleRequest(request);
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
