import React, { useState, useRef } from 'react';
import video1 from './video1.mp4';

const Video = () => {
const videoRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);

const handlePlay = () => {
videoRef.current.play();
setIsPlaying(true);
};

const handlePause = () => {
videoRef.current.pause();
setIsPlaying(false);
};

return (
<div>
<video ref={videoRef} width="640" height="360">
<source src={video1} type="video/mp4" />
</video>
<div>
{isPlaying ? (
<button onClick={handlePause}>Pause</button>
) : (
<button onClick={handlePlay}>Play</button>
)}
</div>
</div>
);
};

export default Video;
