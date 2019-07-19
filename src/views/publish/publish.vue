<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form v-model="articleForm" label-width="100px">
        <el-form-item label="标题：" size="small">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model=" articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单面</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if='articleForm.cover.type===1'>
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：" size="small">
          <my-channel v-model="articleForm.channel_id" :options="editorOption"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文章ID
      articleId: null,
      articleForm: {
        content: '',
        title: '',
        cover: {
          type: 1,
          // 单图 三图
          images: []
        },
        channel_id: null
      },
      // 编辑器配置项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }] // outdent/indent
          ]
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    this.getArticle(this.articleId)
  },
  methods: {
    async getArticle (id) {
      const { data: { data } } = await this.axios.get('articles/' + id)
      this.articleForm = data
    },
    changeType () {
      this.articleForm.cover.images = []
    },
    async publish (draft) {
      await this.axios.post('articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async edit (draft) {
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
