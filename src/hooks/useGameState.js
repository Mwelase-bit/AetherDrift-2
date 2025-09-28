const useGameState = () => {
    const [gameState, setGameState] = useState({
        buildStage: 0,
        currentHouse: 'castle',
        isBuilding: false,
        isCollapsing: false,
        completedHouses: [],
        builderCustomization: {
            gender: 'male',
            name: 'Builder',
            skinColor: '#FDBCB4',
            overallColor: '#4169E1',
            hatColor: '#FFD700',
            hairColor: '#8B4513',
            hairStyle: 'short',
            outfit: 'default',
            hat: 'hardhat',
            tool: 'hammer'
        },
        purchasedItems: {
            outfits: ['default'],
            hats: ['hardhat'],
            tools: ['hammer'],
            houses: ['skyscraper']
        }
    });
    
    // Load game state from storage on mount
    useEffect(() => {
        const savedState = Storage.getGameState();
        if (savedState) {
            setGameState(prevState => ({
                ...prevState,
                ...savedState,
                isBuilding: false,
                isCollapsing: false
            }));
        }
    }, []);
    
    // Save game state to storage whenever it changes
    useEffect(() => {
        Storage.saveGameState(gameState);
    }, [gameState]);
    
    const startBuilding = () => {
        setGameState(prev => ({
            ...prev,
            isBuilding: true,
            isCollapsing: false,
            buildStage: 1  // Start from foundation (stage 1)
        }));
    };
    
    const updateBuildStage = (stage) => {
        setGameState(prev => ({
            ...prev,
            buildStage: Math.min(stage, 4)
        }));
    };
    
    const completeBuilding = () => {
        setGameState(prev => {
            const newCompletedHouse = {
                type: prev.currentHouse,
                position: [
                    (prev.completedHouses.length % 5) * 4 - 8,
                    0,
                    Math.floor(prev.completedHouses.length / 5) * 4 - 4
                ],
                completedAt: Date.now()
            };
            
            return {
                ...prev,
                buildStage: 4,
                isBuilding: false,
                completedHouses: [...prev.completedHouses, newCompletedHouse],
                currentHouse: getNextHouseType(prev.completedHouses.length + 1)
            };
        });
    };
    
    const triggerDemolition = () => {
        setGameState(prev => ({
            ...prev,
            isCollapsing: true,
            isBuilding: false
        }));
        
        // Reset after demolition animation
        setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                isCollapsing: false,
                buildStage: 1  // Reset to foundation (stage 1)
            }));
        }, 3000);
    };
    
    const resetBuilding = () => {
        setGameState(prev => ({
            ...prev,
            buildStage: 1,  // Reset to foundation (stage 1)
            isBuilding: false,
            isCollapsing: false
        }));
    };
    
    const updateBuilderCustomization = (property, value) => {
        setGameState(prev => ({
            ...prev,
            builderCustomization: {
                ...prev.builderCustomization,
                [property]: value
            }
        }));
    };
    
    const addPurchasedItem = (category, itemId) => {
        setGameState(prev => ({
            ...prev,
            purchasedItems: {
                ...prev.purchasedItems,
                [category]: [...(prev.purchasedItems[category] || []), itemId]
            }
        }));
    };
    
    const unlockHouseType = (houseType) => {
        setGameState(prev => ({
            ...prev,
            purchasedItems: {
                ...prev.purchasedItems,
                houses: [...prev.purchasedItems.houses, houseType]
            }
        }));
    };
    
    const getNextHouseType = (houseCount) => {
        if (houseCount >= 50) return 'castle';
        if (houseCount >= 20) return 'castle';
        if (houseCount >= 10) return 'castle';
        return 'castle';
    };
    
    return {
        ...gameState,
        startBuilding,
        updateBuildStage,
        completeBuilding,
        triggerDemolition,
        resetBuilding,
        updateBuilderCustomization,
        addPurchasedItem,
        unlockHouseType
    };
};

window.useGameState = useGameState;
