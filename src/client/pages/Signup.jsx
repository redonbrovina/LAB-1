import {Link, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import {publicApiPost, publicApiGet} from "../utils/api"
import Shneta from "../assets/images/Shneta.png"
import pic from "../assets/images/login5.jpg"

export default function Signup() {

    const [formData, setFormData] = useState({
        emri_kompanise: "",
        email: "",
        adresa: "",
        shtetiID: "",
        qyteti: "",
        kodi_postal: "",
        password: "",
    });

    const [shtetet, setShtetet] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchShtetet = async () => {
        try{
            const data = await publicApiGet('/form/shtetet')
            setShtetet(data)
        }catch(err){
            console.log("Error fetching countries: ", err)
        }
    }

    useEffect(()=>{
        fetchShtetet()
    }, [])


    const validateForm = () => {

        if (formData.emri_kompanise.length < 2) {
            console.log("Setting error message");
            setErrorMessage("Company name must be at least 2 characters long");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address");
            return false;
        }

        if (formData.adresa.length < 5) {
            setErrorMessage("Please enter a valid address");
            return false;
        }

        if (formData.qyteti.length < 2) {
            setErrorMessage("Please enter a valid city");
            return false;
        }

        const postalCodeRegex = /^[0-9]{5,10}$/;
        if (!postalCodeRegex.test(formData.kodi_postal)) {
            setErrorMessage("Please enter a valid postal code (5-10 digits)");
            return false;
        }

        if (formData.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return false;
        }

        setErrorMessage(""); // Clear any previous errors
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if(!isValid){
            return;
        }

        try{
            const {emri_kompanise, email, adresa, shtetiID, qyteti, kodi_postal, password} = formData
            await publicApiPost('/aplikimi/', {emri_kompanise, email, adresa, shtetiID, qyteti, kodi_postal, password})
            navigate('/signup-success')
        }catch(err){
            setErrorMessage(err.message || 'Signup Failed')
        }
    }

    return(
        <>
            <div className="min-h-screen bg-white flex flex-col lg:flex-row">
                {/* Left side - Form */}
                <div className="lg:w-1/2 flex flex-col p-6 lg:p-12">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <img src={Shneta} alt="Shneta Logo" className="w-24 sm:w-32 lg:w-40 mb-4 sm:mb-0" />
                        <Link to="/" className="px-4 py-2 bg-[#7ED957] text-white cursor-pointer text-sm rounded-full w-fit">
                            <button className="cursor-pointer">Back to Home</button>
                        </Link>
                    </div>
                    
                    {/* Form */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-[#808080] text-center lg:text-left text-xl lg:text-2xl mb-8">
                            Create an <span className="text-[#7ED957]">Account</span>
                        </h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto lg:mx-0 w-full">
                            <div>
                                <label className="text-[#808080] block mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="emri_kompanise"
                                    value={formData.emri_kompanise}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">Address</label>
                                <input
                                    type="text"
                                    name="adresa"
                                    value={formData.adresa}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter address"
                                />
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">Country</label>
                                <select
                                    name="shtetiID"
                                    value={formData.shtetiID}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957] text-gray-700"
                                >
                                    <option value="">Select a Country</option>
                                    {shtetet.map((shteti) => (
                                        <option key={shteti.shtetiID} value={shteti.shtetiID}>
                                            {shteti.emri_shtetit}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">City</label>
                                <input
                                    type="text"
                                    name="qyteti"
                                    value={formData.qyteti}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter city"
                                />
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    name="kodi_postal"
                                    value={formData.kodi_postal}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter postal code"
                                />
                            </div>

                            <div>
                                <label className="text-[#808080] block mb-2">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                    placeholder="Enter password"
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full mt-6 py-3 bg-[#7ED957] text-white cursor-pointer text-lg rounded-full hover:bg-[#6bc348] transition-colors duration-200"
                            >
                                Submit Application
                            </button>
                            
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
                            )}
                        </form>
                        
                        <div className="mt-6 space-y-2 text-center lg:text-left">
                            <p className="text-sm text-[#808080]">
                                Already have an account? 
                                <Link className="text-[#7ED957] underline ml-1" to="/login">Sign in</Link>
                            </p>
                            <p className="text-xs text-[#808080]">
                                *Warning: Only Eligible Companies will be permitted to create an account. Every submission will be reviewed and approved accordingly
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right side - Image */}
                <div className="lg:w-1/2 hidden lg:block">
                    <img className="w-full h-full object-cover" src={pic} alt="signup-picture"/>
                </div>
            </div>
        </>
    )
}