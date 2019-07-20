<template>
  <div class="container">
    <el-card>
        <div slot="header">
            <my-bread>评论管理</my-bread>
        </div>
      <el-table :data="comments" style="width: 100%">
        <el-table-column label="标题" width="700" prop="title"></el-table-column>
        <el-table-column label="总评论数" width="100" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" width="120" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态" width="100" >
            <template slot-scope="scope">
                {{scope.row.comment_status?'正常':'关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
                <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>

            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
    :page-size="reqParams.per_page"
    :current-page="reqParams.page"
    @current-change='changePage'
      :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    toggleStatus (row) {
      const text1 = '您确认要打开评论吗？'
      const text2 = '关闭后用户无法对该文章进行评论，您确认要关闭评论吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.axios.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status

        })
        this.$message.success('修改状态成功')
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    }
  }
}
</script>

<style>
.el-pagination {
    text-align: center
}
</style>
