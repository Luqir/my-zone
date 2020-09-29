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
          <div class="content">
            <!-- 答题卡 -->
            <left :list="list"></left>
            <!-- 试题 -->
            <!-- 信息栏 -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dynamicLoadScript from "./dynamicLoadScript";
import Left from "./Left";

export default {
  components: { Left },
  props: {
    config: {
      type: Object,
      default: function() {
        return {
          name: "试卷名称",
          singleNum: 25, // 单选题数
          multipleNum: 25, // 多选题数
          judgeNum: 25, // 判断题数
          path: "" // 题库名称
        };
      }
    }
  },
  data() {
    return {
      list: [[], [], []], // 初始题库->二维
      listForPageArr: [], // 考卷显示题库->一维
      listForPageArrBat: [], // 考试题库备份
      totalLength: 0, // 总题目数
      totalLengthForPage: 0 // 总题目数：用于查看错题时统计总题数
    };
  },
  mounted() {
    dynamicLoadScript("/exam-data/中级.js", err => {
      if (err) {
        this.$message.error(err.message);
        return;
      }
      let tempArr = [[], [], []];
      examList.map(item => {
        tempArr[item.type - 1].push(item);
      });
      this.list = tempArr;
      this.init();
    });
  },
  methods: {
    init() {
      // 遍历原题库将二维展开成一维
      let totalLength = 0;
      let typeTemp = 0;
      let indexTemp = 0;
      [].concat.apply([], this.list).filter((item, index) => {
        if (typeTemp !== item.type) {
          indexTemp = 0;
          typeTemp = item.type;
        }
        item.indexForShow = ++indexTemp; // 显示题号
        totalLength++;
        item.indexForPage = index + 1; // 分页题号
        this.listForPageArr.push(item);
        this.listForPageArrBat.push(item);
      });
      this.totalLength = this.totalLengthForPage = totalLength;
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
  height: calc(100vh - 70px);
  padding: 20px 230px 80px 350px;

  &::-webkit-scrollbar-thumb {
    background: #1a8cfe;
  }

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
    padding: 10px 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
