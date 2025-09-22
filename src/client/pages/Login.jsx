import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import {useAuth} from "../utils/AuthContext"
import {clientAPI} from "../utils/api"
import svg from "../assets/images/undraw_finance_m6vw 1.png"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.test(email)){
            return "Please provide a valid email!"
        }
        if(password.length < 8){
            return "Password must have at least 8 characters!"
        }

        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = validate()
        setErrorMessage(error)

        if(error){
            return
        }

        try{
            const data = await clientAPI.login({email, password})
            login(data.accessToken, data.refreshToken)
            navigate('/dashboard')
        }catch(err){
            setErrorMessage(err.message || 'Login failed')
        }
    }

    return(
        <>
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left side - Image and back button */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-block px-5 py-3 bg-[#7ED957] text-white cursor-pointer text-sm rounded-full w-fit mb-8">
                        <button className="cursor-pointer">Back to Home</button>
                    </Link>
                    <img className="w-full max-w-md mx-auto" src={svg} alt="Login Image" />
                </div>
            </div>
            
            {/* Right side - Login form */}
            <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-12">
                <div className="w-full max-w-md mx-auto">
                    <p className="text-[#808080] text-xl lg:text-2xl text-center lg:text-left pb-8">
                        Nice to see you <span className="text-[#7ED957]">You</span> again
                    </p>
                    
                    <form className="flex flex-col gap-4" method="POST">
                        <div>
                            <label className="text-[#808080] block mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="text-[#808080] block mb-2">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button 
                            type="submit" 
                            onClick={handleSubmit} 
                            className="mt-6 py-3 bg-[#7ED957] text-white cursor-pointer text-lg rounded-full hover:bg-[#6bc348] transition-colors duration-200 w-full"
                        >
                            Login
                        </button>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                        )}
                    </form>
                    
                    <div className="mt-6 space-y-2 text-center lg:text-left">
                        <p className="text-[#808080] text-sm">
                            Don't have an account? 
                            <Link className="underline text-[#7ED957] ml-1" to="/signup">Sign Up!</Link>
                        </p>
                        <p className="text-[#808080] text-sm">
                            Are you an Administrator? 
                            <Link className="underline text-[#7ED957] ml-1" to="/admin-login">Login here!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}