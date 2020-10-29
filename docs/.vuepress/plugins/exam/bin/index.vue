<template>
  <div class="exam-list">
    <hr style="margin: 1.5rem 0" />
    <div class="exam-list-wrapper">
      <div v-for="(exam, index) in currentPageData" :key="index" class="exam-item">
        <form class="info" action="javascript:;">
          <h3 class="title">
            <span class="name" :title="exam.name">{{ exam.name }}</span>
          </h3>
          <div class="desc">
            <span v-if="exam.singleTotal" class="tag">
              单选：
              <input
                v-model.number="examData[exam.index].singleNum"
                type="number"
                class="input-num"
                min="0"
                :max="exam.singleTotal"
              />
              / {{ exam.singleTotal }}
            </span>
            <span v-if="exam.multipleTotal" class="tag">
              多选：
              <input
                v-model.number="examData[exam.index].multipleNum"
                type="number"
                class="input-num"
                min="0"
                :max="exam.multipleTotal"
              />
              / {{ exam.multipleTotal }}
            </span>
            <span v-if="exam.judgeTotal" class="tag">
              判断：
              <input
                v-model.number="examData[exam.index].judgeNum"
                type="number"
                class="input-num"
                min="0"
                :max="exam.judgeTotal"
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
      :current-page="currentPage"
      @getCurrentPage="getCurrentPage"
    />

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
      <ExamPage v-if="drawer" :config="config" @close="drawerClose" />
    </el-drawer>
  </div>
</template>

<script>
import ExamPage from './components/Exam'

export default {
  components: { ExamPage },
  data() {
    return {
      examData: [],
      currentPage: 1,
      config: {},
      drawer: false
    }
  },
  computed: {
    currentPageData() {
      const start = this.currentPage * 10 - 10
      const end = this.currentPage * 10
      return this.examData.slice(start, end)
    }
  },
  async created() {
    // 匿名登录
    await this.$cloudbase.auth({ persistence: 'local' }).anonymousAuthProvider().signIn()
    // 数据库查询
    const db = this.$cloudbase.database()
    const $ = db.command.aggregate

    // web sdk 不支持联表查询
    // const queryResult = await db
    //   .collection("exam_questions")
    //   .aggregate()
    //   .lookup({
    //     from: "exam_subjects",
    //     localField: "sub_id",
    //     foreignField: "_id",
    //     as: "subject"
    //   })
    //   .replaceRoot({
    //     newRoot: $.mergeObjects([$.arrayElemAt(["$subject", 0]), "$$ROOT"])
    //   })
    //   .group({
    //     _id: "$name",
    //     singleTotal: $.sum(
    //       $.cond({ if: $.eq(["$type", 1]), then: 1, else: 0 })
    //     ),
    //     multipleTotal: $.sum(
    //       $.cond({ if: $.eq(["$type", 2]), then: 1, else: 0 })
    //     ),
    //     judgeTotal: $.sum($.cond({ if: $.eq(["$type", 3]), then: 1, else: 0 }))
    //   })
    //   .end();

    const quesCountResult = await db
      .collection('exam_questions')
      .aggregate()
      .group({
        _id: '$sub_id',
        singleTotal: $.sum($.cond({ if: $.eq(['$type', 1]), then: 1, else: 0 })),
        multipleTotal: $.sum($.cond({ if: $.eq(['$type', 2]), then: 1, else: 0 })),
        judgeTotal: $.sum($.cond({ if: $.eq(['$type', 3]), then: 1, else: 0 }))
      })
      .end()
    const subCountResult = await db
      .collection('exam_subjects')
      .field({ order: false })
      .orderBy('order', 'asc')
      .get()

    const tempArr = []
    const quesArr = quesCountResult.data
    const subArr = subCountResult.data

    subArr.map((subItem, index) => {
      quesArr.map((quesItem) => {
        if (quesItem._id === subItem._id) {
          tempArr.push({
            index,
            name: subItem.name,
            singleTotal: quesItem.singleTotal, // 单选题数
            multipleTotal: quesItem.multipleTotal, // 多选题数
            judgeTotal: quesItem.judgeTotal, // 判断题数
            singleNum: 25,
            multipleNum: 25,
            judgeNum: 25
          })
        }
      })
    })

    this.examData = tempArr
  },
  methods: {
    getCurrentPage(currentPage) {
      this.currentPage = currentPage
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
    examBegin(index) {
      // 默认每页10条
      const idx = this.currentPage * 10 - 10 + index
      this.config = this.examData[idx]
      this.drawer = true
    },
    drawerClose() {
      this.drawer = false
    }
  }
}
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
            display: inline-block;
            padding: 0px 6px;
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

/deep/ .el-drawer:focus {
  outline: none;
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
