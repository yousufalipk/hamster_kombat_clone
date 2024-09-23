import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GamePlay = () => {

	const navigate = useNavigate();

	useEffect(() => {
		const tg = window.Telegram.WebApp;

		tg.BackButton.show();
		tg.BackButton.onClick(() => {
			navigate("/");
		});

		return () => {
			tg.BackButton.hide();
			tg.BackButton.offClick();
		};
	}, [navigate]);

    return (
        <>
			<div className='h-[100vh] bg-custom-image3 bg-cover flex justify-center items-center overflow-hidden'>
				<h1 className="text-white text-3xl">Gameplay!</h1>
			</div>
		</>
    )
}

export default GamePlay;
