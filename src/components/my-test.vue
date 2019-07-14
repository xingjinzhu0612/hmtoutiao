
<template>
  <div class="container">
    <p>头部</p>
    <p class="content">
      <slot name="con" :test="testName"></slot>
    </p>
    <p>
      底部
      <slot name="fot">neirong1</slot>
    </p>
  </div>

  <!-- 使用组件 -->
  <!-- <my-test>
    <template slot="con" slot-scope="scope">内容2{{scope.test}}</template>
    <template slot="fot">逮捕2</template>
  </my-test> -->
</template>

<script>
export default {
  data () {
    return {
      testName: '组件内部数据'
    }
  }
}
</script>

<style>
</style>
