import React, { useEffect, useState } from 'react'
import '../css/ClientQuestionaire.css'
import { ImageList, ImageListItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientTopNavHome from '../widgets/ClientTopNavHome';
import ClientServices from '../../services/ClientServices';
import { ToastContainer, toast } from "react-toastify";
import { Button } from 'react-bootstrap';

const ClientQuestionaire = () => {

  const [active, setActive] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [controls, setControls] = useState("");
  const [team, setTeam] = useState("");
  const [size, setSize] = useState(0);
  const [index, setIndex] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [cr, setCr] = useState({});
  const [qList, setQList] = useState([]);
  const [markText, setMarkText] = useState("");
  useEffect(() => {
    setIndex(location.state.index);
  }, []);

  useEffect(() => {
    const data = {
      clientID: location.state.clientID,
      controls: location.state.controls
    }
    ClientServices.controlsQuestion(data)
      .then(response => {
        setCr(response.data);
        setDataList(response.data.responses.at(location.state.index).options);
        setCompany(response.data.company);
        setQues(response.data.responses.at(location.state.index).question);
        setSize(response.data.responses.length);
        setTeam(response.data.responses.at(location.state.index).team);
        setControls(response.data.responses.at(location.state.index).controls);
        setQList(response.data.responses);
        if (response.data.responses.at(location.state.index).marked == true) {
          setMarkText("UNMARK");
        }
        else {
          setMarkText("MARK");
        }
        if (response.data.responses.at(location.state.index).answerOption > 0)
          setActive(response.data.responses.at(location.state.index).answerOption - 1);
      })
      .catch(e => {
        console.log(e);
      });

  }, [index]);

  useEffect(() => {
    if (cr != null)
      if (cr.responses != null)
        if (active != cr.responses.at(location.state.index).answerOption - 1) {
          const data = {
            clientID: location.state.clientID,
            answer: cr.responses.at(location.state.index).options.at(active).name,
            score: cr.responses.at(location.state.index).options.at(active).score,
            index: cr.responses.at(location.state.index).index,
            answerOption: active + 1
          }
          ClientServices.saveRes(data)
            .then(response => {
              if (response.data != null)
                toast.success("RESPONSE SAVED SUCCESSFULLY")
            })
            .catch(e => {
              console.log(e);
            });
        }
  }, [active]);


  const arr = [{ id: "cricket" }, { id: "Football" }, { id: "Basketball" }];
  const [ques, setQues] = useState("");
  const forward = () => {
    if (index + 1 < size) {
      navigate('/loadingResponse', { state: { clientID: location.state.clientID, controls: location.state.controls, index: index + 1 } });
    }
  }
  const backward = () => {
    if (index > 0) {
      navigate('/loadingResponse', { state: { clientID: location.state.clientID, controls: location.state.controls, index: index - 1 } });
    }
  }
  const getName = index => {
    if (index == 0) {
      return 'A';
    }
    else if (index == 1) {
      return 'B';
    }
    else if (index == 2) {
      return 'C';
    }
    else if (index == 3) {
      return 'D';
    }
    else if (index == 4) {
      return 'E';
    }
  }
  const getClass = index => {
    if (index == active) {
      return "web_client_Questionaire_option_blk_active";
    }
    else {
      return "web_client_Questionaire_option_blk_inactive";
    }
  }
  const getTextClass = index => {
    if (index == active) {
      return "web_client_Questionaire_option_text_active";
    }
    else {
      return "web_client_Questionaire_option_text_inactive";
    }
  }
  const getStatus = index1 => {
    var data = qList.at(index1);
    if (index1 == index) {
      return "web_client_questionaire_status_circle_active";
    }
    else if (data.marked == true) {
      return "web_client_questionaire_status_circle_amber";
    }
    else if (data.answer.length > 0) {
      return "web_client_questionaire_status_circle_green";
    }
    else {
      return "web_client_questionaire_status_circle_red";
    }
  }
  const markQues = () => {
    const data = {
      clientID: location.state.clientID,
      value: !cr.responses.at(location.state.index).marked,
      index: cr.responses.at(location.state.index).index
    }
    ClientServices.markQues(data)
      .then(response => {
        if (response.data == true) {
          toast.success("RESPONSE MARKED SUCCESSFULLY")
          if (markText == "MARK")
            setMarkText("UNMARK");
          else
            setMarkText("MARK");
        }

      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <div>
      <ToastContainer position="top-right" />
      <ClientTopNavHome company={company}></ClientTopNavHome>
      {/* <div style={{ marginTop: '10px', paddingBottom: '10px', borderBottom: '1px solid #c1c2c3', color: '#0129BD', display: 'flex', justifyContent: 'left', paddingLeft:'30px', fontFamily: 'Poppins', fontSize: '28px', fontWeight: '600', textTransform: 'uppercase' }}><div>{company}</div><div style={{fontSize:'17px',marginLeft:'72%',marginTop:'10px',cursor:'pointer',color: '#000'}} onClick={()=>navigate('/clientQuestionnaireTeamSplit', { state: { clientID: 1,team: team } })}>CONTROLS</div><div className='web_client_questionaire_bg' style={{display:'flex',alignItems:'center',fontSize:'15px',marginLeft:'20px',marginTop:'2px',cursor:'pointer',color: '#000',border:'1px solid #0129BD',borderRadius:'10px',padding:'8px'}} onClick={()=>navigate('/clientQuestionnaireDasboard')}>TEAMS</div></div> */}
      <div style={{ display: 'flex' }}>
        {/* <div className='web_client_Questionaire_left_arrow' onClick={backward}></div> */}
        <div style={{ width: '75vw', height: '91vh' }}>
          <div className='web_client_Questionaire_Question_section_area'>
            <div className='web_client_Questionaire_Question_section_text'>{ques}</div>
          </div>
          <ImageList rowHeight={'auto'} cols={1}  >
            {
              dataList.map((data, index) => (
                <ImageListItem key={index} style={{ display: 'grid', placeItems: 'center' }}>
                  <div style={{ display: 'grid', placeItems: 'center', width: '350px', height: '60px', }} onClick={() => setActive(index)}>
                    <div className={getClass(index)}>
                      <div style={{ minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px', borderRadius: '20px', textAlign: 'center', backgroundColor: '#fff', color: '#000', border: '2px solid #c1c2c3', textAlign: 'center', display: 'flex', alignItems: "center", justifyContent: 'center', fontFamily: "Poppins", fontWeight: '600', fontSize: '18px' }}>{getName(index)}</div>
                      <div className={getTextClass(index)}>{data.name}</div>
                    </div>
                  </div>
                </ImageListItem>
              ))
            }
          </ImageList>
          <div style={{ display: "flex", justifyContent: 'center', marginTop: '8vh', marginBottom:'10vh' }}>
            <Button className='web_client_dashboard_new_button2' onClick={backward}>BACK</Button>
            <Button className='web_client_dashboard_new_button2' onClick={markQues}>{markText}</Button>
            <Button className='web_client_dashboard_new_button2' onClick={forward}>NEXT</Button>
          </div>
        </div>
        <div style={{ width: '22vw', backgroundColor: '#fff', boxShadow: '2px 6px 18px #e1e2e3', marginTop: '7vh', maxHeight:'75vh', marginRight: '3vw', borderRadius: '30px' }}>
          <div style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
            <div className='web_client_Questionaire_heading_area' onClick={() => navigate('/clientQuestionnaireTeamSplit', { state: { clientID: location.state.clientID, team: team } })}>
              <div className='web_client_Questionaire_head_section_text'>{controls}</div>
            </div>
            <div className='web_client_Questionaire_section_area'>
              <div className='web_client_Questionaire_section_text'>Question {index + 1}/{size}</div>
            </div>
            <ImageList rowHeight={'auto'} cols={4} style={{ width: '20vw', maxHeight:'45vh' }} >
              {
                qList.map((data, index) => (
                  <ImageListItem key={index} style={{ display: 'grid', placeItems: 'center', marginBottom: '3vh' }}>
                    <div onClick={()=>navigate('/loadingResponse', { state: { clientID: location.state.clientID, controls: location.state.controls, index: index } })} className={getStatus(index)}>{index + 1}</div>
                  </ImageListItem>
                ))
              }
            </ImageList>
          </div>
        </div>
        {/* <div className='web_client_Questionaire_right_arrow' onClick={forward}></div> */}
      </div>

    </div>
  )
}

export default ClientQuestionaire
