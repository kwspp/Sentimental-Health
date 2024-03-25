import React, { useState, useEffect } from 'react';
import { fetchSentimentScores } from '../../firebase';
import './SentimentScoreTable.css'

const SentimentScoreTable = ({ selectedPatient, lastUpdate }) => {
  const [sentimentScores, setSentimentScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedPatient) {
        const scores = await fetchSentimentScores(selectedPatient);
        setSentimentScores([...scores].reverse()); //reverse to have most recent first
      } else {
        setSentimentScores([]);
      }
    };

    fetchScores();
  }, [selectedPatient, lastUpdate]);

  const formatDate = (firebaseTimestamp) => {
    const date = firebaseTimestamp.toDate(); // Convert Timestamp to JavaScript Date object
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}> {/* Add padding and center alignment */}
      {sentimentScores.length > 0 ? (
        <div className="table-container"> {/* Makes table scrollable on mobile */}
          <table className="table is-striped is-hoverable is-fullwidth" style={{ width: '50%', maxWidth: '600px' }}> {/* Set the desired width and max-width */}
            <thead>
              <tr>
                <th className="has-text-centered">Date</th>
                <th className="has-text-centered">Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {sentimentScores.map((entry, index) => (
                <tr key={index}>
                  <td className="has-text-centered">{formatDate(entry.date)}</td>
                  <td className="has-text-centered">{entry.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="has-text-centered">No sentiment data available.</div>
      )}
    </div>
  );
};

export default SentimentScoreTable;
