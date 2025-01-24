import React, { useEffect, useState } from 'react';
import { useUser } from '../../context';
import AngleIcon from "../../assets/AngleIcon.svg";
import DomeProfilePic from "../../assets/profile.png";
import LevelsBackground from '../../assets/levels.png';
import TitleBackground from '../../assets/titleBg.svg';

import VerticalLine from '../../assets/verticalLine.svg';
import DaiyCurrentDayBg from '../../assets/dailyreward/dailyCurrentDay.jpg';

import SmallCoin from '../../assets/optimizedImages/SmallCoin.svg';

import LevelUp from '../../assets/levelUp.svg';
import Lock from '../../assets/lock.svg';
import TonCoin from '../../assets/ton.svg';

import Panda1 from '../../assets/optimizedImages/Home/Pandas/1.webp';
import Panda2 from '../../assets/optimizedImages/Home/Pandas/2.webp';
import Panda3 from '../../assets/optimizedImages/Home/Pandas/3.webp';
import Panda4 from '../../assets/optimizedImages/Home/Pandas/4.webp';
import Panda5 from '../../assets/optimizedImages/Home/Pandas/5.webp';
import Panda6 from '../../assets/optimizedImages/Home/Pandas/6.webp';
import Panda7 from '../../assets/optimizedImages/Home/Pandas/7.webp';
import Panda8 from '../../assets/optimizedImages/Home/Pandas/8.webp';
import Panda9 from '../../assets/optimizedImages/Home/Pandas/9.webp';
import Panda10 from '../../assets/optimizedImages/Home/Pandas/10.webp';
import Panda11 from '../../assets/optimizedImages/Home/Pandas/11.webp';
import Panda12 from '../../assets/optimizedImages/Home/Pandas/12.webp';
import Panda13 from '../../assets/optimizedImages/Home/Pandas/13.webp';
import Panda14 from '../../assets/optimizedImages/Home/Pandas/14.webp';

import LevelBackground0 from '../../assets/levelsBackgroundImages/0.svg';
import LevelBackground1 from '../../assets/levelsBackgroundImages/1.svg';
import LevelBackground2 from '../../assets/levelsBackgroundImages/2.svg';
import LevelBackground3 from '../../assets/levelsBackgroundImages/3.svg';
import LevelBackground4 from '../../assets/levelsBackgroundImages/4.svg';
import LevelBackground5 from '../../assets/levelsBackgroundImages/5.svg';
import LevelBackground6 from '../../assets/levelsBackgroundImages/6.svg';
import LevelBackground7 from '../../assets/levelsBackgroundImages/7.svg';
import LevelBackground8 from '../../assets/levelsBackgroundImages/8.svg';
import LevelBackground9 from '../../assets/levelsBackgroundImages/9.svg';
import LevelBackground10 from '../../assets/levelsBackgroundImages/10.svg';
import LevelBackground11 from '../../assets/levelsBackgroundImages/11.svg';
import LevelBackground12 from '../../assets/levelsBackgroundImages/12.svg';
import LevelBackground13 from '../../assets/levelsBackgroundImages/13.svg';

import Sticker1 from '../../assets/levels/stickers/level1.svg';
import Sticker2 from '../../assets/levels/stickers/level2.svg';
import Sticker3 from '../../assets/levels/stickers/level3.svg';
import Sticker4 from '../../assets/levels/stickers/level4.svg';
import Sticker5 from '../../assets/levels/stickers/level5.svg';
import Sticker6 from '../../assets/levels/stickers/level6.svg';

import PandaBgBrown from '../../assets/BrownBgPanda.svg';

import LockIcon from '../../assets/lock.svg';

