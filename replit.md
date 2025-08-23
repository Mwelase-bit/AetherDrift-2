# Builder's Focus - 3D Productivity Game

## Overview

Builder's Focus is a 3D productivity game that gamifies focus sessions through virtual house construction. Players set a focus timer, and a customizable builder character constructs a house in stages while the timer runs. If the session completes uninterrupted, the house stands and rewards are earned. If interrupted, the house collapses. The game features a comprehensive progression system with achievements, coins, customizations, and multiple house types to unlock.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Pure React with CDN imports, no build system required
- **3D Rendering**: Three.js with React Three Fiber for declarative 3D scene management
- **Component Structure**: Modular React components for UI panels, 3D objects, and game logic
- **State Management**: React hooks with custom hooks for game state, timer, and rewards
- **Styling**: CSS with Bootstrap for UI components and custom CSS for game-specific styling

### Game Logic Architecture
- **Timer System**: JavaScript intervals with React state management for countdown functionality
- **Progress Tracking**: Stage-based house construction with percentage-based progress calculations
- **Reward System**: Multi-faceted coin and achievement system with streak bonuses and difficulty multipliers
- **Customization System**: Character appearance system with unlockable items and gender options

### Data Management
- **Storage Strategy**: Browser localStorage for persistent game state, rewards, and settings
- **Data Structure**: JSON-based configuration files for house types, customization options, and achievements
- **State Persistence**: Automatic saving of game progress with error handling for storage failures

### 3D Scene Architecture
- **Scene Management**: React Three Fiber Canvas with OrbitControls for camera movement
- **Asset Strategy**: Procedurally generated 3D geometry using Three.js primitives (no external 3D models)
- **Animation System**: CSS-based transitions and Three.js frame-based animations for building progression
- **Visual Style**: Low-poly, cartoonish aesthetic with bright colors and simple geometric shapes

### Game Mechanics Design
- **Focus Session Flow**: Timer-driven gameplay with interruption detection and consequence system
- **Progression System**: Experience-based unlocks with multiple progression tracks (houses, customizations, achievements)
- **Economy System**: Coin-based virtual economy with dynamic pricing and bonus calculations
- **Achievement System**: Goal-based progression with different rarity tiers and reward structures

## External Dependencies

### Core Libraries
- **React 18**: Component-based UI framework loaded via CDN
- **Three.js**: 3D graphics library for WebGL rendering
- **React Three Fiber**: React renderer for Three.js scenes
- **React Three Drei**: Helper components and utilities for React Three Fiber
- **Babel Standalone**: In-browser JSX compilation for development

### UI and Styling
- **Bootstrap 5**: CSS framework for responsive UI components
- **Feather Icons**: Icon library for UI elements and achievements

### Browser APIs
- **localStorage**: Client-side data persistence for game state and progress
- **Date API**: Time calculations for streak tracking and session timing
- **setInterval/clearInterval**: Timer functionality for focus sessions

### Development Tools
- **Babel**: JSX transformation for React components in browser environment
- **No build system**: Direct browser execution with script tags for rapid development