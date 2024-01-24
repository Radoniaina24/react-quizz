import React from 'react';

function Progress({index, numQuestions, points, maxPointsPossible, answer }) {
    const hashAnswer = answer!== null
    return (
        <header className={"progress"}>
            <progress max={numQuestions} value={index + Number(hashAnswer) }/>
            <p>
                Question <strong>{index + 1}</strong> /
                {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> /
                {maxPointsPossible}
            </p>
        </header>
    );
}

export default Progress;