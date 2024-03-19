import React from 'react';
import CanvasJSReact from '../canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SentimentChart = ({ sentimentScores }) => {
    // Prepare the data points for the chart
    const dataPoints = sentimentScores.map((score, index) => ({
        x: index + 1, // Assuming you want to start the x-axis at 1
        y: score
    }));

    // Set up the chart options
    const options = {
        animationEnabled: true,
        theme: "light2", // or "dark1", "dark2"
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
