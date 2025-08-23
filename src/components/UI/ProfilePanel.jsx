const ProfilePanel = ({ gameState, rewards }) => {
    const [showCustomization, setShowCustomization] = useState(false);
    
    const handleCustomizationChange = (category, value) => {
        gameState.updateBuilderCustomization(category, value);
    };
    
    return (
        <div className="profile-panel">
            <h2>Builder Profile</h2>
            
            {/* Builder Info */}
            <div className="builder-info">
                <div className="builder-avatar">
                    <div className="avatar-preview">
                        {/* Simple 2D representation of the builder */}
                        <div 
                            className="avatar-body"
                            style={{ backgroundColor: gameState.builderCustomization.overallColor }}
                        ></div>
                        <div 
                            className="avatar-head"
                            style={{ backgroundColor: gameState.builderCustomization.skinColor }}
                        ></div>
                        <div 
                            className="avatar-hat"
                            style={{ backgroundColor: gameState.builderCustomization.hatColor }}
                        ></div>
                    </div>
                    
                    <button 
                        className="btn btn-outline-primary"
                        onClick={() => setShowCustomization(!showCustomization)}
                    >
                        <i data-feather="edit-2"></i>
                        Customize
                    </button>
                </div>
                
                <div className="builder-stats">
                    <h3>{gameState.builderCustomization.name || 'Builder'}</h3>
                    <p>Gender: {gameState.builderCustomization.gender}</p>
                    <p>Level: {Math.floor(rewards.totalFocusTime / 3600) + 1}</p>
                    <p>Experience: {rewards.totalFocusTime} seconds</p>
                </div>
            </div>
            
            {/* Customization Panel */}
            {showCustomization && (
                <div className="customization-panel">
                    <h4>Customize Your Builder</h4>
                    
                    <div className="customization-options">
                        <div className="option-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={gameState.builderCustomization.name || ''}
                                onChange={(e) => handleCustomizationChange('name', e.target.value)}
                                placeholder="Enter builder name"
                            />
                        </div>
                        
                        <div className="option-group">
                            <label>Gender:</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gameState.builderCustomization.gender === 'male'}
                                        onChange={(e) => handleCustomizationChange('gender', e.target.value)}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gameState.builderCustomization.gender === 'female'}
                                        onChange={(e) => handleCustomizationChange('gender', e.target.value)}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        
                        <div className="option-group">
                            <label>Overall Color:</label>
                            <div className="color-selector">
                                {['#4169E1', '#FF8C00', '#32CD32', '#FF69B4', '#9370DB'].map(color => (
                                    <button
                                        key={color}
                                        className={`color-option ${gameState.builderCustomization.overallColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleCustomizationChange('overallColor', color)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="option-group">
                            <label>Hat Color:</label>
                            <div className="color-selector">
                                {['#FFD700', '#FF4500', '#00CED1', '#FF1493', '#7FFF00'].map(color => (
                                    <button
                                        key={color}
                                        className={`color-option ${gameState.builderCustomization.hatColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleCustomizationChange('hatColor', color)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="option-group">
                            <label>Skin Color:</label>
                            <div className="color-selector">
                                {['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'].map(color => (
                                    <button
                                        key={color}
                                        className={`color-option ${gameState.builderCustomization.skinColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleCustomizationChange('skinColor', color)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Achievement Gallery */}
            <div className="achievement-gallery">
                <h3>Achievement Gallery</h3>
                <div className="achievement-grid">
                    {rewards.allAchievements.map((achievement, index) => (
                        <div 
                            key={index}
                            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        >
                            <div className="achievement-icon">
                                <i data-feather={achievement.icon}></i>
                            </div>
                            <div className="achievement-details">
                                <h4>{achievement.unlocked ? achievement.name : '???'}</h4>
                                <p>{achievement.unlocked ? achievement.description : 'Keep building to unlock!'}</p>
                                {achievement.unlocked && (
                                    <div className="unlock-date">
                                        <small>Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Village Overview */}
            <div className="village-overview">
                <h3>Your Village</h3>
                <div className="village-stats">
                    <div className="stat">
                        <i data-feather="home"></i>
                        <span>{gameState.completedHouses.length} Houses Built</span>
                    </div>
                    <div className="stat">
                        <i data-feather="users"></i>
                        <span>{gameState.completedHouses.length * 3} Villagers</span>
                    </div>
                    <div className="stat">
                        <i data-feather="map"></i>
                        <span>Level {Math.floor(gameState.completedHouses.length / 5) + 1} Village</span>
                    </div>
                </div>
                
                <div className="house-types-built">
                    <h4>Houses in Your Village:</h4>
                    <div className="house-type-list">
                        {Object.entries(
                            gameState.completedHouses.reduce((acc, house) => {
                                acc[house.type] = (acc[house.type] || 0) + 1;
                                return acc;
                            }, {})
                        ).map(([type, count]) => (
                            <div key={type} className="house-type-item">
                                <i data-feather="home"></i>
                                <span>{count} {type}{count > 1 ? 's' : ''}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Focus Statistics */}
            <div className="focus-statistics">
                <h3>Focus Statistics</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <label>Total Focus Time</label>
                        <span>{Math.floor(rewards.totalFocusTime / 3600)}h {Math.floor((rewards.totalFocusTime % 3600) / 60)}m</span>
                    </div>
                    <div className="stat-item">
                        <label>Longest Session</label>
                        <span>{Math.floor(rewards.longestSession / 60)} minutes</span>
                    </div>
                    <div className="stat-item">
                        <label>Average Session</label>
                        <span>{Math.floor(rewards.averageSession / 60)} minutes</span>
                    </div>
                    <div className="stat-item">
                        <label>Success Rate</label>
                        <span>{rewards.successRate}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ProfilePanel = ProfilePanel;
