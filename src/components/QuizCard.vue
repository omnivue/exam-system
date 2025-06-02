<template>
    <el-card class="quiz-card">
      <template #header>
        <div class="card-header">
          <span class="progress">题目 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
          <span class="timer">剩余时间: {{ timer }} 秒</span>
        </div>
      </template>
      
      <div class="question">{{ currentQuestion.question }}</div>
      
      <el-radio-group 
        v-model="selectedOption" 
        class="options-group"
        :disabled="showResult"
      >
        <el-radio 
          v-for="(option, index) in currentQuestion.options" 
          :key="index" 
          :label="option"
          class="option"
        >
          <span class="option-text">{{ option }}</span>
          <el-icon v-if="showResult && option === currentQuestion.answer" class="correct-icon">
            <CircleCheck />
          </el-icon>
        </el-radio>
      </el-radio-group>
      
      <div class="actions">
        <el-button 
          type="primary" 
          :disabled="!selectedOption || showResult"
          @click="checkAnswer"
          class="submit-btn"
        >
          提交答案
        </el-button>
      </div>
  
      <el-dialog 
        v-model="showResult" 
        title="答题结果" 
        width="85%"
        class="result-dialog"
      >
        <div v-if="isCorrect" class="result correct">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>回答正确!</span>
        </div>
        <div v-else class="result incorrect">
          <el-icon color="#F56C6C"><CircleClose /></el-icon>
          <span>回答错误!</span>
        </div>
        
        <div class="explanation">
          <p><strong>解析:</strong> {{ currentQuestion.explanation }}</p>
        </div>

        <div class="stats">
          <p>已答对: {{ correctCount }} 道题</p>
          <p>已答错: {{ wrongCount }} 道题</p>
          <p>正确率: {{ accuracy }}%</p>
        </div>
        
        <template #footer>
          <el-button 
            v-if="currentQuestionIndex > 0" 
            type="primary" 
            @click="previousQuestion"
            class="dialog-btn"
          >
            上一题
          </el-button>
          <el-button 
            v-if="!isLastQuestion" 
            type="primary" 
            @click="nextQuestion"
            class="dialog-btn"
          >
            下一题
          </el-button>
          <el-button 
            v-else 
            type="success" 
            @click="finishQuiz"
            class="dialog-btn"
          >
            完成测试
          </el-button>
        </template>
      </el-dialog>
    </el-card>
  </template>
  
  <script setup>
  import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
  import { storeToRefs } from 'pinia'
  import { useQuizStore } from '../stores/quiz'
  
  const quizStore = useQuizStore()
  const { 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions, 
    selectedOption,
    showResult,
    isCorrect,
    isLastQuestion,
    timer,
    correctCount,
    wrongCount,
    accuracy
  } = storeToRefs(quizStore)
  
  const { checkAnswer, nextQuestion, previousQuestion, finishQuiz } = quizStore // 使用 quizStore 的 finishQuiz 方法
  
  const startReview = () => {
    quizStore.startReview()
  }
  </script>
  
  <style scoped>
  .quiz-card {
    max-width: 100%;
    margin: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1rem; /* 增加内边距 */
    box-sizing: border-box;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }
  
  .progress, .score {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .timer {
    font-size: 1rem;
    color: #F56C6C;
    font-weight: bold;
  }
  
  .question {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    color: #333;
    font-weight: 500;
  }
  
  .options-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }
  
  .option {
    display: flex;
    align-items: center;
    margin: 0 !important;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    background-color: #f8f9fa;
    transition: all 0.3s;
    border: 1px solid #eee;
  }
  
  .option:hover {
    background-color: #f1f3f5;
  }
  
  .option-text {
    flex: 1;
    word-break: break-word;
    padding-right: 0.5rem;
  }
  
  .correct-icon {
    margin-left: auto;
    color: #67C23A;
    font-size: 1.2rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 8px;
  }
  
  .result-dialog {
    border-radius: 12px;
  }
  
  .result {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .correct {
    color: #67C23A;
  }
  
  .incorrect {
    color: #F56C6C;
  }
  
  .explanation {
    margin-top: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
  }
  
  .explanation p {
    margin: 0.5rem 0;
  }

  .stats {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
  }
  
  .dialog-btn {
    width: 100%;
    margin: 0.3rem 0;
    padding: 0.8rem;
  }
  
  /* 移动端特定样式 */
  @media (max-width: 768px) {
    .quiz-card {
      margin: 0.5rem;
      padding: 0.5rem; /* 减少内边距 */
    }
    
    .question {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .option {
      padding: 0.7rem 0.9rem;
      font-size: 0.95rem;
    }
    
    .submit-btn {
      padding: 0.7rem;
      font-size: 0.95rem;
    }
    
    .progress, .score {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 480px) {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.3rem;
    }
    
    .option {
      padding: 0.6rem 0.8rem;
    }
  }
  </style>