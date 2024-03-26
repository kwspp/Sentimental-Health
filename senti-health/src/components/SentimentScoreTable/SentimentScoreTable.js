import React, { useState, useEffect } from 'react';
import { fetchSentimentScores } from '../../firebase';
import './SentimentScoreTable.css';

const SentimentScoreTable = ({ selectedPatient, lastUpdate }) => {
  const [sentimentScores, setSentimentScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedPatient) {
        const scores = await fetchSentimentScores(selectedPatient);
        setSentimentScores([...scores].reverse()); // Reverse to have the most recent first
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

  // Adjusted function to calculate the running average from bottom up
  const calculateAverageFromBottom = (index) => {
    let sum = 0;
    let count = 0;
    for (let i = sentimentScores.length - 1; i >= index; i--) {
      sum += sentimentScores[i].score;
      count++;
    }
    return (sum / count).toFixed(2); // Return average from current index to the end
  };

  // Function to determine the color of the sentiment score based on its value
  const getScoreColor = (score) => {
    if (score > 0) return '#4E834E';
    if (score < 0) return '#C70039';
    return 'black'; // Score is exactly 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      {sentimentScores.length > 0 ? (
        <div className="table-container">
          <table className="table is-striped is-hoverable is-fullwidth" style={{ width: '50%', maxWidth: '600px' }}>
            <thead>
              <tr>
                <th className="has-text-centered">Date</th>
                <th className="has-text-centered">Sentiment Score</th>
                <th className="has-text-centered">Average</th> {/* New Average Column Header */}
              </tr>
            </thead>
            <tbody>
              {sentimentScores.map((entry, index) => (
                <tr key={index}>
                  <td className="has-text-centered">{formatDate(entry.date)}</td>
                  <td className="has-text-centered" style={{ color: getScoreColor(entry.score) }}>
                    {entry.score.toFixed(2)}
                  </td>
                  <td className="has-text-centered">{calculateAverageFromBottom(index)}</td> {/* Display adjusted average */}
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
