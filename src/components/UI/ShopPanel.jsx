const ShopPanel = ({ gameState, rewards }) => {
    const [selectedCategory, setSelectedCategory] = useState('outfits');
    
    const categories = [
        { id: 'outfits', name: 'Outfits', icon: 'shirt' },
        { id: 'tools', name: 'Tools', icon: 'tool' },
        { id: 'hats', name: 'Hats', icon: 'crown' },
        { id: 'houses', name: 'Houses', icon: 'home' }
    ];
    
    const shopItems = {
        outfits: [
            {
                id: 'professional',
                name: 'Professional Suit',
                description: 'Look sharp while building!',
                price: 100,
                colors: ['#000080', '#8B4513', '#2F4F4F'],
                unlocked: rewards.housesBuilt >= 5
            },
            {
                id: 'casual',
                name: 'Casual Wear',
                description: 'Comfortable building attire',
                price: 50,
                colors: ['#87CEEB', '#DDA0DD', '#F0E68C'],
                unlocked: true
            },
            {
                id: 'superhero',
                name: 'Super Builder',
                description: 'Build at super speed!',
                price: 500,
                colors: ['#DC143C', '#4169E1', '#FFD700'],
                unlocked: rewards.streak >= 30
            }
        ],
        tools: [
            {
                id: 'golden_hammer',
                name: 'Golden Hammer',
                description: 'A prestigious building tool',
                price: 200,
                effect: '+10% coins from sessions',
                unlocked: rewards.coins >= 100
            },
            {
                id: 'power_drill',
                name: 'Power Drill',
                description: 'Builds houses faster',
                price: 150,
                effect: 'Visual building speed +50%',
                unlocked: rewards.housesBuilt >= 10
            },
            {
                id: 'blueprint',
                name: 'Magic Blueprint',
                description: 'Never lose progress',
                price: 1000,
                effect: 'Prevents house demolition once per day',
                unlocked: rewards.totalFocusTime >= 36000
            }
        ],
        hats: [
            {
                id: 'cowboy',
                name: 'Cowboy Hat',
                description: 'Yeehaw! Build em up!',
                price: 75,
                unlocked: rewards.housesBuilt >= 3
            },
            {
                id: 'crown',
                name: 'Builder Crown',
                description: 'For the master builder',
                price: 300,
                unlocked: rewards.streak >= 14
            },
            {
                id: 'viking',
                name: 'Viking Helmet',
                description: 'Conquer your focus!',
                price: 150,
                unlocked: rewards.housesBuilt >= 20
            }
        ],
        houses: [
            {
                id: 'mansion',
                name: 'Luxury Mansion',
                description: 'The ultimate building project',
                price: 1000,
                buildTime: '2+ hours',
                unlocked: rewards.housesBuilt >= 15
            },
            {
                id: 'castle',
                name: 'Medieval Castle',
                description: 'A fortress of focus',
                price: 2000,
                buildTime: '3+ hours',
                unlocked: rewards.streak >= 50
            },
            {
                id: 'skyscraper',
                name: 'Modern Skyscraper',
                description: 'Reach for the sky!',
                price: 5000,
                buildTime: '4+ hours',
                unlocked: rewards.housesBuilt >= 50
            }
        ]
    };
    
    const handlePurchase = (item) => {
        if (rewards.coins >= item.price && item.unlocked) {
            if (rewards.spendCoins(item.price)) {
                gameState.addPurchasedItem(selectedCategory, item.id);
                
                // Apply the item immediately if it's a customization
                if (selectedCategory === 'outfits') {
                    gameState.updateBuilderCustomization('outfit', item.id);
                } else if (selectedCategory === 'hats') {
                    gameState.updateBuilderCustomization('hat', item.id);
                } else if (selectedCategory === 'tools') {
                    gameState.updateBuilderCustomization('tool', item.id);
                } else if (selectedCategory === 'houses') {
                    gameState.unlockHouseType(item.id);
                }
                
                alert(`Successfully purchased ${item.name}!`);
            }
        } else if (!item.unlocked) {
            alert(`This item is not yet unlocked. ${item.unlockCondition || 'Keep building to unlock it!'}`);
        } else {
            alert('Not enough coins!');
        }
    };
    
    const isItemOwned = (item) => {
        return gameState.purchasedItems[selectedCategory]?.includes(item.id) || false;
    };
    
    return (
        <div className="shop-panel">
            <h2>Builder's Shop</h2>
            
            <div className="coins-display">
                <div className="current-coins">
                    <i data-feather="dollar-sign"></i>
                    <span>{rewards.coins} Coins</span>
                </div>
            </div>
            
            {/* Category Tabs */}
            <div className="shop-categories">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <i data-feather={category.icon}></i>
                        {category.name}
                    </button>
                ))}
            </div>
            
            {/* Shop Items */}
            <div className="shop-items">
                {shopItems[selectedCategory].map(item => (
                    <div 
                        key={item.id}
                        className={`shop-item ${!item.unlocked ? 'locked' : ''} ${isItemOwned(item) ? 'owned' : ''}`}
                    >
                        <div className="item-header">
                            <h3>{item.unlocked ? item.name : 'Locked Item'}</h3>
                            {isItemOwned(item) && (
                                <span className="owned-badge">
                                    <i data-feather="check"></i>
                                    Owned
                                </span>
                            )}
                        </div>
                        
                        <div className="item-content">
                            <p className="item-description">
                                {item.unlocked ? item.description : 'Complete more challenges to unlock this item!'}
                            </p>
                            
                            {item.effect && item.unlocked && (
                                <div className="item-effect">
                                    <i data-feather="zap"></i>
                                    <span>{item.effect}</span>
                                </div>
                            )}
                            
                            {item.colors && item.unlocked && (
                                <div className="item-colors">
                                    <span>Available colors:</span>
                                    <div className="color-preview">
                                        {item.colors.map(color => (
                                            <div 
                                                key={color}
                                                className="color-dot"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {item.buildTime && item.unlocked && (
                                <div className="build-time">
                                    <i data-feather="clock"></i>
                                    <span>Build time: {item.buildTime}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="item-footer">
                            <div className="item-price">
                                <i data-feather="dollar-sign"></i>
                                <span>{item.unlocked ? item.price : '???'}</span>
                            </div>
                            
                            <button
                                className={`btn ${isItemOwned(item) ? 'btn-success' : 'btn-primary'}`}
                                onClick={() => handlePurchase(item)}
                                disabled={!item.unlocked || isItemOwned(item) || rewards.coins < item.price}
                            >
                                {isItemOwned(item) ? (
                                    <>
                                        <i data-feather="check"></i>
                                        Owned
                                    </>
                                ) : !item.unlocked ? (
                                    <>
                                        <i data-feather="lock"></i>
                                        Locked
                                    </>
                                ) : rewards.coins < item.price ? (
                                    <>
                                        <i data-feather="dollar-sign"></i>
                                        Need {item.price - rewards.coins} more
                                    </>
                                ) : (
                                    <>
                                        <i data-feather="shopping-cart"></i>
                                        Buy Now
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Unlock Conditions */}
            <div className="unlock-guide">
                <h3>How to Unlock Items</h3>
                <div className="unlock-tips">
                    <div className="tip">
                        <i data-feather="home"></i>
                        <span>Build houses to unlock new outfits and tools</span>
                    </div>
                    <div className="tip">
                        <i data-feather="zap"></i>
                        <span>Maintain streaks to unlock special hats</span>
                    </div>
                    <div className="tip">
                        <i data-feather="clock"></i>
                        <span>Focus for long periods to unlock premium houses</span>
                    </div>
                    <div className="tip">
                        <i data-feather="dollar-sign"></i>
                        <span>Earn coins by completing focus sessions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ShopPanel = ShopPanel;
