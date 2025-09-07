import teamwork from "../assets/images/pexels-fauxels-3184357.jpg"

export default function About() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <div className="text-center px-4 md:px-8 max-w-6xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-[#2BA771] mb-6">About Shneta</h1>
                <p className="text-[#808080] text-lg md:text-xl max-w-4xl mx-auto">
                    Transforming pharmaceutical supply chain management through innovation, 
                    reliability, and cutting-edge technology.
                </p>
            </div>

            {/* Mission & Vision Section */}
            <div className="bg-[#E0FFF7] py-16 mb-16">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-[#2BA771] mb-4">Our Mission</h2>
                            <p className="text-[#808080]">
                                To revolutionize pharmaceutical supply chain management by providing 
                                innovative solutions that enhance efficiency, ensure compliance, and 
                                enable pharmacies to focus on what matters most - patient care.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-[#2BA771] mb-4">Our Vision</h2>
                            <p className="text-[#808080]">
                                To become the global leader in pharmaceutical B2B solutions, creating 
                                a connected ecosystem where pharmacies can thrive through seamless 
                                operations and strategic partnerships.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
                <h2 className="text-3xl font-bold text-[#2BA771] text-center mb-12">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#2BA771] mb-2">Trust & Security</h3>
                        <p className="text-[#808080]">Building lasting relationships through secure, reliable solutions.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#2BA771] mb-2">Innovation</h3>
                        <p className="text-[#808080]">Continuously evolving to meet the industry's changing needs.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#2BA771] mb-2">Collaboration</h3>
                        <p className="text-[#808080]">Working together to create a stronger pharmaceutical network.</p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-[#2BA771] py-16">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img 
                                src={teamwork} 
                                alt="Shneta team collaboration" 
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="md:w-1/2 text-white">
                            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
                            <p className="mb-6">
                                At Shneta, our team combines expertise in pharmaceuticals, 
                                technology, and supply chain management. We're passionate about 
                                creating solutions that make a real difference in the 
                                pharmaceutical industry.
                            </p>
                            <p>
                                With decades of collective experience, we understand the unique 
                                challenges faced by pharmacies and are committed to providing 
                                innovative solutions that drive success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}