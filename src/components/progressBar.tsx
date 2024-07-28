"use client";
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let intervalSpeed = 50;
        let progressIncrement = 1.5;
        const progressDecrement = 0.007;
        const intervalSpeedIncrement = 1;

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress;
                }

                intervalSpeed += intervalSpeedIncrement;
                progressIncrement = Math.max(progressIncrement - progressDecrement, 0.1);

                return prevProgress + progressIncrement;
            });
        }, intervalSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full fixed top-0 left-0 z-50 h-1">
            <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
