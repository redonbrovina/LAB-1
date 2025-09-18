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
            await publicApiPost('/form/signup', {emri_kompanise, email, adresa, shtetiID, qyteti, kodi_postal, password})
            navigate('/signup-success')
        }catch(err){
            setErrorMessage(err.message || 'Signup Failed')
        }
    }

    return(
        <>
            <div className="md:flex flex-row space-between">
                <div className="flex flex-col my-4 mx-6 md:mx-30 md:w-1/2">
                    <div className="flex flex-row justify-evenly md:justify-between md:mx-4 md:mt-5 items-center">
                        <img src={Shneta} alt="Shneta Logo" className="w-30 md:w-40" />
                        <Link to="/" className="px-4 py-2 bg-[#7ED957] text-white cursor-pointer text-sm md:text-l rounded-full w-fit"><button className="cursor-pointer">Back to Home</button></Link>
                    </div>
                    <div>
                        <h1 className="text-[#808080] text-center md:text-left md:ml-3 mt-10 text-xl md:text-2xl">Create an <span className="text-[#7ED957]">Account</span></h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <label className="text-[#808080] mt-10 ml-3">Company Name</label>
                            <input
                                type="text"
                                name="emri_kompanise"
                                value={formData.emri_kompanise}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Address</label>
                            <input
                                type="text"
                                name="adresa"
                                value={formData.adresa}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Country</label>
                            <select
                                name="shtetiID"
                                value={formData.shtetiID}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3 text-gray-500"
                            >
                                <option value="">Select a Country</option>
                                {shtetet.map((shteti) => (
                                    <option key={shteti.shtetiID} value={shteti.shtetiID}>
                                        {shteti.emri_shtetit}
                                    </option>
                                ))}
                            </select>

                            <label className="text-[#808080] ml-3">City</label>
                            <input
                                type="text"
                                name="qyteti"
                                value={formData.qyteti}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Postal Code</label>
                            <input
                                type="text"
                                name="kodi_postal"
                                value={formData.kodi_postal}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Password</label>
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />
                            
                            <button 
                                type="submit" 
                                className="mt-5 py-2.5 bg-[#7ED957] text-white cursor-pointer text-xl rounded-full hover:bg-[#6bc348] transition-colors duration-200"
                            >
                                Submit Application
                            </button>
                            
                            {errorMessage && (
                                <p className="text-red-500 text-xs mt-4 mb-2 ml-3">{errorMessage}</p>
                            )}
                        </form>
                        <p className="text-sm text-[#808080] mt-5 ml-3">Already have an account? <Link className="text-[#7ED957] underline" to="/login">Sign in</Link></p>
                        <p className="text-[0.6rem] my-5 ml-3 text-[#808080]">*Warning: Only Eligible Companies will be permitted to create an account. Every submission will be reviewed and approved accordingly</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <img className="hidden md:block w-full h-[65rem]" src={pic} alt="signup-picture"/>
                </div>
            </div>
        </>
    )
}