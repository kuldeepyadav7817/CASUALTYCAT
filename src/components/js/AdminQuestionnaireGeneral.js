import React, { useEffect, useState } from "react";
import '../css/ClientQuestionnaireGeneral.css';
import ClientServices from "../../services/ClientServices";
import { ImageList, ImageListItem } from "@mui/material";
// import ClientTopNavHome from "../widgets/ClientTopNavHome";
import { ToastContainer, toast } from "react-toastify";
import AdminTopNavHome2 from "../widgets/AdminTopNavHome2";

function AdminQuestionnaireGeneral() {

    const [clientID,setClientID] = useState(null);
    const [dataList, setDataList] = useState([]);

    const fetchData = () => {
        ClientServices.generalQuestions(clientID)
            .then(response => {
                setDataList(response.data.response);
                if (response.data.response[9].answer.length > 0) {
                    setRemoveClaimFormAdd("web_admin_upload_medical_remove");
                    setRemoveClaimFormView("");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        setClientID(localStorage.getItem("clientID"));
    }, []);

    useEffect(() => {
        fetchData();
    }, [clientID]);

    const fetchTextType = type => {
        if (type == "textbox") {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchOptionsType = type => {
        if (type == "options") {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchCheckType = type => {
        if (type == "checkbox") {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchFileType = type => {
        if (type == "file") {
            return true;
        }
        else {
            return false;
        }
    }



    const changeCheck = event => {
        // const data = {
        //     clientID: clientID,
        //     id: event.target.id,
        //     answer: event.target.value,
        //     value: event.target.checked
        // }
        // ClientServices.saveGeneralCheck(data)
        //     .then(response => {
        //         if (response.data == true) {
        //             toast.success("RESPONSE SAVED SUCCESSFULLY");
        //         }
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    const blurText = event => {
        const data = {
            clientID: clientID,
            id: event.target.id,
            answer: event.target.value
        }
        ClientServices.saveGeneral(data)
            .then(response => {
                if (response.data == true) {
                    toast.success("RESPONSE SAVED SUCCESSFULLY");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const [claimForm, setCliamForm] = useState(undefined);
    const [removeClaimFormAdd, setRemoveClaimFormAdd] = useState("");
    const [removeClaimFormView, setRemoveClaimFormView] = useState("web_admin_upload_medical_remove");

    const claimFormChange = e => {
        setCliamForm(e.target.files[0]);
    };

    const uploadClaimForm = async () => {
        if (claimForm != null) {
            var formData = new FormData();
            formData.append('file', claimForm);
            const docData = {
                clientID: clientID,
                category: "BRSR_ESG_REPORT",
                formData: formData
            };
            ClientServices.uploadDoc(docData)
                .then(response => {
                    var path = response.data.fileDirectory;
                    window.location.reload(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            toast.error("PLEASE SELECT VALID FILE!");
        }
    };

    const deleteClaimForm = path => {
        const docData = {
            clientID: clientID,
            path: path
        };
        ClientServices.deleteDoc(docData)
            .then(response => {
                if (response.data == true) {
                    setRemoveClaimFormAdd("");
                    setRemoveClaimFormView("web_admin_upload_medical_remove");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const viewClaimForm = path => {
        window.open('https://ctrackpro.transasiatec.com/ctrackweb/ant/viewAPI?path=' + path + '', '_blank');
    }

    return (
        <div>
            <ToastContainer position="top-right" />
            <AdminTopNavHome2 clientID={clientID}></AdminTopNavHome2>
            <div className='web_clientside_general'>
                {/* <div style={{ marginTop: '50px', color: 'black', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '30px', fontWeight: '600', textTransform: 'uppercase' }}>{team.replace(" %26 ", " & ")}</div> */}
                <div className='web_clientside_general_view_flex_area'>
                    <ImageList cols={3} rowHeight={180} style={{ width: "100vw" }}>
                        {
                            dataList.map((data, index) => (
                                <div className='web_clientside_general_view_flex_area_div'>
                                    <ImageListItem key={index}>
                                        <div style={{ display: 'flex', cursor: 'pointer', width: '28vw', height: '21vh', margin: '15px', backgroundColor: '#fff', boxShadow: '1px 3px 9px #c1c2c3', borderLeft: '5px solid #0129BD', borderRadius: '2vh' }}>
                                            <div>
                                                <div style={{ color: 'black', textTransform: 'uppercase', marginLeft: '2vw', marginTop: '3vh', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500', minWidth: '38vw' }}>{data.name}</div>
                                                {fetchTextType(data.type) && <input id={data.id} readOnly={true} defaultValue={data.answer} className='web_clientside_general_view_input' type='number'></input>}
                                                {fetchOptionsType(data.type) && <input id={data.id} defaultValue={data.answer} readOnly={true} className='web_clientside_general_view_input'></input>}
                                                {fetchFileType(data.type) &&
                                                    <div>
                                                        <div style={{ display: 'flex' }} className={removeClaimFormAdd}>
                                                            <input className="form-control" type="file" style={{ marginLeft: '2vw', marginTop: '3vh', width: '20vw', cursor: 'pointer' }} placeholder="SELECT FILE" onChange={claimFormChange}></input>
                                                            <div className="web_admin_upload_medical_btn_blue_area">
                                                                <div className="web_admin_upload_medical_btn_add_icon" ></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex' }} className={removeClaimFormView}>
                                                            <input className="form-control" readOnly={true} type="input" style={{ marginLeft: '2vw', marginTop: '3vh', width: '20vw', cursor: 'pointer' }} onClick={()=>viewClaimForm(data.answer)} defaultValue={"BRSR/ESG REPORT"} placeholder="SELECT FILE"></input>
                                                            <div className="web_admin_upload_medical_btn_blue_area">
                                                                <div className="web_admin_upload_medical_btn_delete" ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {fetchCheckType(data.type) && <div>
                                                    <div style={{ display: 'flex' }}>
                                                        <input id={data.id} onChange={changeCheck} readOnly={true} checked={data.check.india} value={"INDIA"} type="checkbox" style={{ height: '20px', width: '20px', marginLeft: '2vw', marginTop: '2vh' }}></input>
                                                        <h6 style={{ color: '#696969', textTransform: 'uppercase', marginLeft: '0.5vw', marginTop: '2vh', fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>INDIA</h6>
                                                        <input id={data.id} onChange={changeCheck} readOnly={true} checked={data.check.europe} value={"EUROPE"} type="checkbox" style={{ height: '20px', width: '20px', marginLeft: '0.5vw', marginTop: '2vh' }}></input>
                                                        <h6 style={{ color: '#696969', textTransform: 'uppercase', marginLeft: '0.5vw', marginTop: '2vh', fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>EUROPE</h6>
                                                        <input id={data.id} onChange={changeCheck} readOnly={true} checked={data.check.usa} value={"USA"} type="checkbox" style={{ height: '20px', width: '20px', marginLeft: '0.5vw', marginTop: '2vh' }}></input>
                                                        <h6 style={{ color: '#696969', textTransform: 'uppercase', marginLeft: '0.5vw', marginTop: '2vh', fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>USA</h6>
                                                    </div>
                                                    <div style={{ display: 'flex' }}>
                                                        <input id={data.id} onChange={changeCheck} readOnly={true} checked={data.check.singapore} value={"SINGAPORE"} type="checkbox" style={{ height: '20px', width: '20px', marginLeft: '2vw', marginTop: '2vh' }}></input>
                                                        <h6 style={{ color: '#696969', textTransform: 'uppercase', marginLeft: '0.5vw', marginTop: '2vh', fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>SINGAPORE</h6>
                                                        <input id={data.id} onChange={changeCheck} readOnly={true} checked={data.check.others} value={"OTHERS"} type="checkbox" style={{ height: '20px', width: '20px', marginLeft: '0.5vw', marginTop: '2vh' }}></input>
                                                        <h6 style={{ color: '#696969', textTransform: 'uppercase', marginLeft: '0.5vw', marginTop: '2vh', fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>OTHERS</h6>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </ImageListItem>
                                </div>
                            ))
                        }
                    </ImageList>

                </div>
            </div>
        </div>
    );
}
export default AdminQuestionnaireGeneral;