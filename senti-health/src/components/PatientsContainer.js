import React from 'react';
import PatientBox from './PatientBox';

const PatientsContainer = () => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <PatientBox patientId={1} />
        </div>
        <div className="column">
          <PatientBox patientId={2} />
        </div>
        <div className="column">
          <PatientBox patientId={3} />
        </div>
      </div>
    </div>
  );
};

export default PatientsContainer;
