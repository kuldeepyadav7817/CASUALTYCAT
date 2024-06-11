import React from 'react'
import '../css/AddUserComponent.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import MasterPopup from '../popup/MasterPopup';
import AdminTopNavHome from '../widgets/AdminTopNavHome';

const AddUserComponent = () => {

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
      setIsOpen(!isOpen);
  }
  return (
    <div>
      <AdminTopNavHome></AdminTopNavHome>
      <div className='web_client_dashboard_header_area'>
        <div>
          <div className='web_Insurance_dashboard_text'>User List Dashboard</div>
          <div className='web_User_List_dashboard_border'></div>
        </div>
      </div>
      <div className='web_client_dashboard_header_area'>
        <div className='web_user_add_list_text'>Select Add User Type : </div>
        <div className='web_user_type_text_area'>
          <div className='web_user_type_text' onClick={togglePopup}>Insurer</div>
          {isOpen && <MasterPopup
            content={<>
              <div>
                <div className="web_client_dashboard_block_head" >
                  <h5 className="web_client_dashboard_block_head_text" >Add Insurance Company</h5>
                  <div className="web_client_dashboard_block_close" onClick={togglePopup}></div>
                </div>
                <div className="web_client_dashboard_add_hosp_pop">
                  <div className="web_client_dashboard_block_flux">
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Company Name</h6>
                      <input className='web_client_dashboard_block_input_pop' ></input>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Address</h6>
                      <input className='web_client_dashboard_block_input' ></input>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Company Logo</h6>
                      <input className='web_client_dashboard_block_input' ></input>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Contact Number</h6>
                      <input className='web_client_dashboard_block_input' ></input>
                    </div>
                  </div>
                  <div className="web_client_dashboard_block_flux">
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Link Expiry Date</h6>
                      <select className='web_client_dashboard_block_input_pop' >
                        <option>Select</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                      </select>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Duration of Subscription</h6>
                      <input className='web_client_dashboard_block_input_pop' type='email' ></input>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">No of Agents</h6>
                      <input className='web_client_dashboard_block_input_pop' type='email' ></input>
                    </div>
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">Payment Mode</h6>
                      <select className='web_client_dashboard_block_input_pop' >
                        <option>Select</option>
                        <option>Pre-paid</option>
                        <option>Post-paid</option>
                      </select>
                    </div>
                  </div>
                  <div className="web_client_dashboard_block_flux">
                    <div >
                      <h6 className="web_client_dashboard_block_filed_heading">No of Tokens</h6>
                      <input className='web_client_dashboard_block_input_pop' type='email' ></input>
                    </div>
                  </div>
                </div>
                <div className="web_client_dashboard_pop_button_area">
                  <Button className="web_client_dashboard_filter_button" >SUBMIT</Button>
                </div>
              </div>
            </>}
            handleClose={togglePopup}
          />}
        </div>
        <div className='web_user_type_text_area'>
          <div className='web_user_type_text'>Underwriter</div>
        </div>
        <div className='web_user_type_text_area'>
          <div className='web_user_type_text'>Intermediatary / Agents</div>
        </div>
      </div>
      <div className='web_client_dashboard_search_flex_area'>
        <div>
          <div className='web_client_dashboard_field_text'>FIELD TYPE</div>
          <select className='web_client_dashboard_select_input_text' >
            <option>SELECT</option>
            <option>name</option>
            <option >company</option>
            <option >email</option>
            <option >year</option>
          </select>
        </div>
        <div>
          <div className='web_client_dashboard_search_text'>SEARCH</div>
          <input type='text' className='web_client_dashboard_search_input' placeholder='Search Content'></input>
        </div>
        <Button className='web_client_dashboard_filter_button' >FILTER</Button>
        <Button className='web_client_dashboard_filter_button'  >CLEAR ALL</Button>
        <div>
          <div className='web_client_dashboard_page_text'>PAGE </div>
          <input type='text' className='web_client_dashboard_page_input' placeholder='Page No'></input>
        </div>
        <div className='web_client_dashboard_page_size_text'>OF  </div>
        <select className='web_client_dashboard_page_size_input' >
          {/* {pages.map((data12, index) =>
                                <option key={index} value={data12}>{data12}</option>
                            )}; */}
        </select>
        <Button className='web_client_dashboard_filter_button' >APPLY</Button>
      </div>
    </div>
  )
}

export default AddUserComponent
