import { blackA, mauve, violet, green } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        violet4: "hsl(237,91.5%,95.5%)",
        violet7: "hsl(237,71%,83.7%)",
        violet8: "hsl(237,68.6%,76.3%)",
        violet11: "hsl(235,43%,48%)",
        ...green,
        green4: "hsl(90,58.7%,91%)",
        green5: "hsl(91,43.5%,86%)",
        green7: "hsl(96,38.5%,69%)",
        green11: "hsl(102,67%,28.5%)",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [],
};
