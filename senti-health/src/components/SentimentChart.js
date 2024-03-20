import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../canvasjs.react';
import { fetchSentimentScores } from '../firebase';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SentimentChart = ({ selectedPatient, lastUpdate }) => {
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedPatient) {
                try {
                    let sentimentScores = await fetchSentimentScores(selectedPatient);
                    // Prepare the data points for the chart
                    const points = sentimentScores.map((score, index) => ({
                        x: index + 1,
                        y: score
                    }));
                    setDataPoints(points);
                } catch (error) {
                    console.log('Error processing sentiment scores: ', error);
                }
            }
        };

        fetchData();
    }, [selectedPatient, lastUpdate]);

    // Set up the chart options
    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Sentiment Analysis Over Time"
        },
        axisX: {
            title: "Entry Number",
            interval: 1,
        },
        axisY: {
            title: "Sentiment Score",
            includeZero: false,
            minimum: -1, // Set the minimum of the y-axis to -1
            maximum: 1, // Set the maximum of the y-axis to 1
        },
        data: [{
            type: "line",
            color: "#4E834E", 
            dataPoints: dataPoints
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default SentimentChart;
