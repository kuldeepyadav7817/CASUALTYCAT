import React, { useEffect, useState } from "react";
import '../css/ClientOTP.css';
import right_arrow from '../Assets/next.png';
import loading from '../Assets/loading.gif';
import favicon from '../Assets/white_logo.png';
import { Button } from "react-bootstrap";
import UserServices from "../../services/UserServices";
import { ToastContainer, toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocation, useNavigate } from "react-router-dom";
import ClientServices from "../../services/ClientServices";

function ClientOTP() {

    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail(location.state.email);
        UserServices.userOTP(location.state.email)
            .then(response => {
                if (response.data.status == true) {
                    toast.success("VERIFICATION CODE SENT SUCCESSFULLY!");
                    setCode(response.data.responsedata);
                    setShowTimer("flex");
                    setTimer(true);
                }
                else {
                    toast.error("VERIFICATION FAILED!");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    //otp-variables
    const [code, setCode] = useState("");

    //timer
    const [timerStart, setTimer] = useState(false);
    const [showTimer, setShowTimer] = useState("none");
    function refreshPage() {
        window.location.reload(false);
    }
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            refreshPage();
        }
        return (
            <div className="timer">
                <div className="value">{remainingTime}</div>
            </div>
        );
    };


    const [otp, setOtp] = useState("");

    const blurOtp = e => {
        setOtp(e.target.value);
    };

    const checkOtp = async() => {
        if (otp.length == 8) {
            if (otp == code) {
                await setTimer(false);
                await setShowTimer("none");
                await toast.success("USER VERIFICATION SUCCESSFULL!");
                await ClientServices.clientDetails(location.state.email)
                    .then(response => {
                        if (response.data!=null) {
                            localStorage.setItem("clientID", response.data.id);
                            localStorage.setItem("clientCompany", response.data.company);
                            navigate('/clientQuestionnaireDasboard');
                        }
                        else {
                            toast.error("VERIFICATION FAILED!");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else {
                toast.error("INVALID USER OTP!");
            }
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" />
            <div className="web_ncyb_otp">
                <div className="web_ncyb_otp_flx">
                    <div >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><h3 className="web_ncyb_otp_flx_inner_heading">Enter your Verification Code</h3></div>
                        <div className="web_ncyb_otp_flx_inner">
                            <div style={{ position: 'relative' }}><input placeholder="Verification Code" type="password" className="web_ncyb_otp_flx_input" onBlur={blurOtp} ></input><img className="icon" width={45} style={{ paddingRight: '10px' }} src={right_arrow} onClick={() => checkOtp()}></img></div>
                        </div>
                        <div className='web_login_timer_flux' >
                            <div className="timer-wrapper" style={{ display: showTimer }}>
                                <h6 className='web_login_timer_text' >OTP VALID UPTO</h6>
                                <CountdownCircleTimer
                                    isPlaying={timerStart}
                                    size={32}
                                    strokeWidth={3}
                                    duration={120}
                                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                    colorsTime={[100, 70, 50, 30]}
                                    onComplete={() => ({ delay: 1 })}
                                >{renderTime}</CountdownCircleTimer>
                                <h6 className='web_login_timer_text' >SECONDS</h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ClientOTP;
