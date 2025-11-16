const LoadingSpinner = ({ message = "Загрузка..." }: { message?: string }) => {
	return (
		<div className="flex flex-col items-center justify-center py-8">
			<div className="relative mb-4">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400"></div>
				<div
					className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-r-cyan-300"
					style={{ animationDirection: "reverse", animationDuration: "1s" }}
				></div>
			</div>
			<p className="animate-pulse font-medium text-lg text-white">{message}</p>
		</div>
	);
};

export { LoadingSpinner };
