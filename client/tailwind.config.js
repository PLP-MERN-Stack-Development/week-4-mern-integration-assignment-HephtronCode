/** @type {import('tailwindcss').Config} */
export default {
	// This part is still essential. It tells Tailwind WHERE to look for class names.
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	// This is where we add the typography plugin.
    plugins: [
        require("@tailwindcss/typography")
    ],
};
