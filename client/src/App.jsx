import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CampaignDetails,Home,Profile,CreateCampaign, Login, Payment } from './pages';
import { SideBar,NavBar } from "./components";

const App = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [])
    return (
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            {user && <div className="sm:flex hidden mr-10 relative"> <SideBar/> </div>}
            
            <div className="flex-1 max-sm:w-full max-w-[1280px] max-auto sm:pr-5"> 
                {user && <NavBar/> }
            
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/payment" element={<Payment/>} />
                    <Route path="/create-campaign" element={<CreateCampaign/>} />
                    <Route path="/campaign-details/:id" element={<CampaignDetails/>} />
                </Routes>
            
            </div>
        </div>
    );
}

export default App;