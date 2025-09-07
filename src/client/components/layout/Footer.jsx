import Shneta from "../../assets/images/Shneta.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
        <div className="bg-[#E0FFF7] pt-15 pb-10 border-t-1 border-t-solid border-t-[#7ED957]">
            <div className="mb-15 flex flex-col md:flex-row md:justify-evenly px-10 md:px-5 md:items-start gap-10">

                <div>
                    <img className="w-60 self-center" src={Shneta} alt="Shneta-logo" />
                </div>

                <div>
                    <h1 className="mb-7 font-bold text-[#2BA771]">Navigation</h1>
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Home</Link>
                        <Link to="/services" className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Services</Link>
                        <Link to="/about" className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">About us</Link>
                    </div>
                </div>

                <div>
                <h1 className="mb-7 font-bold text-[#2BA771]">Legal</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Privacy Policy</p>
                        <p className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Terms and Conditions</p>
                        <p className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Cookie Policy</p>
                    </div>
                </div>

                <div>
                <h1 className="mb-7 font-bold text-[#2BA771]">Contact</h1>
                    <div className="flex flex-col gap-2">
                        <a href="mailto:support@shneta.com" className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Email: support@shneta.com</a>
                        <a href="tel:+38344123456" className="text-[#7ED957] hover:text-[#6bc348] transition-colors duration-200 cursor-pointer">Phone: (+383) 44 123 456</a>
                        <p className="text-[#7ED957]">Address: 1234 Pharma, Prishtine, Kosove</p>
                    </div>
                </div>

            </div>

            <h1 className="text-[#2BA771] font-bold text-left md:text-center px-10 md:px-0">© 2025 Shneta. All Rights Reserved.</h1>
        </div>

        </>
    )
}