const Levels = () => {
    const { level, profilePic, firstName, levelName, levelPercentage, levelsData, triggerToast, buyLevelUpgrade } = useUser();

    const [page, setPage] = useState('level');
    const [skinPage, setSkinPage] = useState(level - 1);

    const [dots, setDots] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        let interval;
        if (buttonLoading) {
            interval = setInterval(() => {
                setDots(prev => (prev.length < 4 ? prev + '.' : ''));
            }, 300);
        } else {
            setDots('');
        }
        return () => clearInterval(interval);
    }, [buttonLoading]);

    useEffect(() => {
        console.log('Level', level);
    }, [level])

    const pandaMapping = {
        0: Panda1,
        1: Panda2,
        2: Panda3,
        3: Panda4,
        4: Panda5,
        5: Panda6,
        6: Panda7,
        7: Panda8,
        8: Panda9,
        9: Panda10,
        10: Panda11,
        11: Panda12,
        12: Panda13,
        13: Panda14,
    };

    const backgroundMapping = {
        0: LevelBackground0,
        1: LevelBackground1,
        2: LevelBackground2,
        3: LevelBackground3,
        4: LevelBackground4,
        5: LevelBackground5,
        6: LevelBackground6,
        7: LevelBackground7,
        8: LevelBackground8,
        9: LevelBackground9,
        10: LevelBackground10,
        11: LevelBackground11,
        12: LevelBackground12,
        13: LevelBackground13
    }

    const stickerMapping = {
        0: Sticker1,
        1: Sticker2,
        2: Sticker3,
        3: Sticker4,
        4: Sticker5,
        5: Sticker6,
        6: Sticker6,
        7: Sticker6,
        8: Sticker6,
        9: Sticker6,
        10: Sticker6,
        11: Sticker6,
        12: Sticker6,
        13: Sticker6,
    };

    const colorMapping = [
        {
            id: 0,
            from: '#8DFFB4',
            to: '#0AC9A6'
        },
        {
            id: 1,
            from: '#576DE4',
            to: '#5C00D0'
        },
        {
            id: 2,
            from: '#57CBE4',
            to: '#008DB9'
        },
        {
            id: 3,
            from: '#B857E4',
            to: '#8400B8'
        },
        {
            id: 4,
            from: '#D39200',
            to: '#FFCE00',
        },
        {
            id: 5,
            from: '#5B0002',
            to: '#DF700A'
        },
        {
            id: 6,
            from: '#38B1DE',
            to: '#61C3E8'
        },
        {
            id: 7,
            from: '#78571B',
            to: '#F3B54C'
        },
        {
            id: 8,
            from: '#1FD884',
            to: '#07472A'
        },
        {
            id: 9,
            from: '#38B1DE',
            to: '#61C3E8',
        },
        {
            id: 10,
            from: '#8E9EAB',
            to: '#EEF2F3'
        },
        {
            id: 11,
            from: '#B857E4',
            to: '#B857E4'
        },
        {
            id: 12,
            from: '#DB6704',
            to: '#FFB93E'
        },
        {
            id: 13,
            from: '#7F96A8',
            to: '#4B5561'
        }
    ]


    const formatNumber = (value) => {
        if (value < 1000) return value;

        const suffixes = ['k', 'lac', 'M', 'B', 'T'];
        let suffixIndex = -1;

        while (value >= 1000 && suffixIndex < suffixes.length - 1) {
            value /= 1000;
            suffixIndex++;
        }

        return value + suffixes[suffixIndex];
    }


    const getRandomName = () => {
        const randomNames = ["John Doe", "Jane Smith", "Alex Johnson", "Chris Lee", "Taylor Brown"];
        return randomNames[Math.floor(Math.random() * randomNames.length)];
    };

    const handleBuyAndUpgradeLevel = async (levelTopUpdate) => {
        try {
            setButtonLoading(true);
            const res = await buyLevelUpgrade(levelTopUpdate);
            if (res.success) {
                triggerToast('Level Upgraded Succesfully!', 'success');
            } else {
                triggerToast('Error upgrading Level!', 'error');
            }
        } catch (error) {
            triggerToast('Internal Server Error!', 'error');
            console.log('Internal Server Error!');
        } finally {
            setButtonLoading(false);
        }
    }

    return (
        <div className='h-[92vh] w-full bg-[#090913] pt-5 px-2'>

            {/* Header */}
            <div className="px-2 flex justify-between">
                <div className="flex mt-1.5">
                    <div className="rounded-full bg-gray-700 text-white w-[42px] h-[42px] overflow-hidden flex items-center justify-center">
                        {profilePic === 'not set' ? (
                            <img src={DomeProfilePic} alt="img" width={70} className="rounded-full" />
                        ) : (
                            <>
                                <img src={profilePic} alt="Profile-Picture" className="rounded-full" />
                            </>
                        )}
                    </div>
                    <div className="pl-2 text-[#FFF]">
                        <p className="font-medium text-sm">{firstName || getRandomName()}</p>
                        <div className='w-full flex justify-start items-center gap-1'>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2313_5649)">
                                    <circle cx="6" cy="6.5625" r="4.5" fill="white" />
                                    <path d="M6.08643 0.461548C4.97391 0.461548 3.88637 0.791448 2.96135 1.40953C2.03632 2.02761 1.31535 2.90612 0.889606 3.93395C0.463863 4.96179 0.352469 6.09279 0.569511 7.18393C0.786553 8.27507 1.32228 9.27735 2.10895 10.064C2.89562 10.8507 3.8979 11.3864 4.98905 11.6035C6.08019 11.8205 7.21119 11.7091 8.23902 11.2834C9.26686 10.8576 10.1454 10.1367 10.7634 9.21163C11.3815 8.2866 11.7114 7.19907 11.7114 6.08655C11.7096 4.59526 11.1164 3.16558 10.0619 2.11108C9.0074 1.05658 7.57771 0.463364 6.08643 0.461548ZM5.01393 2.61967C5.03355 2.5974 5.05953 2.58168 5.08836 2.57464C5.1172 2.5676 5.1475 2.56957 5.17518 2.5803L5.56518 2.71905L5.97955 2.2953C6.00841 2.26648 6.04752 2.2503 6.0883 2.2503C6.12908 2.2503 6.1682 2.26648 6.19705 2.2953L6.61143 2.71905L7.00143 2.5803C7.02909 2.56946 7.05942 2.56743 7.08828 2.57447C7.11714 2.58152 7.14313 2.59731 7.16268 2.61967C7.18272 2.64078 7.19622 2.66724 7.20155 2.69586C7.20687 2.72447 7.20379 2.75402 7.19268 2.78092L6.8008 3.66592C6.78908 3.69266 6.76998 3.71551 6.74574 3.73178C6.72149 3.74805 6.69312 3.75708 6.66393 3.7578H5.51268C5.48349 3.75708 5.45511 3.74805 5.43087 3.73178C5.40663 3.71551 5.38753 3.69266 5.3758 3.66592L4.9858 2.78092C4.97393 2.7543 4.97026 2.72473 4.97527 2.69601C4.98028 2.66728 4.99374 2.64071 5.01393 2.61967ZM2.89143 8.97405C2.88125 8.95367 2.87595 8.9312 2.87595 8.90842C2.87595 8.88564 2.88125 8.86318 2.89143 8.8428C2.93934 8.75185 3.0028 8.66999 3.07893 8.60092C2.86445 8.57243 2.66194 8.48546 2.4936 8.34953C2.32526 8.21361 2.19758 8.03397 2.12455 7.8303C2.11909 7.80825 2.11844 7.78528 2.12265 7.76295C2.12685 7.74063 2.13582 7.71947 2.14893 7.70092C2.2496 7.58067 2.37752 7.48617 2.52205 7.4253C2.34078 7.33905 2.1851 7.20706 2.07036 7.04234C1.95561 6.87762 1.88576 6.68585 1.86768 6.48592C1.86727 6.46349 1.87215 6.44128 1.88193 6.42108C1.8917 6.40089 1.90609 6.38328 1.92393 6.36967C2.09126 6.24532 2.29301 6.17589 2.50143 6.17092C2.36221 6.02248 2.26422 5.84022 2.21719 5.64222C2.17015 5.44422 2.17571 5.23736 2.2333 5.04217C2.24195 5.02114 2.25519 5.00231 2.27206 4.98706C2.28893 4.97181 2.309 4.96053 2.3308 4.95405C2.5286 4.90432 2.73667 4.91411 2.92893 4.98217C2.84973 4.78764 2.82465 4.5753 2.85634 4.36767C2.88803 4.16004 2.97531 3.96485 3.10893 3.8028C3.12499 3.78668 3.14441 3.7743 3.16579 3.76652C3.18718 3.75874 3.21001 3.75576 3.23268 3.75779C3.37558 3.77872 3.51201 3.83125 3.63205 3.91155C3.60018 3.22342 4.02956 2.83342 4.15893 2.8953C4.64643 3.05092 4.92205 3.57967 4.93705 4.1028C4.44202 4.32345 4.02064 4.68145 3.72291 5.13434C3.42517 5.58722 3.26356 6.11599 3.25725 6.65795C3.25093 7.1999 3.40017 7.73229 3.68727 8.192C3.97438 8.6517 4.38729 9.01942 4.87705 9.25155C4.3183 9.7203 3.23455 9.63592 2.89143 8.97405ZM3.55893 6.6903C3.55874 6.18903 3.70723 5.69896 3.9856 5.2821C4.26398 4.86523 4.65974 4.54028 5.12281 4.34837C5.58589 4.15646 6.09549 4.1062 6.58713 4.20394C7.07878 4.30169 7.53039 4.54306 7.88484 4.89751C8.2393 5.25196 8.48066 5.70357 8.57841 6.19522C8.67616 6.68687 8.62589 7.19646 8.43398 7.65954C8.24207 8.12262 7.91712 8.51837 7.50026 8.79675C7.08339 9.07512 6.59332 9.22361 6.09205 9.22342C5.42045 9.2227 4.77656 8.95558 4.30166 8.48069C3.82677 8.00579 3.55965 7.3619 3.55893 6.6903ZM10.0277 7.70092C10.0408 7.71948 10.0497 7.74063 10.054 7.76296C10.0582 7.78528 10.0575 7.80825 10.0521 7.8303C9.97902 8.03397 9.85134 8.2136 9.683 8.34953C9.51466 8.48546 9.31216 8.57243 9.09768 8.60092C9.17381 8.67 9.23726 8.75185 9.28518 8.8428C9.29535 8.86318 9.30065 8.88564 9.30065 8.90842C9.30065 8.9312 9.29535 8.95367 9.28518 8.97405C8.93643 9.63967 7.8583 9.71467 7.30143 9.25342C7.79361 9.0219 8.20876 8.65362 8.49731 8.19255C8.78586 7.73148 8.93561 7.19711 8.92869 6.65324C8.92177 6.10937 8.75847 5.57898 8.45829 5.1254C8.1581 4.67182 7.73372 4.31422 7.2358 4.0953C7.23794 4.02225 7.2461 3.94951 7.26018 3.8778C7.4008 3.07905 7.99143 2.9028 8.01768 2.8953C8.14893 2.83717 8.57643 3.21967 8.54455 3.91155C8.6646 3.83125 8.80103 3.77873 8.94393 3.7578C8.96659 3.75577 8.98943 3.75875 9.01081 3.76653C9.0322 3.77431 9.05161 3.78669 9.06768 3.80281C9.2013 3.96486 9.28858 4.16005 9.32027 4.36768C9.35196 4.57531 9.32688 4.78765 9.24768 4.98218C9.43994 4.91411 9.64801 4.90433 9.8458 4.95406C9.8676 4.96054 9.88767 4.97182 9.90454 4.98707C9.92141 5.00232 9.93466 5.02115 9.9433 5.04218C10.0015 5.23732 10.0073 5.44432 9.96024 5.64242C9.91318 5.84053 9.81487 6.02279 9.67518 6.17093C9.88368 6.17541 10.0856 6.24489 10.2527 6.36968C10.3821 6.44093 10.3052 7.06156 9.65457 7.42531C9.79909 7.48619 9.92701 7.58067 10.0277 7.70092Z" fill="url(#paint0_linear_2313_5649)" />
                                    <path d="M7.12705 5.94004L6.66955 5.89879C6.6479 5.8968 6.6272 5.88894 6.60969 5.87605C6.59218 5.86317 6.57852 5.84575 6.57017 5.82567L6.39017 5.40567C6.35783 5.32949 6.30378 5.26451 6.23476 5.21884C6.16575 5.17316 6.08481 5.1488 6.00205 5.1488C5.91928 5.1488 5.83835 5.17316 5.76933 5.21884C5.70032 5.26451 5.64627 5.32949 5.61392 5.40567L5.43392 5.82566C5.42558 5.84574 5.41192 5.86316 5.39441 5.87605C5.3769 5.88893 5.3562 5.89679 5.33455 5.89878L4.87892 5.94003C4.79732 5.94846 4.71991 5.98039 4.6561 6.03194C4.59228 6.08348 4.54478 6.15244 4.51938 6.23045C4.49397 6.30845 4.49174 6.39215 4.51296 6.4714C4.53418 6.55065 4.57794 6.62203 4.63892 6.67691L4.98392 6.97878C4.99991 6.99351 5.01177 7.01215 5.01835 7.03287C5.02492 7.05358 5.02598 7.07565 5.02142 7.0969L4.92017 7.54315C4.90673 7.60482 4.90719 7.66871 4.92152 7.73017C4.93585 7.79164 4.96368 7.84914 5.00299 7.89852C5.04231 7.94789 5.09213 7.98788 5.14883 8.0156C5.20553 8.04333 5.26769 8.05807 5.3308 8.05878C5.49205 8.07565 5.80517 7.8319 5.94017 7.76253C5.95892 7.75148 5.98029 7.74566 6.00205 7.74566C6.02381 7.74566 6.04517 7.75148 6.06392 7.76253L6.45767 7.99878C6.52866 8.03975 6.61001 8.05925 6.69185 8.05492C6.7737 8.0506 6.85254 8.02263 6.91882 7.97442C6.98509 7.9262 7.03596 7.85979 7.06527 7.78325C7.09457 7.70671 7.10105 7.62331 7.08392 7.54315L6.98267 7.0969C6.97811 7.07565 6.97917 7.05358 6.98575 7.03287C6.99233 7.01215 7.00419 6.99351 7.02017 6.97878L7.36517 6.67691C7.42719 6.62265 7.47195 6.55141 7.49391 6.472C7.51587 6.39258 7.51407 6.30847 7.48873 6.23006C7.46339 6.15166 7.41563 6.0824 7.35135 6.03085C7.28707 5.9793 7.20908 5.94774 7.12705 5.94004ZM7.16642 6.45004L6.82142 6.75379C6.76437 6.80353 6.72186 6.86781 6.69842 6.93978C6.67498 7.01176 6.67148 7.08874 6.6883 7.16254L6.78955 7.60879C6.79549 7.63155 6.79437 7.65557 6.78633 7.67768C6.7783 7.69978 6.76372 7.71892 6.74455 7.73254C6.72543 7.74661 6.70256 7.75466 6.67884 7.75566C6.65513 7.75666 6.63166 7.75057 6.61142 7.73816L6.21767 7.50566C6.1527 7.46611 6.07811 7.4452 6.00205 7.4452C5.92599 7.4452 5.85139 7.46611 5.78642 7.50566L5.39267 7.73816C5.37259 7.75052 5.34929 7.75664 5.32572 7.75574C5.30216 7.75483 5.27939 7.74695 5.26031 7.73309C5.24123 7.71924 5.22669 7.70002 5.21855 7.67789C5.2104 7.65576 5.20901 7.63171 5.21455 7.60879L5.3158 7.16254C5.33262 7.08874 5.32912 7.01175 5.30568 6.93978C5.28224 6.86781 5.23973 6.80353 5.18267 6.75379L4.83767 6.45004C4.81977 6.43457 4.80685 6.41414 4.80054 6.39133C4.79424 6.36852 4.79484 6.34435 4.80226 6.32188C4.80969 6.29941 4.8236 6.27965 4.84225 6.26508C4.8609 6.25051 4.88345 6.2418 4.90705 6.24004L5.3608 6.19879C5.43667 6.19224 5.50934 6.16525 5.57109 6.12067C5.63283 6.0761 5.68133 6.01562 5.71142 5.94566L5.89142 5.52379C5.90066 5.5021 5.91608 5.4836 5.93575 5.4706C5.95541 5.4576 5.97847 5.45067 6.00205 5.45067C6.02562 5.45067 6.04868 5.4576 6.06835 5.4706C6.08802 5.4836 6.10343 5.5021 6.11267 5.52379L6.29267 5.94566C6.32277 6.01562 6.37127 6.0761 6.43301 6.12068C6.49475 6.16525 6.56743 6.19225 6.6433 6.19879L7.09705 6.24004C7.12065 6.2418 7.1432 6.25051 7.16185 6.26508C7.1805 6.27965 7.19441 6.29941 7.20183 6.32188C7.20926 6.34435 7.20986 6.36852 7.20355 6.39133C7.19725 6.41414 7.18433 6.43457 7.16642 6.45004Z" fill="#646464" />
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_2313_5649" x1="0.461426" y1="6.08655" x2="11.7114" y2="6.08655" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#78571B" />
                                        <stop offset="0.63" stop-color="#F3B54C" />
                                        <stop offset="0.985" stop-color="#DCA548" />
                                    </linearGradient>
                                    <clipPath id="clip0_2313_5649">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="flex font-normal text-sm -top-1">{levelName}</p>
                        </div>
                    </div>
                </div>

                <div className='min-w-[40%] px-4 text-white'>
                    <h1 className='text-[12px]'>LEVEL {level}</h1>
                    {/* level & rank bar  */}
                    <div className='relative mt-1'>
                        {/* Progress bar */}
                        <div className="absolute left-3 w-full border bg-gray-600 h-4 mt-1 overflow-hidden">
                            <div
                                className={`h-4 transition-all duration-300 ease-in-out`}
                                style={{
                                    width: `${levelPercentage || 0}%`,
                                    background: `#DB6704`,
                                }}
                            />
                        </div>
                        <div className='absolute -left-2 -top-[2px]'>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13.513" cy="15.2668" r="10.1346" fill="white" />
                                <path d="M13.7078 1.52661C11.2023 1.52661 8.753 2.26959 6.66971 3.6616C4.58643 5.05361 2.9627 7.03212 2.00387 9.34694C1.04504 11.6618 0.794166 14.2089 1.28297 16.6663C1.77178 19.1237 2.97832 21.381 4.75001 23.1527C6.5217 24.9244 8.77897 26.1309 11.2364 26.6197C13.6938 27.1085 16.2409 26.8577 18.5558 25.8988C20.8706 24.94 22.8491 23.3163 24.2411 21.233C25.6331 19.1497 26.3761 16.7004 26.3761 14.1949C26.372 10.8363 25.036 7.61645 22.6611 5.24158C20.2863 2.8667 17.0664 1.5307 13.7078 1.52661ZM11.2924 6.387C11.3366 6.33684 11.3951 6.30144 11.46 6.28558C11.525 6.26972 11.5932 6.27417 11.6556 6.29833L12.5339 6.61081L13.4671 5.65647C13.5321 5.59157 13.6202 5.55513 13.712 5.55513C13.8039 5.55513 13.892 5.59157 13.957 5.65647L14.8902 6.61081L15.7685 6.29833C15.8308 6.27392 15.8991 6.26934 15.9641 6.28521C16.0291 6.30108 16.0877 6.33663 16.1317 6.387C16.1768 6.43454 16.2072 6.49413 16.2192 6.55858C16.2312 6.62303 16.2243 6.68957 16.1993 6.75016L15.3167 8.7433C15.2903 8.80352 15.2473 8.85497 15.1927 8.89162C15.1381 8.92826 15.0742 8.94859 15.0084 8.95022H12.4157C12.3499 8.94859 12.286 8.92826 12.2314 8.89162C12.1768 8.85497 12.1338 8.80352 12.1074 8.7433L11.2291 6.75016C11.2023 6.69019 11.1941 6.62361 11.2053 6.55892C11.2166 6.49423 11.2469 6.43438 11.2924 6.387ZM6.51225 20.6979C6.48932 20.652 6.47739 20.6014 6.47739 20.5501C6.47739 20.4988 6.48932 20.4482 6.51225 20.4023C6.62015 20.1975 6.76306 20.0131 6.93452 19.8576C6.45148 19.7934 5.99541 19.5976 5.61629 19.2914C5.23717 18.9853 4.94962 18.5807 4.78514 18.122C4.77284 18.0724 4.77138 18.0207 4.78085 17.9704C4.79032 17.9201 4.81051 17.8725 4.84004 17.8307C5.06676 17.5598 5.35485 17.347 5.68037 17.2099C5.27211 17.0157 4.92151 16.7184 4.66309 16.3475C4.40466 15.9765 4.24734 15.5446 4.20662 15.0943C4.20571 15.0438 4.2167 14.9938 4.23871 14.9483C4.26072 14.9028 4.29312 14.8632 4.33331 14.8325C4.71015 14.5525 5.16453 14.3961 5.63392 14.3849C5.32037 14.0506 5.09969 13.6401 4.99376 13.1942C4.88784 12.7483 4.90035 12.2824 5.03006 11.8428C5.04953 11.7954 5.07935 11.753 5.11735 11.7187C5.15535 11.6843 5.20055 11.6589 5.24964 11.6443C5.69511 11.5323 6.16372 11.5544 6.5967 11.7077C6.41834 11.2696 6.36185 10.7913 6.43322 10.3237C6.50459 9.85612 6.70116 9.41653 7.00209 9.05156C7.03827 9.01527 7.08199 8.98737 7.13016 8.96986C7.17832 8.95234 7.22975 8.94563 7.28079 8.9502C7.60262 8.99734 7.90988 9.11564 8.18024 9.29648C8.10845 7.74673 9.07549 6.8684 9.36683 7.00775C10.4647 7.35824 11.0855 8.54906 11.1193 9.7272C10.0044 10.2242 9.05539 11.0304 8.38485 12.0504C7.71431 13.0703 7.35034 14.2612 7.33612 15.4817C7.32189 16.7023 7.65801 17.9013 8.3046 18.9366C8.95119 19.9719 9.88114 20.8001 10.9841 21.3229C9.72577 22.3786 7.28501 22.1886 6.51225 20.6979ZM8.01555 15.5546C8.01513 14.4257 8.34954 13.322 8.97648 12.3831C9.60342 11.4443 10.4947 10.7125 11.5376 10.2803C12.5805 9.84805 13.7282 9.73486 14.8355 9.955C15.9427 10.1751 16.9598 10.7187 17.7581 11.517C18.5564 12.3153 19.1 13.3324 19.3201 14.4396C19.5402 15.5469 19.427 16.6946 18.9948 17.7375C18.5626 18.7804 17.8308 19.6717 16.892 20.2986C15.9531 20.9256 14.8494 21.26 13.7205 21.2596C12.2079 21.2579 10.7578 20.6563 9.68829 19.5868C8.61876 18.5173 8.01718 17.0672 8.01555 15.5546ZM22.5841 17.8307C22.6136 17.8725 22.6338 17.9201 22.6432 17.9704C22.6527 18.0207 22.6513 18.0724 22.639 18.122C22.4745 18.5807 22.1869 18.9853 21.8078 19.2914C21.4287 19.5976 20.9726 19.7934 20.4896 19.8576C20.661 20.0132 20.8039 20.1975 20.9118 20.4023C20.9348 20.4482 20.9467 20.4988 20.9467 20.5501C20.9467 20.6014 20.9348 20.652 20.9118 20.6979C20.1264 22.197 17.6983 22.3659 16.4442 21.3271C17.5526 20.8057 18.4876 19.9763 19.1375 18.9379C19.7873 17.8995 20.1246 16.696 20.109 15.4711C20.0934 14.2463 19.7256 13.0518 19.0496 12.0302C18.3735 11.0087 17.4177 10.2034 16.2964 9.71031C16.3012 9.5458 16.3196 9.38197 16.3513 9.22047C16.668 7.42158 17.9981 7.02464 18.0573 7.00775C18.3529 6.87684 19.3156 7.73829 19.2439 9.29648C19.5142 9.11565 19.8215 8.99736 20.1433 8.95022C20.1944 8.94565 20.2458 8.95237 20.2939 8.96988C20.3421 8.9874 20.3858 9.01529 20.422 9.05158C20.7229 9.41655 20.9195 9.85614 20.9909 10.3238C21.0622 10.7914 21.0058 11.2696 20.8274 11.7077C21.2604 11.5544 21.729 11.5324 22.1745 11.6444C22.2235 11.659 22.2687 11.6844 22.3067 11.7187C22.3447 11.753 22.3746 11.7955 22.394 11.8428C22.525 12.2823 22.5382 12.7485 22.4322 13.1947C22.3262 13.6408 22.1048 14.0513 21.7902 14.3849C22.2598 14.395 22.7145 14.5515 23.0908 14.8325C23.3822 14.993 23.209 16.3907 21.7438 17.2099C22.0693 17.3471 22.3573 17.5599 22.5841 17.8307Z" fill="url(#paint0_linear_2313_5645)" />
                                <path d="M16.0506 13.8651L15.0203 13.7722C14.9715 13.7677 14.9249 13.75 14.8855 13.721C14.846 13.692 14.8153 13.6527 14.7965 13.6075L14.3911 12.6616C14.3182 12.4901 14.1965 12.3437 14.0411 12.2409C13.8856 12.138 13.7034 12.0831 13.517 12.0831C13.3306 12.0831 13.1483 12.138 12.9929 12.2409C12.8374 12.3437 12.7157 12.4901 12.6429 12.6616L12.2375 13.6075C12.2187 13.6527 12.1879 13.692 12.1485 13.721C12.109 13.75 12.0624 13.7677 12.0137 13.7722L10.9875 13.8651C10.8038 13.8841 10.6294 13.956 10.4857 14.0721C10.342 14.1882 10.235 14.3435 10.1778 14.5191C10.1206 14.6948 10.1156 14.8833 10.1634 15.0618C10.2111 15.2403 10.3097 15.401 10.447 15.5246L11.224 16.2045C11.26 16.2377 11.2867 16.2796 11.3015 16.3263C11.3164 16.373 11.3187 16.4227 11.3085 16.4705L11.0804 17.4755C11.0502 17.6144 11.0512 17.7583 11.0835 17.8967C11.1157 18.0352 11.1784 18.1647 11.267 18.2759C11.3555 18.387 11.4677 18.4771 11.5954 18.5396C11.7231 18.602 11.8631 18.6352 12.0052 18.6368C12.3684 18.6748 13.0736 18.1258 13.3776 17.9696C13.4199 17.9447 13.468 17.9316 13.517 17.9316C13.566 17.9316 13.6141 17.9447 13.6563 17.9696L14.5431 18.5017C14.703 18.5939 14.8862 18.6379 15.0705 18.6281C15.2548 18.6184 15.4324 18.5554 15.5817 18.4468C15.7309 18.3382 15.8455 18.1886 15.9115 18.0163C15.9775 17.8439 15.9921 17.656 15.9535 17.4755L15.7255 16.4705C15.7152 16.4227 15.7176 16.373 15.7324 16.3263C15.7472 16.2796 15.7739 16.2377 15.8099 16.2045L16.5869 15.5246C16.7266 15.4024 16.8274 15.242 16.8768 15.0631C16.9263 14.8843 16.9222 14.6949 16.8652 14.5183C16.8081 14.3417 16.7006 14.1857 16.5558 14.0696C16.411 13.9535 16.2354 13.8824 16.0506 13.8651ZM16.1393 15.0137L15.3623 15.6978C15.2338 15.8098 15.1381 15.9546 15.0853 16.1167C15.0325 16.2788 15.0246 16.4521 15.0625 16.6183L15.2905 17.6234C15.3039 17.6746 15.3014 17.7287 15.2833 17.7785C15.2652 17.8283 15.2324 17.8714 15.1892 17.9021C15.1461 17.9337 15.0946 17.9519 15.0412 17.9541C14.9878 17.9564 14.9349 17.9427 14.8894 17.9147L14.0026 17.3911C13.8563 17.302 13.6883 17.2549 13.517 17.2549C13.3457 17.2549 13.1777 17.302 13.0314 17.3911L12.1446 17.9147C12.0993 17.9426 12.0469 17.9563 11.9938 17.9543C11.9407 17.9523 11.8895 17.9345 11.8465 17.9033C11.8035 17.8721 11.7708 17.8288 11.7524 17.779C11.7341 17.7291 11.7309 17.675 11.7434 17.6234L11.9714 16.6183C12.0093 16.4521 12.0015 16.2787 11.9487 16.1167C11.8959 15.9546 11.8001 15.8098 11.6716 15.6978L10.8946 15.0137C10.8543 14.9788 10.8252 14.9328 10.811 14.8815C10.7968 14.8301 10.7982 14.7757 10.8149 14.7251C10.8316 14.6745 10.863 14.6299 10.905 14.5971C10.947 14.5643 10.9977 14.5447 11.0509 14.5407L12.0728 14.4478C12.2437 14.4331 12.4073 14.3723 12.5464 14.2719C12.6854 14.1715 12.7947 14.0353 12.8624 13.8778L13.2678 12.9276C13.2886 12.8788 13.3234 12.8371 13.3677 12.8079C13.412 12.7786 13.4639 12.763 13.517 12.763C13.5701 12.763 13.622 12.7786 13.6663 12.8079C13.7106 12.8371 13.7453 12.8788 13.7661 12.9276L14.1715 13.8778C14.2393 14.0353 14.3485 14.1715 14.4876 14.2719C14.6266 14.3723 14.7903 14.4331 14.9612 14.4478L15.9831 14.5407C16.0362 14.5447 16.087 14.5643 16.129 14.5971C16.171 14.6299 16.2023 14.6745 16.2191 14.7251C16.2358 14.7757 16.2371 14.8301 16.2229 14.8815C16.2087 14.9328 16.1796 14.9788 16.1393 15.0137Z" fill="#646464" />
                                <defs>
                                    <linearGradient id="paint0_linear_2313_5645" x1="1.03955" y1="14.1949" x2="26.3761" y2="14.1949" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#38B1DE" />
                                        <stop offset="0.63" stop-color="#61C3E8" />
                                        <stop offset="0.985" stop-color="#1C54AE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* slider ( levels page / skins page) */}

            <div className='w-full h-[8vh] flex justify-center items-end text-white'>
                <button
                    onClick={() => {
                        setPage('level');
                    }}
                    className={`w-1/2 h-[5vh] ${page === 'level' && 'custom-orange-border'}`}
                >
                    LEVELS
                </button>
                <button
                    onClick={() => {
                        setPage('skin');
                    }}
                    className={`w-1/2 h-[5vh] ${page === 'skin' && 'custom-orange-border'}`}
                >
                    SKINS
                </button>
            </div>

            {/* Levels Page */}
            {page === 'level' ? (
                <>
                    <div className='relative w-full h-[74vh] z-0 flex justify-center items-center mt-2'>
                        <img src={LevelsBackground} alt="leaderboard_bg" className='absolute top-0 w-full h-full object-fit object-center z-20' />
                        <div className="w-[90%] h-[74vh] absolute z-10 pb-12 pt-12 overflow-y-scroll text-white">
                            {levelsData.map((lev, index) => {
                                return (
                                    <>
                                        {/* Completed Level */}
                                        {index + 1 < level && (
                                            <div
                                                key={index}
                                                className="relative w-full h-[8vh] mt-3 p-2 rounded-xl bg-[##2b2c3f] flex justify-start items-center"
                                                style={{
                                                    border: "2px solid transparent",
                                                    borderImage: "linear-gradient(to right, black 10%, #A9A9A9 50%, black 100%)",
                                                    borderImageSlice: 1,
                                                    boxSizing: "border-box",
                                                    padding: "6px",
                                                }}
                                            >
                                                <img src={LevelUp} alt="levelup" className="absolute z-10 -top-1 -right-1" />
                                                <div className="relative w-[20%] h-full">
                                                    <img src={stickerMapping[index]} alt="sticker" width={40} className="absolute -top-1 left-3" />
                                                </div>
                                                <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                                                    <div className="w-full h-1/2 flex justify-center items-center gap-1">
                                                        <h1 className="text-white font-bold">{lev.name}</h1>
                                                        <img src={pandaMapping[index]} alt="panda" width={18} />
                                                    </div>
                                                    <div
                                                        className="relative z-0 w-[85%] h-full"
                                                        style={{
                                                            background: "radial-gradient(circle, #0575B7, #023451)"
                                                        }}
                                                    >
                                                        <div className="w-full h-full absolute top-0 z-10 flex justify-between items-center p-2 text-[12px]">
                                                            <p>LEVEL {index + 1}</p>
                                                            <p className="flex justify-end items-center gap-1">
                                                                <img src={SmallCoin} alt="smallcoin" width={15} />
                                                                {formatNumber(levelsData[index].rangeFrom)}-
                                                                {levelsData[index].rangeTo !== "max" ? formatNumber(levelsData[index].rangeTo) : "MAX"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div >
                                        )}

                                        {/* Current Level */}
                                        {index + 1 === level && (
                                            <div
                                                key={index}
                                                className="relative w-full h-[8vh] mt-3 p-2 rounded-xl flex justify-start items-center shadow-[#0199FF] shadow-md bg-[#999da6]"
                                                style={{
                                                    border: "2px solid transparent",
                                                    borderImage: "linear-gradient(to right, black 10%, #A9A9A9 50%, black 100%)",
                                                    borderImageSlice: 1,
                                                    boxSizing: "border-box",
                                                    padding: "6px",
                                                }}
                                            >
                                                <div className="relative w-[20%] h-full">
                                                    <img src={stickerMapping[index]} alt="sticker" width={40} className="absolute -top-1 left-3" />
                                                </div>
                                                <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                                                    <div className="w-full h-1/2 flex justify-center items-center gap-1">
                                                        <h1 className="font-bold text-black">{lev.name}</h1>
                                                        <img src={pandaMapping[index]} alt="panda" width={18} />
                                                    </div>
                                                    <div className="relative z-0 w-[85%] h-full bg-black">
                                                        <div className="w-full h-full absolute top-0 z-10 flex justify-between items-center p-2 text-[12px]">
                                                            <p>LEVEL {index + 1}</p>
                                                            <p className="flex justify-end items-center gap-1">
                                                                <img src={SmallCoin} alt="smallcoin" width={15} />
                                                                {formatNumber(levelsData[index].rangeFrom)}-
                                                                {levelsData[index].rangeTo !== "max" ? formatNumber(levelsData[index].rangeTo) : "MAX"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Next Level */}
                                        {index + 1 > level && (
                                            <div
                                                key={index}
                                                className="relative w-full h-[8vh] mt-3 p-2 rounded-xl bg-[#484a59] flex justify-start items-center"
                                                style={{
                                                    border: "2px solid transparent",
                                                    borderImage: "linear-gradient(to right, black 10%, #A9A9A9 50%, black 100%)",
                                                    borderImageSlice: 1,
                                                    boxSizing: "border-box",
                                                    padding: "6px",
                                                }}
                                            >
                                                <img src={Lock} alt="lock" className="absolute right-4 top-2 z-10" />
                                                <div className="relative w-[20%] h-full">
                                                    <img src={stickerMapping[index]} alt="sticker" width={40} className="absolute -top-1 left-3" />
                                                </div>
                                                <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                                                    <div className="w-full h-1/2 flex justify-center items-center gap-1">
                                                        <h1 className="font-bold text-white">{lev.name}</h1>
                                                        <img src={pandaMapping[index]} alt="panda" width={18} />
                                                    </div>
                                                    <div className="relative z-0 w-[85%] h-full bg-black">
                                                        <div className="w-full h-full absolute top-0 z-10 flex justify-between items-center p-2 text-[12px]">
                                                            <p>LEVEL {index + 1}</p>
                                                            <p className="flex justify-end items-center gap-1">
                                                                <img src={SmallCoin} alt="smallcoin" width={15} />
                                                                {formatNumber(levelsData[index].rangeFrom)}-
                                                                {levelsData[index].rangeTo !== "max" ? formatNumber(levelsData[index].rangeTo) : "MAX"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='relative w-full h-[74vh] z-0 flex flex-col justify-center items-center -mt-2 text-white'>
                        <div className='relative w-[100vw] h-[70%]'>
                            <div className='w-full h-full absolute z-0'>
                                <img src={backgroundMapping[skinPage]} alt="bg_img" className='w-full h-full object-cover' />
                            </div>
                            <div className='w-full h-full absolute z-10 flex flex-col justify-start items-center'>
                                <div className='relative w-[80%] h-[20%]'>
                                    <div className='w-full h-full absolute z-10'>
                                        <img src={TitleBackground} alt="title_bg" className='w-full h-full' />
                                    </div>
                                    <div className='w-full h-full absolute z-20 flex justify-center items-center text-center elastic-stretch-text text-[25px]'>
                                        {levelsData[skinPage].name}
                                    </div>
                                </div>
                                <div className='w-full h-[65%] pb-2 flex justify-center items-center'>
                                    <img src={pandaMapping[skinPage]} alt="panda_img" className='object-cover' width={200} />
                                </div>
                                <div className='w-full h-[12vh] bg-black bg-opacity-70 flex justify-center items-center'>
                                    <div className='w-[45%] h-full flex flex-col justify-center items-center'>
                                        <h1 className='w-full h-[30%] text-center'>LEVEL {levelsData[skinPage].id}</h1>
                                        <div className='w-full h-[50%] flex justify-center items-center gap-1'>
                                            <img src={pandaMapping[skinPage]} alt="small_panda" width={15} />
                                            <div className='flex justify-center items-center bg-[#14141E] w-24 h-4 border border-gray-500 rounded-[4px] text-[10px]'>
                                                <img src={SmallCoin} alt="small_coin" width={10} />
                                                +{levelsData[skinPage].rangeFrom}
                                            </div>
                                        </div>
                                    </div>
                                    <img src={VerticalLine} alt="vertical_line" />
                                    <div className='w-[45%] h-full flex justify-center items-center'>
                                        <button
                                            onClick={() => {
                                                handleBuyAndUpgradeLevel(skinPage)
                                            }}
                                            disabled={skinPage <= (level - 1)}
                                            className={`w-[65%] h-6 bg-gradient-to-t from-[#0B0D79] to-[#09729F] rounded-[8px] border border-gray-500 text-sm ${skinPage <= (level - 1) && 'text-gray-300'} `}
                                        >
                                            {skinPage <= (level - 1) ? (
                                                <>
                                                    Equipped
                                                </>
                                            ) : (
                                                <>
                                                    {buttonLoading ? (
                                                        <span className="flex justify-center items-center font-semibold text-5xl w-full">
                                                            <p className="absolute -mt-6">
                                                                {dots}
                                                            </p>
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <div className='flex justify-center items-center'>
                                                                <img src={TonCoin} alt="tonCoin" />
                                                                {levelsData[skinPage].tonPrice}
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-24 flex items-center px-3 py-2 text-white overflow-y-hidden overflow-x-auto gap-2">
                            {levelsData.map((lev, index) => {
                                return (
                                    <>
                                        {index === skinPage ? (
                                            <div
                                                onClick={() => {
                                                    setSkinPage(index);
                                                }}
                                                key={index}
                                                style={{
                                                    backgroundImage: `url(${DaiyCurrentDayBg})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                                className={`relative z-0 min-w-[70px] h-full flex items-center justify-center text-center rounded-xl shadow-[0_0_5px_0px_rgba(0,0,0,0.2)] shadow-[#2174FF] border-2 border-[#2174FF]`}
                                            >
                                                {index > (level - 1) && (
                                                    <img src={LockIcon} alt="lock_icon" className='absolute top-2 right-1 z-30' />
                                                )}
                                                <div className='w-full h-4 border-white absolute -top-1.5'>
                                                    <div
                                                        style={{
                                                            background: `linear-gradient(to right, ${colorMapping[index].from}, ${colorMapping[index].to || colorMapping[index].from})`
                                                        }}
                                                        className='w-[80%] h-full flex justify-center items-center text-[12px] mx-auto rounded-md'
                                                    >
                                                        {`level ${index + 1}`}
                                                    </div>
                                                </div>
                                                <div className='w-full h-full absolute z-10 flex justify-center items-center'>
                                                    <img src={PandaBgBrown} alt="bg-brown" width={50} />
                                                </div>
                                                <div className='w-full h-full absolute z-10 flex flex-col justify-center items-center'>
                                                    <img src={pandaMapping[index]} alt="panda" width={35} />
                                                    <h1 className='absolute bottom-0.5 text-[8px]'>{levelsData[index].name}</h1>
                                                </div>
                                            </div >
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    setSkinPage(index);
                                                }}
                                                key={index}
                                                className={`relative z-0 min-w-[70px] h-full flex items-center justify-center text-center rounded-xl custom-gray-border `}
                                            >
                                                {index > (level - 1) && (
                                                    <img src={LockIcon} alt="lock_icon" className='absolute top-2 right-1 z-30' />
                                                )}
                                                <div className='w-full h-4 border-white absolute -top-1.5'>
                                                    <div
                                                        style={{
                                                            background: `linear-gradient(to right, ${colorMapping[index].from}, ${colorMapping[index].to || colorMapping[index].from})`
                                                        }}
                                                        className='w-[80%] h-full flex justify-center items-center text-[12px] mx-auto rounded-md'
                                                    >
                                                        {`level ${index + 1}`}
                                                    </div>
                                                </div>
                                                <div className='w-full h-full absolute z-10 flex justify-center items-center'>
                                                    <img src={PandaBgBrown} alt="bg-brown" width={50} />
                                                </div>
                                                <div className='w-full h-full absolute z-10 flex flex-col justify-center items-center'>
                                                    <img src={pandaMapping[index]} alt="panda" width={35} />
                                                    <h1 className='absolute bottom-0.5 text-[8px]'>{levelsData[index].name}</h1>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </>
            )
            }

        </div >
    )
}

export default Levels;
