import React, { useState } from 'react';
import { addPatient } from '../../firebase';
import './PatientBox.css';

const PatientBox = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const patientData = {
      name: patientName,
      age: parseInt(patientAge, 10),
      patientId: patientId
    };

    addPatient(patientData)
    .then((docRef) => {
      console.log(`Patient added with ID: ${docRef.id}`);
    })
    .catch((error) => {
      console.error('Error adding patient:', error);
    });    setIsModalOpen(false);
    
  };

  return (
    <div>
      <div className="patient-box" onClick={() => setIsModalOpen(true)}>
        <p className="patient-title">Patient #{patientId}</p>
        <span className="patient-icon">
          <i className="fas fa-plus-circle"></i>
        </span>
        {patientName && patientAge ? (
          <div> 
            <p>Name: {patientName}</p>
            <p>Age: {patientAge}</p>
          </div>
        ) : (
          <p>Click to add patient details</p>
        )}
      </div>
      <div className="modal" style={{ display: isModalOpen ? "block" : "none" }}>
        <div className="modal-content">
          <span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </label>
            <label>
              Age:
              <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientBox;
