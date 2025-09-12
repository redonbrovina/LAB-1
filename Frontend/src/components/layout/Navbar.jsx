import Shneta from "../../assets/images/Shneta.png";
import menu from "../../assets/images/icons8-menu-50.png";
import {useState} from 'react'
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <>  
            <div className="bg-white flex justify-around md:justify-evenly py-3 w-full fixed top-0 left-0 z-30 shadow-lg">
                <div className="flex flex-row items-center justify-evenly md:w-1/3">
                    <Link to="/"><img className="w-36" src={Shneta} alt="Shneta Logo" /></Link>
                    <NavLink to="/services" className="hidden md:flex text-[#808080] text-sm hover:text-[#4a4a4a] duration-75 ease-in-out cursor-pointer">Services</NavLink>
                    <NavLink to="/about" className="hidden md:flex text-[#808080] text-sm hover:text-[#4a4a4a] duration-75 ease-in-out cursor-pointer">About Us</NavLink>
                </div>
                <div className="items-center gap-16 hidden md:flex md:px-20">
                    <NavLink to="/login"><button className="text-[#7ED957] wrap-normal py-2 px-5 text-sm border-1 border-solid border-color[#7ED957] rounded-3xl cursor-pointer hover:bg-[#7ED957] hover:text-white duration-200 ease-in-out">Sign in</button></NavLink>
                    <NavLink to="/signup"><button className="bg-[#7ED957] wrap-normal text-white text-sm py-2 px-8 rounded-3xl cursor-pointer border-1 border-solid border-color[#7ED957] hover:bg-white hover:text-[#7ED957] duration-200 ease-in-out">Join Us</button></NavLink>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="text-[#808080] hover:text-[#4a4a4a] cursor-pointer" onClick={handleClick}>
                        <img src={menu} alt="menu-btn" className="w-8 h-8"/>
                    </button>
                </div>
            </div>
            <div className={`sm:hidden ${menuOpen ? "flex" : "hidden"} 
                            w-full pt-20 z-20 bg-white justify-center flex-row items-center gap-4 fixed shadow-lg`}>
                <NavLink to="/services" className="flex text-[#808080] text-sm hover:text-[#4a4a4a] duration-75 ease-in-out cursor-pointer mb-5">Services</NavLink> 
                <NavLink to="/about" className="flex text-[#808080] text-sm hover:text-[#4a4a4a] duration-75 ease-in-out cursor-pointer mb-5">About Us</NavLink>
                <NavLink to="/login"><button className="text-[#7ED957] py-2 px-5 text-sm border-1 border-solid border-color[#7ED957] rounded-3xl cursor-pointer hover:bg-[#7ED957] hover:text-white duration-200 ease-in-out mb-5">Sign in</button></NavLink>
                <NavLink to="/signup"><button className="bg-[#7ED957] text-white text-sm py-2 px-8 rounded-3xl cursor-pointer border-1 border-solid border-color[#7ED957] hover:bg-white hover:text-[#7ED957] duration-200 ease-in-out mb-5">Join Us</button></NavLink>
            </div>
        </>
    )

}