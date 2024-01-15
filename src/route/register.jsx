import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, redirect } from "react-router-dom"

export default function Register(){
    const history = useNavigate()

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    

    const userHandler = (e) => {
        setUser(e.target.value)
    }
    const passHandler = (e) => {
        setPass(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const registerFunction = async (user, pass, email) => {
        // const navigate = useNavigate();
        
        const postUrl = 'http://localhost:1337/api/auth/local/register'
        const postData = {
            username: user,
            email: email,
            password: pass,
        }
    
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try{
            const response = await axios.post(postUrl, postData, config);
            console.log('response : ', response.data)
            // return redirect("/")
            // navigate("/")
            history("/login")
            // setIsLogin(true)
            // return <Redirect to='/'  />
        }
        catch(err){
            if(err.response && err.response.status === 404){
                console.log("user not found")
                clearConsole();
            }
            else{
                console.log(err.message)
            }
        }
    }

    const submitChecker = (e) => {
        e.preventDefault()
        if(!user || !pass || !email){
            alert("tidak boleh kosong")
        }
        else{
            // alert(`${username} \n ${pass}`)
            // navigate("/")
            registerFunction(user, pass, email);
        }
    }


    return(
        <div className="h-[100vh] mt-14">
            <form onSubmit={submitChecker}>
                <div>
                    user
                    <input value={user} onChange={userHandler} className="border border-black" type="text" />
                </div>
                <div>
                    email
                    <input value={email} onChange={emailHandler} className="border border-black" type="text" />
                </div>
                <div>
                    pass
                    <input value={pass} onChange={passHandler} className="border border-black" type="password" />
                </div>
                <button type="submit" className="border border-black">submit</button>
            </form>
        </div>
    )
}