{
    energyRefillPopup && (
        <>
            <div
                style={{
                    animation: `${popupClosing ? "fadeOut" : "fadeIn"
                        } 0.5s ease-in-out forwards`,
                }}
                className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end">
                <div
                    style={{
                        animation: `${popupClosing ? "closePopup" : "openPopup"
                            } 0.5s ease-in-out forwards`,
                    }}
                >
                    <div className="relative bg-[#06060E] w-[100vw] h-[40vh] rounded-t-3xl p-4 text-white">
                        <div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
                        <div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
                        <div className="flex flex-col gap-3">
                            {/* Left top ellipse */}
                            <div className="-left-10 -top-20 w-52 h-52 absolute">
                                <img src={LeftPopupEllipse} alt="popup-ellipse" />
                            </div>
                            {/* Right bottom ellipse */}
                            <div className="-right-10 -bottom-5 w-52 h-52 absolute">
                                <img src={RightPopupEllipse} alt="popup-ellipse" />
                            </div>
                            <h1 className="border-2 border-gray-200 w-[20vw] mx-auto absolute top-2 left-[40%]"></h1>
                            <div className="relative h-[15vh] flex justify-center flex-col items-center gap-2">
                                <img src={LargeBooster2Img} alt="tap_booster" className="absolute -top-20" width={210} />
                                <h1 className="text-2xl text-center absolute bottom-3">
                                    Energy Refill
                                </h1>
                            </div>
                            <div className="text-center text-gray-200 text-xs flex flex-col gap-4">
                                <p>Refill energy to maximum</p>
                            </div>
                            <img src={PopupHorizontalLine} alt="popup_horizontal_line" />
                            <div className="flex justify-center items-center gap-1">
                                <img src={BigCoin} alt="big_coin" width={25} />
                                <p className="text-customOrange text-2xl">Free</p>
                            </div>
                            {/* action buttons */}
                            <div className='flex gap-4 justify-center mt-2'>
                                <div className="absolute top-4 right-5">
                                    <button onClick={() => {
                                        setPopupClosing(true);
                                        setTimeout(() => {
                                            setEnergyRefillPopup(false);
                                            setPopupClosing(false);
                                        }, 500);
                                    }}>
                                        <img src={CrossImg} alt="" width={25} />
                                    </button>
                                </div>
                                <button
                                    className={`w-full h-12 z-50 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg ${avaliableUnlimitedTaps === 0 && `grayscale`}`}
                                    onClick={() => {
                                        // Upgrade energy limit
                                        handleEnergyRefill()
                                    }}
                                    disabled={avaliableEnergyRefill === 0 || buttonLoading}
                                >
                                    {buttonLoading ? (
                                        <span className="flex justify-center items-center text-5xl font-bold w-full">
                                            <p className="absolute -mt-6">
                                                {dots}
                                            </p>
                                        </span>
                                    ) : (
                                        avaliableEnergyRefill === 0 ? (
                                            'Come back tomorrow'
                                        ) : (
                                            'Refill'
                                        )
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
