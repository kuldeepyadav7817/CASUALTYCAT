import React from 'react'
import '../css/SuperAdminDashboard.css'
import { Navigate, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import AdminTopNavHome from '../widgets/AdminTopNavHome';

const SuperAdminDashboard = () => {

    const Navigate = useNavigate();

    function navClientDashboard() {
        Navigate("/clientDashboard");
    }
    function navAddInsurerComponent() {
        Navigate("/addInsurerComponent");
    }
    function navAddUserComponent() {
        Navigate("/addUserComponent");
    }

    return (
        <>
            <div className='web_basic_cards_modify'>
                <AdminTopNavHome></AdminTopNavHome>
                <div className='web_admin_dashboard_full_area'>
                    <div className='web_admin_dashboard_right_area'>
                        <div className='web_admin_dashboard_header_area'>
                            <div className='web_admin_dashboard_icon_bg'></div>
                            <div className='web_admin_dashboard_text'>Dashboard</div>
                        </div>
                        <div className='web_admin_dashboard_users_area'>
                            <div className='web_admin_dashboard_users_right_area'>
                                <div className='web_admin_dashboard_active_user_area'>
                                    <div className='web_admin_dashboard_active_user_header_text'>Total Active Users</div>
                                    <div className='web_admin_dashboard_active_user_numbers'>10 <span className='web_admin_dashboard_active_user_total_numbers'>of 5k</span></div>
                                    <div className='web_admin_dashboard_active_user_sub_text'>Last Updated On: 5.00 AM</div>
                                </div>
                                <div className='web_admin_dashboard_clients_area'>
                                    <div className='web_admin_dashboard_active_user_header_text'>Clients</div>
                                    <div className='web_admin_dashboard_active_user_numbers'>458+</div>
                                    <div className='web_admin_dashboard_active_user_sub_text'>Last Updated On: 5.00 AM</div>
                                </div>
                                <div className='web_admin_dashboard_completed_area'>
                                    <div className='web_admin_dashboard_active_user_header_text'>Completed Assessments</div>
                                    <div className='web_admin_dashboard_active_user_numbers'>250</div>
                                    <div className='web_admin_dashboard_active_user_sub_text'>Last Updated On: 5.00 AM</div>
                                </div>
                                <div className='web_admin_dashboard_pending_area'>
                                    <div className='web_admin_dashboard_active_user_header_text'>Pending Assessments</div>
                                    <div className='web_admin_dashboard_active_user_numbers'>125</div>
                                    <div className='web_admin_dashboard_active_user_sub_text'>Last Updated On: 5.00 AM</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='web_admin_dashboard_categories_header_area'>
                    <div className='web_admin_dashboard_categories_bg'></div>
                    <h1 className='web_admin_dashboard_categories_header_text'>Navigation</h1>
                </div>
                <div className='web_admin_dashboard_categories_blk_area'>
                    <div className='web_admin_dashboard_categories_flex_area'>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_client_category_bg' onClick={navClientDashboard}></div>
                            <h1 className='web_admin_dashboard_client_category_text' onClick={navClientDashboard}>Clients</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_insurance_category_bg' onClick={navAddInsurerComponent}></div>
                            <h1 className='web_admin_dashboard_client_category_text' onClick={navAddInsurerComponent}>Insurance</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_users_category_bg' onClick={navAddUserComponent}></div>
                            <h1 className='web_admin_dashboard_client_category_text'onClick={navAddUserComponent}>Users</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_users_previlege_category_bg'></div>
                            <h1 className='web_admin_dashboard_client_category_text'>Users Previlege</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_Questionare_category_bg'></div>
                            <h1 className='web_admin_dashboard_client_category_text'>Questionnaire</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_industry_category_bg'></div>
                            <h1 className='web_admin_dashboard_client_category_text'>Industry</h1>
                        </div>
                        <div className='web_admin_dashboard_client_category_area'>
                            <div className='web_admin_dashboard_country_category_bg'></div>
                            <h1 className='web_admin_dashboard_client_category_text'>Country</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mobile_basic_cards_modify'>
                <div className='mobile_admin_dashboard_header_area'>
                    <div className='mobile_admin_dashboard_icon_bg'></div>
                    <div className='mobile_admin_dashboard_text'>Non Cyber Dashboard</div>
                    <input type='text' className='mobile_admin_dashboard_search' placeholder='Search'></input>
                </div>
                <div className='mobile_admin_dashboard_users_area'>
                    <div className='mobile_admin_dashboard_user_entry_area'>
                        <div className='mobile_admin_dashboard_user_entry_bg'></div>
                        <div className='mobile_admin_dashboard_user_entry_blk_area'>
                            <div className='mobile_admin_dashboard_user_header_text'>Welcome Admin!</div>
                            <div className='mobile_admin_dashboard_user_header_sub_text'>Last Updated On: 5.00 AM</div>
                            <a href='#' className='mobile_admin_dashboard_user_link_text'>View users list</a>
                        </div>
                    </div>
                    <div className='mobile_admin_dashboard_categories_header_area'>
                        <div className='mobile_admin_dashboard_categories_bg'></div>
                        <h1 className='mobile_admin_dashboard_categories_header_text'>Navigation</h1>
                    </div>
                    <div className='mobile_admin_dashboard_categories_blk_area'>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_client_category_bg' onClick={navClientDashboard}></div>
                            <h1 className='mobile_admin_dashboard_client_category_text' onClick={navClientDashboard}>Clients</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_insurance_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Insurance</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_users_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Users</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_users_previlege_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Users Previlege</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_Questionare_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Questionare</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_industry_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Industry</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_policy_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Policy</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_premium_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Premium</h1>
                        </div>
                        <div className='mobile_admin_dashboard_client_category_area'>
                            <div className='mobile_admin_dashboard_country_category_bg'></div>
                            <h1 className='mobile_admin_dashboard_client_category_text'>Country</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SuperAdminDashboard;