<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="form" label-width="120px" >
            <el-form-item label="编号：">{{form.id}}</el-form-item>
            <el-form-item label="手机：">{{form.mobile}}</el-form-item>
            <el-form-item label="邮箱：">{{form.email}}</el-form-item>

            <el-form-item label="媒体名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="form.intro" type="textarea :row='3'"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :headers="headers"
          :http-request='upload'
          :on-success="handleSuccess"
          >
            <img v-if="form.photo" :src="form.photo" class="avatar" />

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <p style="text-align:center">修改头像</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus/eventBus.js'
export default {
  data () {
    return {
      form: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      },
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data: { data } } = await this.axios.get('user/profile')
      this.form = data
    },
    async updateUser () {
      const { data: { data } } = await this.axios.patch('user/profile', {
        name: this.form.name,
        intro: this.form.intro,
        email: this.form.email
      })
      this.$message.success('修改用户信息成功')
      eventBus.$emit('updateHeaderName', data.name)
      const localUser = JSON.parse(window.sessionStorage.getItem('hmtoutiao'))
      localUser.name = data.name
      window.sessionStorage.setItem('hmtoutiao', JSON.stringify(localUser))
    },
    upload (data) {
    //   console.log(data.file)
      const formData = new FormData()
      formData.append('photo', data.file)
      this.axios.patch('user/photo', formData).then(res => {
        this.form.photo = res.data.data.photo
        eventBus.$emit('updateHeaderName', res.data.data.photo)
        const localUser = JSON.parse(window.sessionStorage.getItem('hmtoutiao'))
        localUser.photo = res.data.data.photo
        window.sessionStorage.setItem('hmtoutiao', JSON.stringify(localUser))
      })
    },
    handleSuccess (res) {
      console.log(res)
    }
  }
}
</script>

<style>
</style>
