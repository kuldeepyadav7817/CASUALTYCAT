import React, { useState } from "react";
import '../css/ClientLogin.css';
import right_arrow from '../Assets/next.png';
// import loading from '../Assets/loading.gif';
import favicon from '../Assets/white_logo.png';
// import { Button } from "react-bootstrap";
// import UserServices from "../../services/UserServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClientServices from "../../services/ClientServices";

function ClientLogin() {

    const navigate = useNavigate();

    const navOtp = () => {
        navigate('/clientOtp', { state: { email: email } });
    }

    const [arrow, setArrow] = useState(right_arrow);
    const [userStyle, setUserStyle] = useState("web_ncyb_login_flx_input");
    const [userLock, setUserLock] = useState(false);
    
    const [email, setEmail] = useState("");

    const blurEmail = e => {
        setEmail(e.target.value);
    };

    const checkUser = async () => {
        if(email.length>0)
        {
            ClientServices.clientCheck(email)
            .then(response => {
                if (response.data == true) {
                    toast.success("EMAIL ID VERIFIED!");
                    navOtp();
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

    return (
        <div>
             <ToastContainer position="top-right" />
            <div className="web_ncyb_login">
                <div className="web_ncyb_login_flx">
                    <div >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}><img src={favicon} height={45} style={{ borderRadius: '15px' }}></img><h3 className="web_ncyb_login_flx_inner_heading">Sign In to CasualtyCat</h3></div>
                        <div className="web_ncyb_login_flx_inner">
                            <div style={{ position: 'relative' }}><input disabled={userLock} placeholder="Email ID" className={userStyle} onBlur={blurEmail} ></input><img className="icon" width={45} style={{ paddingRight: '10px' }} src={arrow} onClick={() => checkUser()}></img></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ClientLogin;
