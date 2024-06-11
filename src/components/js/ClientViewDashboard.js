import React from 'react'
import '../css/ClientViewDashboard.css'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';

const ClientViewDashboard = () => {

  const Navigate = useNavigate();

  function navAdminQuestionaire() {
    Navigate("/adminQuestionaire");
  }
 
  return (
    <div>
      <div className='web_client_dashboard_logo_area'>
        <div className='web_client_dashboard_logo_bg'></div>
        <div className='web_admin_dashboard_menu_icon_bg'></div>
        <div className='web_client_dashboard_option_text'>Dashboard</div>
        <div className='web_client_dashboard_option_text'>Clients</div>
        <div className='web_client_dashboard_option_text'>Users</div>
        <div>
          <div class="dropdown">
            <button class="dropbtn">MASTERS <span className='dropbtn-arrow_bg'></span></button>
            <div class="dropdown-content">
              <Button variant='mask' >Insurance</Button>
              <Button variant='mask' >Questionaire</Button>
              <Button variant='mask' >Industry</Button>
              <Button variant='mask' >Edit Users</Button>
            </div>
          </div>
        </div>
        <input type='text' className='web_client_dashboard_search' placeholder='Search'></input>
        <div className='web_admin_dashboard_bell_icon_bg'></div>
        <div className='web_admin_dashboard_user_icon_bg'></div>
        <div className='web_admin_dashboard_user_name_text'>SuperAdmin</div>
      </div>
      <div className='web_client_view_blk_area'>
        <div className='web_client_view_cmp_name_text'>Info systems</div>
        <div className='web_client_view_assessment_area'>
          <div className='web_client_view_assessment_question_type_area'>
            <div className='web_client_view_header_text'>Assessment initiated</div>
            <div className='web_client_view_calendar_area'>
              <div className='web_client_view_calendar_bg'></div>
              <div className='web_client_view_calendar_date_text'>22-feb-2023</div>
            </div>
          </div>
          <div className='web_client_view_assessment_question_type_area'>
            <div className='web_client_view_header_text'>Last Modification date</div>
            <div className='web_client_view_calendar_area'>
              <div className='web_client_view_calendar_bg'></div>
              <div className='web_client_view_calendar_date_text'>22-feb-2023</div>
            </div>
          </div>
          <div className='web_client_view_assessment_question_type_area'>
            <div className='web_client_view_header_text'>Submitted on</div>
            <div className='web_client_view_calendar_area'>
              <div className='web_client_view_calendar_bg'></div>
              <div className='web_client_view_calendar_date_text'>22-feb-2023</div>
            </div>
          </div>
          <div className='web_client_view_assessment_question_type_area'>
            <div className='web_client_view_header_text'>Assessment expiry date</div>
            <div className='web_client_view_calendar_area'>
              <div className='web_client_view_calendar_bg'></div>
              <div className='web_client_view_calendar_date_text'>22-feb-2023</div>
            </div>
          </div>
          <div className='web_client_view_assessment_question_type_area'>
            <div className='web_client_view_header_text'>Report created on</div>
            <div className='web_client_view_calendar_area'>
              <div className='web_client_view_calendar_bg'></div>
              <div className='web_client_view_calendar_date_text'>22-feb-2023</div>
            </div>
          </div>
        </div>
      </div>
      <div className='web_client_view_questioniare_text'>Questionaire</div>
      <div className='web_client_view_questioniare_flex_area'>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_internal_bg' onClick={navAdminQuestionaire}></div>
          <div className='web_client_view_category_bottom_text' >Internal <br></br>Environment</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_objective_bg'></div>
          <div className='web_client_view_category_bottom_text'>Objective <br></br>Settings</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_events_bg'></div>
          <div className='web_client_view_category_bottom_text'>Events <br></br>Identification</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_risk_bg'></div>
          <div className='web_client_view_category_bottom_text'>Risk <br></br>Assessment</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_organizational_bg'></div>
          <div className='web_client_view_category_bottom_text'>Organizational <br></br>Risk Management</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_contractual_bg'></div>
          <div className='web_client_view_category_bottom_text'>Contractual <br></br>Risk Management</div>
        </div>
      </div>
      <div className='web_client_view_questioniare_text'>Critical Values</div>
      <div className='web_client_view_bottom_questioniare_flex_area'>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_risk_variables_bg'></div>
          <div className='web_client_view_category_bottom_text'>Risk Variables</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_high_risk_bg'></div>
          <div className='web_client_view_category_bottom_text'>Value at Risk</div>
        </div>
        <div className='web_client_view_category_blk_area'>
          <div className='web_client_view_category_sheild_bg'></div>
          <div className='web_client_view_category_bottom_text'>Policy Analysis</div>
        </div>
      </div>
    </div>
  )
}

export default ClientViewDashboard;