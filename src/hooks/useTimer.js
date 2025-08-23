const useTimer = () => {
    const [timer, setTimer] = useState({
        isActive: false,
        isPaused: false,
        isCompleted: false,
        timeLeft: 0,
        duration: 0,
        startTime: null
    });
    
    const intervalRef = useRef(null);
    
    // Timer countdown effect
    useEffect(() => {
        if (timer.isActive && !timer.isPaused && timer.timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => {
                    const newTimeLeft = prev.timeLeft - 1;
                    
                    if (newTimeLeft <= 0) {
                        return {
                            ...prev,
                            timeLeft: 0,
                            isActive: false,
                            isCompleted: true
                        };
                    }
                    
                    return {
                        ...prev,
                        timeLeft: newTimeLeft
                    };
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timer.isActive, timer.isPaused, timer.timeLeft]);
    
    const start = (duration) => {
        setTimer({
            isActive: true,
            isPaused: false,
            isCompleted: false,
            timeLeft: duration,
            duration: duration,
            startTime: Date.now()
        });
    };
    
    const pause = () => {
        setTimer(prev => ({
            ...prev,
            isPaused: true
        }));
    };
    
    const resume = () => {
        setTimer(prev => ({
            ...prev,
            isPaused: false
        }));
    };
    
    const stop = () => {
        setTimer({
            isActive: false,
            isPaused: false,
            isCompleted: false,
            timeLeft: 0,
            duration: 0,
            startTime: null
        });
    };
    
    const interrupt = () => {
        setTimer(prev => ({
            ...prev,
            isActive: false,
            isPaused: false
        }));
    };
    
    const reset = () => {
        setTimer({
            isActive: false,
            isPaused: false,
            isCompleted: false,
            timeLeft: 0,
            duration: 0,
            startTime: null
        });
    };
    
    return {
        ...timer,
        start,
        pause,
        resume,
        stop,
        interrupt,
        reset
    };
};

window.useTimer = useTimer;
