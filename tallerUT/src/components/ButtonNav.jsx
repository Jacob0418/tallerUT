import React from "react";

function ButtonNav(indicator) {
    return (
        <button className="bg-white text-red-500 py-2 px-6 rounded-[5px_5px_5px_5px] md:ml-8 hover:-translate-y-1 duration-200">
            {indicator.children}
        </button>
    )
}

export default ButtonNav;