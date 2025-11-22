import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
	reactCompiler: true,
};

export default withNextIntl(config);
