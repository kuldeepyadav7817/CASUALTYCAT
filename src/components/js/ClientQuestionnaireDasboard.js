import React, { useState, useEffect } from 'react';
import '../css/ClientQuestionnaireDasboard.css';
import Qst from '../Assets/qst.png'
import rightarrow from '../Assets/right_arrow.gif'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ClientTopNavHome from '../widgets/ClientTopNavHome';
import MasterPopup from '../popup/MasterPopup';
import ClientServices from '../../services/ClientServices';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


function ClientQuestionnaireDasboard() {

    const [clientID,setClientID] = useState(null);

    const navigate = useNavigate();
    const navTeamSplit = team => {
        navigate('/clientQuestionnaireTeamSplit', { state: { clientID: clientID, team: team } });
    }

    const [dataList, setDataList] = useState({});

    const fetchData = () => {
        ClientServices.getQuesCountTeam(clientID)
            .then(response => {
                setDataList(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const [general, setGeneral] = useState(null);

    const generalStatus = () => {
        ClientServices.generalStatus(clientID)
            .then(response => {
                setGeneral(response.data);
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
        generalStatus();
    }, [clientID]);

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

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
            <ClientTopNavHome company={"CLIENT ASSESSMENT DASHBOARD"}></ClientTopNavHome>
            <div className='web_clientside_dashboard' style={{ backgroundColor: '#fff' }}>
                <div className='web_clientside_dashboard_categories_blk_area'>
                    <div className='web_clientside_dashboard_categories_flex_area'>
                        <div className='web_clientside_dashboard_client_category_area' >
                            <div className='web_clientside_dashboard_general_category_bg' onClick={()=>navigate('/clientQuestionnaireGeneral')}><img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{9 + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#1DA1F2", pathColor: "#1DA1F2", trailColor: "transparent", textSize:'30px' }) } value={zeroCheck(Math.ceil(general))} text={zeroCheck(Math.ceil(general))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                        <div className='web_clientside_dashboard_client_category_area' onClick={() => navTeamSplit("BOARD")}>
                            <div className='web_clientside_dashboard_board_category_bg'><img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{dataList.boardCount + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#0129BD", pathColor: "#0129BD", trailColor: "transparent", textSize:'30px' }) } value={zeroCheck(Math.ceil((dataList.boardProgress / dataList.boardCount) * 100))} text={zeroCheck(Math.ceil((dataList.boardProgress / dataList.boardCount) * 100))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                        <div className='web_clientside_dashboard_client_category_area' onClick={() => navTeamSplit("RISK")}>
                            <div className='web_clientside_dashboard_risk_category_bg'><img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{dataList.riskCount + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#F84E05", pathColor: "#F84E05", trailColor: "transparent", textSize:'30px' }) }  value={zeroCheck(Math.ceil((dataList.riskProgress / dataList.riskCount) * 100))} text={zeroCheck(Math.ceil((dataList.riskProgress / dataList.riskCount) * 100))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                        <div className='web_clientside_dashboard_client_category_area' onClick={() => navTeamSplit("RISK %26 COMPLIANCES")}>
                            <div className='web_clientside_dashboard_compliance_category_bg'>  <img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{dataList.compliancesCount + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#F84E05", pathColor: "#F84E05", trailColor: "transparent", textSize:'30px' }) }  value={zeroCheck(Math.ceil((dataList.compliancesProgress / dataList.compliancesCount) * 100))} text={zeroCheck(Math.ceil((dataList.compliancesProgress / dataList.compliancesCount) * 100))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                        <div className='web_clientside_dashboard_client_category_area' onClick={() => navTeamSplit("RISK %26 OPERATIONS")}>
                            <div className='web_clientside_dashboard_operation_category_bg'>  <img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{dataList.operationsCount + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#1DA1F2", pathColor: "#1DA1F2", trailColor: "transparent", textSize:'30px' }) }  value={zeroCheck(Math.ceil((dataList.operationsProgress / dataList.operationsCount) * 100))} text={zeroCheck(Math.ceil((dataList.operationsProgress / dataList.operationsCount) * 100))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                        <div className='web_clientside_dashboard_client_category_area' onClick={() => navTeamSplit("RISK %26 LEGAL")}>
                            <div className='web_clientside_dashboard_legal_category_bg'>  <img style={{ marginBottom: '22px', marginLeft: '28px' }} width={27} height={27} src={Qst}></img><h5 style={{ margin: '0px', padding: '0px', marginBottom: '25px', marginLeft: '5px', fontFamily: 'Poppins', fontSize: '14px', color: '#676767', width:'155px' }}>{dataList.legalCount + " Questions"}</h5><div style={{display:'block'}}><div style={{ width: 45, height: 45, marginBottom: '50px', fontWeight:'600', fontFamily:'Poppins', marginLeft: '10px' }}><CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "#fff", textColor: "#2F006A", pathColor: "#2F006A", trailColor: "transparent", textSize:'30px' }) }  value={zeroCheck(Math.ceil((dataList.legalProgress / dataList.legalCount) * 100))} text={zeroCheck(Math.ceil((dataList.legalProgress / dataList.legalCount) * 100))} /></div><img style={{ marginBottom: '20px', marginLeft: '10px', borderRadius:'10px' }} src={rightarrow} width={50} height={50}></img></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ClientQuestionnaireDasboard;