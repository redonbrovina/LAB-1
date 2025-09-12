import { Link } from 'react-router-dom'

export default function Services() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <div className="text-center px-4 md:px-8 max-w-6xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-[#2BA771] mb-6">Our Services</h1>
                <p className="text-[#808080] text-lg md:text-xl max-w-4xl mx-auto">
                    Comprehensive solutions designed to streamline your pharmacy operations
                    and enhance your business performance.
                </p>
            </div>

            {/* Main Services Section */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Inventory Management */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E0FFF7] hover:border-[#7ED957] transition-colors duration-300">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#2BA771] mb-4">Inventory Management</h3>
                        <ul className="text-[#808080] space-y-3">
                            <li>• Real-time stock tracking and monitoring</li>
                            <li>• Automated reorder point notifications</li>
                            <li>• Expiry date management</li>
                            <li>• Batch tracking and traceability</li>
                        </ul>
                    </div>

                    {/* Supply Chain Optimization */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E0FFF7] hover:border-[#7ED957] transition-colors duration-300">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#2BA771] mb-4">Supply Chain Optimization</h3>
                        <ul className="text-[#808080] space-y-3">
                            <li>• Automated order processing</li>
                            <li>• Supplier relationship management</li>
                            <li>• Order tracking and analytics</li>
                            <li>• Cost optimization recommendations</li>
                        </ul>
                    </div>

                    {/* Analytics & Reporting */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E0FFF7] hover:border-[#7ED957] transition-colors duration-300">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#2BA771] mb-4">Analytics & Reporting</h3>
                        <ul className="text-[#808080] space-y-3">
                            <li>• Custom dashboard creation</li>
                            <li>• Performance metrics tracking</li>
                            <li>• Trend analysis and forecasting</li>
                            <li>• Automated report generation</li>
                        </ul>
                    </div>

                    {/* Compliance & Security */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E0FFF7] hover:border-[#7ED957] transition-colors duration-300">
                        <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#2BA771] mb-4">Compliance & Security</h3>
                        <ul className="text-[#808080] space-y-3">
                            <li>• Regulatory compliance monitoring</li>
                            <li>• Secure data encryption</li>
                            <li>• Audit trail maintenance</li>
                            <li>• Access control management</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#E0FFF7] py-16">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#2BA771] mb-6">Ready to Transform Your Pharmacy Operations?</h2>
                    <p className="text-[#808080] mb-8 text-lg">
                        Join the growing network of pharmacies that trust Shneta for their supply chain management needs.
                    </p>
                    <Link to="/signup" className="inline-block bg-[#7ED957] text-white px-8 py-3 rounded-full hover:bg-[#6bc348] transition-colors duration-200">
                        Get Started Today
                    </Link>
                </div>
            </div>
        </div>
    )
}