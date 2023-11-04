import React, { useEffect,useState } from 'react';
import { CustomButton, FormFeild } from '../components';
import { useNavigate } from 'react-router-dom';
import AES from 'crypto-js/aes';
import cryptoJs from 'crypto-js';

function Login() {
    // console.log(import.meta.env.VITE_AES_SECRET_KEY)
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
        fetch(import.meta.env.VITE_API_URL + "/api/users/login", {
            method: "POST",
            body : JSON.stringify({
                name: userName,
                password
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson['msg'] === 'loginSuccess')
            console.log(responseJson);
            const jwtoken = responseJson['jwt'];
            if( jwtoken ) localStorage.setItem("jwt",jwtoken);
            var data_decrypted = AES.decrypt(responseJson['user'], import.meta.env.VITE_AES_SECRET_KEY);
            localStorage.setItem("user", AES.encrypt(JSON.stringify(JSON.parse(data_decrypted.toString(cryptoJs.enc.Utf8)).user), import.meta.env.VITE_AES_SECRET_KEY));
            navigate("/home")
        })
    }


    return (
        <div className='flex flex-col items-center'>
            <div className='w-[35%] mt-[20%] ml-[35%]'>
                <p className='text-white text-center mb-[2%] text-[22px]'>Login</p>
                <FormFeild
                    lableName="Your user name *"
                    placeholder="Ex.. Kosuki Momonusuke"
                    inputType="text"
                    handleChange={(e) => setUserName(e.target.value)}
                />
                <div className='mt-[3%]'>
                    <FormFeild
                        lableName="Your Password *"
                        placeholder="Password"
                        inputType="password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='text-center mt-[2%]'>
                    <CustomButton
                        btnType="button"
                        title={"Login"}
                        styles={"bg-[#1dc071]"}
                        handleClick={() => handleLogin()}
                    />
                </div>
            </div>
           
        </div>
    )
}

export default Login;