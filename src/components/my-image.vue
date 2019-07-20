<template>
  <div class="image-container">

    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <!-- //父组件有数据 没有使用默认图 -->
      <img :src="value || defaultImage" alt />
    </div>

    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!--v-model="activeName" 选中了tab选项卡 name属性值 -->
      <!-- label选项卡的文字 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <!-- 单选框组 -->
          <div style="margin-bottom:10px">
            <el-radio-group v-model=" reqParams.collect" size="small" @change="toggleImage">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>

          <!-- 图片列表 -->
          <div
            class="img-item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" alt />
          </div>
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="peger"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // value: defaultImage,
      defaultImage,
      // 上传图片的头部
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
      },
      // 加载中
      loading: false,
      // 控制选项卡选中谁
      activeName: 'image',
      // 控制对话框显示隐藏
      dialogVisible: false,
      //   请求素材列表的参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      // 航船图片预览地址
      imageUrl: null,
      images: [],
      selectedImageUrl: null
    }
  },
  methods: {
    // 上传成功后预览
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    openDialog () {
      // 打开对话框
      this.dialogVisible = true
      // 把上次 数据清空
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getImages()
    },
    // 获取列表
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    peger (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleImage () {
      this.reqParams.page = 1
      this.getImages()
    },
    selected (url) {
      this.selectedImageUrl = url
    },
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.info('请选中封面图')
        // this.value = this.selectedImageUrl
        // 通知父组件数据改变数据
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.imageUrl) return this.$message.info('请上传封面图')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
.image-container {
   width: 150px;
  height: 120px;
  margin-right: 20px;
  display: inline-block;
  margin-top: 10px;
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 80px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    //图片属性，等比例缩放显示在容器内
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
