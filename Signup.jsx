import {Link, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import Shneta from "../assets/images/Shneta.png"
import pic from "../assets/images/login5.jpg"

export default function Signup() {

    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        address: "",
        shtetiId: "",
        city: "",
        postalCode: "",
        password: "",
    });

    const [countries, setCountries] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/countries")
            const data = await response.json()
            if(response.ok){
                setCountries(data)
            }
        }catch(err){
            setErrorMessage("Network Error")
        }
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            companyName: "",
            email: "",
            address: "",
            city: "",
            postalCode: "",
            password: "",
        };

        if (formData.companyName.length < 2) {
            setErrorMessage("Company name must be at least 2 characters long");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address");
            isValid = false;
        }

        if (formData.address.length < 5) {
            setErrorMessage("Please enter a valid address");
            isValid = false;
        }

        if (formData.city.length < 2) {
            setErrorMessage("Please enter a valid city");
            isValid = false;
        }

        const postalCodeRegex = /^[0-9]{5,10}$/;
        if (!postalCodeRegex.test(formData.postalCode)) {
            setErrorMessage("Please enter a valid postal code (5-10 digits)");
            isValid = false;
        }

        if (formData.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            isValid = false;
        }

        if (!formData.shtetiId) {
            setErrorMessage("Please select a country");
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if(!isValid){
            return;
        }

        try{
            const {companyName, email, address, shtetiId, city, postalCode, password} = formData;
            const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({companyName, email, address, shtetiId, city, postalCode, password})
            })
    
            if(response.ok){
                navigate('/signup-success')
            }else {
                const data = await response.json()
                setErrorMessage(data.message || 'Login failed')
            }

        }catch(err){
            setErrorMessage("Network Error")
        }
    };

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
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Country</label>
                            <select
                                name="shtetiId"
                                value={formData.shtetiId}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3 text-gray-500"
                            >
                                <option value="">Select a country</option>   
                                {countries.map((country) => (
                                    <option key={country.shtetiID} value={country.shtetiID}>
                                        {country.emri_shtetit}
                                    </option>
                                ))}
                            </select>

                            <label className="text-[#808080] ml-3">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />

                            <label className="text-[#808080] ml-3">Password</label>
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="rounded-full px-3 py-2 bg-[#EDECEC] mb-3"
                            />
                            
                            <button 
                                type="submit" 
                                className="mt-5 py-2.5 bg-[#7ED957] text-white cursor-pointer text-xl rounded-full hover:bg-[#6bc348] transition-colors duration-200"
                            >
                                Submit Application
                            </button>
                            
                            {errorMessage && (
                                <p className="text-red-500 text-sm my-2">{errorMessage}</p>
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