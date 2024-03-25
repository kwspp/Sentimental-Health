import React, { useState, useEffect } from 'react';
import { fetchSentimentScores } from '../firebase';

const SentimentScoreTable = ({ selectedPatient, lastUpdate }) => {
  const [sentimentScores, setSentimentScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedPatient) {
        const scores = await fetchSentimentScores(selectedPatient);
        setSentimentScores([...scores].reverse()); //reverse to have most recent first
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
    <div>
      {sentimentScores.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sentiment Score</th>
            </tr>
          </thead>
          <tbody>
            {sentimentScores.map((entry, index) => (
                <tr key={index}>
                <td>{formatDate(entry.date)}</td> 
                <td>{entry.score.toFixed(2)}</td>
                </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No sentiment data available.</div>
      )}
    </div>
  );
};

export default SentimentScoreTable;
