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
        <div className="bg-white flex flex-col md:flex-row justify-evenly m-10">
            <div className="flex flex-col md:w-1/2 pt-35">
                <p className="text-[#808080] text-2xl text-center pb-10">Admin <span className="text-[#7ED957]">Access</span> Portal</p>
                <form className="flex flex-col gap-2" method="POST">
                    <label className="text-[#808080]">Admin Email</label>
                    <input
                     type="email"
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value)
                     }} 
                     className="rounded-full px-3 py-2 bg-[#EDECEC]"></input>

                    <label className="text-[#808080] pt-5">Password</label>
                    <input 
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                    className="rounded-full px-3 py-2 bg-[#EDECEC]"></input>

                    <label className="text-[#808080] pt-5">Personal Code</label>
                    <input 
                    type="text"
                    value={kodiPersonal}
                    onChange={(e) => {
                        setKodiPersonal(e.target.value)
                    }} 
                    placeholder="Enter your personal code"
                    className="rounded-full px-3 py-2 bg-[#EDECEC]"></input>

                    <button type="submit" onClick={handleSubmit} className="mt-5 py-2 bg-[#DC2626] text-white cursor-pointer text-xl rounded-full hover:bg-[#B91C1C] transition-colors duration-200">Admin Login</button>

                     {errorMessage && (
                            <p className="text-red-500 text-xs my-2 ml-3">{errorMessage}</p>
                    )}
                </form>
                <p className="pt-3 text-[#808080] text-sm ml-3">Regular user? <Link className="underline text-[#7ED957] text-sm" to="/login">Client Login</Link></p>
            </div>
        </div>
        </>
    )
}
