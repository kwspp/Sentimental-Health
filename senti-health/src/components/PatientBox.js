import React from 'react';

const PatientBox = ({ patientId }) => {
  return (
    <div className="box has-text-centered has-text-primary-light has-background-dark">
      <p className="title is-5 has-text-primary-light">Patient #{patientId}</p>
      <span className="icon is-large">
        <i className="fas fa-plus-circle fa-2x"></i>
      </span>
      <p>Click to add patient details</p>
    </div>
  );
};

export default PatientBox;
