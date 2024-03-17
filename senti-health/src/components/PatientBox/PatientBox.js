import React, { useState, useEffect } from 'react';
import { addPatient, getPatientByPatientId, deletePatientByPatientId } from '../../firebase';
import './PatientBox.css';

const PatientBox = ({ patientId, onSelectPatient, isSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientByPatientId(patientId);
      if (patientData) {
        setPatientName(patientData.name);
        setPatientAge(patientData.age);
        setHasData(true);
      }
    };
    fetchPatientData();
  }, [patientId]);

  // handles showing modal or selecting patient
  const handleClick = () => {
    if (hasData) {
      onSelectPatient(patientId);
    } else {
      setIsModalOpen(true);
    }
  };

  // handles submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      name: patientName,
      age: parseInt(patientAge, 10),
      patientId
    };
    await addPatient(patientData);
    setIsModalOpen(false);
    setHasData(true);
  };

    const handleEdit = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    await deletePatientByPatientId(patientId);
    // set to null to indicate deletion
    setPatientName('');
    setPatientAge('');
    setHasData(false);
    onSelectPatient(null); // unselect the patient box
  };

  return (
    <div>
      {/* handles displaying patientBox in green on select */}
      <div onClick={handleClick} className={`patient-box ${isSelected ? 'selected' : ''}`}>
        <p className="patient-title">Patient #{patientId}</p>
        <span className="patient-icon">
          <i className="fas fa-plus-circle"></i>
        </span>
        {/* display patient info if exists */}
        {patientName && patientAge ? (
          <div> 
            <p>Name: {patientName}</p>
            <p>Age: {patientAge}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <p>Click to add patient details</p>
        )}
      </div>
      {/* handles modal logic */}
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
