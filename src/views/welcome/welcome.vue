<template>
  <div class="welcome-container">
    <img src="../../assets/images/welcome.jpg" alt />
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.welcome-container {
    position: relative;
    // width: 100%;
    // height:600px;
    // background: url(../../assets/images/welcome.jpg) no-repeat center
    img {
        // display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,50%);
    }
}
</style>
