import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

const PaperLoading = () => (
	<div className="flex min-h-screen items-center justify-center">
		<LoadingSpinner message="Loading article..." />
	</div>
);

export default PaperLoading;
