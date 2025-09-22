import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import {useAuth} from "../utils/AuthContext"
import {publicApiPost} from "../utils/api"
import svg from "../assets/images/undraw_finance_m6vw 1.png"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [kodiPersonal, setKodiPersonal] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.test(email)){
            return "Please provide a valid email!"
        }
        if(password.length < 6){
            return "Password must have at least 6 characters!"
        }
        if(!kodiPersonal || kodiPersonal.length < 4){
            return "Personal code must be at least 4 characters!"
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
            const data = await publicApiPost('/admin/login', {email, password, kodi_personal: kodiPersonal})
            login(data.accessToken, data.refreshToken)
            navigate('/admin')
        }catch(err){
            setErrorMessage(err.message || 'Admin login failed')
        }
    }

    return(
        <>
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-[#808080] text-2xl lg:text-3xl font-bold">
                        Admin <span className="text-[#DC2626]">Access</span> Portal
                    </h1>
                    <p className="text-[#808080] text-sm mt-2">Secure administrator login</p>
                </div>
                
                <form className="space-y-6" method="POST">
                    <div>
                        <label className="text-[#808080] block mb-2 font-medium">Admin Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                            placeholder="Enter admin email"
                        />
                    </div>

                    <div>
                        <label className="text-[#808080] block mb-2 font-medium">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="text-[#808080] block mb-2 font-medium">Personal Code</label>
                        <input 
                            type="text"
                            value={kodiPersonal}
                            onChange={(e) => setKodiPersonal(e.target.value)} 
                            placeholder="Enter your personal code"
                            className="w-full rounded-full px-4 py-3 bg-[#EDECEC] border-0 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                        />
                    </div>

                    <button 
                        type="submit" 
                        onClick={handleSubmit} 
                        className="w-full mt-8 py-3 bg-[#DC2626] text-white cursor-pointer text-lg rounded-full hover:bg-[#B91C1C] transition-colors duration-200 font-medium"
                    >
                        Admin Login
                    </button>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
                    )}
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-[#808080] text-sm">
                        Regular user? 
                        <Link className="underline text-[#7ED957] ml-1" to="/login">Client Login</Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
