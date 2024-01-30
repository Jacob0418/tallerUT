import React, { useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import ButtonNav from "./ButtonNav";
import { Link } from "react-router-dom";

function Navbar() {

    let Links = [
        {name: "Servicios", link: "/Servicios"},
        {name: "Trabajos", link: "/Trabajos"}
    ]

    let [open, setOpen] = useState(false);   

    return (
            <header>
                <div className="shadow-md w-full top-0 left-0 sticky">
                    <div className="md:flex items-center justify-between bg-red-500 py-4 md:px-10 px-7">
                        <div className=" font-bold text-2xl cursor-pointer flex items-center text-white" >
                            <span className="text-3xl mr-1 pt-1">
                                <IoCarSportOutline />
                            </span>
                            <Link to="/">TALLER UT</Link>
                        </div>
                        <div onClick={() => setOpen (!open)} className=" text-3xl absolute right-8 top-6 -m-2 cursor-pointer md:hidden text-white">
                            <RxHamburgerMenu name={open ? <IoClose /> : <RxHamburgerMenu/>}/>
                        </div>
                        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-red-500 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${open ? 'top-20' : 'top-[-490px]'} md:opacity-100`}>
                            {
                                Links.map((link) => (
                                    <li key={link.link} className="md:ml-8 text-xl md:my-0 my-7">
                                        <a href={link.link} className="text-white hover:bg-white hover:text-red-500 duration-200 rounded-[5px_5px_5px_5px] hover:p-1">{link.name}</a>
                                    </li>
                                ))
                            }
                            <Link to={'/login'}><ButtonNav>
                                Log In
                            </ButtonNav></Link> 
                        </ul>
                    </div>
                </div>
            </header>
    )
}

export default Navbar;