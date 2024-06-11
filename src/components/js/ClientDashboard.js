import React, { useState, useEffect } from 'react';
import '../css/ClientDashboard.css';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';
import AdminTopNavHome from '../widgets/AdminTopNavHome';
import MasterPopup from '../popup/MasterPopup';
import ClientServices from '../../services/ClientServices';
import { ToastContainer, toast } from "react-toastify";

const ClientDashboard = () => {

  const [medicalHomeLay, setMedicalHomeLay] = useState("client_dashboard_remove");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClient();
    fetchCountData();
  }, []);

  const Navigate = useNavigate();

  function navAddClientComponent() {
    Navigate("/addClientComponent");
  }

  function navClientViewDashboard() {
    Navigate("/clientViewDashboard");
  }

  const [dataList, setDataList] = useState([]);

  const [pageNo, setPageNo] = useState(0);
  const [count, setCount] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const [pages, setPages] = useState([]);
  const totalPages = Math.ceil(count / pageCount);

  const fetchClient = () => {
    const searchData = {
      pageNo: pageNo,
      count: pageCount
    };
    ClientServices.fetchClient(searchData)
      .then(response => {
        if (response.data.status == true) {
          setDataList(response.data.responsedata);
          toast.success("CLIENT DETAILS FETCHED SUCCESSFULLY");
        }
        else {
          toast.error("ERROR FETCHING CLIENT!");
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        collapseSpinner();
      });

  }

  const resend = clientID => {
    ClientServices.resend(clientID)
      .then(response => {
        if (response.data == true) {
          toast.success("ASSESSMENT LINK SENT SUCCESSFULLY!")
        }
        else {
          toast.error("ASSESSMENT LINK SENT UNSUCCESSFULLY!");
        }
      })
      .catch(e => {
        console.log(e);
      });

  }

  const [searchCategory, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  //onChange handling
  const blurSearchValue = event => {
    setSearchValue(event.target.value);
  };
  const handleSearchCategory = event => {
    setSearchCategory(event.target.value);
  };
  const handlePageChange = event => {
    const value = event.target.value - 1;
    setPageNo(value);
  };
  const handlePageCountChange = event => {
    const value = event.target.value;
    setPageCount(value);
    console.log(pageCount);
  };

  // const dataList = [
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" },
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" },
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" },
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" },
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" },
  //   { name: "Bharath", company: "Volvo", mobile: "9876543212", email: "abc@abc.com" }
  // ];

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [name, setName] = useState("");

  const blurName = e => {
    setName(e.target.value);
  }

  const [designation, setDesignation] = useState("");

  const blurDesignation = e => {
    setDesignation(e.target.value);
  }

  const [company, setCompany] = useState("");

  const blurCompany = e => {
    setCompany(e.target.value);
  }

  const [industry, setIndustry] = useState("");

  const blurIndustry = e => {
    setIndustry(e.target.value);
  }

  const [email, setEmail] = useState("");

  const blurEmail = e => {
    setEmail(e.target.value);
  }

  const [mobile, setMobile] = useState("");

  const blurMobile = e => {
    setMobile(e.target.value);
  }

  const [duration, setDuration] = useState("");

  const blurDuration = e => {
    setDuration(e.target.value);
  }

  const [type, setType] = useState("");

  const blurType = e => {
    setType(e.target.value);
  }

  const filterData = async () => {
    await setMedicalHomeLay("client_dashboard_remove");
    await setIsLoading(true);
    if (searchCategory.length > 0 && searchValue.length > 0) {
      await filterSearch();
      await changeCountData();
    }
    else {
      fetchClient();
    }
  };

  const reload = () => {
    window.location.reload(false);
  }

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const addClient = () => {
    const data = {
      name: name,
      company: company,
      designation: designation,
      industry: industry,
      emailID: email,
      mobileNo: mobile,
      duration: duration,
      type: type
    }
    ClientServices.insertClient(data)
      .then(response => {
        if (response.data.status == true) {
          togglePopup();
          toast.success("CLIENT CREATED SUCCESSFULLY!");
          window.location.reload(false);
        }
        else {
          toast.error("ERROR CREATING CLIENT!");
        }
      })
      .catch(e => {
        console.log(e);
      });

  }

  const fetchCountData = async () => {
    ClientServices.getAllCount()
      .then(response => {
        var a = response.data;
        setCount(a);
        var clmCnt = a;
        var cnt = 5;
        var p = [];
        while (clmCnt > 0) {
          if ((cnt * 2) > clmCnt) {
            p.push(clmCnt);
            break;
          }
          else {
            if (cnt > 150) {
              break;
            }
            else {
              cnt = cnt * 2;
              p.push(cnt);
            }
          }
        }
        setPages(p);
        fetchClient();
      })
      .catch(e => {
        console.log(e);
      });
  };

  //filterData
  const filterSearch = async () => {
    const searchData = {
      pageNo: pageNo,
      count: pageCount,
      type: searchCategory,
      value: searchValue
    };
    await ClientServices.filterAdminClient(searchData)
      .then(response => {
        setDataList(response.data);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        collapseSpinner();
      });
  };

  const changeCountData = () => {
    const searchData = {
      type: searchCategory,
      value: searchValue
    };
    ClientServices.filterAdminClientCount(searchData)
      .then(response => {
        var a = response.data;
        setCount(a);
        var clmCnt = a;
        var cnt = 5;
        var p = [];
        if (clmCnt == 10) {
          p.push(clmCnt);
        }
        else {
          while (clmCnt > 0) {
            if ((cnt * 2) > clmCnt) {
              p.push(clmCnt);
              break;
            }
            else {
              if (cnt > 150) {
                break;
              }
              else {
                cnt = cnt * 2;
                p.push(cnt);
              }
            }
          }
        }
        setPages(p);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const collapseSpinner = async () => {
    await delay(pageCount * 9);
    await setMedicalHomeLay("");
    await setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="client_dashboard_spinner"><span className="client_dashboard_loader"></span></div>}
      <ToastContainer position="top-right" />
      <div className={medicalHomeLay}>
        <div className='web_clients_modify'>
          <AdminTopNavHome></AdminTopNavHome>
          <div className='web_client_dashboard_header_area'>
            <div>
              <div className='web_client_dashboard_text'>Clients Dashboard</div>
              <div className='web_client_dashboard_border'></div>
            </div>
            <Button className='web_client_dashboard_new_button21' variant='light' onClick={togglePopup}>NEW </Button>
            {isOpen && <MasterPopup
              content={<>
                <div>
                  <div className="web_client_dashboard_block_head" >
                    <h5 className="web_client_dashboard_block_head_text" >Add New Client</h5>
                    <div className="web_client_dashboard_block_close" onClick={togglePopup}></div>
                  </div>
                  <div className="web_client_dashboard_add_hosp_pop">
                    <div className="web_client_dashboard_block_flux">
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Name</h6>
                        <input className='web_client_dashboard_block_input_pop' onBlur={blurName}></input>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Designation</h6>
                        <input className='web_client_dashboard_block_input' onBlur={blurDesignation}></input>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Company Name</h6>
                        <input className='web_client_dashboard_block_input' onBlur={blurCompany}></input>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Industry</h6>
                        <select className='web_client_dashboard_block_input_pop' onBlur={blurIndustry}>
                          <option>Select</option>
                          <option>Technology</option>
                          <option>Manufacturing</option>
                          <option>BFSI</option>
                          <option>Pharma</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="web_client_dashboard_block_flux">
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Email ID</h6>
                        <input className='web_client_dashboard_block_input_pop' type='email' onBlur={blurEmail}></input>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Mobile Number</h6>
                        <input className='web_client_dashboard_block_input' type='text' onBlur={blurMobile}></input>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Duration (In Days)</h6>
                        <select className='web_client_dashboard_block_input_pop' onBlur={blurDuration}>
                          <option>Select</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                          <option>25</option>
                          <option>30</option>
                        </select>
                      </div>
                      <div >
                        <h6 className="web_client_dashboard_block_filed_heading">Type</h6>
                        <select className='web_client_dashboard_block_input_pop' onBlur={blurType}>
                          <option>Select</option>
                          <option>NCYB PRO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="web_client_dashboard_pop_button_area">
                    <Button className="web_client_dashboard_filter_button" onClick={addClient}>SUBMIT</Button>
                  </div>
                </div>
              </>}
              handleClose={togglePopup}
            />}
          </div>


          <div className='web_client_dashboard_search_flex_area'>
            <div>
              <div className='web_client_dashboard_field_text'>FIELD TYPE</div>
              <select className='web_client_dashboard_select_input_text' value={searchCategory} onChange={handleSearchCategory}>
                <option>SELECT</option>
                <option>name</option>
                <option >company</option>
                <option >email</option>
                <option >year</option>
              </select>
            </div>
            <div>
              <div className='web_client_dashboard_search_text'>SEARCH</div>
              <input type='text' className='web_client_dashboard_search_input' onBlur={blurSearchValue} placeholder='Search Content'></input>
            </div>
            <Button className='web_client_dashboard_filter_button' onClick={filterData}>FILTER</Button>
            <Button className='web_client_dashboard_filter_button' onClick={reload} >CLEAR ALL</Button>
            <div>
              <div className='web_client_dashboard_page_text'>PAGE </div>
              <input type='text' className='web_client_dashboard_page_input' onChange={handlePageChange} value={pageNo + 1} placeholder='Page No'></input>
            </div>
            <div className='web_client_dashboard_page_size_text'>OF  {totalPages}</div>
            <select className='web_client_dashboard_page_size_input' value={pageCount} onChange={handlePageCountChange}>
              {pages.map((data12, index) =>
                <option key={index} value={data12}>{data12}</option>
              )};
            </select>
            <Button className='web_client_dashboard_filter_button' onClick={filterData}>APPLY</Button>
          </div>
          <div className='web_client_dashboard_view_flex_area'>
            <ImageList cols={3} rowHeight={300} style={{ width: "96vw" }}>
              {
                dataList.map((data) => (
                  <div className='web_client_dashboard_view_flex_area_div'>
                    <ImageListItem key={data.id} style={{ cursor: 'pointer' }} >
                      <div className='web_client_dashboard_client_view_area'>
                        <div className='web_client_dashboard_top_view_area'>
                          <div className='web_client_dashboard_left_border'>
                            <div className='web_client_dashboard_id_text'>{data.id}</div>
                          </div>
                          <div className='web_client_dashboard_top_text_area'>
                            <div className='web_client_dashboard_top_view_text' onClick={navClientViewDashboard}>{data.name} </div>
                          </div>
                          <div className='web_client_dashboard_right_border'>
                            <div className='web_client_dashboard_percentage_text'>{data.progress}%</div>
                          </div>
                        </div>
                        <div className='web_client_dashboard_client_content_area'>
                          <div className='web_client_dashboard_client_view_bg' ></div>
                          <div className='web_client_dashboard_view_blk_right'>
                            <div className='web_client_dashboard_view_office_flex_area'>
                              <div className='web_client_dashboard_office_bg'></div>
                              <div className='web_client_dashboard_office_text'> {data.company}</div>
                            </div>
                            <div className='web_client_dashboard_view_office_flex_area'>
                              <div className='web_client_dashboard_phone_bg'></div>
                              <div className='web_client_dashboard_phone_text'>{data.mobileNo}</div>
                            </div>
                            <div className='web_client_dashboard_view_office_flex_area'>
                              <div className='web_client_dashboard_mail_bg'></div>
                              <div className='web_client_dashboard_phone_text'>{data.emailID}</div>
                            </div>
                            <div className='web_client_dashboard_view_office_flex_area'>
                              <div className='web_client_dashboard_eye_bg'></div>
                              <div className='web_client_dashboard_eye_text'>{data.initiatedDate}</div>
                            </div>

                          </div>
                        </div>
                        <div className='web_client_dashboard_top_view_area'>
                          <div className='web_client_dashboard_left_bottom_border'>
                            <div className='web_client_dashboard_time_bg' onClick={() => resend(data.id)}></div>
                          </div>
                          <div className='web_client_dashboard_top_text_area'>
                            <div className='web_client_dashboard_bottom_view_text'>Value at Risk : <span className='web_client_dashboard_insured_number'> 0</span></div>
                            <Button variant='link' onClick={() => Navigate('/superAdminQuestionnaireDasboard', { state: { clientID: data.id } })}>VIEW</Button>
                          </div>
                          <div className='web_client_dashboard_right_bottom_border'>
                            <div className='web_client_dashboard_expiry_bg'></div>
                          </div>
                        </div>
                      </div>
                    </ImageListItem>
                  </div>
                ))
              }
            </ImageList>

          </div>
        </div>
        <div className='mobile_basic_cards_modify'>
          <div className='mobile_clients_modify'>
            <div className='mobile_client_dashboard_logo_area'>
              <div className='mobile_client_dashboard_logo_bg'></div>
              <div className='mobile_client_dashboard_option_text'>Dashboard</div>
              <div className='mobile_client_dashboard_option_text'>Clients</div>
              <div className='mobile_client_dashboard_option_text'>Users</div>
              <div>
                <div class="mobile_dropdown">
                  <button class="mobile_dropbtn">MASTERS <span className='mobile_dropbtn-arrow_bg'></span></button>
                  <div class="mobile_dropdown-content">
                    <Button variant='mask' >Insurance</Button>
                    <Button variant='mask' >Questionaire</Button>
                    <Button variant='mask' >Industry</Button>
                    <Button variant='mask' >Edit Users</Button>
                  </div>
                </div>
              </div>

              <div className='mobile_client_dashboard_bell_icon_bg'></div>
              <div className='mobile_client_dashboard_user_icon_bg'></div>
              {/* <div className='mobile_client_dashboard_user_name_text'>SuperAdmin</div> */}
            </div>
            <div className='mobile_client_dashboard_header_area'>
              <div className='mobile_client_dashboard_text'>Clients Dashboard</div>
              <Button className='mobile_client_dashboard_new_button' onClick={navAddClientComponent}>NEW </Button>
            </div>
            <div className='mobile_client_dashboard_search_flex_area'>
              <div>
                <div className='mobile_client_dashboard_field_text'>FIELD TYPE</div>
                <select className='mobile_client_dashboard_select_input_text'>
                  <option>SELECT</option>
                  <option >CLIENT NAME</option>
                  <option >COMPANY NAME</option>
                  <option >MAIL ID</option>
                  <option >YEAR</option>
                </select>
              </div>
              <div>
                <div className='mobile_client_dashboard_search_text'>SEARCH</div>
                <input type='text' className='mobile_client_dashboard_search_input' placeholder='Search Content'></input>
              </div>
              <Button className='mobile_client_dashboard_filter_button'>FILTER</Button>
              <Button className='mobile_client_dashboard_clear_button'>CLEAR ALL</Button>
              <div className='mobile_client_dashboard_page_area_flex'>
                <div>
                  <div className='mobile_client_dashboard_page_text'>PAGE </div>
                  <input type='text' className='mobile_client_dashboard_page_input' placeholder='Page No'></input>
                </div>
                <div>
                  <div className='mobile_client_dashboard_page_size_text'>OF 500</div>
                  <input type='text' className='mobile_client_dashboard_page_size_input' placeholder='Page Size'></input>
                  <Button className='mobile_client_dashboard_apply_button'>APPLY</Button>
                </div>
              </div>
              <div className='mobile_client_dashboard_client_view_area'>
                <div className='mobile_client_dashboard_top_view_area'>
                  <div className='mobile_client_dashboard_left_border'>
                    <div className='mobile_client_dashboard_id_text'>911</div>
                  </div>
                  <div className='mobile_client_dashboard_top_text_area'>
                    <div className='mobile_client_dashboard_top_view_text'>Anand Kulkarni</div>
                  </div>
                  <div className='mobile_client_dashboard_right_border'>
                    <div className='mobile_client_dashboard_percentage_text'>100%</div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_client_content_area'>
                  <div className='mobile_client_dashboard_client_view_bg' ></div>
                  <div className='mobile_client_dashboard_view_blk_right'>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_office_bg'></div>
                      <div className='mobile_client_dashboard_office_text'>Persistent Systems</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_phone_bg'></div>
                      <div className='mobile_client_dashboard_phone_text'>9842267754</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_mail_bg'></div>
                      <div className='mobile_client_dashboard_mail_text'>mail@transasiatec.com</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_eye_bg'></div>
                      <div className='mobile_client_dashboard_eye_text'>05-08-2023 9.30AM</div>
                    </div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_bottom_view_area'>
                  <div className='mobile_client_dashboard_left_bottom_border'>
                    <div className='mobile_client_dashboard_time_bg'></div>
                  </div>
                  <div className='mobile_client_dashboard_bottom_view_text'>Sum insured : <span className='mobile_client_dashboard_insured_number'> 3,00,000</span></div>
                  <div className='mobile_client_dashboard_right_bottom_border'>
                    <div className='mobile_client_dashboard_expiry_bg'></div>
                  </div>
                </div>
              </div>
              <div className='mobile_client_dashboard_client_view_area'>
                <div className='mobile_client_dashboard_top_view_area'>
                  <div className='mobile_client_dashboard_left_border'>
                    <div className='mobile_client_dashboard_id_text'>911</div>
                  </div>
                  <div className='mobile_client_dashboard_top_text_area'>
                    <div className='mobile_client_dashboard_top_view_text'>Anand Kulkarni</div>
                  </div>
                  <div className='mobile_client_dashboard_right_border'>
                    <div className='mobile_client_dashboard_percentage_text'>100%</div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_client_content_area'>
                  <div className='mobile_client_dashboard_client_view_bg' ></div>
                  <div className='mobile_client_dashboard_view_blk_right'>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_office_bg'></div>
                      <div className='mobile_client_dashboard_office_text'>Persistent Systems</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_phone_bg'></div>
                      <div className='mobile_client_dashboard_phone_text'>9842267754</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_mail_bg'></div>
                      <div className='mobile_client_dashboard_mail_text'>mail@transasiatec.com</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_eye_bg'></div>
                      <div className='mobile_client_dashboard_eye_text'>05-08-2023 9.30AM</div>
                    </div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_bottom_view_area'>
                  <div className='mobile_client_dashboard_left_bottom_border'>
                    <div className='mobile_client_dashboard_time_bg'></div>
                  </div>
                  <div className='mobile_client_dashboard_bottom_view_text'>Sum insured : <span className='mobile_client_dashboard_insured_number'> 3,00,000</span></div>
                  <div className='mobile_client_dashboard_right_bottom_border'>
                    <div className='mobile_client_dashboard_expiry_bg'></div>
                  </div>
                </div>
              </div>
              <div className='mobile_client_dashboard_client_view_area'>
                <div className='mobile_client_dashboard_top_view_area'>
                  <div className='mobile_client_dashboard_left_border'>
                    <div className='mobile_client_dashboard_id_text'>911</div>
                  </div>
                  <div className='mobile_client_dashboard_top_text_area'>
                    <div className='mobile_client_dashboard_top_view_text'>Anand Kulkarni</div>
                  </div>
                  <div className='mobile_client_dashboard_right_border'>
                    <div className='mobile_client_dashboard_percentage_text'>100%</div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_client_content_area'>
                  <div className='mobile_client_dashboard_client_view_bg' ></div>
                  <div className='mobile_client_dashboard_view_blk_right'>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_office_bg'></div>
                      <div className='mobile_client_dashboard_office_text'>Persistent Systems</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_phone_bg'></div>
                      <div className='mobile_client_dashboard_phone_text'>9842267754</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_mail_bg'></div>
                      <div className='mobile_client_dashboard_mail_text'>mail@transasiatec.com</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_eye_bg'></div>
                      <div className='mobile_client_dashboard_eye_text'>05-08-2023 9.30AM</div>
                    </div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_bottom_view_area'>
                  <div className='mobile_client_dashboard_left_bottom_border'>
                    <div className='mobile_client_dashboard_time_bg'></div>
                  </div>
                  <div className='mobile_client_dashboard_bottom_view_text'>Sum insured : <span className='mobile_client_dashboard_insured_number'> 3,00,000</span></div>
                  <div className='mobile_client_dashboard_right_bottom_border'>
                    <div className='mobile_client_dashboard_expiry_bg'></div>
                  </div>
                </div>
              </div>
              <div className='mobile_client_dashboard_client_view_area'>
                <div className='mobile_client_dashboard_top_view_area'>
                  <div className='mobile_client_dashboard_left_border'>
                    <div className='mobile_client_dashboard_id_text'>911</div>
                  </div>
                  <div className='mobile_client_dashboard_top_text_area'>
                    <div className='mobile_client_dashboard_top_view_text'>Anand Kulkarni</div>
                  </div>
                  <div className='mobile_client_dashboard_right_border'>
                    <div className='mobile_client_dashboard_percentage_text'>100%</div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_client_content_area'>
                  <div className='mobile_client_dashboard_client_view_bg' ></div>
                  <div className='mobile_client_dashboard_view_blk_right'>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_office_bg'></div>
                      <div className='mobile_client_dashboard_office_text'>Persistent Systems</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_phone_bg'></div>
                      <div className='mobile_client_dashboard_phone_text'>9842267754</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_mail_bg'></div>
                      <div className='mobile_client_dashboard_mail_text'>mail@transasiatec.com</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_eye_bg'></div>
                      <div className='mobile_client_dashboard_eye_text'>05-08-2023 9.30AM</div>
                    </div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_bottom_view_area'>
                  <div className='mobile_client_dashboard_left_bottom_border'>
                    <div className='mobile_client_dashboard_time_bg'></div>
                  </div>
                  <div className='mobile_client_dashboard_bottom_view_text'>Sum insured : <span className='mobile_client_dashboard_insured_number'> 3,00,000</span></div>
                  <div className='mobile_client_dashboard_right_bottom_border'>
                    <div className='mobile_client_dashboard_expiry_bg'></div>
                  </div>
                </div>
              </div>
              <div className='mobile_client_dashboard_client_view_area'>
                <div className='mobile_client_dashboard_top_view_area'>
                  <div className='mobile_client_dashboard_left_border'>
                    <div className='mobile_client_dashboard_id_text'>911</div>
                  </div>
                  <div className='mobile_client_dashboard_top_text_area'>
                    <div className='mobile_client_dashboard_top_view_text'>Anand Kulkarni</div>
                  </div>
                  <div className='mobile_client_dashboard_right_border'>
                    <div className='mobile_client_dashboard_percentage_text'>100%</div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_client_content_area'>
                  <div className='mobile_client_dashboard_client_view_bg' ></div>
                  <div className='mobile_client_dashboard_view_blk_right'>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_office_bg'></div>
                      <div className='mobile_client_dashboard_office_text'>Persistent Systems</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_phone_bg'></div>
                      <div className='mobile_client_dashboard_phone_text'>9842267754</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_mail_bg'></div>
                      <div className='mobile_client_dashboard_mail_text'>mail@transasiatec.com</div>
                    </div>
                    <div className='mobile_client_dashboard_view_office_flex_area'>
                      <div className='mobile_client_dashboard_eye_bg'></div>
                      <div className='mobile_client_dashboard_eye_text'>05-08-2023 9.30AM</div>
                    </div>
                  </div>
                </div>
                <div className='mobile_client_dashboard_bottom_view_area'>
                  <div className='mobile_client_dashboard_left_bottom_border'>
                    <div className='mobile_client_dashboard_time_bg'></div>
                  </div>
                  <div className='mobile_client_dashboard_bottom_view_text'>Sum insured : <span className='mobile_client_dashboard_insured_number'> 3,00,000</span></div>
                  <div className='mobile_client_dashboard_right_bottom_border'>
                    <div className='mobile_client_dashboard_expiry_bg'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ClientDashboard;
