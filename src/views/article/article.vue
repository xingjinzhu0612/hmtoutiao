<template>
  <div class="artisle-container">

    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">待审失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
          <!-- <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        <span>
          根据筛选条件共查询到
          <b>{{total}}</b>条结果：
        </span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:120px;height:80px" lazy>
              <div slot="error" class="image-slot">
                <!-- <i class="el-icon-picture-outline"></i> -->
                <img src="../../assets/images/error.gif" width="120px" height="80px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <!-- {{scope.row.id}}显示当前id -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="reqParams.page"
          @current-change="changePage"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testData: '',
      // 提交给后台的筛选数据，传参
      // 数据默认是''还是null的区别，如果是null将不会发送字段
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      // channelOptions: [],
      // 日期控件的数据
      dateValues: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取频道数据
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {

    edit (id) {
      // this.$router.push('/publish?id' + id)
      this.$router.push({ path: '/publish', query: { id } })
    },
    del (id) {
      this.$confirm('此操作将永久删除该文zhang, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`articles/${id}`)
          // 删除成功后做什么
          // 后台没有任何响应，一直等待响应，导致后面代码无法执行
          this.getArticles()
          this.$message.success('删除成功')
        })
        .catch(() => {

        })
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // async getChannelOptions () {
    //   //
    //   const {
    //     data: { data }
    //   } = await this.axios.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      // console.log(data.results)
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>
