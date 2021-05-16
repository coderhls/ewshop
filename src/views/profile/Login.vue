<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户注册</template>
    </nav-bar>

    <div style="margin-top: 50px">
      <van-form @submit="onSubmit">
        <van-field
            v-model="name"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="email"
            type="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱地址' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="password_confirmation"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请再次输入密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="success" native-type="submit">提交</van-button>
          <div class="link-login" @click="$router.push({path: '/login'})">已有账号，立即登录</div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {reactive, toRefs} from "vue";
import {register} from "network/user";
import {Notify, Toast} from "vant";
import {useRouter} from "vue-router";

export default {
  name: "Register",
  components: {
    NavBar
  },
  setup() {
    const userInfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: ''
    })
    const router = useRouter()

    const onSubmit = () => {
      console.log("submit")
      if (userInfo.password !== userInfo.password_confirmation) {
        Notify('两次密码不一致')
      } else {
        register(userInfo).then(res => {
          if (res.status === '201') {
            Toast.success("注册成功")
            setTimeout(() => {
              router.push({path: '/login'})
            }, 1000)
            userInfo.password = '';
            userInfo.password_confirmation = '';
          }
        })
      }
    }

    return {
      ...toRefs(userInfo),
      onSubmit,
    }
  }
}
</script>

<style scoped>
.link-login {
  font-size: 14px;
  margin-top: 10px;
  color: #42b983;
  text-align: right;
}
</style>