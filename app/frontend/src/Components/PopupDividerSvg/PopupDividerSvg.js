import React from 'react';

const PopupDividerSvg = ({ token }) => {
    const primaryColor = token.project.fromColor || '#000';
    const secondaryColor = token.project.toColor || '#FFF';

    return (
        <svg width="332" height="53" viewBox="0 0 332 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="187.5" y1="51" x2="187.5" y2="5.53086e-10" stroke="url(#paint0_linear_2279_2050)" />
            <line x1="3.00021e-05" y1="51.5" x2="332" y2="51.5199" stroke="url(#paint1_linear_2279_2050)" />
            <defs>
                <linearGradient id="paint0_linear_2279_2050" x1="188.5" y1="51" x2="188.5" y2="-5.53086e-10" gradientUnits="userSpaceOnUse">
                    <stop stop-color={secondaryColor} />
                    <stop offset="1" stop-color={primaryColor} />
                </linearGradient>
                <linearGradient id="paint1_linear_2279_2050" x1="-3.00021e-05" y1="52.5" x2="332" y2="52.5199" gradientUnits="userSpaceOnUse">
                    <stop stop-color={secondaryColor} />
                    <stop offset="0.505" stop-color={primaryColor} />
                    <stop offset="1" stop-color={secondaryColor} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default PopupDividerSvg;
