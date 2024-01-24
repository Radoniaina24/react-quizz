import React, {useEffect, useReducer} from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import axios from "axios";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SEC_PER_QUESTION = 30
const initialState = {
    questions : [],
    status : "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore : 0,
    seconds : 10
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived" :
            return {
                ...state,
                questions: action.payload,
                status:"ready"
            }
        case "dataFailed":
            return {
                ...state,
                status : "error"
            }
        case "start":
            return {
                ...state,
                status : "active",
                seconds: state.questions.length * SEC_PER_QUESTION
            }
        case "nextQuestion":
            return {
                ...state, index : state.index + 1, answer: null
            }
        case "newAnswer":
            const question  = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points : action.payload === question.correctOption
                    ?
                    state.points + question.points
                    :
                    state.points
            }
        case "finish":
            return {
                ...state,
                status : "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case "restart":{
            return {
                ...initialState, status:"ready", questions: state.questions
            }
        }
        case "tick":
            return {
                ...state,
                seconds: state.seconds-1,
                status: state.seconds === 0 ? "finished" :  state.status
            }
        default :
           throw new Error("Action unknown")
    }
}

function App() {

    const [{questions, status, index, answer, points, highScore, seconds}, dispatch] = useReducer(reducer, initialState)
    const numQuestions = questions.length
    const maxPointsPossible = questions.reduce((prev, cur)=> prev + cur.points, 0)
    useEffect(function(){
        async function getAllQuestion(){
            try{
                const response = await axios.get("http://localhost:8000/questions")
                const data = response.data
                dispatch({type : "dataReceived", payload : data})
            }
            catch (err){
               dispatch({type:"dataFailed"})
            }
        }
        getAllQuestion()
    }, []);

    return(
        <div className={"app"}>
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" &&
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />}
                {status === "active" &&
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPointsPossible={maxPointsPossible}
                            answer={answer}
                        />
                        <Question question={questions[index]}
                                  answer={answer}
                                  dispatch={dispatch}
                        />
                        <Footer>
                            <Timer dispatch={dispatch} seconds={seconds}/>
                            <NextQuestion
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>

                    </>
                }
                {status === "finished" &&
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPointsPossible}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                }
            </Main>

        </div>
    )
}
export default App;




