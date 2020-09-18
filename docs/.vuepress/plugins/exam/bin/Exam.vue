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
            <div class="left">
              <div class="left-header" />
              <div class="left-body">
                <div class="title">
                  <div class="title-border" />
                  <div class="title-content">答题卡</div>
                </div>

                <div class="card">
                  <!-- 把v-for和v-if区分开 -->
                  <template v-for="(questions,inx) in list">
                    <div v-if="questions.length" :key="inx" class="card-content">
                      <div
                        class="card-content-title"
                      >{{ questions[0].type|typeFilter }}(共{{ questions.length }}题，合计{{ questions[0].type|scoreFilter(score,questions.length) }}分)</div>

                      <div class="box-list">
                        <div
                          v-for="ques in questions"
                          :key="ques.id"
                          class="box-list-item"
                          @click="cilckToJump(ques.id,ques.indexForPage)"
                        >
                          <span :ref="'box'+ques.id">
                            {{ ques.indexForShow }}
                            <svg-icon icon-class="star" hidden />
                          </span>
                        </div>
                      </div>

                      <div class="split" />
                    </div>
                  </template>
                </div>
              </div>

              <div class="left-footer">
                <svg-icon icon-class="square" class="s1" />
                <span class="icon-span">已答</span>
                <svg-icon icon-class="square-o" class="s2" />
                <span class="icon-span">未答</span>
                <svg-icon icon-class="star" class="s3" />
                <span class="icon-span">标记</span>
              </div>
            </div>
            <!-- 试题 -->
            <!-- 信息栏 -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import data from "../../../data/中级.json";
export default {
  data() {
    return {
      list: [] // 题目list
    };
  },
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
  created() {
    console.log(data);
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

  &::-webkit-scrollbar-thumb {
    background: #1a8cfe;
  }

  .content {
    background: green;
    height: 200vh;
  }

  .left {
    background-color: white;
    position: fixed;
    height: calc(100% - 110px);
    left: 90px;
    width: 240px;
    box-shadow: 0 1px 4px 0 rgba(58, 62, 81, 0.1);
    border: none;
    border-radius: 4px 4px 0 0;

    &-header {
      height: 20px;
    }

    &-body {
      height: calc(100% - 57px);
    }

    .title {
      position: relative;
      text-align: left;
      margin-left: 20px;
      font-size: 18px;
      line-height: 25px;

      &-border {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: #1a8cfe;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      &-content {
        margin-left: 14px;
        font-weight: 600;
        color: #27274a;
      }
    }

    .card {
      height: calc(100% - 38px);
      overflow: auto;

      &-content {
        padding: 0 20px 0 20px;
        position: relative;

        &-title {
          font-size: 12px;
          color: #27274a;
          font-weight: 600;
          padding-bottom: 12px;
          padding-top: 20px;
          line-height: 17px;
        }
      }

      .split {
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
      }
    }

    .box-list {
      position: relative;
      left: -3px;
      padding-bottom: 8px;
      font-size: 0;
      margin-right: -15px;
      margin-top: -3px;

      &-item {
        font-size: 0;
        display: inline-block;
        text-align: center;
        width: 30px;
        height: 33px;
        padding-bottom: 15px;
        line-height: 18px;
        position: relative;
        margin: 0 2px 2px;
        border-radius: 2px 2px 0 0;
        overflow: hidden;
        padding-top: 3px;
        cursor: pointer;

        & > span {
          font-size: 12px;
          display: block;
          padding: 4px 0;
          border: 1px solid #bbb;
          border-radius: 2px;
          float: left;
          margin-right: 9px;
          margin-bottom: 9px;
          min-width: 25px;
          color: #666;
          position: relative;

          & > svg {
            position: absolute;
            width: 9px;
            height: 10px;
            top: -4px;
            right: -5px;
            color: #ff962a;
          }

          &:hover, &.checked {
            background: #1a8cfe;
            color: #fff;
            border: 1px solid #1a8cfe;
          }

          &.wrong {
            background: #ff4b50;
            color: #fff;
            border: 1px solid #ff4b50;
          }
        }
      }
    }

    &-footer {
      position: absolute;
      bottom: 0;
      background-color: #fff;
      border: unset;
      right: 0;
      width: 100%;
      height: 38px;
      box-shadow: 0 -2px 10px 0 rgba(58, 62, 81, 0.1);
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .svg-icon {
        width: 13.5px;
        height: 13.5px;
        display: inline-block;
        margin-right: 2px;

        &.s1 {
          color: #1a8cfe;
          margin-bottom: 0.5px;
        }

        &.s2 {
          color: #bbb;
        }

        &.s3 {
          color: #ff962a;
          height: 11px;
          width: 12px;
          margin-bottom: 2px;
        }

        &.s2, &.s3 {
          margin-left: 12px;
        }
      }

      .icon-span {
        font-size: 12px;
        color: #656577;
      }
    }
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
