import { Link } from "react-router-dom"
import Shneta from "../assets/images/Shneta.png"

export default function SignupSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
            <img src={Shneta} alt="Shneta Logo" className="w-40 mb-8" />
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-[#7ED957] mb-4">Application Submitted Successfully!</h1>
                <div className="bg-[#E0FFF7] p-8 rounded-lg mb-8">
                    <p className="text-[#808080] text-lg mb-4">
                        Thank you for applying to join the Shneta network. Our team will review your application shortly.
                    </p>
                    <p className="text-[#808080] mb-4">
                        You will receive an email confirmation at your registered email address with further instructions once your application has been reviewed.
                    </p>
                    <div className="text-sm text-[#808080] mt-6">
                        <p className="font-semibold mb-2">What happens next?</p>
                        <ul className="list-disc list-inside text-left">
                            <li className="mb-2">Our team will review your application within 2-3 business days</li>
                            <li className="mb-2">You'll receive an email with the review decision</li>
                            <li>If approved, you'll get access to set up your full account</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="px-6 py-3 bg-[#7ED957] text-white rounded-full hover:bg-[#6bc348] transition-colors">
                        Return to Home
                    </Link>
                    <a href="mailto:support@shneta.com" className="px-6 py-3 border-2 border-[#7ED957] text-[#7ED957] rounded-full hover:bg-[#7ED957] hover:text-white transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
} 