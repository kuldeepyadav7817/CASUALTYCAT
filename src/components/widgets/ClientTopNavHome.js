import './ClientTopNavHome.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ClientServices from '../../services/ClientServices';
import { useEffect, useState } from 'react';

function ClientTopNavHome(props) {
    const company = props.company;
    const navigate = useNavigate();
    const navCR = () => {
        navigate('/clientLogin');
    }
    
    const [progress, setProgress] = useState(null);

    const fetchData = () => {
        ClientServices.overallStatus(localStorage.getItem("clientID"))
            .then(response => {
                setProgress(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const zeroCheck = value => {
        if (value == 0) {
            return 1;
        }
        else {
            return value;
        }
    }

    return (
        <div>
            <div className='web_admin_top_nav_home'>
                <div className='web_client_top_home_medical_nav_area'>
                    <div className='web_client_top_home_medical_nav_logo'></div>
                    <div className='web_client_top_home_nav_head'>
                        <h5 className='web_client_top_home_nav_head_text'>{company.replace(" %26 ", " & ")}</h5>
                    </div>
                    <div className='web_client_top_home_medical_nav_right'>
                    <div className='web_client_top_home_medical_nav_text'>OVERALL PROGRESS :</div> 
                        <div style={{ width: 40, height: 40, fontWeight:'600', fontFamily:'Poppins',marginBottom:'20px'}}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#0129BD", textColor: "#fff", pathColor: "#fff", trailColor: "transparent", textSize:'30px' }) } value={zeroCheck(Math.ceil(progress))} text={zeroCheck(Math.ceil(progress))} /></div>
                        <div className='web_client_top_home_medical_nav_right_text' onClick={()=>navigate('/clientQuestionnaireDasboard')}>HOME</div>                   
                        <div className="web_client_top_home_medical_nav_switch"></div>
                        <div className="web_client_top_home_medical_nav_profile" onClick={navCR}></div>
                    </div>
                </div>
            </div>
            <div className='mobile_admin_top_nav_home'>
                <div className='mobile_admin_top_home_medical_nav_area'>
                    <div className='mobile_admin_top_home_medical_nav_logo'></div>
                    <div className='mobile_admin_top_home_nav_head'>
                        <h5 className='mobile_admin_top_home_nav_head_text'>NON CYBER</h5>
                    </div>
                    <div className='mobile_admin_top_home_medical_nav_right'>
                        <Dropdown>
                            <Dropdown.Toggle variant="drop" style={{color:'#fff',border:'0px'}} id="dropdown-basic">
                                MENU
                            </Dropdown.Toggle>

                            <Dropdown.Menu> 
                                <Dropdown.Item>CLAIM</Dropdown.Item>
                                <Dropdown.Item>REPORTS</Dropdown.Item>
                                <Dropdown.Item>MASTER</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="mobile_admin_top_home_medical_nav_switch" onClick={navCR}></div>
                        <div className="mobile_admin_top_home_medical_nav_profile"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientTopNavHome;