import React, { useEffect, useState } from "react";
import Current from "./Current";
import TGE from "./TGE";
import MissedProjects from "./MissedProjects";

const LaunchPad = () => {
	const [activeSubItem, setActiveSubItem] = useState(null);

	const handleSubClick = (subItem) => {
		setActiveSubItem(subItem);
	};

	// Selects Current by default
	useEffect(()=> {
		setActiveSubItem("Current");
	},[])


	return (
		<>
			<div className='flex justify-evenly items-center px-3'>
				{/* Current Button */}
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "Current"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("Current")}>
					<p className="text-xs">Current</p>
				</div>
				{/* TGE Button */}
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "TGE"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("TGE")}>
					<p className="text-xs">TGE</p>
				</div>
				{/* Missed Projects */}
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "Missed Projects"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("Missed Projects")}>
					<p className="text-xs">Missed Projects</p>
				</div>
			</div>
			<div className='mt-3'>
				{activeSubItem === "Current" && <Current />}
				{activeSubItem === "TGE" && <TGE />}
				{activeSubItem === "Missed Projects" && <MissedProjects />}
			</div>
		</>
	);
};

export default LaunchPad;
