import React, { useState } from "react";
import '../css/Login.css';
import right_arrow from '../Assets/next.png';
import loading from '../Assets/loading.gif';
import favicon from '../Assets/white_logo.png';
import { Button } from "react-bootstrap";
import UserServices from "../../services/UserServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const navOtp = () => {
        navigate('/otp', { state: { email: email } });
    }

    const [arrow, setArrow] = useState(right_arrow);
    const [userStyle, setUserStyle] = useState("web_ncyb_login_flx_input");
    const [userLock, setUserLock] = useState(false);
    const [passwordBool, setPasswordBool] = useState(false);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const blurEmail = e => {
        setEmail(e.target.value);
    };

    const blurPassword = e => {
        setPassword(e.target.value);
    };

    const checkUser = async () => {
        if(email.length>0)
        {
            UserServices.checkUserID(email)
            .then(response => {
                if (response.data.status == true) {
                    userValidated();
                    toast.success("EMAIL ID VERIFIED!");
                }
                else {
                    toast.error("INVALID EMAIL ID!");
                }
            })
            .catch(e => {
                console.log(e);
            });
        }
        else{
            toast.error("INVALID EMAIL ID!");
        }
    };

    const checkPassword = async () => {
        if(password.length>0)
        {
            const dat = {
                email: email,
                password: password
            };
            UserServices.checkPass(dat)
            .then(response => {
                if (response.data.status == true) {
                    userValidated();
                    toast.success("USER VERIFIED!");
                    navOtp();
                }
                else {
                    toast.error("INVALID PASSWORD!");
                }
            })
            .catch(e => {
                console.log(e);
            });
        }
        else{
            toast.error("INVALID PASSWORD!");
        }
    };

    const userValidated = async() =>{
        await setArrow(loading);
        await setUserStyle("web_ncyb_login_flx_input_top");
        await setUserLock(true);
        await setPasswordBool(true);
        await setArrow(null);
    } 

    return (
        <div>
             <ToastContainer position="top-right" />
            <div className="web_ncyb_login">
                <div className="web_ncyb_login_flx">
                    <div >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}><img src={favicon} height={45} style={{ borderRadius: '15px' }}></img><h3 className="web_ncyb_login_flx_inner_heading">Sign In to CasualtyCat</h3></div>
                        <div className="web_ncyb_login_flx_inner">
                            <div style={{ position: 'relative' }}><input disabled={userLock} placeholder="Username" className={userStyle} onBlur={blurEmail} ></input><img className="icon" width={45} style={{ paddingRight: '10px' }} src={arrow} onClick={() => checkUser()}></img></div>
                            {passwordBool && <div style={{ height: '0.6px', backgroundColor: '#e1e2e3' }}></div>}
                            {passwordBool && <div style={{ position: 'relative' }}><input type="password" placeholder="Password" className="web_ncyb_login_flx_input_bottom" onBlur={blurPassword}></input><img className="icon" width={45} style={{ paddingRight: '10px' }} src={right_arrow} onClick={() => checkPassword()}></img></div>}
                        </div>
                        <div style={{ display: 'grid', placeItems: 'center', marginTop: '30px', fontFamily: 'Poppins' }}><Button style={{ padding: '0px', margin: '0px', fontSize: '17px', color: '#fff' }} variant="link">Forgot Password ➚</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
