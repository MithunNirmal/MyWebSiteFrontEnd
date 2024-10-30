import React from 'react';
import { useRef , useState, useEffect } from 'react';


const AudioPlayer = ({ fileId }) => {
    const audioUrl = `http://192.168.1.101:8080/api/v1/album/public/stream/${fileId}`; // Replace with your backend URL
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bufferedRange, setBufferedRange] = useState(0);

    // Update current time and duration
    useEffect(() => {
        const audio = audioRef.current;

        const updateCurrentTime = () => {
            setCurrentTime(audio.currentTime);
            setBufferedRange(audio.buffered.length > 0 ? audio.buffered.end(0) : 0);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", updateCurrentTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        return () => {
            audio.removeEventListener("timeupdate", updateCurrentTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

    const increaseVolume = () => {
        if (audioRef.current.volume < 1) {
            audioRef.current.volume += 0.1;
        }
    };

    const decreaseVolume = () => {
        if (audioRef.current.volume > 0) {
            audioRef.current.volume -= 0.1;
        }
    };

    // Update current time based on the progress bar
    const handleProgressChange = (event) => {
        const seekTime = (event.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
    };

    return (
        <div>
            <audio ref={audioRef} preload="auto" src={audioUrl} type="audio/mpeg"></audio>
            <div>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={increaseVolume}>Vol +</button>
                <button onClick={decreaseVolume}>Vol -</button>
            </div>
            <div className="mt-3">
                <p>
                    Current Time: {currentTime.toFixed(2)}s / Duration: {duration.toFixed(2)}s
                </p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={duration > 0 ? (currentTime / duration) * 100 : 0}
                    onChange={handleProgressChange}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
