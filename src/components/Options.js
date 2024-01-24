import React from 'react';

function Options({question, dispatch, answer}) {
    const hashanswer = answer !== null
    return (
        <div className={"options"}>
            {
                question.options.map((option, index) => (
                    <button
                        className={`btn btn-option ${answer === index ? "answer": ""} 
                        ${hashanswer ? index === question.correctOption ? "correct" : "wrong" : ""}
                        `}
                        key={option}
                        onClick={()=>dispatch({type:"newAnswer", payload: index})}
                        disabled={hashanswer}
                    >
                        {option}
                    </button>
                ))
            }
        </div>
    );
}

export default Options;