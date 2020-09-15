<template>
  <div class="exam">
    <el-container>
      <el-header>
        <i class="el-icon-arrow-left out-icon" @click="$emit('close')"></i>
        <span class="header-name">{{ config.name }}</span>
        <span class="header-time">07:23:35</span>
        <el-button
          plain
          icon="el-icon-switch-button"
          size="medium"
          class="out-btn"
          @click="$emit('close')"
        >退出</el-button>
      </el-header>
      <el-container>
        <el-main>
          <div class="content">xxxx</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    config: {
      type: Object,
      default: function() {
        return {
          name: "试卷名称",
          singleNum: 25, // 单选题数
          multipleNum: 25, // 多选题数
          judgeNum: 25 // 判断题数
        };
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header {
  background: #ffffff;
  height: 70px !important;
  box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.5);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  .header-name {
    color: #27274a;
    font-weight: 700;
    font-family: monospace;
    font-size: 1.5rem;
  }

  .out-icon, .header-time {
    display: none;
  }

  .out-btn {
    position: absolute;
    right: 50px;
    color: #1a8cfe;
    border-color: #1a8cfe;
  }
}

.el-main {
  background-color: #eff3f7;
  text-align: center;
  height: calc(100vh - 70px);
  padding: 20px 230px 80px 350px;

  .content {
    background: green;
    height: 200vh;
  }
}

@media (max-width: $MQMobile) {
  .el-header {
    background: #1a8cfe;
    height: 45px !important;

    .header-name, .out-btn {
      display: none;
    }

    .header-time {
      display: unset;
      color: #ffffff;
      font-size: 16px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .out-icon {
      display: unset;
      position: absolute;
      left: 9px;
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
    }
  }

  .el-main {
    padding: 0 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
