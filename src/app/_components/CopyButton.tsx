import { Check, Copy } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";

interface CopyButtonProps {
	text: string;
	children: ReactNode;
}

const CopyButton: FC<CopyButtonProps> = ({ text, children }) => {
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
			className="flex cursor-pointer items-center text-slate-300 transition-colors hover:text-white"
			onClick={copyToClipboard}
			title="Копировать DOI"
			type="button"
		>
			<span className="mr-2">{children}</span>
			{copied ? <Check size={20} /> : <Copy size={20} />}
		</button>
	);
};

export { CopyButton };
