import React, { useState, useEffect } from 'react';
import '../css/SuperAdminQuestionnaireTeamSplit.css';
import ClientServices from '../../services/ClientServices';
import { ImageList, ImageListItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientTopNavHome from '../widgets/ClientTopNavHome';
import ProgressBar from "@ramonak/react-progress-bar";
import rightarrow from '../Assets/next_ic.gif'
import AdminTopNavHome from '../widgets/AdminTopNavHome';
import AdminTopNavHome2 from '../widgets/AdminTopNavHome2';

function SuperAdminQuestionnaireTeamSplit() {
    const location = useLocation();
    const navigate = useNavigate();
    const [clientID, setClientID] = useState("");
    const [team, setTeam] = useState("");
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        setClientID(location.state.clientID);
        setTeam(location.state.team);
    }, []);

    useEffect(() => {
        controls();
    }, [team]);

    const controls = () => {
        if(team!=""&&clientID!="")
        {
            const data = {
                clientID: clientID,
                team: team
            }
            ClientServices.controls(data)
                .then(response => {
                    setDataList(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const navQues = controls => {
        navigate('/superAdminQuestionnaireList', { state: { clientID: clientID, controls: controls} });
    }

    return (
        <div>
            <AdminTopNavHome2 clientID={location.state.clientID}></AdminTopNavHome2>
            <div className='web_superadmin_team_split'>
                {/* <div style={{ marginTop: '50px', color: 'black', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '30px', fontWeight: '600', textTransform: 'uppercase' }}>{team.replace(" %26 ", " & ")}</div> */}
                <div className='web_superadmin_team_split_view_flex_area'>
                    <ImageList cols={1} rowHeight={115} style={{ width: "100vw" }}>
                        {
                            dataList.map((data, index) => (
                                <div className='web_superadmin_team_split_view_flex_area_div'>
                                    <ImageListItem key={index}>
                                        <div onClick={()=>navQues(data.name)} style={{ display: 'flex', cursor: 'pointer', width: '88vw', height: '12vh', margin: '15px', backgroundColor: '#fff', boxShadow: '1px 3px 9px #c1c2c3', borderLeft:'5px solid #0129BD', borderRadius: '2vh' }}>
                                            {/* <div style={{ width: '15vh', height: '15vh', borderRadius: '7.5vh', backgroundColor: '#0BDA51', color: 'black', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '25px', fontWeight: '600' }}>{index + 1}</div> */}
                                            <div style={{ color: 'black', textTransform: 'uppercase', marginLeft: '2vw', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '17px', fontWeight: '500', minWidth: '38vw' }}>{data.name}</div>
                                            <div style={{ color: 'black', textTransform: 'uppercase', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', minWidth: '9vw', backgroundColor:'#B8F5C5', color:'#006624',height:'5vh', marginTop:'3.5vh',borderRadius:'10px' }}>Questions: {data.count}</div>
                                            <div style={{ color: 'black', textTransform: 'uppercase', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', width: '300px',height:'5vh', marginTop:'3.5vh', marginLeft:'6%'}}><ProgressBar completed={data.progress} bgColor='#0129BD' borderRadius='15px' height='20px' width='300px'/></div>
                                            {/* <div style={{ color: 'black', textTransform: 'uppercase', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', width: '9vw', backgroundColor:'#B8F5C5', color:'#006624',height:'5vh', marginTop:'3.5vh',borderRadius:'10px' }}>Responded: 10</div>
                                            <div style={{ color: 'black', textTransform: 'uppercase', marginLeft: '3vw', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', width: '8vw', backgroundColor:'#FCB8C0', color:'#A71900',height:'5vh', marginTop:'3.5vh',borderRadius:'10px' }}>Pending: 10</div> */}
                                            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500', width: '300px', marginLeft:'7%'}}><img src={rightarrow} width={35} height={35}></img></div>
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
export default SuperAdminQuestionnaireTeamSplit;