import './AdminTopNavHome.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function AdminTopNavHome() {

    const navigate = useNavigate();
    const navCR = () => {
        navigate('/');
    }
    return (
        <div>
            <div className='web_admin_top_nav_home'>
                <div className='web_admin_top_home_medical_nav_area'>
                    <div className='web_admin_top_home_medical_nav_logo' onClick={()=>navigate('/superAdminDashboard')}></div>
                    <div className='web_admin_top_home_nav_head'>
                        <h5 className='web_admin_top_home_nav_head_text' onClick={()=>navigate('/superAdminDashboard')}>CASUALTYCAT</h5>
                    </div>
                    <div className='web_admin_top_home_medical_nav_right'>
                        <div className='web_admin_top_home_medical_nav_right_text' onClick={()=>navigate('/superAdminDashboard')}>HOME</div>
                        <div className='web_admin_top_home_medical_nav_right_text' onClick={()=>navigate('/clientDashboard')}>CLIENTS</div>
                        <div className='web_admin_top_home_medical_nav_right_text'>USER</div>
                        <div className='web_admin_top_home_medical_nav_right_text' >QUESTIONNAIRE</div> 
                        <div className="web_admin_top_home_medical_nav_profile" onClick={navCR}></div>
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

export default AdminTopNavHome;