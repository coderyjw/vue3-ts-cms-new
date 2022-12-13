<template>
  <div class="panel-phone">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="70px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item class="code" label="验证码" prop="code">
        <el-input v-model="account.code" show-password />
        <el-button
          type="primary"
          :disabled="!canRequestCode"
          @click="requestPhoneCode"
          >{{ btnText }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { PAccount } from '@/types'
import type { FormRules, ElForm } from 'element-plus'

// 1.定义account数据
const account = reactive<PAccount>({
  phone: '',
  code: ''
})
const canRequestCode = ref(true)
const time = ref(60)
const btnText = computed(() =>
  canRequestCode.value ? '发送验证码' : time.value + 's'
)
const formRef = ref<InstanceType<typeof ElForm>>()

// 2.定义校验规则
const accountRules: FormRules = {
  phone: [
    { required: true, message: '必须输入手机号~', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号~',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '必须输入验证码~', trigger: 'blur' },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码由6位数字组成~',
      trigger: 'blur'
    }
  ]
}

// 3. 请求验证码
function requestPhoneCode() {
  formRef.value?.validateField('phone', (valid) => {
    if (valid) {
      canRequestCode.value = false

      const timer = setInterval(() => {
        if (time.value > 0) time.value = time.value - 1
        else {
          clearInterval(timer)
          canRequestCode.value = true
          time.value = 60
        }
      }, 1000)
    }
  })
}

// 4.执行帐号的登录逻辑

function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const phone = account.phone
      const code = account.code

      // 2.向服务器发送网络请求(携带手机号和验证码)
      console.log('向服务器发送网络请求(携带手机号和验证码)', { code, phone })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-phone {
  color: red;

  .code {
    .el-input {
      width: 108px;
      margin-right: 10px;
    }

    .el-button {
      width: 110px;
    }
  }
}
</style>
