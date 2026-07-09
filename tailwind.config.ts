import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Legacy brand-* names kept so existing markup keeps working, but they
        // now map onto the CSS-variable ramp and follow the theme picker.
        brand: {
          orange: "hsl(var(--brand-1))",
          green: "hsl(var(--brand-3))",
          purple: "hsl(var(--brand-2))",
          dark: "hsl(var(--brand-4))",
          1: "hsl(var(--brand-1))",
          2: "hsl(var(--brand-2))",
          3: "hsl(var(--brand-3))",
          4: "hsl(var(--brand-4))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // emerald / violet remapped onto the brand ramp so the few direct
        // usages retint with the theme picker instead of clashing with it.
        emerald: {
          50: "hsl(var(--brand-3) / 0.1)",
          100: "hsl(var(--brand-3) / 0.2)",
          200: "hsl(var(--brand-3) / 0.4)",
          300: "hsl(var(--brand-3))",
          400: "hsl(var(--brand-3))",
          500: "hsl(var(--brand-3))",
          600: "hsl(var(--brand-1))",
          700: "hsl(var(--brand-2))",
          800: "hsl(var(--brand-4))",
          900: "hsl(var(--brand-4))",
        },
        violet: {
          50: "hsl(var(--brand-2) / 0.1)",
          100: "hsl(var(--brand-2) / 0.2)",
          200: "hsl(var(--brand-2) / 0.4)",
          300: "hsl(var(--brand-1))",
          400: "hsl(var(--brand-1))",
          500: "hsl(var(--brand-2))",
          600: "hsl(var(--brand-2))",
          700: "hsl(var(--brand-4))",
          800: "hsl(var(--brand-4))",
          900: "hsl(var(--brand-4))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        surface: "hsl(var(--surface))",
        divider: "hsl(var(--divider))",
        link: {
          DEFAULT: "hsl(var(--link))",
          hover: "hsl(var(--link-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(21, 89%, 49%, 0.3)" },
          "50%": { boxShadow: "0 0 40px hsla(21, 89%, 49%, 0.6)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "typing": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "blink": {
          "0%, 50%": { borderColor: "transparent" },
          "51%, 100%": { borderColor: "hsl(var(--primary))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink": "blink 0.75s step-end infinite",
      },
      backgroundImage: {
        "brand-gradient": "var(--brand-gradient)",
        "brand-radial": "var(--brand-radial)",
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
