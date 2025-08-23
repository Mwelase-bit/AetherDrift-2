const App = () => {
    const gameState = useGameState();
    const timer = useTimer();
    const rewards = useRewards(gameState, timer);
    
    const [activePanel, setActivePanel] = useState('timer');
    const [interruptionDetected, setInterruptionDetected] = useState(false);
    
    // Detect interruptions (touch/click events during focus)
    useEffect(() => {
        const handleInterruption = (e) => {
            if (timer.isActive && !timer.isPaused) {
                // Check if the interaction is not with the pause/stop buttons
                const target = e.target.closest('.timer-controls');
                if (!target) {
                    setInterruptionDetected(true);
                    timer.interrupt();
                    gameState.triggerDemolition();
                }
            }
        };
        
        if (timer.isActive && !timer.isPaused) {
            document.addEventListener('touchstart', handleInterruption);
            document.addEventListener('click', handleInterruption);
        }
        
        return () => {
            document.removeEventListener('touchstart', handleInterruption);
            document.removeEventListener('click', handleInterruption);
        };
    }, [timer.isActive, timer.isPaused]);
    
    // Handle timer completion
    useEffect(() => {
        if (timer.isCompleted) {
            gameState.completeBuilding();
            rewards.awardCoins(timer.duration);
            rewards.updateStreak();
            
            // Reset interruption detection
            setInterruptionDetected(false);
        }
    }, [timer.isCompleted]);
    
    // Handle interruption effects
    useEffect(() => {
        if (interruptionDetected) {
            setTimeout(() => {
                setInterruptionDetected(false);
            }, 3000); // Reset after demolition animation
        }
    }, [interruptionDetected]);
    
    const startFocusSession = (duration) => {
        timer.start(duration);
        gameState.startBuilding();
        setInterruptionDetected(false);
    };
    
    return (
        <div className="app">
            {/* 3D Game Scene */}
            <div className="game-canvas">
                <GameScene 
                    gameState={gameState}
                    timer={timer}
                    interruptionDetected={interruptionDetected}
                />
            </div>
            
            {/* UI Overlay */}
            <div className="ui-overlay">
                {/* Navigation Tabs */}
                <div className="nav-tabs">
                    <button 
                        className={`nav-tab ${activePanel === 'timer' ? 'active' : ''}`}
                        onClick={() => setActivePanel('timer')}
                    >
                        <i data-feather="clock"></i>
                        Focus
                    </button>
                    <button 
                        className={`nav-tab ${activePanel === 'rewards' ? 'active' : ''}`}
                        onClick={() => setActivePanel('rewards')}
                    >
                        <i data-feather="award"></i>
                        Rewards
                    </button>
                    <button 
                        className={`nav-tab ${activePanel === 'profile' ? 'active' : ''}`}
                        onClick={() => setActivePanel('profile')}
                    >
                        <i data-feather="user"></i>
                        Profile
                    </button>
                    <button 
                        className={`nav-tab ${activePanel === 'shop' ? 'active' : ''}`}
                        onClick={() => setActivePanel('shop')}
                    >
                        <i data-feather="shopping-bag"></i>
                        Shop
                    </button>
                </div>
                
                {/* Panel Content */}
                <div className="panel-content">
                    {activePanel === 'timer' && (
                        <TimerPanel 
                            timer={timer}
                            onStartSession={startFocusSession}
                            gameState={gameState}
                        />
                    )}
                    
                    {activePanel === 'rewards' && (
                        <RewardPanel rewards={rewards} />
                    )}
                    
                    {activePanel === 'profile' && (
                        <ProfilePanel 
                            gameState={gameState}
                            rewards={rewards}
                        />
                    )}
                    
                    {activePanel === 'shop' && (
                        <ShopPanel 
                            gameState={gameState}
                            rewards={rewards}
                        />
                    )}
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="status-bar">
                <div className="coins">
                    <i data-feather="dollar-sign"></i>
                    {rewards.coins}
                </div>
                <div className="streak">
                    <i data-feather="zap"></i>
                    {rewards.streak} day streak
                </div>
            </div>
            
            {/* Interruption Warning */}
            {interruptionDetected && (
                <div className="interruption-warning">
                    <div className="warning-content">
                        <i data-feather="alert-triangle"></i>
                        <h3>Focus Interrupted!</h3>
                        <p>Your house is being demolished...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

window.App = App;
