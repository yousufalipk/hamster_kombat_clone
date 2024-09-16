import React, { useState } from "react";
import Current from "./Current";
import TGE from "./TGE";
import MissedProjects from "./MissedProjects";

const LaunchPad = () => {
	const [activeSubItem, setActiveSubItem] = useState(null);

	const handleSubClick = (subItem) => {
		setActiveSubItem(subItem);
	};

	return (
		<>
			<div className='flex justify-evenly items-center px-3'>
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "Current"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("Current")}>
					<p>Current</p>
				</div>
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "TGE"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("TGE")}>
					<p>TGE</p>
				</div>
				<div
					className={`w-fit px-3 py-1 text-base font-medium cursor-pointer ${
						activeSubItem === "Missed Projects"
							? "text-[#FFF] pb-1 border-2 border-b-[#0072FF] border-t-0 border-r-0 border-l-0"
							: "text-[#BDBDBD]"
					}`}
					onClick={() => handleSubClick("Missed Projects")}>
					<p>Missed Projects</p>
				</div>
			</div>
			<div className='mt-6'>
				{activeSubItem === "Current" && <Current />}
				{activeSubItem === "TGE" && <TGE />}
				{activeSubItem === "Missed Projects" && <MissedProjects />}
			</div>
		</>
	);
};

export default LaunchPad;
