const TimerPanel = ({ timer, onStartSession, gameState }) => {
    const [selectedDuration, setSelectedDuration] = useState(25 * 60); // Default 25 minutes
    
    const durations = [
        { label: '10 min', value: 10 * 60 },
        { label: '25 min', value: 25 * 60 },
        { label: '30 min', value: 30 * 60 },
        { label: '45 min', value: 45 * 60 },
        { label: '1 hour', value: 60 * 60 }
    ];
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    const getProgressPercentage = () => {
        if (!timer.duration) return 0;
        return ((timer.duration - timer.timeLeft) / timer.duration) * 100;
    };
    
    return (
        <div className="timer-panel">
            <h2>Focus Session</h2>
            
            {!timer.isActive ? (
                <div className="timer-setup">
                    <div className="duration-selector">
                        <h4>Choose Focus Duration:</h4>
                        <div className="duration-buttons">
                            {durations.map((duration) => (
                                <button
                                    key={duration.value}
                                    className={`duration-btn ${selectedDuration === duration.value ? 'active' : ''}`}
                                    onClick={() => setSelectedDuration(duration.value)}
                                >
                                    {duration.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="house-preview">
                        <h4>Building Progress:</h4>
                        <div className="build-stages">
                            <div className={`stage ${gameState.buildStage >= 1 ? 'completed' : 'pending'}`}>
                                <i data-feather="square"></i>
                                Foundation
                            </div>
                            <div className={`stage ${gameState.buildStage >= 2 ? 'completed' : 'pending'}`}>
                                <i data-feather="home"></i>
                                Walls
                            </div>
                            <div className={`stage ${gameState.buildStage >= 3 ? 'completed' : 'pending'}`}>
                                <i data-feather="triangle"></i>
                                Roof
                            </div>
                            <div className={`stage ${gameState.buildStage >= 4 ? 'completed' : 'pending'}`}>
                                <i data-feather="star"></i>
                                Finishing
                            </div>
                        </div>
                    </div>
                    
                    <button
                        className="start-btn btn btn-primary btn-lg"
                        onClick={() => onStartSession(selectedDuration)}
                    >
                        <i data-feather="play"></i>
                        Start Focus Session
                    </button>
                </div>
            ) : (
                <div className="timer-active">
                    <div className="timer-display">
                        <div className="time-remaining">
                            {formatTime(timer.timeLeft)}
                        </div>
                        
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        
                        <div className="session-info">
                            <span>Building Stage: {gameState.buildStage}/4</span>
                            <span>Total Time: {formatTime(timer.duration)}</span>
                        </div>
                    </div>
                    
                    <div className="timer-controls">
                        <button
                            className="btn btn-warning"
                            onClick={timer.pause}
                            disabled={timer.isPaused}
                        >
                            <i data-feather="pause"></i>
                            Pause
                        </button>
                        
                        <button
                            className="btn btn-success"
                            onClick={timer.resume}
                            disabled={!timer.isPaused}
                        >
                            <i data-feather="play"></i>
                            Resume
                        </button>
                        
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                timer.stop();
                                gameState.resetBuilding();
                            }}
                        >
                            <i data-feather="square"></i>
                            Stop
                        </button>
                    </div>
                    
                    <div className="focus-tips">
                        <p><strong>Stay Focused!</strong> Touching your phone will demolish the house.</p>
                        <p>Current House: {gameState.currentHouse}</p>
                    </div>
                </div>
            )}
            
            {timer.isCompleted && (
                <div className="completion-message">
                    <div className="success-animation">
                        <i data-feather="check-circle"></i>
                        <h3>Great Job!</h3>
                        <p>You successfully completed your focus session!</p>
                        <p>Your {gameState.currentHouse} has been built!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

window.TimerPanel = TimerPanel;
