import React, { useState, useEffect } from 'react';
import '../css/SuperAdminQuestionnaireList.css';
import ClientServices from '../../services/ClientServices';
import { ImageList, ImageListItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientTopNavHome from '../widgets/ClientTopNavHome';
import ProgressBar from "@ramonak/react-progress-bar";
import rightarrow from '../Assets/next_ic.gif'
import AdminTopNavHome from '../widgets/AdminTopNavHome';
import AdminTopNavHome2 from '../widgets/AdminTopNavHome2';

function SuperAdminQuestionnaireList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [clientID, setClientID] = useState("");
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        setClientID(location.state.clientID);
    }, []);

    useEffect(() => {
        const data = {
            clientID: location.state.clientID,
            controls: location.state.controls
        }
        ClientServices.controlsQuestion(data)
            .then(response => {
                setDataList(response.data.responses);
            })
            .catch(e => {
                console.log(e);
            });

    }, [clientID]);
    const nullCheck = answer => {
        if(answer!=null)
        {
            if (answer.length > 0) {
                return answer;
            }
            else {
                return "NOT RESPONDED";
            }
        }
        else {
            return "NOT RESPONDED";
        }
    }

    return (
        <div>
            <AdminTopNavHome2 clientID={location.state.clientID}></AdminTopNavHome2>
            <div className='web_superadmin_list_split'>
                {/* <div style={{ marginTop: '50px', color: 'black', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '30px', fontWeight: '600', textTransform: 'uppercase' }}>{team.replace(" %26 ", " & ")}</div> */}
                <div className='web_superadmin_list_split_view_flex_area'>
                    <ImageList cols={1} style={{ width: "100vw" }}>
                        {
                            dataList.map((data, index) => (
                                <div className='web_superadmin_list_split_view_flex_area_div'>
                                    <ImageListItem key={index}>
                                        <div style={{ display: 'flex', cursor: 'pointer', width: '88vw', minHeight: '15vh', margin: '15px', backgroundColor: '#fff', boxShadow: '1px 3px 9px #c1c2c3', borderLeft: '5px solid #0129BD', borderRadius: '2vh' }}>
                                            {/* <div style={{ width: '15vh', height: '15vh', borderRadius: '7.5vh', backgroundColor: '#0BDA51', color: 'black', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '25px', fontWeight: '600' }}>{index + 1}</div> */}
                                            <div style={{width:'75vw',marginTop:'3vh',marginBottom:'3vh'}}>
                                                <div style={{ color: '#0129BD', textTransform: 'uppercase', marginLeft: '2vw', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '17px', fontWeight: '500', minWidth: '38vw' }}>{index+1+". "+nullCheck(data.question)}</div>
                                                <div style={{ color: 'black', textTransform: 'uppercase', marginTop:'2vh', marginLeft: '2vw', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '17px', fontWeight: '500', minWidth: '38vw' }}>{"ANSWER: "+nullCheck(data.answer)}</div>
                                            </div>
                                            <div style={{ color: 'black', textTransform: 'uppercase', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', minWidth: '9vw', backgroundColor: '#B8F5C5', color: '#006624', height: '5vh', marginTop: '5vh', borderRadius: '10px' }}>Score: {data.score}</div>
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
export default SuperAdminQuestionnaireList;