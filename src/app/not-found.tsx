import { BaseNotFound } from "@/app/_components/BaseNotFound";
import "@/styles/globals.css";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function NotFound() {
	return (
		<html lang="en">
			<body>
				<div className="flex min-h-screen items-center justify-center">
					<BaseNotFound />
				</div>
			</body>
		</html>
	);
}
