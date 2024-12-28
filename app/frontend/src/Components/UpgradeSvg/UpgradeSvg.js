import React from 'react';

const MySvgComponent = ({ token }) => {
    const primaryColor = token.project.toColor || '#000';
    const secondaryColor = token.project.fromColor || '#FFF';

    return (
        <svg width="102" height="41" viewBox="0 0 102 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2140_2272)">
                <path d="M9.82773 13.2904L9.90239 13.4272V13.5831V20.2612V20.4271L9.8185 20.5702L8.16683 23.3881V28.7222H93.7224V23.2222V20.2612V13.5831V10.4022V5.50003H8.16683V10.2463L9.82773 13.2904Z" stroke="url(#paint0_linear_2140_2272)" stroke-width="1.22222" shape-rendering="crispEdges" />
            </g>
            <g clip-path="url(#clip0_2140_2272)">
                <path d="M82.0305 32.2377L82.0305 32.2376L81.6585 30.1525L81.6228 29.9522L81.4242 29.9079C79.928 29.5743 78.5114 28.9857 77.2067 28.1554L77.0348 28.046L76.8677 28.1626L75.1273 29.3774C75.1272 29.3774 75.1272 29.3774 75.1271 29.3774C75.1133 29.387 75.0938 29.3853 75.0818 29.3733L71.8652 26.1565L71.6492 26.3726L71.8652 26.1565C71.853 26.1443 71.8515 26.1255 71.8612 26.1117L71.8613 26.1115L73.0761 24.3711L73.1927 24.2041L73.0833 24.0322C72.2531 22.7274 71.6646 21.3112 71.3308 19.8143L71.2865 19.6158L71.0862 19.58L69.001 19.208L69.0009 19.208C68.9844 19.205 68.9721 19.1905 68.9721 19.1733V14.621C68.9721 14.6038 68.9844 14.5893 69.0009 14.5864L69.001 14.5864L71.0862 14.2143L71.2865 14.1786L71.3308 13.98C71.6646 12.4832 72.2531 11.0669 73.0833 9.76213L73.1927 9.59026L73.0761 9.42321L71.8613 7.6828L71.8612 7.68263C71.8515 7.66885 71.853 7.65 71.8652 7.63781L71.8652 7.63781L75.082 4.42088L75.0823 4.42058C75.0936 4.40928 75.1128 4.407 75.1272 4.41692C75.1272 4.41695 75.1272 4.41697 75.1273 4.41699L76.8677 5.63174L77.0348 5.74834L77.2067 5.63896C78.5114 4.8086 79.928 4.22007 81.4242 3.88642L81.6228 3.84214L81.6585 3.64186L82.0305 1.5567L82.0305 1.55666C82.0335 1.54006 82.0481 1.52772 82.0652 1.52772H86.6178C86.6349 1.52772 86.6495 1.54006 86.6525 1.55666L86.6525 1.5567L87.0245 3.64186L87.0603 3.84214L87.2588 3.88642C88.755 4.22007 90.1716 4.8086 91.4764 5.63896L91.6482 5.74834L91.8153 5.63174L93.5552 4.41738C93.5553 4.41732 93.5553 4.41726 93.5554 4.41721C93.5703 4.40711 93.5898 4.40965 93.601 4.42089L96.8178 7.63781L97.0339 7.42175L96.8178 7.63781C96.83 7.65 96.8315 7.66885 96.8219 7.68263L96.8217 7.6828L95.6069 9.42321L95.4903 9.59028L95.5997 9.76216C96.4299 11.0666 97.0184 12.4832 97.3524 13.9801L97.3967 14.1786L97.597 14.2143L99.682 14.5864L99.6821 14.5864C99.6987 14.5893 99.711 14.6038 99.711 14.621V19.1733C99.711 19.1905 99.6987 19.205 99.6821 19.208L99.682 19.208L97.597 19.58L97.3967 19.6158L97.3524 19.8143C97.0184 21.3112 96.4299 22.7278 95.5997 24.0322L95.4903 24.2041L95.6069 24.3711L96.8217 26.1115L96.8218 26.1117C96.8315 26.1255 96.83 26.1443 96.8178 26.1565L97.0339 26.3726L96.8178 26.1565L93.601 29.3735C93.5893 29.3852 93.5698 29.3871 93.5558 29.3774C93.5558 29.3774 93.5558 29.3774 93.5557 29.3774L91.8153 28.1626L91.6482 28.046L91.4764 28.1554C90.1716 28.9857 88.755 29.5743 87.2588 29.9079L87.0603 29.9522L87.0245 30.1525L86.6525 32.2376L86.6525 32.2377C86.6495 32.2543 86.6349 32.2666 86.6178 32.2666H82.0652C82.0481 32.2666 82.0335 32.2543 82.0305 32.2377Z" fill="url(#paint1_linear_2140_2272)" stroke='#000' stroke-width="0.611111" />
                <path d="M83.9443 26.6317C89.5398 26.6317 94.0759 22.0956 94.0759 16.5001C94.0759 10.9046 89.5398 6.36853 83.9443 6.36853C78.3488 6.36853 73.8127 10.9046 73.8127 16.5001C73.8127 22.0956 78.3488 26.6317 83.9443 26.6317Z" fill="url(#paint2_radial_2140_2272)" />
                <g clip-path="url(#clip1_2140_2272)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M80.397 22.1003C81.1554 21.9482 81.8429 21.6221 82.3267 21.1765C82.878 20.6918 83.2522 20.0004 83.4387 19.1221C83.6196 18.295 83.6012 17.4305 83.559 16.694C83.5358 15.9811 83.4482 15.2782 83.3554 14.5344L83.3399 14.4102H81.552L84.5791 9.90405L87.6067 14.4102H85.8192L85.8158 14.4398C85.7217 15.2167 85.6246 16.0198 85.457 16.8328C85.2817 17.6655 85.0428 18.6405 84.5972 19.5561C84.3299 20.1229 83.7215 21.1511 82.6485 21.6732C81.9267 22.044 81.2228 22.0956 80.397 22.1007V22.1003Z" fill="white" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_2140_2272" x="0.222331" y="1.22225" width="101.444" height="39.1111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="3.66667" />
                    <feGaussianBlur stdDeviation="3.66667" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2140_2272" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2140_2272" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_2140_2272" x1="50.9446" y1="4.88892" x2="50.9446" y2="29.3334" gradientUnits="userSpaceOnUse">
                    <stop stop-color={primaryColor} />
                    <stop offset="0.36" stop-color={secondaryColor} />
                    <stop offset="0.55" stop-color={secondaryColor} />
                    <stop offset="1" stop-color={primaryColor} />
                </linearGradient>
                <linearGradient id="paint1_linear_2140_2272" x1="66.31" y1="-0.958472" x2="101.604" y2="33.9915" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#15AEFF" />
                    <stop offset="0.11226" stop-color={primaryColor} />
                    <stop offset="0.293327" stop-color={secondaryColor} />
                    <stop offset="0.520553" stop-color={primaryColor} />
                    <stop offset="0.782428" stop-color={secondaryColor} />
                    <stop offset="1" stop-color={secondaryColor} />
                </linearGradient>
                <radialGradient id="paint2_radial_2140_2272" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(83.9443 16.5001) rotate(90) scale(10.1316)">
                    <stop stop-color={primaryColor} />
                    <stop offset="1" stop-color={secondaryColor} />
                </radialGradient>
                <clipPath id="clip0_2140_2272">
                    <rect width="33" height="33" fill="black" transform="translate(67.4443)" />
                </clipPath>
                <clipPath id="clip1_2140_2272">
                    <rect width="22" height="22" fill="black" transform="translate(73 10)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default MySvgComponent;
