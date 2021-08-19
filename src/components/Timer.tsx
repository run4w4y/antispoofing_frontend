import { useState, useEffect } from 'react' 

interface TimerProps {
    callback?: () => void,
    seconds?: number
}

export const Timer = (props: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(props.seconds ?? 120);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (props.callback)
                props.callback();
            return;
        }

        const timeout = setTimeout(
            () => setTimeLeft((prev) => prev - 1)
        , 1000);
        
        return () => clearTimeout(timeout); 
    }, [timeLeft]);

    return (
        <div>
            <span> {Math.floor(timeLeft / 60).toString().padStart(2, "0")} </span>
            :
            <span> {Math.floor(timeLeft % 60).toString().padStart(2, "0")} </span>
        </div>
    );
}