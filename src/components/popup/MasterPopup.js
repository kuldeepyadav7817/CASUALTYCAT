import React from "react";
import './MasterPopup.css';

const MasterPopup = props => {
  return (
    <div className="master-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div >
        <div className="master_popup" style={{ boxShadow: '1px 3px 9px #00145D' }}>
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default MasterPopup;