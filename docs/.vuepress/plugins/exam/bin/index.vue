<template>
  <div class="exam-list">
    <hr style="margin: 1.5rem 0" />
    <div class="exam-list-wrapper">
      <div class="exam-item" v-for="(exam, index) in currentPageData" :key="index">
        <form class="info" action="javascript:;">
          <h3 class="title">
            <span class="name">{{ exam.name }}</span>
          </h3>
          <div class="desc">
            <span class="tag" v-if="exam.singleTotal">
              单选：
              <input
                type="number"
                class="input-num"
                min="0"
                :max="exam.singleTotal"
                v-model="examData[exam.index].singleNum"
              />
              / {{ exam.singleTotal }}
            </span>
            <span class="tag" v-if="exam.multipleTotal">
              多选：
              <input
                type="number"
                class="input-num"
                min="0"
                :max="exam.multipleTotal"
                v-model="examData[exam.index].multipleNum"
              />
              / {{ exam.multipleTotal }}
            </span>
            <span class="tag" v-if="exam.judgeTotal">
              判断：
              <input
                type="number"
                class="input-num"
                min="0"
                :max="exam.judgeTotal"
                v-model="examData[exam.index].judgeNum"
              />
              / {{ exam.judgeTotal }}
            </span>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              size="mini"
              native-type="submit"
              @click="examBegin(index)"
            >开始考试</el-button>
          </div>
        </form>
      </div>
    </div>

    <!-- 分页 -->
    <pagation
      class="pagation"
      :total="examData.length"
      :currentPage="currentPage"
      @getCurrentPage="getCurrentPage"
    ></pagation>

    <!-- 考试 -->
    <el-drawer
      :visible.sync="drawer"
      direction="ttb"
      title="考卷"
      custom-class="drawer"
      :with-header="false"
      :close-on-press-escape="false"
      :wrapper-closable="false"
      size="100%"
      append-to-body
    >
      <ExamPage :config="config" @close="drawer=false"></ExamPage>
    </el-drawer>
  </div>
</template>

<script>
import examData from "../../../data/examData";
import ExamPage from "./Exam";

export default {
  components: { ExamPage },
  data() {
    return {
      examData,
      currentPage: 1,
      config: {},
      drawer: false
    };
  },
  created() {
    // 添加试卷对应题型数量
    for (let i = 0, len = this.examData.length; i < len; i++) {
      const ele = this.examData[i];
      ele.index = i;
      ele.singleNum = 25;
      ele.multipleNum = 25;
      ele.judgeNum = 25;
    }
  },
  computed: {
    currentPageData() {
      const start = this.currentPage * 10 - 10;
      const end = this.currentPage * 10;
      return this.examData.slice(start, end);
    }
  },
  methods: {
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    examBegin(index) {
      const idx = this.currentPage * 10 - 10 + index;
      this.config = this.examData[idx];
      this.drawer = true;
    }
  },
  mounted() {
    this.config = this.examData[0];
    this.drawer = true;
  }
};
</script>


<style lang="stylus" scoped>
.exam-list {
  margin-top: -30px;

  .exam-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .exam-item {
      margin-bottom: 2rem;
      width: 48%;
      box-shadow: var(--box-shadow);

      .info {
        margin: 1rem 0;
        padding: 0 1.5rem;

        .title {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .name {
            max-width: 88%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .desc {
          margin: 1rem 0 1rem;

          .tag {
            padding: 4px 6px;
            font-size: 12px;
            background: $accentColor;
            color: #ffffff;
            border-radius: $borderRadius;
            margin-right: 0.8rem;

            input[type=number] {
              -moz-appearance: textfield;
            }

            input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        }

        .input-num {
          border: none;
          border-bottom: 1px solid #ffffff;
          border-radius: 0;
          width: 1.5rem;
          background-color: $accentColor;
          color: #ffffff;
          outline-style: none;
          text-align: center;
          font-size: 12px;
        }

        .btn {
          display: flex;
          justify-content: flex-end;

          .el-button--primary {
            background-color: $accentColor;
            border-color: $accentColor;
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .exam-list {
    .exam-list-wrapper {
      .exam-item {
        margin-bottom: 1.5rem;
        width: 100%;
      }
    }
  }
}
</style>
