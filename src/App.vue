<template>
  <div class="app-container">

    <AgreementDialog @confirm="handleAgreementConfirm" />


    <h1>执业Vet习题训练系统</h1>
    <QuizCard />
    <footer class="footer">
      <p> &copy; 2024 Omnivue. <a href="https://juejin.cn/user/715140437130377">本站由Omnivue📩 (禾明)开发</a></p>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
        黑ICP备2024028479号-1
      </a>
      <p> 本网站所有内容仅供学习交流参考，如有侵权请联系我们立即删除。</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgreementDialog from './components/AgreementDialog.vue'
import QuizCard from './components/QuizCard.vue'
import { useQuizStore } from './stores/quiz'
// 初始化题目
const quizStore = useQuizStore()
quizStore.initializeQuiz()

const showContent = ref(false)
const handleAgreementConfirm = () => {
  showContent.value = true
}
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

h1 {
  color: #409EFF;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #888;
}

.footer a {
  color: inherit;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.footer p {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #aaa;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .footer {
    font-size: 0.8rem;
  }

  .footer p {
    font-size: 0.75rem;
  }
}
</style>