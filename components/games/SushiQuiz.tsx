'use client'

import { useState, useEffect } from 'react'
import { RotateCcw, CheckCircle, XCircle, Clock, Star, Trophy } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  emoji: string
}

interface SushiQuizProps {
  onClose: () => void
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Qual é o ingrediente principal do sushi?",
    options: ["Arroz", "Peixe", "Alga", "Pepino"],
    correct: 0,
    explanation: "O arroz é o ingrediente principal do sushi, temperado com vinagre de arroz.",
    emoji: "🍚"
  },
  {
    id: 2,
    question: "O que significa 'sashimi'?",
    options: ["Sushi enrolado", "Peixe cru fatiado", "Arroz temperado", "Alga marinha"],
    correct: 1,
    explanation: "Sashimi é peixe cru fatiado, servido sem arroz.",
    emoji: "🐟"
  },
  {
    id: 3,
    question: "Qual utensílio é usado para comer sushi?",
    options: ["Garfo", "Colher", "Hashi", "Faca"],
    correct: 2,
    explanation: "Os hashi (palitinhos) são os utensílios tradicionais para comer sushi.",
    emoji: "🥢"
  },
  {
    id: 4,
    question: "O que é 'wasabi'?",
    options: ["Molho de soja", "Pasta de raiz-forte", "Alga marinha", "Vinagre"],
    correct: 1,
    explanation: "Wasabi é uma pasta verde picante feita de raiz-forte japonesa.",
    emoji: "🌶️"
  },
  {
    id: 5,
    question: "Qual é o nome do sushi enrolado em alga?",
    options: ["Nigiri", "Maki", "Sashimi", "Temaki"],
    correct: 1,
    explanation: "Maki é o sushi enrolado em alga nori com arroz e recheio.",
    emoji: "🍣"
  },
  {
    id: 6,
    question: "O que é 'nigiri'?",
    options: ["Sushi enrolado", "Peixe sobre arroz", "Alga com arroz", "Sopa de peixe"],
    correct: 1,
    explanation: "Nigiri é um bolinho de arroz com uma fatia de peixe por cima.",
    emoji: "🍱"
  },
  {
    id: 7,
    question: "Qual peixe é mais comum no sushi?",
    options: ["Salmão", "Atum", "Tilápia", "Bacalhau"],
    correct: 1,
    explanation: "O atum (maguro) é um dos peixes mais tradicionais no sushi.",
    emoji: "🐟"
  },
  {
    id: 8,
    question: "O que é 'gari'?",
    options: ["Pasta de gengibre", "Molho de soja", "Alga marinha", "Vinagre de arroz"],
    correct: 0,
    explanation: "Gari é o gengibre em conserva, servido para limpar o palato entre os sushis.",
    emoji: "🫚"
  },
  {
    id: 9,
    question: "Qual é o nome da alga usada no sushi?",
    options: ["Kombu", "Nori", "Wakame", "Hijiki"],
    correct: 1,
    explanation: "Nori é a alga marinha seca usada para enrolar o sushi maki.",
    emoji: "🌊"
  },
  {
    id: 10,
    question: "O que significa 'omakase'?",
    options: ["Sushi frito", "Peixe cru", "Deixe o chef escolher", "Arroz temperado"],
    correct: 2,
    explanation: "Omakase significa 'deixe o chef escolher', uma experiência gastronômica única.",
    emoji: "👨‍🍳"
  }
]

export default function SushiQuiz({ onClose }: SushiQuizProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  const startGame = () => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(shuffledQuestions)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTime(0)
    setCorrectAnswers(0)
    setShowResult(false)
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTime(0)
    setCorrectAnswers(0)
    setShowResult(false)
    setQuestions([])
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) return

    const question = questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correct

    if (isCorrect) {
      setScore(prev => prev + 100)
      setCorrectAnswers(prev => prev + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameState('completed')
      }
    }, 2000)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameState('completed')
    }
  }

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === 'playing' && !showResult) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, showResult])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGrade = () => {
    const percentage = (correctAnswers / questions.length) * 100
    if (percentage >= 90) return { grade: 'A+', emoji: '🏆', color: 'text-yellow-600' }
    if (percentage >= 80) return { grade: 'A', emoji: '🥇', color: 'text-yellow-600' }
    if (percentage >= 70) return { grade: 'B', emoji: '🥈', color: 'text-gray-600' }
    if (percentage >= 60) return { grade: 'C', emoji: '🥉', color: 'text-orange-600' }
    return { grade: 'D', emoji: '📚', color: 'text-red-600' }
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">❓ Quiz Sushi</h3>
        <p className="text-gray-600 mb-6">
          Teste seus conhecimentos sobre sushi! Responda 5 perguntas! 🍣
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Sobre o quiz:</h4>
          <ul className="text-sm text-left space-y-1">
            <li>• 5 perguntas sobre sushi</li>
            <li>• 100 pontos por resposta correta</li>
            <li>• Explicação após cada resposta</li>
            <li>• Nota final baseada na performance</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          🎮 Iniciar Quiz
        </button>
      </div>
    )
  }

  if (gameState === 'completed') {
    const grade = getGrade()
    
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">{grade.emoji}</div>
        <h3 className="text-2xl font-bold mb-2">Quiz Concluído!</h3>
        <div className={`text-3xl font-bold mb-4 ${grade.color}`}>
          Nota: {grade.grade}
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Acertos:</div>
              <div className="text-2xl font-bold text-green-600">{correctAnswers}/{questions.length}</div>
            </div>
            <div>
              <div className="font-semibold">Pontuação:</div>
              <div className="text-2xl font-bold text-primary-600">{score}</div>
            </div>
            <div>
              <div className="font-semibold">Tempo:</div>
              <div className="flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(time)}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">Percentual:</div>
              <div className="text-2xl font-bold">{Math.round((correctAnswers / questions.length) * 100)}%</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={startGame}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Fazer Novamente
          </button>
          <button
            onClick={resetGame}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Menu
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correct

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime(time)}</span>
          </div>
          <div>Pontos: {score}</div>
          <div>Pergunta: {currentQuestion + 1}/{questions.length}</div>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Question */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-4xl mb-2">{question.emoji}</div>
        <h4 className="font-semibold text-lg mb-2">{question.question}</h4>
        <div className="text-sm text-gray-600">
          Pergunta {currentQuestion + 1} de {questions.length}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`
              w-full p-3 rounded-lg border-2 text-left transition-all duration-300 text-gray-900
              ${selectedAnswer === index
                ? showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : 'border-red-500 bg-red-100 text-red-800'
                  : 'border-blue-500 bg-blue-100 text-blue-800'
                : showResult && index === question.correct
                ? 'border-green-500 bg-green-100 text-green-800'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 text-gray-900'
              }
              ${showResult ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                ${selectedAnswer === index
                  ? showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-red-500 bg-red-500 text-white'
                    : 'border-blue-500 bg-blue-500 text-white'
                  : showResult && index === question.correct
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300'
                }
              `}>
                {showResult && index === question.correct ? '✓' : String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <button
          onClick={submitAnswer}
          disabled={selectedAnswer === null}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
        >
          {selectedAnswer === null ? 'Selecione uma resposta' : 'Responder'}
        </button>
      )}

      {/* Result */}
      {showResult && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="text-center mb-2">
            {isCorrect ? (
              <div className="text-green-600 font-bold text-lg">✓ Correto!</div>
            ) : (
              <div className="text-red-600 font-bold text-lg">✗ Incorreto!</div>
            )}
          </div>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      {/* Progress */}
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
