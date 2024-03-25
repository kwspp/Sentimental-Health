import React, { useState } from 'react';
import PatientBox from './components/PatientBox/PatientBox';
import PatientConvo from './components/PatientConvo/PatientConvo';
import SentimentChart from './components/SentimentChart';
import Header from './components/Header/Header';
import SentimentScoreTable from './components/SentimentScoreTable/SentimentScoreTable';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const handleSelectPatient = (patientId) => {
    if (selectedPatient === patientId) {
      setSelectedPatient(null); // unselect if the same patient is clicked again
    } else {
      setSelectedPatient(patientId);
    }
  };

  return (
    <div className="App">
      <Header />
      <section className="section">
        <div className="container">
          <div className="columns">
            
            {/* Column for PatientBoxes stacked vertically */}
            <div className="column is-3">
              {[1, 2, 3].map((patientId) => (
                <PatientBox
                  key={patientId}
                  patientId={patientId}
                  onSelectPatient={handleSelectPatient}
                  isSelected={selectedPatient === patientId}
                />
              ))}
            </div>
  
            {/* Column for SentimentChart and SentimentScoreTable stacked vertically */}
            <div className="column is-6">
              <SentimentChart selectedPatient={selectedPatient} lastUpdate={lastUpdate} />
              <SentimentScoreTable selectedPatient={selectedPatient} lastUpdate={lastUpdate} />
            </div>
  
            {/* Column for PatientConvo */}
            <div className="column is-3">
              <PatientConvo selectedPatient={selectedPatient} onNewSentiment={() => setLastUpdate(Date.now())} />
            </div>
  
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
