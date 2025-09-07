import {useRef} from "react"; 
import {Link} from "react-router-dom"
import homepage from "../assets/images/homepage-background.png";
import first from "../assets/images/material-symbols_store.png";
import second from "../assets/images/bxs_zap.png";
import third from "../assets/images/material-symbols_lock-outline.png";
import fourth from "../assets/images/material-symbols_star.png";
import walgreens from "../assets/images/walgreens_logo.png";
import cvs from "../assets/images/channels4_profile.png";
import pharmaprix from "../assets/images/pharmaprix.png";
import watsons from "../assets/images/logo_watsons_mobile.png";
import apothek from "../assets/images/apothek.png";
import riteaid from "../assets/images/riteiad.png";
import boots from "../assets/images/channels4_profile_boots.png";
import teamwork from "../assets/images/pexels-cottonbro-8657290(1).png"

export default function Home() {

    const sectionRef = useRef(null);

    const handleScroll = () => {
        const top = sectionRef.current.offsetTop;
        window.scrollTo({behavior: 'smooth', top: top-100});
    }

    return (
        <>
            <div className="relative h-screen w-full">
                <div
                    style={{backgroundImage:`url(${homepage})`}}
                    className="h-full absolute inset-0 z-0 flex items-center justify-center bg-cover bg-center">
                </div>
                <div className="relative z-10 flex h-full flex-col items-center pt-[12rem] gap-6">
                    <h1 className="text-4xl/10 md:text-6xl/20 font-extrabold w-4/5 md:w-1/2 text-center">The Future of Pharma is Here.</h1>
                    <h4 className="w-11/12 md:w-2/5 text-center font-semibold md:text-xl">Streamline your pharmaceutical supply chain with real-time inventory insights, seamless ordering, 
                                    and trusted B2B connections — all in one powerful platform.</h4>
                    <button onClick={handleScroll} className="bg-[#2BA771] px-6 py-3 text-white rounded-full text-sm cursor-pointer hover:bg-white hover:text-[#2BA771] duration-150 ease-in-out">Find out more</button>
                </div>
            </div>
            
            <section ref={sectionRef} className="mt-40">
                <h1 className="text-[#2BA771] mb-20 text-center text-4xl font-bold">Why Shneta?</h1>
                <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-3 md:justify-evenly items-center w-full mb-20 flex-wrap">
                    <div>
                        <div className="circled bg-[#16A34A]">
                            <img className="w-24 h-24" src={first} alt="store icon" />
                        </div>
                        <div>
                            <h1 className="mid-title">Trusted by  50+ pharmacies</h1>
                            <p className="mid-text">50+ pharmacies trust us to power their daily operations. Join the network.</p>
                        </div>
                    </div>
                    
                    <div>
                        <div className="circled bg-[#1A7431]">
                            <img className="w-24 h-24" src={second} alt="lighting zap icon" />
                        </div>
                        <div>
                            <h1 className="mid-title">2.5x Faster Procurement</h1>
                            <p className="mid-text">Accelerate your supply chain with 2.5x faster procurement speeds.</p>
                        </div>
                    </div>
                    
                    <div>
                        <div className="circled bg-[#4AD66D]">
                            <img className="w-24 h-24" src={third} alt="lock icon" />
                        </div>
                        <div>
                            <h1 className="mid-title">Secure Data Handling</h1>
                            <p className="mid-text">Secure data handling with enterprise-grade protection.</p>
                        </div>
                    </div>

                    <div>
                        <div className="circled bg-[#A7F3D0]">
                            <img className="w-24 h-24" src={fourth} alt="star icon" />
                        </div>
                        <div>
                            <h1 className="mid-title">4.9/5 Average Rating</h1>
                            <p className="mid-text">Rated 4.9 out of 5 by pharmacy partners worldwide.</p>
                        </div>
                    </div>
                </div>    
            </section>
            
            <h1 className="text-[#2BA771] text-4xl font-bold text-center mt-40">Our Partners</h1>
            <div className="w-full bg-[#7ED957] my-10 py-10 flex items-center justify-center md:justify-evenly flex-wrap gap-10">
                <img className="w-20 h-20" src={walgreens} alt="walgreens-logo" />
                <img className="w-20 h-20" src={cvs} alt="cvs-logo" />
                <img className="w-20 h-20" src={pharmaprix} alt="pharmaprix-logo" />
                <img className="w-20 h-20" src={watsons} alt="watsons-logo" />
                <img className="w-20 h-20" src={apothek} alt="apothek-logo" />
                <img className="w-20 h-20" src={riteaid} alt="riteaid-logo" />
                <img className="w-20 h-20" src={boots} alt="boots-logo" />
            </div>
            <p className="text-sm md:text-base text-center italic px-3">Want to become a partner? Let's work together to drive innovation in the pharmaceutical space. <a className="text-[#2BA771] font-bold cursor-pointer underline hover:text-[#1f8b54] transition-colors duration-200"> Get in touch with us.</a></p>

            <div className="my-30 w-full bg-[#2BA771] py-20">
                <h1 className="text-center font-bold text-4xl text-white">Our Mission</h1>
                <div className="flex flex-col md:flex-col lg:flex-row justify-center md:justify-between mt-15 items-center gap-10">
                    <div>
                        <img className="w-2xl rounded-4xl lg:rounded-none" src={teamwork} alt="Two pharmacists working together"/>
                    </div>
                    <div className="max-w-full lg:max-w-1/2 flex justify-center flex-col px-4 md:px-20">
                        <p className="text-white text-base md:text-xl/9 text-center mb-10">We believe pharmacies should spend less time on manual processes 
                            and more time focusing on patient care. Our platform is designed to streamline procurement,
                             optimize inventory management, and ensure that your pharmacy runs smoothly, securely, and efficiently.
                            We're committed to simplifying the complexities of pharmaceutical management, 
                            so you can focus on what truly matters—delivering quality service to your patients and customers.</p>
                        <Link to="/about" className="bg-white text-[#2BA771] self-center px-6 py-2.5 rounded-full border-1 border-solid border-white hover:bg-[#2BA771] hover:text-white duration-150 ease-in-out cursor-pointer"><button className="cursor-pointer">More about us</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
