<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
      <div class="logo" :class="{close:collapse}"></div>
    <!-- //导航菜单组件容器 -->
     <el-menu
      :default-active="$route.path"
      background-color="#002233"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border-right:none"
      :collapse="collapse"
      :collapse-transition='false'
      :router='true'
      >

      <el-menu-item index="/">
        <i class= 'el-icon-s-home'></i>
        <span  slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="el-icon-cherry"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/setting">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>

    </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="txt">江苏传智播客科技有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img :src="avatar" alt />
            <b>{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../eventBus/eventBus'
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''

    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hmtoutiao'))
    this.name = user.name
    this.avatar = user.photo
    // 绑定事件
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
    eventBus.$on('updateHeaderName', (photo) => {
      this.photo = photo
    })
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // window.sessionStorage.getItem('hmtoutiao', null)
      window.sessionStorage.removeItem('hmtoutiao')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // background: pink
  .my-header {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    .el-icon-s-fold {
      font-size: 20px;
      vertical-align: middle;
    }
    .txt {
      vertical-align: middle;
      padding-left: 10px;
    }
    .el-dropdown-link {
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      b {
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
  .my-aside {
    background: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
    }
    .close{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto
    }
  }
}
</style>
