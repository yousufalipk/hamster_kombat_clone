/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				'custom-image1': "url('./assets/Footer/footer.png')", // Changed path to be relative
				'custom-image2': "url('./assets/background/bg.png')", // Fixed typo in 'background'
			},
			boxShadow: {
				'panda': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
			},
		},
	},
	plugins: [],
};
