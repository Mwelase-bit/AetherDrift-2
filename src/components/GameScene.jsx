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
        
        // Add construction site elements
        addConstructionSite(scene);
        
        // Add builder character and house
        createBuilder(scene, gameState);
        createHouse(scene, gameState, timer);
    };
    
    const addConstructionSite = (scene) => {
        // Construction materials pile
        const materialPile = new THREE.Group();
        
        // Brick pile
        for (let i = 0; i < 15; i++) {
            const brickGeometry = new THREE.BoxGeometry(0.25, 0.12, 0.15);
            const brickMaterial = new THREE.MeshLambertMaterial({ color: 0xB22222 });
            const brick = new THREE.Mesh(brickGeometry, brickMaterial);
            
            brick.position.set(
                2.5 + (Math.random() - 0.5) * 0.8,
                0.1 + i * 0.12 + Math.random() * 0.05,
                2.5 + (Math.random() - 0.5) * 0.8
            );
            
            brick.rotation.y = Math.random() * 0.2;
            materialPile.add(brick);
        }
        
        // Cement bags
        for (let i = 0; i < 3; i++) {
            const bagGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.25);
            const bagMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
            const bag = new THREE.Mesh(bagGeometry, bagMaterial);
            
            bag.position.set(
                -2.5 + i * 0.5,
                0.3,
                2.8
            );
            materialPile.add(bag);
        }
        
        // Construction tools
        const hammerGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6);
        const hammerMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const hammer = new THREE.Mesh(hammerGeometry, hammerMaterial);
        hammer.position.set(3.2, 0.4, 3.2);
        hammer.rotation.z = Math.PI / 4;
        materialPile.add(hammer);
        
        // Level tool
        const levelGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.05);
        const levelMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
        const level = new THREE.Mesh(levelGeometry, levelMaterial);
        level.position.set(3.5, 0.4, 3);
        materialPile.add(level);
        
        scene.add(materialPile);
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
    
    const createHouse = (scene, gameState, timer) => {
        const houseGroup = new THREE.Group();
        const houseData = HOUSE_TYPES[gameState.currentHouse] || HOUSE_TYPES.cottage;
        
        // Create individual bricks for realistic building animation
        const brickGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.2);
        const brickMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.walls });
        const mortarMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
        
        // Progress calculation for active building
        let buildProgress = 0;
        if (timer.isActive && timer.duration > 0) {
            buildProgress = (timer.duration - timer.timeLeft) / timer.duration;
        } else if (gameState.buildStage >= 4) {
            buildProgress = 1;
        }
        
        // Foundation (always shows if stage >= 1)
        if (gameState.buildStage >= 1) {
            const foundationGeometry = new THREE.BoxGeometry(houseData.foundation.width, 0.2, houseData.foundation.depth);
            const foundationMaterial = new THREE.MeshLambertMaterial({ color: 0x606060 });
            const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
            foundation.position.set(0, 0.1, 0);
            houseGroup.add(foundation);
        }
        
        // Animated brick laying for walls (stage 2)
        if (gameState.buildStage >= 2) {
            const wallHeight = houseData.walls.height;
            const wallWidth = houseData.walls.width;
            const wallDepth = houseData.walls.depth;
            
            // Calculate how many bricks to show based on progress
            const totalBricks = Math.floor(wallHeight / 0.15) * Math.floor(wallWidth / 0.3) * 4; // 4 walls
            const bricksToShow = Math.floor(totalBricks * buildProgress);
            
            let brickCount = 0;
            
            // Build walls brick by brick
            for (let wall = 0; wall < 4; wall++) {
                const rows = Math.floor(wallHeight / 0.15);
                const bricksPerRow = Math.floor(wallWidth / 0.3);
                
                for (let row = 0; row < rows; row++) {
                    for (let brick = 0; brick < bricksPerRow; brick++) {
                        if (brickCount >= bricksToShow) break;
                        
                        const brickMesh = new THREE.Mesh(brickGeometry, brickMaterial);
                        const y = 0.2 + row * 0.15 + 0.075;
                        
                        let x, z;
                        if (wall === 0) { // Front wall
                            x = -wallWidth/2 + brick * 0.3 + 0.15;
                            z = wallDepth/2;
                        } else if (wall === 1) { // Right wall
                            x = wallWidth/2;
                            z = wallDepth/2 - brick * 0.3 - 0.15;
                        } else if (wall === 2) { // Back wall
                            x = wallWidth/2 - brick * 0.3 - 0.15;
                            z = -wallDepth/2;
                        } else { // Left wall
                            x = -wallWidth/2;
                            z = -wallDepth/2 + brick * 0.3 + 0.15;
                        }
                        
                        brickMesh.position.set(x, y, z);
                        
                        // Add slight variation to make it look more realistic
                        brickMesh.rotation.y += (Math.random() - 0.5) * 0.05;
                        
                        houseGroup.add(brickMesh);
                        brickCount++;
                    }
                    if (brickCount >= bricksToShow) break;
                }
                if (brickCount >= bricksToShow) break;
            }
            
            // Add door and windows only if walls are mostly complete
            if (buildProgress > 0.7) {
                // Door
                const doorGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.1);
                const doorMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.door });
                const door = new THREE.Mesh(doorGeometry, doorMaterial);
                door.position.set(0, 0.95, wallDepth / 2 + 0.05);
                houseGroup.add(door);
                
                // Windows
                const windowGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
                const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x87CEEB });
                
                const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                leftWindow.position.set(-1, 1.2, wallDepth / 2 + 0.05);
                houseGroup.add(leftWindow);
                
                const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                rightWindow.position.set(1, 1.2, wallDepth / 2 + 0.05);
                houseGroup.add(rightWindow);
            }
        }
        
        // Roof (stage 3)
        if (gameState.buildStage >= 3) {
            const roofGeometry = new THREE.ConeGeometry(houseData.roof.width/2, 1.2, 4);
            const roofMaterial = new THREE.MeshLambertMaterial({ color: houseData.colors.roof });
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.set(0, houseData.walls.height + 0.8, 0);
            roof.rotation.y = Math.PI / 4;
            houseGroup.add(roof);
        }
        
        // Finishing touches (stage 4)
        if (gameState.buildStage >= 4) {
            // Chimney
            const chimneyGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
            const chimneyMaterial = new THREE.MeshLambertMaterial({ color: 0xB22222 });
            const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
            chimney.position.set(1.5, houseData.walls.height + 1.1, -0.5);
            houseGroup.add(chimney);
            
            // Garden elements
            const flowerGeometry = new THREE.SphereGeometry(0.1);
            const flowerMaterial = new THREE.MeshLambertMaterial({ color: 0xFF6B9D });
            for (let i = 0; i < 5; i++) {
                const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
                flower.position.set(
                    (Math.random() - 0.5) * 6,
                    0.1,
                    (Math.random() - 0.5) * 6
                );
                houseGroup.add(flower);
            }
        }
        
        scene.add(houseGroup);
        scene.userData.houseGroup = houseGroup;
        scene.userData.houseIsCollapsing = false;
    };
    
    // House destruction animation with particles
    const destroyHouse = (scene) => {
        const houseGroup = scene.userData.houseGroup;
        const particles = scene.userData.particles;
        
        if (!houseGroup || scene.userData.houseIsCollapsing) return;
        
        scene.userData.houseIsCollapsing = true;
        
        // Show dust particles
        if (particles) {
            particles.visible = true;
            setTimeout(() => {
                particles.visible = false;
            }, 4000);
        }
        
        // Dramatic destruction animation
        houseGroup.children.forEach((child, index) => {
            const originalPosition = child.position.clone();
            const originalRotation = child.rotation.clone();
            
            // More realistic physics-based falling
            const fallDirection = new THREE.Vector3(
                (Math.random() - 0.5) * 3,
                0, // Will be set dynamically
                (Math.random() - 0.5) * 3
            );
            
            let velocity = 0;
            const gravity = -0.008;
            
            const animateDestruction = () => {
                velocity += gravity;
                fallDirection.y = velocity;
                
                child.position.add(fallDirection.clone().multiplyScalar(1));
                
                // Tumbling motion
                child.rotation.x += (Math.random() - 0.5) * 0.3;
                child.rotation.y += (Math.random() - 0.5) * 0.3;
                child.rotation.z += (Math.random() - 0.5) * 0.3;
                
                // Add some bounce when hitting ground
                if (child.position.y <= 0 && velocity < 0) {
                    velocity *= -0.3; // Bounce with energy loss
                    child.position.y = 0.1;
                }
                
                if (child.position.y > -10 && Math.abs(velocity) > 0.001) {
                    requestAnimationFrame(animateDestruction);
                } else {
                    // Reset for next build after destruction is complete
                    setTimeout(() => {
                        child.position.copy(originalPosition);
                        child.rotation.copy(originalRotation);
                    }, 1000);
                }
            };
            
            // Stagger destruction for dramatic effect
            setTimeout(() => animateDestruction(), index * 25);
        });
        
        setTimeout(() => {
            scene.userData.houseIsCollapsing = false;
        }, 5000);
    };
    
    // Update animations based on game state
    useEffect(() => {
        if (!sceneRef.current) return;
        
        const { scene } = sceneRef.current;
        const builderGroup = scene.userData.builderGroup;
        const houseGroup = scene.userData.houseGroup;
        
        // Builder animations
        if (builderGroup) {
            if (timer.isActive && !timer.isPaused) {
                // Realistic brick-laying animation
                const time = Date.now() * 0.005;
                
                // Move arms in brick-laying motion
                const leftArm = builderGroup.children.find(child => child.position.x < 0 && child.geometry.type === 'BoxGeometry' && child.position.y > 0);
                const rightArm = builderGroup.children.find(child => child.position.x > 0 && child.geometry.type === 'BoxGeometry' && child.position.y > 0);
                
                if (leftArm) {
                    leftArm.rotation.x = Math.sin(time) * 0.5 - 0.3;
                }
                if (rightArm) {
                    rightArm.rotation.x = Math.sin(time + Math.PI) * 0.5 - 0.3;
                }
                
                // Body swaying motion
                builderGroup.rotation.z = Math.sin(time * 0.5) * 0.05;
                builderGroup.position.y = 0.5 + Math.sin(time * 2) * 0.02;
            } else {
                // Reset to neutral position
                builderGroup.rotation.z = 0;
                builderGroup.position.y = 0.5;
                
                builderGroup.children.forEach(child => {
                    if (child.geometry.type === 'BoxGeometry' && child.position.y > 0) {
                        child.rotation.x = 0;
                    }
                });
            }
        }
        
        // Rebuild house with updated progress
        if (houseGroup && timer.isActive) {
            scene.remove(houseGroup);
            createHouse(scene, gameState, timer);
        }
    }, [timer.isActive, timer.isPaused, timer.timeLeft, gameState.buildStage]);
    
    // Handle interruption/destruction
    useEffect(() => {
        if (interruptionDetected && sceneRef.current) {
            destroyHouse(sceneRef.current.scene);
        }
    }, [interruptionDetected]);
    
    return React.createElement(ThreeCanvas, {
        camera: { position: [5, 5, 5], fov: 60 },
        onMount: setupScene
    });
};

window.GameScene = GameScene;
