const GameScene = ({ gameState, timer, interruptionDetected }) => {
    const sceneRef = useRef();
    
    const setupScene = ({ scene, camera, renderer }) => {
        sceneRef.current = { scene, camera, renderer };
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(0, 10, 0);
        scene.add(pointLight);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4a9c59 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);
        
        // Construction site fence
        const fenceMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        // Fence posts
        const postGeometry = new THREE.BoxGeometry(0.1, 1, 8);
        const leftPost = new THREE.Mesh(postGeometry, fenceMaterial);
        leftPost.position.set(-4, 0.5, 0);
        scene.add(leftPost);
        
        const rightPost = new THREE.Mesh(postGeometry, fenceMaterial);
        rightPost.position.set(4, 0.5, 0);
        scene.add(rightPost);
        
        const frontGeometry = new THREE.BoxGeometry(8, 1, 0.1);
        const frontFence = new THREE.Mesh(frontGeometry, fenceMaterial);
        frontFence.position.set(0, 0.5, -4);
        scene.add(frontFence);
        
        const backFence = new THREE.Mesh(frontGeometry, fenceMaterial);
        backFence.position.set(0, 0.5, 4);
        scene.add(backFence);
        
        // Toolbox
        const toolboxGeometry = new THREE.BoxGeometry(1, 0.5, 0.7);
        const toolboxMaterial = new THREE.MeshLambertMaterial({ color: 0xFF6B35 });
        const toolbox = new THREE.Mesh(toolboxGeometry, toolboxMaterial);
        toolbox.position.set(3, 0.35, 3);
        scene.add(toolbox);
        
        // Add builder character and house
        createBuilder(scene, gameState);
        createHouse(scene, gameState);
    };
    
    const createBuilder = (scene, gameState) => {
        const customization = gameState.builderCustomization;
        
        // Builder group
        const builderGroup = new THREE.Group();
        builderGroup.position.set(-1, 0.5, 1);
        
        // Body
        const bodyGeometry = new THREE.BoxGeometry(0.6, 1, 0.3);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: customization.overallColor });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        builderGroup.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25);
        const headMaterial = new THREE.MeshLambertMaterial({ color: customization.skinColor });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 0.7, 0);
        builderGroup.add(head);
        
        // Hard hat
        const hatGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.4);
        const hatMaterial = new THREE.MeshLambertMaterial({ color: customization.hatColor });
        const hat = new THREE.Mesh(hatGeometry, hatMaterial);
        hat.position.set(0, 0.9, 0);
        builderGroup.add(hat);
        
        // Arms
        const armGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
        const armMaterial = new THREE.MeshLambertMaterial({ color: customization.skinColor });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.4, 0.1, 0);
        builderGroup.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.4, 0.1, 0);
        builderGroup.add(rightArm);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
        const legMaterial = new THREE.MeshLambertMaterial({ color: customization.overallColor });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.15, -0.8, 0);
        builderGroup.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.15, -0.8, 0);
        builderGroup.add(rightLeg);
        
        // Tool belt
        const beltGeometry = new THREE.BoxGeometry(0.7, 0.1, 0.35);
        const beltMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const belt = new THREE.Mesh(beltGeometry, beltMaterial);
        belt.position.set(0, -0.3, 0);
        builderGroup.add(belt);
        
        scene.add(builderGroup);
        scene.userData.builderGroup = builderGroup;
    };
    
    const createHouse = (scene, gameState) => {
        const houseGroup = new THREE.Group();
        const houseData = HOUSE_TYPES[gameState.currentHouse] || HOUSE_TYPES.cottage;
        
        // Foundation
        if (gameState.buildStage >= 1) {
            const foundationGeometry = new THREE.BoxGeometry(houseData.foundation.width, 0.2, houseData.foundation.depth);
            const foundationMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
            const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
            foundation.position.set(0, 0.1, 0);
            houseGroup.add(foundation);
        }
        
        // Walls
        if (gameState.buildStage >= 2) {
            const wallMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.walls });
            
            // Front wall
            const frontWallGeometry = new THREE.BoxGeometry(houseData.walls.width, houseData.walls.height, 0.2);
            const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
            frontWall.position.set(0, houseData.walls.height / 2 + 0.2, houseData.walls.depth / 2);
            houseGroup.add(frontWall);
            
            // Back wall
            const backWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
            backWall.position.set(0, houseData.walls.height / 2 + 0.2, -houseData.walls.depth / 2);
            houseGroup.add(backWall);
            
            // Side walls
            const sideWallGeometry = new THREE.BoxGeometry(0.2, houseData.walls.height, houseData.walls.depth);
            const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
            leftWall.position.set(-houseData.walls.width / 2, houseData.walls.height / 2 + 0.2, 0);
            houseGroup.add(leftWall);
            
            const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
            rightWall.position.set(houseData.walls.width / 2, houseData.walls.height / 2 + 0.2, 0);
            houseGroup.add(rightWall);
            
            // Door
            const doorGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.1);
            const doorMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.door });
            const door = new THREE.Mesh(doorGeometry, doorMaterial);
            door.position.set(0, 0.95, houseData.walls.depth / 2 + 0.05);
            houseGroup.add(door);
            
            // Windows
            const windowGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
            const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x87CEEB });
            
            const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
            leftWindow.position.set(-1, 1.2, houseData.walls.depth / 2 + 0.05);
            houseGroup.add(leftWindow);
            
            const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
            rightWindow.position.set(1, 1.2, houseData.walls.depth / 2 + 0.05);
            houseGroup.add(rightWindow);
        }
        
        // Roof
        if (gameState.buildStage >= 3) {
            const roofGeometry = new THREE.BoxGeometry(houseData.roof.width, 0.3, houseData.roof.depth);
            const roofMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.roof });
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.set(0, houseData.walls.height + 0.5, 0);
            roof.rotation.z = houseData.roof.angle;
            houseGroup.add(roof);
        }
        
        // Finishing touches
        if (gameState.buildStage >= 4) {
            // Chimney
            const chimneyGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
            const chimneyMaterial = new THREE.MeshLambertMaterial({ color: 0xB22222 });
            const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
            chimney.position.set(1.5, houseData.walls.height + 1.1, -0.5);
            houseGroup.add(chimney);
        }
        
        scene.add(houseGroup);
        scene.userData.houseGroup = houseGroup;
    };
    
    // Update animations based on game state
    useEffect(() => {
        if (!sceneRef.current) return;
        
        const { scene } = sceneRef.current;
        const builderGroup = scene.userData.builderGroup;
        
        if (builderGroup) {
            if (timer.isActive && !timer.isPaused) {
                // Building animation - simple oscillation
                const time = Date.now() * 0.01;
                builderGroup.rotation.z = Math.sin(time) * 0.1;
            } else {
                builderGroup.rotation.z = 0;
            }
        }
    }, [timer.isActive, timer.isPaused, gameState.buildStage]);
    
    return React.createElement(ThreeCanvas, {
        camera: { position: [5, 5, 5], fov: 60 },
        onMount: setupScene
    });
};

window.GameScene = GameScene;
