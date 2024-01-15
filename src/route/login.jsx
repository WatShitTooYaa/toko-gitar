import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, redirect } from "react-router-dom"
// import { setUserSaved } from "./isLogin"

export default function Login(){
    const history = useNavigate()

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    

    const userHandler = (e) => {
        setUser(e.target.value)
    }
    const passHandler = (e) => {
        setPass(e.target.value)
    }

    const loginFunction = async (user, pass) => {
        // const navigate = useNavigate();
        
        const postUrl = 'http://localhost:1337/api/auth/local'
        const postData = {
            "identifier": user,
            "password": pass
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
            // setUserSaved(true, response.data.user.username)
            history("/")
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
        if(!user || !pass){
            alert("tidak boleh kosong")
        }
        else{
            // alert(`${username} \n ${pass}`)
            // navigate("/")
            loginFunction(user, pass);
        }
    }


    const jwt_auth = "2aae6c2384458aaf6d658708f8018ce1a959f45c339042ffa2d64605d71f687d7891b5457f8f36020e48955f1602e570a7fea74fabcd3f62bceb43eccb19bfdeecc0106b5c965c4bb5f04ffef9f6c01fa80a6383663243c8e58c15704bdf689d1a167c48b1d898433c40ef25434ce0d6b797444609d053676de6047427d3231f"


    return(
        <div className="h-[100vh] mt-14">
            <form onSubmit={submitChecker}>
                <div>
                    email
                    <input value={user} onChange={userHandler} className="border border-black" type="text" />
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