import { Check, Copy } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";

interface CopyButtonProps {
	text: string;
	children: ReactNode;
	className?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ text, children, className }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<button
			className={
				"flex cursor-pointer items-center gap-2 text-slate-300 transition-colors hover:text-white" +
				className
			}
			onClick={copyToClipboard}
			title="Копировать DOI"
			type="button"
		>
			{children}
			{copied ? (
				<Check className={"shrink-0"} size={20} />
			) : (
				<Copy className={"shrink-0"} size={20} />
			)}
		</button>
	);
};

export { CopyButton };
