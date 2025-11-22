import Link from "next/link";

export function BaseNotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900">
			<h1 className="font-bold text-4xl">404 - Page Not Found</h1>
			<p className="mt-4 text-lg text-slate-600">
				The page you are looking for does not exist.
			</p>
			<Link
				className="mt-8 rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-600"
				href="/"
			>
				Go Home
			</Link>
		</div>
	);
}
