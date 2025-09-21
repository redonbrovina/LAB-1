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
        <div className="bg-white flex flex-col md:flex-row justify-evenly m-10">
            <div className="flex flex-col gap-30 justify-center md:w-1/3">
                <Link to="/" className="px-5 py-3 bg-[#7ED957] text-white cursor-pointer text-sm md:text-l rounded-full w-fit"><button className="cursor-pointer">Back to Home</button></Link>
                <img className="hidden md:block" src={svg} alt="Login Image" />
            </div>
            <div className="flex flex-col md:w-1/2 pt-35">
                <p className="text-[#808080] text-2xl text-center pb-10">Nice to see you <span className="text-[#7ED957]">You</span> again</p>
                <form className="flex flex-col gap-2" method="POST">
                    <label className="text-[#808080]">Email</label>
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

                    <button type="submit" onClick={handleSubmit} className="mt-5 py-2 bg-[#7ED957] text-white cursor-pointer text-xl rounded-full hover:bg-[#6bc348] transition-colors duration-200">Login</button>

                     {errorMessage && (
                            <p className="text-red-500 text-xs my-2 ml-3">{errorMessage}</p>
                    )}
                </form>
                <p className="pt-3 text-[#808080] text-sm ml-3">Don't have an account? <Link className="underline text-[#7ED957] text-sm" to="/signup">Sign Up!</Link></p>
                <p className="pt-3 text-[#808080] text-sm ml-3">Are you an Administrator? <Link className="underline text-[#7ED957] text-sm" to="/admin-login">Login here!</Link></p>
            </div>
        </div>
        </>
    )
}