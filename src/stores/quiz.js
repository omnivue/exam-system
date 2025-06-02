import { defineStore } from 'pinia'
import questionsData from '../data/questions.json'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [], // 存储抽取的题目
    currentQuestionIndex: 0,
    selectedOption: null,
    showResult: false,
    isCorrect: false,
    wrongQuestions: [], // 存储错题
    correctCount: 0, // 正确题目数
    timer: 30, // 每道题的倒计时
    intervalId: null // 定时器ID
  }),
  actions: {
    initializeQuiz() {
      // 随机抽取 20 道题目
      this.questions = this.shuffleArray(questionsData).slice(0, 20)
      this.resetQuiz()
    },
    shuffleArray(array) {
      // 洗牌算法
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    selectOption(option) {
      this.selectedOption = option
    },
    checkAnswer() {
      this.isCorrect = this.selectedOption === this.currentQuestion.answer
      if (this.isCorrect) {
        this.correctCount++
      } else {
        this.wrongQuestions.push(this.currentQuestion) // 记录错题
      }
      this.showResult = true
      clearInterval(this.intervalId) // 停止计时器
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
        this.resetTimer()
        this.selectedOption = null
        this.showResult = false
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
        this.resetTimer()
        this.selectedOption = null
        this.showResult = false
      }
    },
    resetQuiz() {
      this.currentQuestionIndex = 0
      this.selectedOption = null
      this.showResult = false
      this.correctCount = 0
      this.wrongQuestions = []
      this.resetTimer()
    },
    resetTimer() {
      clearInterval(this.intervalId)
      this.timer = 30
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          this.checkAnswer() // 自动提交答案
        }
      }, 1000)
    }
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    isLastQuestion: (state) => state.currentQuestionIndex === state.questions.length - 1,
    totalQuestions: (state) => state.questions.length,
    wrongCount: (state) => state.wrongQuestions.length,
    accuracy: (state) => Math.round((state.correctCount / state.totalQuestions) * 100)
  }
})