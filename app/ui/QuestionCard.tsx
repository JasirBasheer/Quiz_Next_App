"use client"
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation"

interface QuestionType {
    questions: {
        question: string;
        answer: string;
        options: string[];
    }[];
}

export default function QuestionCard({ Quiz, category }: { Quiz: QuestionType, category: string }) {

    let [currentQuestion, setCurrentQuestion] = useState<number>(0)
    let [score, setScore] = useState<number>(0)
    let [currentScore, setCurrentScore] = useState<number>(0)
    let [loading, setLoading] = useState<boolean>(true)
    let [isSelected, setIsSelected] = useState<boolean>(false)
    let [selectedAnswer, setSelectedAnswer] = useState<string>("")

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => setLoading(false), 100)
        let questionNumber = localStorage.getItem('questionNumber')
        let selected = localStorage.getItem('isSelected');
        let ans = localStorage.getItem('answer');
        let score = localStorage.getItem('score');
        let currentScore = localStorage.getItem('currentScore');



        if (selected && ans) {
            setIsSelected(true)
            setSelectedAnswer(ans)
        }
        if (questionNumber) {
            setCurrentQuestion(Number(questionNumber))

        } else {
            localStorage.setItem('questionNumber', '0');
        }
        if (score) {
            setScore(Number(score))
        } else {
            localStorage.setItem('questionNumber', '0');
        }

        if (currentScore) {
            setCurrentScore(Number(currentScore))
        } else {
            localStorage.setItem('currentScore', '0');
        }

        localStorage.setItem('category', `${category}`)


    }, [])




    const handleNext = () => {
        if (currentQuestion >= Quiz.questions.length - 1) {
            let category = localStorage.getItem('category')
            router.push(`/score/${category}/${score + currentScore}`)
            setTimeout(() => {
                setCurrentScore(0)
                setSelectedAnswer('')
                setIsSelected(false)
                setScore(0)
                localStorage.clear()
            }, 1000)
        } else {
            setCurrentQuestion((prev) => prev + 1)
            setScore((prev) => prev + currentScore)
            localStorage.setItem('questionNumber', `${currentQuestion + 1}`);
            localStorage.setItem('isSelected', '');
            localStorage.setItem('answer', '');
            localStorage.setItem('currentScore', '0');
            setCurrentScore(0)
            setSelectedAnswer('')
            setIsSelected(false)
        }
    }

    const handleAnswer = (answer: string) => {
        localStorage.setItem('isSelected', 'true');
        localStorage.setItem('answer', `${answer}`);
        if (answer == Quiz?.questions[currentQuestion].answer) {
            setCurrentScore(5)
        } else {
            setCurrentScore(0)
        }
        setSelectedAnswer(answer)
        setIsSelected(true)
    }

    useEffect(() => {
        localStorage.setItem('score', `${score}`)
    }, [score])

    useEffect(() => {
        localStorage.setItem('currentScore', `${currentScore}`)
    }, [currentScore])


    const shuffledOptions = useMemo(() => {
        const options = Quiz?.questions[currentQuestion]?.options || [];
        return [...options].sort(() => Math.random() - 0.5);
    }, [currentQuestion, Quiz]);

    return (
        <div className="gap-4">
            {loading ? (
                <>
                    <div className=""> loading ...
                    </div>
                </>
            ) : (
                <>
                    <p>Question : {Quiz?.questions[currentQuestion]?.question} ?</p>
                    {shuffledOptions.map((option, index) => {
                        const isCorrectAnswer = selectedAnswer === Quiz.questions[currentQuestion].answer;
                        const isWrongAnswer = isSelected && selectedAnswer !== Quiz.questions[currentQuestion].answer && selectedAnswer != "";

                        return (
                            <div className={`
                                bg-slate-400 
                                h-[4rem] 
                                min-w-[1rem] 
                                mt-4 
                                flex 
                                items-center 
                                p-3 
                                cursor-pointer 
                                ${isSelected && isCorrectAnswer && option === selectedAnswer ? "bg-green-500" : ""} 
                                ${isSelected && isWrongAnswer && option === selectedAnswer ? "bg-red-500" : ""}`
                            }
                                key={index} onClick={() => handleAnswer(option)}>{index + 1}. {option}</div>
                        )
                    })}
                    <div className="flex items-center justify-end p-3">
                        <button className="bg-slate-400 w-[7rem] h-[3rem] rounded-lg shadow-lg" onClick={handleNext}>next</button>
                    </div>
                </>
            )}
        </div>
    )
}