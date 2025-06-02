<template>
    <el-dialog v-model="visible" title="📜 使用协议" width="80%" :close-on-click-modal="false"
        :close-on-press-escape="false" :show-close="false">
        <div class="agreement-content">
            <h3>🎯 欢迎使用执业Vet习题训练系统 🎯</h3>
            <p>📌 1. 本网站所有内容仅供学习交流参考，不得用于商业用途</p>
            <p>⚖️ 2. 使用过程中请遵守相关法律法规</p>
            <p>🚫 3. 如有侵权内容，请联系我们立即删除</p>
            <p>🎉 4. 祝你事事顺利，逢考必过 💯</p>
            <p>💡 5. 如有改进意见与想法，可通过以下方式联系：</p>
            <p style="text-align: center; margin-top: 10px;">
                <a href="https://juejin.cn/user/715140437130377" target="_blank"
                    style="color: #409EFF; text-decoration: none;">
                    <span style="display: inline-block; background: #f0f7ff; padding: 5px 10px; border-radius: 4px;">
                        📩 掘金平台私信禾明
                    </span>
                </a>
            </p>
        </div>
        <template #footer>
            <el-button type="primary" @click="handleConfirm" :disabled="!enableConfirm" :loading="confirmLoading">
                {{ enableConfirm ? '✅ 我已阅读并同意' : `⏳ 请阅读协议 (${countdown}s)` }}
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['confirm'])

const visible = ref(true)
const enableConfirm = ref(false)
const confirmLoading = ref(false)
const countdown = ref(5)

const startCountdown = () => {
    const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
            enableConfirm.value = true
        }
    }, 1000)
}

const handleConfirm = () => {
    confirmLoading.value = true
    setTimeout(() => {
        visible.value = false
        confirmLoading.value = false
        localStorage.setItem('agreementAccepted', 'true')
        emit('confirm')
    }, 500)
}

onMounted(() => {

    startCountdown()
    // const accepted = localStorage.getItem('agreementAccepted')
    // if (accepted !== 'true') {
    //     startCountdown()
    // } else {
    //     visible.value = false
    //     emit('confirm')
    // }
})
</script>

<style scoped>
.agreement-content {
    max-height: 60vh;
    overflow-y: auto;
    padding: 0 10px;
    text-align: left;
    line-height: 1.8;
}

.agreement-content h3 {
    color: #409EFF;
    margin-bottom: 15px;
    text-align: center;
}

.agreement-content p {
    margin-bottom: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .agreement-content {
        font-size: 0.9rem;
    }

    .agreement-content h3 {
        font-size: 1.1rem;
    }
}
</style>