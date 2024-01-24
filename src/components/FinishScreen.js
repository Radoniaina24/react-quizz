import React from 'react';

function FinishScreen({points, maxPossiblePoints, highScore, dispatch}) {
    const purcentage = (points * 100) / maxPossiblePoints
    return (
        <>
            <p className={"result"}>
                you scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(purcentage) + "%"})
            </p>
            <p className={"highscore"}>(High Score {highScore} points)</p>
            <button
                className="btn btn-ui"
                onClick={()=>dispatch({type:"restart"})}
            >
                Restart quiz
            </button>
        </>
);
}

export default FinishScreen;