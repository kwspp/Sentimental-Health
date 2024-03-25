import React, { useState, useEffect } from 'react';
import { fetchSentimentScores } from '../firebase';

const SentimentScoreTable = ({ selectedPatient, lastUpdate }) => {
  const [sentimentScores, setSentimentScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedPatient) {
        const scores = await fetchSentimentScores(selectedPatient);
        setSentimentScores([...scores].reverse()); // Make a copy and reverse it
      }
    };

    fetchScores();
  }, [selectedPatient, lastUpdate]);

  return (
    <div>
      {sentimentScores.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Entry Number</th>
              <th>Sentiment Score</th>
            </tr>
          </thead>
          <tbody>
            {sentimentScores.map((score, index) => (
              <tr key={index}>
                <td>{sentimentScores.length - index}</td> {/* Adjust the index */}
                <td>{score.toFixed(2)}</td>
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
