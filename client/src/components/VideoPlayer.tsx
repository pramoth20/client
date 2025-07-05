import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
    onComplete: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        onComplete();
    };

    return (
        <div className="video-player">
            <video
                ref={videoRef}
                className="video-element"
                onEnded={handleEnded}
                controls
            >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-controls">
                {!isPlaying ? (
                    <button onClick={handlePlay}>Play</button>
                ) : (
                    <button onClick={handlePause}>Pause</button>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer; 