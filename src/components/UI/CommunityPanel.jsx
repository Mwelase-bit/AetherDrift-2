const CommunityPanel = ({ gameState, rewards }) => {
    // Mock community data
    const communityData = {
        friends: [
            {
                id: 1,
                name: "S'Bonga Builder",
                avatar: "👷",
                level: 15,
                studyTime: "2h 45m",
                housesOwned: 8,
                houseTypes: ["cottage", "townhouse", "castle"],
                lastActive: "2 hours ago",
                streak: 12,
                totalCoins: 1250
            },
            {
                id: 2,
                name: "Kamo Focus",
                avatar: "👩‍💼",
                level: 22,
                studyTime: "4h 20m",
                housesOwned: 15,
                houseTypes: ["cottage", "townhouse", "mansion", "castle"],
                lastActive: "30 minutes ago",
                streak: 25,
                totalCoins: 3200
            },
            {
                id: 3,
                name: "Thabiso Constructor",
                avatar: "👨‍🔧",
                level: 8,
                studyTime: "1h 15m",
                housesOwned: 3,
                houseTypes: ["cottage", "townhouse"],
                lastActive: "1 day ago",
                streak: 5,
                totalCoins: 450
            },
            {
                id: 4,
                name: "Musa Architect",
                avatar: "👩‍🎨",
                level: 18,
                studyTime: "3h 10m",
                housesOwned: 12,
                houseTypes: ["cottage", "townhouse", "mansion"],
                lastActive: "5 hours ago",
                streak: 18,
                totalCoins: 2100
            },
            {
                id: 5,
                name: "Ongeziwe Scholar",
                avatar: "👨‍🎓",
                level: 30,
                studyTime: "6h 30m",
                housesOwned: 25,
                houseTypes: ["cottage", "townhouse", "mansion", "castle", "estate"],
                lastActive: "Online now",
                streak: 45,
                totalCoins: 8500
            },
            {
                id: 6,
                name: "Wonder Designer",
                avatar: "👩‍💻",
                level: 12,
                studyTime: "2h 0m",
                housesOwned: 6,
                houseTypes: ["cottage", "townhouse"],
                lastActive: "3 hours ago",
                streak: 8,
                totalCoins: 780
            }
        ],
        communityStats: {
            totalMembers: 156,
            totalStudyTime: "1,247 hours",
            totalHouses: 892,
            averageStreak: 18.5
        }
    };

    const getHouseTypeIcon = (houseType) => {
        const icons = {
            cottage: "🏠",
            townhouse: "🏘️",
            mansion: "🏰",
            castle: "🏰",
            estate: "🏛️"
        };
        return icons[houseType] || "🏠";
    };

    const getLevelColor = (level) => {
        if (level >= 25) return "#FFD700"; // Gold
        if (level >= 15) return "#C0C0C0"; // Silver
        if (level >= 10) return "#CD7F32"; // Bronze
        return "#8B4513"; // Brown
    };

    const getStreakColor = (streak) => {
        if (streak >= 30) return "#FF6B35"; // Orange
        if (streak >= 15) return "#4CAF50"; // Green
        if (streak >= 7) return "#2196F3"; // Blue
        return "#9E9E9E"; // Gray
    };

    return (
        <div className="community-panel">
            <h2>Community</h2>
            
            {/* Community Stats */}
            <div className="community-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i data-feather="users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{communityData.communityStats.totalMembers}</h3>
                        <p>Total Members</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i data-feather="clock"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{communityData.communityStats.totalStudyTime}</h3>
                        <p>Total Study Time</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i data-feather="home"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{communityData.communityStats.totalHouses}</h3>
                        <p>Houses Built</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i data-feather="zap"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{communityData.communityStats.averageStreak}</h3>
                        <p>Avg. Streak</p>
                    </div>
                </div>
            </div>

            {/* Friends List */}
            <div className="friends-section">
                <h3>Your Friends</h3>
                <div className="friends-list">
                    {communityData.friends.map((friend) => (
                        <div key={friend.id} className="friend-card">
                            <div className="friend-avatar">
                                <span className="avatar-emoji">{friend.avatar}</span>
                                <div 
                                    className="level-badge"
                                    style={{ backgroundColor: getLevelColor(friend.level) }}
                                >
                                    {friend.level}
                                </div>
                            </div>
                            
                            <div className="friend-info">
                                <div className="friend-header">
                                    <h4>{friend.name}</h4>
                                    <span className={`status ${friend.lastActive === "Online now" ? "online" : "offline"}`}>
                                        {friend.lastActive}
                                    </span>
                                </div>
                                
                                <div className="friend-stats">
                                    <div className="stat-item">
                                        <i data-feather="clock"></i>
                                        <span>Study: {friend.studyTime}</span>
                                    </div>
                                    
                                    <div className="stat-item">
                                        <i data-feather="home"></i>
                                        <span>Houses: {friend.housesOwned}</span>
                                    </div>
                                    
                                    <div className="stat-item">
                                        <i data-feather="zap"></i>
                                        <span 
                                            className="streak"
                                            style={{ color: getStreakColor(friend.streak) }}
                                        >
                                            {friend.streak} day streak
                                        </span>
                                    </div>
                                    
                                    <div className="stat-item">
                                        <i data-feather="dollar-sign"></i>
                                        <span>{friend.totalCoins} coins</span>
                                    </div>
                                </div>
                                
                                <div className="house-types">
                                    <h5>House Types Owned:</h5>
                                    <div className="house-type-tags">
                                        {friend.houseTypes.map((type, index) => (
                                            <span key={index} className="house-type-tag">
                                                {getHouseTypeIcon(type)} {type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Challenges */}
            <div className="community-challenges">
                <h3>Community Challenges</h3>
                <div className="challenge-list">
                    <div className="challenge-item">
                        <div className="challenge-icon">
                            <i data-feather="target"></i>
                        </div>
                        <div className="challenge-info">
                            <h4>Weekly Study Goal</h4>
                            <p>Study for 10 hours this week</p>
                            <div className="challenge-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "65%" }}></div>
                                </div>
                                <span>6.5/10 hours</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="challenge-item">
                        <div className="challenge-icon">
                            <i data-feather="home"></i>
                        </div>
                        <div className="challenge-info">
                            <h4>Castle Builder</h4>
                            <p>Build 5 castles this month</p>
                            <div className="challenge-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "40%" }}></div>
                                </div>
                                <span>2/5 castles</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="challenge-item">
                        <div className="challenge-icon">
                            <i data-feather="zap"></i>
                        </div>
                        <div className="challenge-info">
                            <h4>Streak Master</h4>
                            <p>Maintain a 30-day streak</p>
                            <div className="challenge-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "80%" }}></div>
                                </div>
                                <span>24/30 days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="leaderboard">
                <h3>Weekly Leaderboard</h3>
                <div className="leaderboard-list">
                    {communityData.friends
                        .sort((a, b) => b.studyTime.localeCompare(a.studyTime))
                        .slice(0, 5)
                        .map((friend, index) => (
                        <div key={friend.id} className="leaderboard-item">
                            <div className="rank">
                                {index === 0 && "🥇"}
                                {index === 1 && "🥈"}
                                {index === 2 && "🥉"}
                                {index > 2 && `#${index + 1}`}
                            </div>
                            <div className="player-info">
                                <span className="avatar-emoji">{friend.avatar}</span>
                                <span className="player-name">{friend.name}</span>
                            </div>
                            <div className="player-score">
                                <span>{friend.studyTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

window.CommunityPanel = CommunityPanel;
