import React from 'react'
import './PatientConvo.css';

const PatientConvo = () => {
  return (
      <div className="patient-convo">
          <p className="convo-title">Patient Conversation</p>
              <div className="convo-input">
                  <textarea placeholder="Type here..." />
              </div>
          <p>Enter details to save in the conversation</p>
        <button type="submit">Submit</button>
      </div>
  )
}

export default PatientConvo;
