import React from 'react';

const PopupDividerSvg = ({ bgColor }) => {

    return (
        <svg width="233" height="28" viewBox="0 0 233 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_ii_2769_5419)">
                <path d="M7.7323 0H225.783L233 14L225.783 28H7.7323L0 14L7.7323 0Z" fill="#0A0A15" />
            </g>
            <path d="M0.571193 14L8.02734 0.5H225.478L232.437 14L225.478 27.5H8.02734L0.571193 14Z" stroke="#747474" />
            <defs>
                <filter id="filter0_ii_2769_5419" x="0" y="-0.740259" width="234.481" height="31.7013" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="0.740259" dy="-0.740259" />
                    <feGaussianBlur stdDeviation="1.36948" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2769_5419" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="1.48052" dy="5.18181" />
                    <feGaussianBlur stdDeviation="1.48052" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                    <feBlend mode="normal" in2="effect1_innerShadow_2769_5419" result="effect2_innerShadow_2769_5419" />
                </filter>
            </defs>
        </svg>
    );
};

export default PopupDividerSvg;
