import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'primary-1': '#F5F8F7',
  			'primary-2': '#DEE9E7',
  			'primary-3': '#B3CDC7',
  			'primary-4': '#93B5AF',
  			'primary-5': '#6C958E',
  			'primary-6': '#527A75',
  			'primary-7': '#40615D',
  			'primary-8': '#364F4C',
  			'primary-9': '#141F1F',
  			'secondary-1': '#FEF4F2',
  			'secondary-2': '#FEE1DB',
  			'secondary-3': '#FED3CA',
  			'secondary-4': '#FDB3A4',
  			'secondary-5': '#F98770',
  			'secondary-6': '#F06143',
  			'secondary-7': '#BA361B',
  			'secondary-8': '#9A301A',
  			'secondary-9': '#45140A',
  			'gray-1': '#F6F6F6',
  			'gray-2': '#E7E7E7',
  			'gray-3': '#D1D1D1',
  			'gray-4': '#888888',
  			'gray-5': '#5D5D5D',
  			'gray-6': '#4A4A4A',
  			'gray-7': '#454545',
  			'gray-8': '#3D3D3D',
  			'gray-9': '#2B2B2B',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	container: {
  		center: true,
  		padding: '1rem',
  		screens: {
  			md: '100%',
  			lg: '1600px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
