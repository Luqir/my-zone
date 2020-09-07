<template>
  <div v-if="hackReset" ref="exam" class="exam">
    <div @mouseenter="headerEnter" @mouseleave="headerLeave">
      <div class="header" @click="editSubmit=true">
        <h1 class="text3d">{{ listQuery.name }}</h1>
      </div>
    </div>

    <div
      class="content"
      :style="{backgroundImage:`url(${require('@/assets/exam_images/background.jpg')})`}"
    >
      <div class="body">
        <!-- 把v-for和v-if区分开 -->
        <template v-for="(questions,inx) in listForPage">
          <div v-if="questions.length" :key="inx" class="questions">
            <div
              class="questions-title"
            >{{ questions[0].type|typeFilter }}(共{{ list[inx].length }}题，合计{{ questions[0].type|scoreFilter(score,list[inx].length) }}分)</div>

            <div class="questions-content">
              <div
                v-for="ques in questions"
                :ref="'id'+ques.id"
                :key="ques.id"
                class="question-content"
              >
                <div :ref="'sign'+ques.id" class="sign" @click="signFun($event,ques.id)">
                  <svg-icon icon-class="star" />标记
                </div>

                <div class="exam-question" :style="{fontSize:questionFontSize+'px'}">
                  <span class="exam-question-index">{{ ques.indexForShow }}.</span>
                  <span v-html="ques.title" />
                  <span class="exam-question-score">({{ ques.type|scoreFilter(score,1) }}分)</span>
                </div>

                <div
                  :ref="'answer'+ques.id"
                  class="answers"
                  :style="{fontSize:answerFontSize+'px'}"
                >
                  <div
                    v-for="number in getQuestionSelectNum(ques)"
                    :key="number"
                    class="select"
                    :class="selectClass(ques.type)"
                    :style="selectStyle"
                  >
                    <input
                      v-if="ques.type===1||ques.type===3"
                      :id="`${String.fromCharCode(96+number)}`+ques.id"
                      type="radio"
                      :name="'radio'+ques.id"
                      class="radioOrCheck"
                      hidden
                      @change="examClick"
                    >
                    <input
                      v-if="ques.type===2"
                      :id="`${String.fromCharCode(96+number)}`+ques.id"
                      type="checkbox"
                      :name="'radio'+ques.id"
                      class="radioOrCheck"
                      hidden
                      @change="examClick"
                    >
                    <label :for="`${String.fromCharCode(96+number)}`+ques.id">
                      <span class="select-icon" :style="ques.type===2?'border-radius:2px':''">
                        <!-- <svg-icon v-if="ques.type===3&&number===1" icon-class="correct" /> -->
                        <svg-icon
                          v-if="ques.type===3&&number===2"
                          icon-class="error"
                          class="icon-error"
                          hidden
                        />
                        <svg-icon v-else icon-class="correct" hidden />
                      </span>
                      <span v-if="ques.type!==3" class="words">
                        <span class="words-option">{{ String.fromCharCode(64+number) }}.</span>
                        <span v-html="ques[String.fromCharCode(96+number)]" />
                      </span>
                      <span v-else class="words">{{ judgeShow[number-1] }}</span>
                    </label>
                  </div>
                </div>
                <!-- 交卷后的解析-begin -->
                <div
                  v-show="status===2||(!examBool&&answerArr[ques.id]&&ques.type!==2)"
                  :ref="'analysis'+ques.id"
                  class="analysis"
                  :style="{fontSize:answerFontSize+'px'}"
                >
                  <template v-if="status===2||(!examBool&&answerArr[ques.id]&&ques.type!==2)">
                    <div
                      class="analysis-wrapper"
                    >
                      <div class="analysis-wrapper-icon" style="{width:48px}">
                        <i
                          v-if="answerArr[ques.id]!==ques.answer"
                          class="analysis-sign analysis-sign-error"
                        >错误</i>
                        <i
                          v-else
                          class="analysis-sign analysis-sign-right"
                        >正确</i>
                      </div>
                    </div>

                    <div class="analysis-row">
                      <div class="analysis-title">学员答案：</div>
                      <div
                        class="analysis-content"
                        :class="answerArr[ques.id]===ques.answer?'analysis-content-right':'analysis-content-error'"
                      >{{ answerArr[ques.id]?(ques.type===3?(answerArr[ques.id]==='a'?'正确':'错误'):answerArr[ques.id].toUpperCase()):'' }}</div>
                    </div>

                    <div class="analysis-row">
                      <div class="analysis-title">正确答案：</div>
                      <div
                        :id="'rightAnswer'+ques.id"
                        class="analysis-content question-ans-right"
                        :answer="ques.answer"
                      >{{ ques.type===3?(ques.answer==='a'?'正确':'错误'):ques.answer.toUpperCase() }}</div>
                    </div>
                    <div class="analysis-row">
                      <div class="analysis-title">答案解析：</div>
                      <div class="analysis-content" v-html="ques.parse" />
                    </div>
                  </template>
                </div>
                <!-- 交卷后的解析-end -->
              </div>
            </div>
          </div>
        </template>

        <pagination
          v-if="totalLength>0"
          :total="totalLengthForPage"
          :page.sync="pageQuery.page"
          :limit.sync="pageQuery.limit"
          :page-sizes="[10,20,25,30,50,100]"
          @pagination="pageFun"
        />

        <div class="support">
          CopyRight © 2020 By
          <span class="up">Luqir</span>
        </div>
      </div>
    </div>

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

    <div class="right">
      <div class="right-top">
        <ul>
          <li class="right-top-time">
            <div class="right-top-time-label">{{ status===2?'考试用时':"已用时间" }}</div>
            <div class="right-top-time-data">{{ timeUse | timeFormat }}</div>
          </li>

          <template v-if="status===2">
            <li class="right-top-process">
              <div class="right-top-process-label">本次成绩</div>
              <div class="right-top-time-data">
                {{ userScore }}
                <i>分</i>
              </div>
            </li>

            <li class="right-top-process">
              <div class="right-top-process-label">总题数</div>
              <div class="right-top-time-data">
                {{ totalLength }}
                <i>题</i>
              </div>
            </li>

            <li class="right-top-process">
              <div class="right-top-process-label">正确率</div>
              <div class="right-top-time-data">
                {{ percentScore }}
                <i>%</i>
              </div>
            </li>

            <li class="right-top-process">
              <div class="right-top-process-label">筛选试题</div>
              <div class="right-top-time-data">
                <el-dropdown trigger="click" @command="filterAnswer">
                  <span class="el-dropdown-link">
                    {{ filterAnswerText }}
                    <i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="all">全部</el-dropdown-item>
                    <el-dropdown-item command="right" divided>答对</el-dropdown-item>
                    <el-dropdown-item command="wrong">答错</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
          </template>

          <li v-else class="right-top-process">
            <div class="right-top-process-label">当前进度</div>
            <div class="right-top-process-data">
              <span>{{ commitLength }}</span> /
              <span>{{ totalLength }}</span>
            </div>
            <div class="right-top-process-bar">
              <div class="right-top-process-bar-item" :style="progressStyle" />
            </div>
          </li>

          <li class="right-top-fontsize">
            <span class="right-top-fontsize-minus" @click="fontsizeMinus">－</span>
            <span class="right-top-fontsize-label">字号</span>
            <span class="right-top-fontsize-plus" @click="fontsizePlus">＋</span>
          </li>
        </ul>
      </div>
      <div class="right-button">
        <el-button
          v-if="status===2&&wrongAnswerArr.length>0"
          type="primary"
          @click="redoVisible=true"
        >重做错题</el-button>
        <el-button type="primary" @click="submit">{{ status===2?'再考一次':'交卷' }}</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="noticeSubmit" width="440px" center>
      <span class="dialog-title">{{ submitNoticeText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeSubmit=false">取 消</el-button>
        <el-button type="primary" @click="submitSure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="editSubmit" width="440px" center>
      <span class="dialog-title">是否放弃当前试卷重新选择？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSubmit=false">取 消</el-button>
        <el-button type="primary" @click="editFn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="redoVisible" width="440px" center>
      <span class="dialog-title">重做错题？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="redoVisible=false">取 消</el-button>
        <el-button type="primary" @click="redoVisibleFun">确 定</el-button>
      </span>
    </el-dialog>

    <el-drawer
      :visible.sync="drawer"
      direction="ttb"
      title="我是标题"
      custom-class="drawer"
      :with-header="false"
      :close-on-press-escape="false"
      :wrapper-closable="false"
      size="100%"
    >
      <ExamList @examList="examList" />
    </el-drawer>

  </div>
</template>

<script>
import { fetchQuestions } from '@/api/exam'
import ExamList from '@/views/exam/components/list'
import Pagination from '@/components/Pagination'

export default {
  name: 'Exam',
  components: { ExamList, Pagination },
  filters: {
    timeFormat(time) {
      const date = new Date(time)
      const hours = date.getHours() - 8
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      return (
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds)
      )
    },
    typeFilter(type) {
      if (type === 1) return '单选题'
      else if (type === 2) return '多选题'
      else if (type === 3) return '判断题'
    },
    scoreFilter(type, score, quesNum) {
      return (score[type - 1] * quesNum).toFixed(1)
    }
  },
  data() {
    return {
      homeStyle: {
        transform: 'translate(-60px,0)',
        opacity: '0.2',
        transition: '0.5s'
      },
      editStyle: {
        transform: 'translate(60px,0)',
        opacity: '0.2',
        transition: '0.5s'
      },
      status: 0, // 当前状态(0：选择试题；1：正在考试；2：交卷)
      list: [],
      questionFontSize: 16,
      answerFontSize: 14,
      timeUse: 0,
      timer: null,
      listQuery: {
        subId: 1, // 抽取考卷编号为1的题目
        name: '',
        singleNum: 25, // 抽取25题单选题
        multipleNum: 25, // 抽取0题多选题
        judgeNum: 25 // 抽取25题判断题
      },
      // 设置分数 [single,multiple,judge]
      score: [2.0, 2.0, 2.0],
      userScore: 0.0, // 用户分数
      totalScore: 0.0, // 总分
      percentScore: 0, // 正确率
      judgeShow: ['正确', '错误'],
      commitLength: 0, // 已答题目数
      totalLength: 0, // 总题目数
      totalLengthForPage: 0, // 总题目数
      progressStyle: { width: 0 }, // 答题进度条
      answerArr: [], // 所有答题数组
      rightAnswerArr: [],
      wrongAnswerArr: [],
      noticeSubmit: false,
      submitNoticeText: '',
      filterAnswerText: '全部',
      selectStyle: { 'pointer-events': 'unset' },
      tinymceToolbar: [
        'bold italic underline strikethrough alignleft aligncenter alignright subscript superscript hr bullist numlist image table emoticons forecolor backcolor fullscreen'
      ],
      quesId: '', // 每次打开留言比较是否同一题
      quesForSuggest: {},
      drawer: false,
      examBool: true, // 考试->true,练习->false
      optionsBool: false, // 选项是否乱序
      editSubmit: false,
      username: '',
      redoBool: false,
      hackReset: true,
      redoVisible: false,
      listForPageArr: [],
      listForPageArrBat: [],
      pageQuery: {
        page: 1,
        limit: 25
      },
      signIdArr: []
    }
  },
  computed: {
    listForPage() {
      const limit = this.pageQuery.limit
      const offset = (this.pageQuery.page - 1) * limit

      const showArr =
        this.totalLength >= offset
          ? this.listForPageArr.slice(
            offset,
            this.totalLength >= offset + limit ? offset + limit : undefined
          )
          : this.listForPageArr

      // 将一维还原成二维数组
      const tempArr = [[], [], []]
      for (let i = 0, len = showArr.length; i < len; i++) {
        const item = showArr[i]
        // tempArr[0]单选题  tempArr[1]多选题  tempArr[0]判断题
        tempArr[item.type - 1].push(item)
      }

      return tempArr
    }
  },
  watch: {
    commitLength(newLen, oldLen) {
      this.progressStyle = {
        width: (newLen / this.totalLength) * 100 + '%'
      }
    },
    status(newValue, oldValue) {
      // 考试状态
      if (newValue === 1) {
        this.timeUse = 0
        this.userScore = 0
        this.totalScore = 0
        this.totalLength = 0
        this.totalLengthForPage = 0
        this.commitLength = 0
        this.percentScore = 0
        this.progressStyle.width = 0
        this.answerArr = []
        this.listForPageArr = []
        this.listForPageArrBat = []
        this.filterAnswerText = '全部'
        this.selectStyle['pointer-events'] = 'unset'
        this.quesId = '' // 每次打开留言比较是否同一题
        this.quesForSuggest = {}
        this.signIdArr = []
        this.pageQuery.page = 1

        // 是否重做错题
        if (!this.redoBool) {
          this.list = []
          this.init()
        } else {
          // 遍历原题库将二维展开成一维
          let totalLength = 0
          let typeTemp = 0
          let indexTemp = 0;
          [].concat.apply([], this.list).filter((item, index) => {
            if (typeTemp !== item.type) {
              indexTemp = 0
              typeTemp = item.type
            }
            item.indexForShow = ++indexTemp
            totalLength++
            item.indexForPage = index + 1 // 分页题号
            this.listForPageArr.push(item)
            this.listForPageArrBat.push(item)
          })
          this.totalLength = totalLength
          this.totalLengthForPage = totalLength
        }

        // 开始考试即即开监听关闭事件
        window.addEventListener('beforeunload', this.beforeunloadFn, false)

        if (this.timeUse === 0) {
          // 开启时钟
          let timeCount = 0
          // 兼容不支持Worker的浏览器
          this.timer = setInterval(() => {
            timeCount++
            this.timeUse = timeCount * 1000
          }, 1000)
        }
      } else if (newValue === 2) {
        // 交卷状态
        this.clearStatus()
      } else if (newValue === 0) {
        // 初始状态
        this.clearStatus()
      }
    }
  },
  created() {
    this.drawer = true

    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = () => {
        if (event.returnValue) event.returnValue = false
        else return false
      }
      // 禁用选择
      document.onselectstart = () => {
        if (event.returnValue) event.returnValue = false
        else return false
      }
      // 禁用复制
      document.oncopy = () => {
        if (event.returnValue) event.returnValue = false
        else return false
      }
    })
  },
  beforeDestroy() {
    this.status = 0
  },
  beforeRouteLeave(to, from, next) {
    if (this.status === 1) {
      this.$confirm('确定离开当前页面？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          next()
        })
        .catch(() => {
          next(false)
        })
    }
  },
  methods: {
    init() {
      fetchQuestions(this.listQuery)
        .then(({ data }) => {
          this.list = data

          // 单选题选项乱序
          if (this.optionsBool) {
            this.list.map((item, index) => {
              const len = item.length
              // 单选题才需要乱序
              if (len !== 0 && item[0].type === 1) {
                let num = 0
                let tempNum = 0
                let char = ''
                for (let i = 0; i < len; i++) {
                  const tempArr = []
                  // 答案备份
                  const tempAnswer = item[i][item[i].answer]
                  // 选项个数
                  num = this.getQuestionSelectNum(item[i])
                  tempNum = num
                  // 取出所有答案
                  while (tempNum-- > 0) {
                    char = String.fromCharCode(97 + tempNum)
                    tempArr[tempNum] = item[i][char]
                  }
                  // 乱序
                  this.shuffle(tempArr)
                  tempNum = num
                  while (tempNum-- > 0) {
                    char = String.fromCharCode(97 + tempNum)
                    // 将乱序后的数组赋值给原选项
                    this.list[index][i][char] = tempArr[tempNum]
                    if (tempArr[tempNum] === tempAnswer) {
                      this.list[index][i].answer = char
                    }
                  }
                }
              }
            })
          }
          // 遍历原题库将二维展开成一维
          let totalLength = 0
          let typeTemp = 0
          let indexTemp = 0;
          [].concat.apply([], this.list).filter((item, index) => {
            if (typeTemp !== item.type) {
              indexTemp = 0
              typeTemp = item.type
            }
            item.indexForShow = ++indexTemp // 显示题号
            totalLength++
            item.indexForPage = index + 1 // 分页题号
            this.listForPageArr.push(item)
            this.listForPageArrBat.push(item)
          })
          this.totalLength = totalLength
          this.totalLengthForPage = totalLength
        })
        .catch(() => {
          this.$message.error('题库获取失败！')
        })
    },
    redoVisibleFun() {
      this.redoVisible = false
      this.redo()
    },
    redo() {
      this.hackReset = false
      const tempArr = [[], [], []]
      // 将一维还原成二维数组
      for (let i = 0, len = this.wrongAnswerArr.length; i < len; i++) {
        const item = this.wrongAnswerArr[i]
        // tempArr[0]单选题  tempArr[1]多选题  tempArr[0]判断题
        tempArr[item.type - 1].push(item)
      }
      this.list = tempArr
      this.redoBool = true
      this.$nextTick(() => {
        this.hackReset = true
        this.status = 1
      })
    },
    // 阅卷
    review() {
      this.status = 2
      this.pageQuery.page = 1
      this.rightAnswerArr = []
      this.wrongAnswerArr = []
      this.noticeSubmit = false

      let indexForRight = 0
      let indexForWrong = 0
      for (
        let index = 0, len = this.listForPageArrBat.length;
        index < len;
        index++
      ) {
        const item = this.listForPageArrBat[index]
        // 计算总分
        this.totalScore += this.score[item.type - 1]
        if (
          this.answerArr[item.id] &&
          this.answerArr[item.id] === item.answer
        ) {
          // 计算得分
          this.userScore += this.score[item.type - 1]
          // 存储正确的题目
          item.indexForPage = ++indexForRight // 分页题号
          this.rightAnswerArr.push(item)
        } else {
          // 答题卡变红
          this.$refs['box' + item.id][0].classList.add('wrong')
          // 存储错误的题目
          item.indexForPage = ++indexForWrong // 分页题号
          this.wrongAnswerArr.push(item)
        }
      }

      this.$nextTick(() => this.pageFun())
      // 正确率
      this.percentScore =
        Math.floor((this.rightAnswerArr.length / this.totalLength) * 10000) /
        100
      // 回到顶部
    },
    // 提交确认
    submit() {
      // 再考一次
      if (this.status === 2) {
        this.submitNoticeText = '是否重新组卷再考一次？'
      } else {
        if (this.commitLength === this.totalLength) {
          this.submitNoticeText = '是否现在交卷？'
        } else {
          this.submitNoticeText = '有试题未完成，是否现在交卷？'
        }
      }
      this.noticeSubmit = true
    },
    submitSure() {
      if (this.status === 2) {
        this.redoBool = false
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
          this.status = 1
          this.noticeSubmit = false
        })
      } else {
        this.review()
      }
    },
    // 单选，多选，判断
    // 之所以将事件绑定至label而不是.select，是因为select内同时包含input和label，
    // 而label又指向input，这会导致点击select，click被触发两次
    examClick(e) {
      // 考试才能点
      if (this.status === 1) {
        // 该题的Id
        const questionsId = e.currentTarget.id.slice(1)
        // 获得点击元素的前一个元素(即隐藏域input)的类型
        const type = e.currentTarget.type
        let keyAnswer = '' // 答案
        // 当前试题中answers节点下的所有input选项
        const inputArr = this.$refs[
          'answer' + questionsId
        ][0].getElementsByClassName('radioOrCheck')
        // 首先要等radio被选中后才能获取
        if (type === 'radio') {
          // 获取题型
          for (let i = 0, len = inputArr.length; i < len; i++) {
            const element = inputArr[i]
            if (element.checked) {
              keyAnswer = element.id.charAt(0)
              element.nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
                'hidden'
              )
              // 防bug 有时候获取不到:checked
              element.classList.add('checked')
            } else {
              // 判断题就一直显示
              element.nextElementSibling.firstElementChild.firstElementChild.setAttribute(
                'hidden',
                'hidden'
              )
              element.classList.remove('checked')
            }
          }
        } else if (type === 'checkbox') {
          for (let i = 0, len = inputArr.length; i < len; i++) {
            const element = inputArr[i]
            if (element.checked) {
              keyAnswer += element.id.charAt()
              element.nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
                'hidden'
              )
              // 防bug 有时候获取不到:checked
              element.classList.add('checked')
            } else {
              element.nextElementSibling.firstElementChild.firstElementChild.setAttribute(
                'hidden',
                'hidden'
              )
              element.classList.remove('checked')
            }
          }
        }

        this.saveAnswers(Number(questionsId), keyAnswer)

        this.$nextTick(() => {
          // 练习模式--begin
          if (!this.examBool && type !== 'checkbox') {
            this.markRedFun(questionsId, keyAnswer)
          }
          // 练习模式--end
        })
      } else {
        // 非考试状态不让选中
        e.preventDefault()
      }
    },
    markRedFun(questionsId, keyAnswer) {
      // 正确答案
      const correrAnswer = document
        .getElementById('rightAnswer' + questionsId)
        .getAttribute('answer')

      if (keyAnswer !== correrAnswer) {
        // 答题卡变红
        this.$refs['box' + questionsId][0].classList.add('wrong')
        // 解析框变红
        this.$refs['analysis' + questionsId][0].classList.add('wrong')
      }
      // 结束答题显示所有正确答案(<input id="a1">)
      const answerNode = document.getElementById(correrAnswer + questionsId)
      answerNode.setAttribute('checked', 'checked')
      // 防bug 有时候获取不到:checked
      answerNode.classList.add('checked')
      // input->label->span->svg
      answerNode.nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
        'hidden'
      )
      // 原错误答案红色显示（未答不显示红色）
      if (keyAnswer !== '' && keyAnswer !== correrAnswer) {
        // input->label
        const labelNode = document.getElementById(keyAnswer + questionsId)
          .nextElementSibling
        labelNode.classList.add('wrong')
        // label->span->svg 隐藏错误答案的勾
        labelNode.firstElementChild.firstElementChild.setAttribute(
          'hidden',
          'hidden'
        )
      }
      // 答完以后就不能再点击了
      this.$refs['answer' + questionsId][0].style['pointer-events'] = 'none'
    },
    // 缓存已答考题数据
    saveAnswers(questionsId, keyAnswer) {
      // 多选题取消所有选项的情况
      if (keyAnswer === '') {
        this.answerArr[questionsId] = keyAnswer
        this.commitProcess(questionsId, false)
        // 从未选择过
      } else if (!this.answerArr[questionsId]) {
        this.answerArr[questionsId] = keyAnswer
        this.commitProcess(questionsId, true)
        // 切换选项进度不变
      } else {
        this.answerArr[questionsId] = keyAnswer
      }
    },
    // 答题进度(左侧进度、右侧进度)
    // id: 试题id，status：true答题，false取消
    commitProcess(id, status) {
      if (status) {
        this.$refs['box' + id][0].classList.add('checked')
      } else {
        this.$refs['box' + id][0].classList.remove('checked')
      }
      let temp = 0
      this.answerArr.map(item => {
        if (item) temp++
      })
      this.commitLength = temp
    },
    // 显示答对/答错/全部题目
    filterAnswer(command) {
      const temp = { all: '全部', right: '答对', wrong: '答错' }
      if (temp[command] === this.filterAnswerText) {
        return
      } else {
        if (command === 'wrong') {
          this.filterAnswerText = '答错'
          this.listForPageArr = this.wrongAnswerArr
          this.displayFun('none', 'unset')
        } else if (command === 'right') {
          this.filterAnswerText = '答对'
          this.listForPageArr = this.rightAnswerArr
          this.displayFun('unset', 'none')
        } else {
          this.filterAnswerText = '全部'
          this.listForPageArr = this.listForPageArrBat
          this.displayFun('unset', 'unset')
        }
        this.totalLengthForPage = this.listForPageArr.length
        // 回填用户选择的选项
        this.$nextTick(() => this.pageFun())
      }
    },
    // 答对->错题不显示且不可跳转
    displayFun(rightAnswerPoint, wrongAnswerPoint) {
      this.rightAnswerArr.map(item => {
        this.$refs['box' + item.id][0].parentElement.style[
          'pointer-events'
        ] = rightAnswerPoint
      })
      this.wrongAnswerArr.map(item => {
        this.$refs['box' + item.id][0].parentElement.style[
          'pointer-events'
        ] = wrongAnswerPoint
      })
    },
    selectClass(type) {
      if (type === 1) return 'single-select'
      else if (type === 2) return 'multi-select'
      else if (type === 3) return 'judge'
    },
    // 增加字号
    fontsizePlus(e) {
      if (this.questionFontSize < 20) {
        this.questionFontSize = this.questionFontSize + 1
        this.answerFontSize = this.answerFontSize + 1
      }
    },
    // 减小字号
    fontsizeMinus(e) {
      if (this.questionFontSize > 14) {
        this.questionFontSize = this.questionFontSize - 1
        this.answerFontSize = this.answerFontSize - 1
      }
    },
    // 标记
    signFun(event, id) {
      if (event.currentTarget.className === 'sign') {
        this.signIdArr.push(id)
        event.currentTarget.className = 'sign checked'
        this.$refs['box' + id][0].firstElementChild.removeAttribute('hidden')
      } else {
        const index = this.signIdArr.indexOf(id)
        if (index > -1) {
          this.signIdArr.splice(index, 1)
        }
        event.currentTarget.className = 'sign'
        this.$refs['box' + id][0].firstElementChild.setAttribute(
          'hidden',
          'hidden'
        )
      }
    },
    // 检测问题有几个选项(以第4个为准比较快,数据库共6个选项)
    getQuestionSelectNum(question) {
      return question.d
        ? question.e
          ? question.f
            ? 6
            : 5
          : 4
        : question.c
          ? 3
          : 2
    },
    cilckToJump(id, quesIndex) {
      const tempPage = Math.ceil(quesIndex / this.pageQuery.limit)
      if (this.pageQuery.page !== tempPage) {
        this.pageQuery.page = tempPage
        this.$nextTick(() => {
          this.pageFun()
          this.$refs['id' + id][0].scrollIntoView(true) // 顶部对齐，顶端需要-70px
          this.$refs.exam.scrollTop = this.$refs.exam.scrollTop - 70
        })
      } else {
        this.$refs['id' + id][0].scrollIntoView(true) // 顶部对齐，顶端需要-70px
        this.$refs.exam.scrollTop = this.$refs.exam.scrollTop - 70
      }
    },
    clearStatus() {
      // 交卷后禁止hover效果
      this.selectStyle['pointer-events'] = 'none'
      // 关闭计时器
      clearInterval(this.timer)
      // 交卷了就不再监听关闭事件
      window.removeEventListener('beforeunload', this.beforeunloadFn, false)
    },
    beforeunloadFn(e) {
      if (typeof e.returnValue !== 'undefined') {
        // Chrome requires returnValue to be set.
        e.returnValue = '确定要关闭窗口吗？'
      } else {
        // Cancel the event as stated by the standard.
        e.preventDefault()
      }
    },
    headerEnter() {
      this.homeStyle.transform = 'translate(0,0)'
      this.homeStyle.opacity = '1'
      this.editStyle.transform = 'translate(0,0)'
      this.editStyle.opacity = '1'
    },
    headerLeave() {
      this.homeStyle.transform = 'translate(-60px,0)'
      this.homeStyle.opacity = '1'
      this.editStyle.transform = 'translate(60px,0)'
      this.editStyle.opacity = '0.2'
    },
    editFn() {
      this.drawer = true
      this.status = 0
      this.redoBool = false
      this.editSubmit = false
    },
    examList(data) {
      // 初始化，防止为传递参数的考卷引用上一次的参数
      this.listQuery.singleNum = 25
      this.listQuery.multipleNum = 25
      this.listQuery.judgeNum = 25
      this.score = [2.0, 2.0, 2.0]
      // [0]:{id:xx,name:xx}
      // [1]:examBool
      // [2]:optionsBool
      // [3]:configList
      this.listQuery.subId = data[0].id
      this.listQuery.name = data[0].name
      this.examBool = data[1]
      this.optionsBool = data[2]
      // 试题配置 [{ type: 1, count: 250, num: 25, score: 2.0 },]
      let configList = data[3] || []
      // 如果是电工复审考试并且没有配置，则单选15题，判断35题
      if (this.listQuery.subId === 100 && configList.length === 0) {
        configList = [
          { type: 1, num: 15, score: 2.0 },
          { type: 3, num: 35, score: 2.0 }
        ]
      }
      for (let i = 0, len = configList.length; i < len; i++) {
        const ele = configList[i]
        if (ele.type === 1) {
          this.listQuery.singleNum = ele.num
        } else if (ele.type === 2) {
          this.listQuery.multipleNum = ele.num
        } else if (ele.type === 3) {
          this.listQuery.judgeNum = ele.num
        }
        this.score[ele.type - 1] = Number(ele.score)
      }

      this.drawer = false
      this.status = 1 // 开始考试
    },
    /**
     * @description 数组乱序——Fisher–Yates shuffle 洗牌算法
     * @param {array} arr 要乱序的数组
     */
    shuffle(arr) {
      if (arr.length === 1) return arr
      const len = arr.length
      for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    pageFun() {
      this.$refs.exam.scrollTop = 0

      // 将当前分页的二维数组展开成一维
      const tempArr = [];
      [].concat.apply([], this.listForPage).filter(item => {
        tempArr.push(item)
      })
      // 将用户选择过的选项填回对应选项中
      for (let i = 0, len = tempArr.length; i < len; i++) {
        const ele = tempArr[i]
        // 标记回填
        if (this.signIdArr.indexOf(ele.id) > -1) {
          this.$refs['sign' + ele.id][0].click()
        }
        // 考试中的状态，为了回填页面跳转时清空的选项
        if (
          this.status === 1 &&
          typeof this.answerArr[ele.id] !== 'undefined' &&
          this.answerArr[ele.id] !== ''
        ) {
          if (ele.type !== 2) {
            if (!this.examBool) {
              // 练习模式选项和答案回填
              this.markRedFun(ele.id, this.answerArr[ele.id])
            } else {
              // 考试模式选项回填
              const answerNode = document.getElementById(
                this.answerArr[ele.id] + ele.id
              )
              answerNode.setAttribute('checked', 'checked')
              // 防bug 有时候获取不到:checked
              answerNode.classList.add('checked')
              // input->label->span->svg
              answerNode.nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
                'hidden'
              )
            }
          } else {
            // 当前试题中answers节点下的所有input选项
            const inputArr = this.$refs[
              'answer' + ele.id
            ][0].getElementsByClassName('radioOrCheck')
            // 多选题选项
            const answerCharArr = this.answerArr[ele.id].split('')

            for (let j = 0, len = answerCharArr.length; j < len; j++) {
              const char = answerCharArr[j]
              inputArr[
                char.charCodeAt(0) - 97
              ].nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
                'hidden'
              )
              inputArr[char.charCodeAt(0) - 97].checked = 'checked'
            }
          }
        } else if (this.status === 2) {
          // 交卷后状态，显示最终结果
          if (ele.type !== 2) {
            this.markRedFun(
              ele.id,
              typeof this.answerArr[ele.id] === 'undefined'
                ? ''
                : this.answerArr[ele.id]
            )
          } else {
            const correrAnswer = document
              .getElementById('rightAnswer' + ele.id)
              .getAttribute('answer')

            correrAnswer.split('').map(answer => {
              const answerNode = document.getElementById(answer + ele.id)
              answerNode.setAttribute('checked', 'checked')
              // 防bug 有时候获取不到:checked
              answerNode.classList.add('checked')
              answerNode.nextElementSibling.firstElementChild.firstElementChild.removeAttribute(
                'hidden'
              )
            })

            // 原错误答案红色显示（未答不显示红色）
            if (this.answerArr[ele.id] !== correrAnswer) {
              // 解析框变红
              this.$refs['analysis' + ele.id][0].classList.add('wrong')
              if (this.answerArr[ele.id]) {
                this.answerArr[ele.id].split('').map(val => {
                  // 如果是多选之一则不动作
                  if (correrAnswer.indexOf(val) === -1) {
                    // input->label
                    const labelNode = document.getElementById(val + ele.id)
                      .nextElementSibling
                    labelNode.classList.add('wrong')
                    // label->span->svg 隐藏错误答案的勾
                    labelNode.firstElementChild.firstElementChild.setAttribute(
                      'hidden',
                      'hidden'
                    )
                  }
                })
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .exam-question p,
/deep/ .answers p,
/deep/ .analysis p {
  margin: 0;
}
.home-icon {
  color: #fff;
  position: fixed;
  z-index: 999;
  display: flex;
  height: 70px;
  align-items: center;
  &-left {
    font-size: 28px;
    left: 28px;
    &:hover {
      color: #d41717;
    }
  }
  &-right {
    font-size: 22px;
    right: 33px;
    cursor: pointer;
    &:hover {
      color: #1a8cfe;
    }
  }
}
.exam {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.support {
  text-align: center;
  position: absolute;
  left: 0;
  bottom: -50px;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  & > span {
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    &:hover {
      color: #ff4b50;
    }
  }
}
.header {
  background: #fafafa;
  text-align: center;
  color: #27274a;
  font-family: monospace;
  height: 70px;
  box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.5);
  width: 100%;
  position: fixed;
  z-index: 99;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  .text3d {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    background: #d0d0d0;
    .text3d {
      transform: scale(1.1, 1.1);
    }
  }
}
.left {
  background-color: white;
  position: fixed;
  height: calc(100% - 110px);
  top: 90px;
  left: 90px;
  width: 240px;
  box-shadow: 0 1px 4px 0 rgba(58, 62, 81, 0.1);
  border: none;
  border-radius: 4px 4px 0 0;
  &-header {
    padding: 10px;
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
        &:hover,
        &.checked {
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
    padding: 10px 20px 10px 0px;
    background-color: #fff;
    border: unset;
    right: 0;
    width: 100%;
    box-shadow: 0 -2px 10px 0 rgba(58, 62, 81, 0.1);
    text-align: right;
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
      &.s2,
      &.s3 {
        margin-left: 12px;
      }
    }
    .icon-span {
      font-size: 12px;
      color: #656577;
    }
  }
}
.right {
  position: fixed;
  height: calc(100% - 110px);
  top: 90px;
  right: 90px;
  width: 120px;
  font-size: 14px;
  &-top {
    color: #27274a;
    line-height: 20px;
    width: 100%;
    padding: 0 10px;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 10px;
    text-align: center;
    & ul {
      padding-left: 0;
      list-style: none;
      margin: 0;
      & > li {
        padding: 14px 0;
        height: 69px;
      }
    }
    &-time {
      &-label {
        margin-bottom: 3px;
        line-height: 20px;
      }
      &-data {
        font-size: 18px;
        line-height: 22px;
        color: #ff0000;
        font-weight: 400;
        & > i {
          font-style: normal;
          font-size: 12px;
          margin-right: -2px;
        }
      }
    }
    &-process {
      border-top: 1px solid #dedede;
      &-label {
        margin-bottom: 4px;
      }
      &-data {
        line-height: 17px;
        margin-bottom: 7px;
      }
      &-bar {
        height: 4px;
        width: 100%;
        border-radius: 2px;
        background: #f1f3f8;
        position: relative;
        &-item {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: 0%;
          border-radius: 2px;
          background: #1a8cfe;
        }
      }
    }
    &-fontsize {
      border-top: 1px solid #dedede;
      &-minus {
        width: 15px;
        height: 15px;
        border: 1px solid #dedede;
        border-radius: 2px;
        cursor: pointer;
        font-size: 12px;
        display: inline-block;
        line-height: 13px;
        margin-top: 7px;
      }
      &-label {
        margin: 0 7px;
      }
      &-plus {
        width: 15px;
        height: 15px;
        border: 1px solid #dedede;
        border-radius: 2px;
        cursor: pointer;
        font-size: 12px;
        display: inline-block;
        line-height: 13px;
      }
    }
  }
}
.right-button {
  bottom: 0px;
  position: absolute;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  & .el-button {
    width: 100%;
  }
  .el-button + .el-button {
    margin-top: 10px;
  }
}
.content {
  background-attachment: fixed;
  background-size: 100% 100%;
  min-height: 100%;
  padding: 90px 230px 80px 350px;
}
.body {
  color: #27274a;
  background: white;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
}
.questions {
  border-bottom: 1px solid #dedede;
  &-title {
    font-size: 18px;
    line-height: 25px;
    padding: 18px 20px;
    background: #fafafa;
    border-bottom: 1px solid #dedede;
    word-wrap: break-word;
  }
  &-content {
    padding-left: 30px;
    padding-right: 75px;
  }
}
.question-content {
  padding: 30px 0;
  position: relative;
  height: 100%;
  & + & {
    border-top: 1px solid #dedede;
  }
}
.sign {
  display: inline-block;
  width: 50px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #d2d2d2;
  font-size: 12px;
  color: #999;
  padding-left: 4px;
  cursor: pointer;
  line-height: 19px;
  position: absolute;
  top: 30px;
  right: -63px;
  &.checked {
    background-color: #ff962a;
    border: 1px solid #ff962a;
    color: #fff;
  }
  & > .svg-icon {
    width: 13px;
    height: 12px;
    margin-right: 3px;
    margin-top: -3px;
  }
}
.exam-question {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  word-wrap: break-word;
  & > span:not(:last-child) {
    float: left;
  }
  &-index {
    color: #1a8cfe;
    top: 0;
    display: inline-block;
    width: 41px;
    line-height: 22px;
    text-align: right;
    margin-left: -46px;
  }
  &-topic {
    color: #1a8cfe;
    position: absolute;
    left: -25px;
    top: 0;
    display: inline-block;
    width: 40px;
    line-height: 22px;
    text-align: right;
  }
  &-score {
    color: #aeaeae;
  }
}
.answers {
  font-size: 14px;
  & > .select:hover {
    background: #fafafa;
    color: #1a8cfe;
    & .select-icon {
      border: 1px solid #1a8cfe;
      & > svg {
        color: #1a8cfe;
      }
    }
  }
}
// 防bug 有时候获取不到:checked
.radioOrCheck:checked + label,
.radioOrCheck.checked + label {
  color: #1a8cfe;
  & .select-icon {
    border: 1px solid #1a8cfe;
    & > svg {
      color: #1a8cfe;
    }
  }
}
.radioOrCheck + label.wrong {
  text-decoration: line-through;
  color: #ff4b50;
  & .select-icon {
    border: 1px solid #ff4b50;
    & > svg {
      color: #ff4b50;
    }
  }
}
.answers label {
  width: 100%;
  padding: 10px 15px 10px 45px;
  line-height: 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  position: relative;
  min-height: 40px;
  display: inline-block;
  max-width: 100%;
  font-weight: 400;
  & > .select-icon {
    font-size: 15px;
    position: absolute;
    left: 15px;
    top: 12.5px;
    border: 1px solid #979797;
    background: #fff;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    & > svg {
      position: absolute;
      top: -4px;
      left: 0px;
      color: #c1c1cb;
      width: 19px;
      height: 19px;
      &.icon-error {
        left: -2.5px;
        top: -2.5px;
        width: 18px;
        height: 18px;
      }
    }
  }
  .words {
    position: relative;
    margin-left: 20px;
    display: block;
    word-wrap: break-word;
    &-option {
      position: absolute;
      top: 0px;
      left: -20px;
    }
  }
}
/deep/ .el-dialog {
  .el-dialog__body {
    text-align: center;
    color: #666;
    font-size: 22px;
  }
  .el-button {
    width: 100px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 4px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.analysis {
  overflow: auto;
  background: rgba(222, 222, 222, 0.2);
  border-radius: 4px;
  padding: 15px 20px;
  line-height: 24px;
  margin-top: 10px;
  position: relative;
  font-size: 14px;
  border: 1px solid #1a8cfe;
  &.wrong {
    border: 1px solid #ff4b50;
  }
  &-wrapper {
    position: absolute;
    right: 10px;
    top: 14px;
    z-index: 1;
    &-icon {
      width: 48px;
      transition: width 0.5s;
    }
  }
  &-sign {
    position: absolute;
    color: #fff;
    top: 0;
    right: 0;
    font-size: 14px;
    height: 28px;
    border-radius: 2px;
    line-height: 28px;
    text-align: center;
    font-style: normal;
    cursor: pointer;
    width: 100%;
    &-error {
      background: #ff0000;
    }
    &-right {
      background: #1a8cfe;
    }
  }
  &-row {
    min-height: 24px;
    padding-left: 70px;
    position: relative;
    & + & {
      margin-top: 10px;
    }
  }
  &-title {
    position: absolute;
    width: 70px;
    left: 0;
    top: 0;
    font-size: 14px;
  }
  &-content {
    &.analysis-content-right {
      color: #1a8cfe;
    }
    &.analysis-content-error {
      color: #ff0000;
    }
  }
}
.pagination-container {
  padding: 0;
  margin: 30px auto 30px;
  text-align: center;
}
/deep/ .el-drawer__body{
  overflow: auto;
  margin-bottom: 10px;
}
</style>
