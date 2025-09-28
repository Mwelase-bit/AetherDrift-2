 // Import CommunityPanel
const CommunityPanel = window.CommunityPanel;

const App = () => {
    const gameState = useGameState();
    const timer = useTimer();
    const rewards = useRewards(gameState, timer);
    
    const [activePanel, setActivePanel] = useState('timer');
    const [interruptionDetected, setInterruptionDetected] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Detect interruptions (touch/click events during focus)
    useEffect(() => {
        const handleInterruption = (e) => {
            if (timer.isActive && !timer.isPaused) {
                // Check if the interaction is with UI elements (don't interrupt)
                const target = e.target;
                const isUIElement = target.closest('.timer-panel') || 
                                   target.closest('.ui-overlay') || 
                                   target.closest('.nav-tabs') ||
                                   target.closest('.panel-content') ||
                                   target.closest('.timer-controls') ||
                                   target.closest('button') ||
                                   target.closest('input') ||
                                   target.closest('label') ||
                                   target.closest('.mobile-menu-toggle');
                
                if (!isUIElement) {
                    console.log('Interruption detected - demolishing house');
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
    
    // Force building to start when timer becomes active
    useEffect(() => {
        if (timer.isActive && !gameState.isBuilding) {
            console.log('Timer is active but building is not - forcing building to start');
            gameState.startBuilding();
        }
    }, [timer.isActive, gameState.isBuilding]);

    // Castle is always complete - no building stages needed

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
        console.log('Starting focus session with duration:', duration);
        console.log('Before start - gameState.isBuilding:', gameState.isBuilding, 'buildStage:', gameState.buildStage);
        
        // Reset building state first
        gameState.resetBuilding();
        
        // Start timer
        timer.start(duration);
        
        // Start building
        gameState.startBuilding();
        
        setInterruptionDetected(false);
        
        console.log('After start - gameState.isBuilding:', gameState.isBuilding, 'buildStage:', gameState.buildStage);
        console.log('Timer state - isActive:', timer.isActive, 'timeLeft:', timer.timeLeft);
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
            
            {/* Debug Info */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '12px',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                <div>Castle Complete: Yes</div>
                <div>Timer Active: {timer.isActive ? 'Yes' : 'No'}</div>
                <div>Current Estate: {gameState.currentHouse}</div>
            </div>
            
            {/* UI Overlay */}
            {!timer.isActive ? (
                <div className="ui-overlay">
                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i data-feather="menu"></i>
                    </button>
                    
                    <div className={`nav-tabs ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        <button 
                            className={`nav-tab ${activePanel === 'timer' ? 'active' : ''}`}
                            onClick={() => {
                                setActivePanel('timer');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <i data-feather="clock"></i>
                            Focus
                        </button>
                        <button 
                            className={`nav-tab ${activePanel === 'rewards' ? 'active' : ''}`}
                            onClick={() => {
                                setActivePanel('rewards');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <i data-feather="award"></i>
                            Rewards
                        </button>
                        <button 
                            className={`nav-tab ${activePanel === 'profile' ? 'active' : ''}`}
                            onClick={() => {
                                setActivePanel('profile');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <i data-feather="user"></i>
                            Profile
                        </button>
                        <button 
                            className={`nav-tab ${activePanel === 'community' ? 'active' : ''}`}
                            onClick={() => {
                                setActivePanel('community');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <i data-feather="users"></i>
                            Community
                        </button>
                        <button 
                            className={`nav-tab ${activePanel === 'shop' ? 'active' : ''}`}
                            onClick={() => {
                                setActivePanel('shop');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <i data-feather="shopping-bag"></i>
                            Shop
                        </button>
                    </div>
                    
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
                        
                        {activePanel === 'community' && (
                            <CommunityPanel 
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
            ) : (
                // Timer only at the bottom when session is active, left aligned
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 200,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pointerEvents: 'auto'
                }}>
                    <div style={{
                        marginLeft: '18px', // add some left margin
                    }}>
                        <TimerPanel 
                            timer={timer}
                            onStartSession={startFocusSession}
                            gameState={gameState}
                        />
                    </div>
                </div>
            )}
            
            {/* Status Bar - TEMPORARILY COMMENTED OUT */}
            {/*
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
            
            <div className="interruption-warning">
                <div className="warning-content">
                    <i data-feather="alert-triangle"></i>
                    <h3>Focus Interrupted!</h3>
                    <p>Your house is being demolished...</p>
                </div>
            </div>
            */}
            
            {/* Mobile Menu Overlay - TEMPORARILY COMMENTED OUT */}
            {/*
            {mobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
            */}
        </div>
    );
};

window.App = App;
