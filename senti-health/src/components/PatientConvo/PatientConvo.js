import React from 'react'
import './PatientConvo.css';

const PatientConvo = () => {
  return (
    <div className="patient-convo">
        <p className="convo-title">Patient Conversation</p>
            <div className="convo-input">
                <input type="text" placeholder="Type here..." />
            </div>
        <p>Enter details to save in the conversation</p>
    </div>
  )
}

export default PatientConvo;
