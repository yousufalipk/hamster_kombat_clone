/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				'custom-image1': "url('./assets/Footer/footer.png')",
				'custom-image2': "url('./assets/background/bg.png')",
				'custom-image3': "url('./assets/game/game_bg.png')",
				'splash-screen': "url('./assets/Screen.svg')",
			},
			boxShadow: {
				'panda': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
			},
			animation: {
				rotatePulse: 'rotatePulse 3s linear infinite',
				toastIn: 'toastIn 0.5s ease-out forwards',
				toastOut: 'toastOut 0.5s ease-in forwards',
			},
			keyframes: {
				rotatePulse: {
					'0%': {
						transform: 'rotate(0deg) scale(1)',
						opacity: '1',
					},
					'50%': {
						transform: 'rotate(-180deg) scale(1.1)',
						opacity: '0.7',
					},
					'100%': {
						transform: 'rotate(-360deg) scale(1)',
						opacity: '1',
					},
				},
				toastIn: {
					'0%': { top: '-80px', opacity: '0' },
					'100%': { top: '20px', opacity: '1' },
				},
				toastOut: {
					'0%': { top: '20px', opacity: '1' },
					'100%': { top: '-80px', opacity: '0' },
				},
			},
			colors: {
				primary: '#ffffff',
				secondary: '#000000',
				customOrange: '#FF9500',
				darkBlue: '#2226FF',
				lightBlue: '#00B2FF',
				borderGray: '#242434'
			},
		},
	},
	plugins: [],
};
