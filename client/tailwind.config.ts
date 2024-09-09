const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const config = {
	darkMode: ["class"],
	content: [
		"./src/containers/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
		"./src/app/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: 'true',
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: 'hsl(var(--card))',
    			cardForeground: 'hsl(var(--card-foreground))',
    			popover: 'hsl(var(--popover))',
    			popoverForeground: 'hsl(var(--popover-foreground))',
    			primary: 'hsl(var(--primary))',
    			primaryForeground: 'hsl(var(--primary-foreground))',
    			secondary: 'hsl(var(--secondary))',
    			secondaryForeground: 'hsl(var(--secondary-foreground))',
    			muted: 'hsl(var(--muted))',
    			'muted/5': 'hsl(var(--muted).5)',
    			'muted/4': 'hsl(var(--muted).4)',
    			mutedForeground: 'hsl(var(--muted-foreground))',
    			accent: 'hsl(var(--accent))',
    			accentForeground: 'hsl(var(--accent-foreground))',
    			destructive: 'hsl(var(--destructive))',
    			destructiveForeground: 'hsl(var(--destructive-foreground))',
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart1: 'hsl(var(--chart-1))',
    			chart2: 'hsl(var(--chart-2))',
    			chart3: 'hsl(var(--chart-3))',
    			chart4: 'hsl(var(--chart-4))',
    			chart5: 'hsl(var(--chart-5))'
    		},
    		fontFamily: {
    			inter: ["var(--font-inter)", ...fontFamily.sans]
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};

export default config;