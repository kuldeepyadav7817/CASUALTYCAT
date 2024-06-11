import './AdminTopNavHome2.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

function AdminTopNavHome2(props) {
    const clientID = props.clientID;
    const navigate = useNavigate();
    const navCR = () => {
        navigate('/');
    }
    return (
        <div>
            <div className='web_admin_top_nav_home'>
                <div className='web_admin_top_home_medical_nav2_area'>
                    <div className='web_admin_top_home_medical_nav2_logo' onClick={()=>navigate('/superAdminDashboard')}></div>
                    <div className='web_admin_top_home_nav_head'>
                        <h5 className='web_admin_top_home_nav_head_text' onClick={()=>navigate('/superAdminDashboard')}>CASUALTYCAT</h5>
                    </div>
                    <div className='web_admin_top_home_medical_nav2_right'>
                        <div className='web_admin_top_home_medical_nav2_right_text' onClick={()=>navigate('/superAdminDashboard')}>HOME</div>
                        <div className='web_admin_top_home_medical_nav2_right_text' onClick={()=>navigate('/clientDashboard')}>CLIENTS</div>
                        <div className='web_admin_top_home_medical_nav2_right_text'>USER</div>
                        <div className='web_admin_top_home_medical_nav2_right_text' >QUESTIONNAIRE</div> 
                        <Button className='web_superadmin_dashboard_new_button' onClick={()=>navigate('/superAdminMIS', { state: { clientID: clientID} })}>MIS</Button>
                        <div className="web_admin_top_home_medical_nav2_profile" onClick={navCR}></div>
                    </div>
                </div>
            </div>
            <div className='mobile_admin_top_nav_home'>
                <div className='mobile_admin_top_home_medical_nav2_area'>
                    <div className='mobile_admin_top_home_medical_nav2_logo'></div>
                    <div className='mobile_admin_top_home_nav_head'>
                        <h5 className='mobile_admin_top_home_nav_head_text'>NON CYBER</h5>
                    </div>
                    <div className='mobile_admin_top_home_medical_nav2_right'>
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
                        <div className="mobile_admin_top_home_medical_nav2_switch" onClick={navCR}></div>
                        <div className="mobile_admin_top_home_medical_nav2_profile"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminTopNavHome2;