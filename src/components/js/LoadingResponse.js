import '../css/LoadingResponse.css'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function LoadingResponse() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        nav();
    }, []);

    const nav = async () => {
        await delay(300);
        await navigate('/clientQuestionaire', { state: { replace: true, clientID: location.state.clientID, controls: location.state.controls, index: location.state.index } });
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    return (
        <div className="client_dashboard_spinner"><span className="client_dashboard_loader"></span></div>
    );
}
export default LoadingResponse;