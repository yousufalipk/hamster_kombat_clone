import React from 'react';

const VerticalDividerSvg = ({ token }) => {
    const primaryColor = token.project.fromColor || '#000';
    const secondaryColor = token.project.toColor || '#FFF';

    return (
        <svg width="1" height="51" viewBox="0 0 1 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" y1="51" x2="0.5" y2="5.53086e-10" stroke="url(#paint0_linear_2016_20481)" />
            <defs>
                <linearGradient id="paint0_linear_2016_20481" x1="1.5" y1="51" x2="1.5" y2="-5.53086e-10" gradientUnits="userSpaceOnUse">
                    <stop stop-color={secondaryColor} />
                    <stop offset="0.482283" stop-color={primaryColor} />
                    <stop offset="1" stop-color={secondaryColor} />
                </linearGradient>
            </defs>
        </svg>

    );
};

export default VerticalDividerSvg;
