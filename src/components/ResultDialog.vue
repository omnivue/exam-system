<template>
    <el-dialog 
      v-model="dialogVisible" 
      title="答题结果" 
      width="90%" 
      :before-close="handleClose"
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
      
      <template #footer>
        <el-button 
          v-if="!isLastQuestion" 
          type="primary" 
          @click="handleNext"
        >
          下一题
        </el-button>
        <el-button 
          v-else-if="!quizStore.isReviewMode" 
          type="success" 
          @click="handleFinish"
        >
          完成测试
        </el-button>
        <el-button 
          v-else 
          type="success" 
          @click="handleClose"
        >
          结束回顾
        </el-button>
        <el-button 
          v-if="isLastQuestion && !quizStore.isReviewMode && quizStore.wrongQuestions.length > 0" 
          type="warning" 
          @click="handleReview"
        >
          错题回顾
        </el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
  import { ref, watch } from 'vue'
  import { useQuizStore } from '../stores/quiz'
  
  const props = defineProps({
    visible: Boolean,
    isCorrect: Boolean
  })
  
  const emit = defineEmits(['update:visible', 'next', 'finish'])
  
  const quizStore = useQuizStore()
  const { currentQuestion, isLastQuestion } = storeToRefs(quizStore)
  
  const dialogVisible = ref(props.visible)
  
  watch(() => props.visible, (val) => {
    dialogVisible.value = val
  })
  
  watch(dialogVisible, (val) => {
    emit('update:visible', val)
  })
  
  const handleNext = () => {
    quizStore.nextQuestion()
    emit('next')
    dialogVisible.value = false
  }
  
  const handleFinish = () => {
    emit('finish')
    dialogVisible.value = false
  }
  
  const handleClose = () => {
    dialogVisible.value = false
  }

  const handleReview = () => {
    quizStore.startReview()
    dialogVisible.value = false
  }
  </script>
  
  <style scoped>
  @media (max-width: 768px) {
    .result {
      font-size: 1rem; 
    }
    .explanation {
      font-size: 0.9rem; 
    }
  }
  </style>