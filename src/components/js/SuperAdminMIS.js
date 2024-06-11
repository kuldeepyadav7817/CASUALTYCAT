import React, { useState, useEffect } from 'react';
import '../css/SuperAdminMIS.css';
import { Button } from 'react-bootstrap';
import AdminTopNavHome2 from '../widgets/AdminTopNavHome2';
import ClientServices from '../../services/ClientServices';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';

function SuperAdminMIS() {
    const location = useLocation();
    const Navigate = useNavigate();
    const [clientID, setClientID] = useState(null);
    useEffect(() => {
        setClientID(location.state.clientID);
    }, []);
    const [value, setValue] = useState({});
    useEffect(() => {
        if (clientID != null) {
            localStorage.setItem("cID", clientID);
            ClientServices.valueatrisk(clientID)
                .then(response => {
                    if (response.data != null) {
                        setValue(response.data);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [clientID]);
    const regenerate = () => {
        ClientServices.regenerate(clientID)
            .then(response => {
                if (response.data == true) {
                    toast.success("REGENERATION SUCCESSFULL");
                    window.location.reload(false);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div>
            <AdminTopNavHome2 clientID={clientID}></AdminTopNavHome2>
            <ToastContainer position="top-right" />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                <Button className='web_superadmin_mis_new_button' onClick={regenerate}>REGENERATE</Button>
                <Button className='web_superadmin_mis_new_button' onClick={() => Navigate("/AdminCIReportWord", { state: { clientID: clientID } })}>REPORT</Button>
            </div>
            <div style={{ display: 'grid', placeItems: 'center', marginTop: '6vh' }}>
                <div style={{ display: 'block', placeItems: 'center', cursor: 'pointer', minWidth: '50vw', padding: '30px', minHeight: '15vh', margin: '15px', backgroundColor: '#fff', boxShadow: '1px 3px 9px #c1c2c3', borderLeft: '5px solid #0129BD', borderRadius: '2vh' }}>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#000', marginTop: '0.1vh' }}>{"D&O VALUE AT RISK ----> " + value.doVar + " (INR)"}</div>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#000', marginTop: '2vh' }}  >{"PI VALUE AT RISK ----> " + value.piVar + " (INR)"}</div>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#000', marginTop: '2vh' }}  >{"PPI VALUE AT RISK ----> " + value.ppiVar + " (INR)"}</div>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#000', marginTop: '2vh' }}  >{"CGL VALUE AT RISK ----> " + value.cglVar + " (INR)"}</div>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#000', marginTop: '2vh' }}  >{"CRIME VALUE AT RISK ----> " + value.crimeVar + " (INR)"}</div>
                    <div style={{ color: 'black', textTransform: 'uppercase', display: 'flex', placeItems: 'left', fontFamily: 'Poppins', fontSize: '22px', fontWeight: '500', color: '#0129BD', marginTop: '2vh' }}  >{"FINAL VALUE AT RISK ----> " + value.finalVar + " (INR)"}</div>
                </div>
            </div>
        </div>
    );
}
export default SuperAdminMIS;