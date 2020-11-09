<template>
  <div
    v-if="hackReset"
    class="exam"
    :style="{backgroundImage:`url(${require('@/public/images/exam.jpg')})`}"
  >
    <el-container>
      <el-header>
        <i class="el-icon-arrow-left out-icon" @click="closeFun"></i>
        <span class="header-name">{{ config.name }}</span>
        <span class="header-time">{{ timeUse | timeFormat }}</span>
        <el-button
          plain
          icon="el-icon-switch-button"
          size="medium"
          class="out-btn"
          @click="closeFun"
        >退出</el-button>
        <div class="header-icon">
          <svg-icon icon-class="staro" />
          <svg-icon icon-class="font" />
          <svg-icon icon-class="answer-card" />
        </div>
      </el-header>
      <el-container>
        <el-main id="el-main">
          <!-- 进度栏 -->
          <div class="progress-bar">
            <div class="progress-bar-top">
              <div>
                {{ listForPageArr[pageQuery.page-1].type|typeFilter }}
                (共{{ list[listForPageArr[pageQuery.page-1].type-1].length }}题)
              </div>
              <div class="font">
                <span>{{ pageQuery.page }}</span>
                <span>/{{ totalLength }}</span>
              </div>
            </div>
            <el-progress
              :percentage="progress"
              :stroke-width="3"
              color="#1a8cfe"
              :show-text="false"
            />
          </div>
          <!-- 试卷 -->
          <div class="content">
            <!-- 答题卡 -->
            <!-- <left :list="list"></left> -->
            <div class="left">
              <div class="left-header"></div>
              <div class="left-body">
                <div class="title">
                  <div class="title-border"></div>
                  <div class="title-content">答题卡</div>
                </div>

                <div class="card">
                  <!-- 把v-for和v-if区分开 -->
                  <template v-for="(questions,inx) in list">
                    <div v-if="questions.length" :key="inx" class="card-content">
                      <div
                        class="card-content-title"
                      >{{ questions[0].type | typeFilter }}(共{{ questions.length }}题)</div>

                      <div class="box-list">
                        <div
                          v-for="ques in questions"
                          :key="ques.id"
                          class="box-list-item"
                          @click="cilckToJump(ques.id,ques.indexForPage)"
                        >
                          <span :ref="'box'+ques.id">
                            {{ ques.indexForShow }}
                            <svg-icon icon-class="star" />
                          </span>
                        </div>
                      </div>

                      <div class="split"></div>
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
            <div class="body">
              <!-- 把v-for和v-if区分开 -->
              <template v-for="(questions,inx) in listForPage">
                <div v-if="questions.length" :key="inx" class="questions">
                  <div
                    class="questions-title"
                  >{{ questions[0].type|typeFilter }}(共{{ list[inx].length }}题)</div>

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
                        <span v-html="ques.title"></span>
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
                          />
                          <input
                            v-if="ques.type===2"
                            :id="`${String.fromCharCode(96+number)}`+ques.id"
                            type="checkbox"
                            :name="'radio'+ques.id"
                            class="radioOrCheck"
                            hidden
                            @change="examClick"
                          />
                          <label :for="`${String.fromCharCode(96+number)}`+ques.id">
                            <span class="select-icon" :style="ques.type===2?'border-radius:2px':''">
                              <!-- <svg-icon v-if="ques.type===3&&number===1" icon-class="correct" /> -->
                              <svg-icon
                                v-if="ques.type===3&&number===2"
                                icon-class="error"
                                class="icon-error"
                              />
                              <svg-icon v-else icon-class="correct" />
                            </span>
                            <span v-if="ques.type!==3" class="words">
                              <span class="words-option">
                                {{ String.fromCharCode(64+number) }}
                                <span class="words-option-dot">.</span>
                              </span>
                              <span
                                class="words-html"
                                v-html="ques[String.fromCharCode(96+number)]"
                              ></span>
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
                          <div class="analysis-wrapper">
                            <div class="analysis-wrapper-icon" style="{width:48px}">
                              <i
                                v-if="answerArr[ques.id]!==ques.answer"
                                class="analysis-sign analysis-sign-error"
                              >错误</i>
                              <i v-else class="analysis-sign analysis-sign-right">正确</i>
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
                            <div class="analysis-content" v-html="ques.parse"></div>
                          </div>
                        </template>
                      </div>
                      <!-- 交卷后的解析-end -->
                    </div>
                  </div>
                </div>
              </template>

              <pagation
                v-if="totalLength>0"
                :total="totalLengthForPage"
                :current-page="pageQuery.page"
                :per-page="pageQuery.limit"
                @getCurrentPage="getCurrentPage"
              />

              <div class="pagation-mobile">
                <div ref="pageBtn1" class="btn1 first" @click="getCurrentPage(pageQuery.page-1)">上一题</div>
                <div
                  v-if="pageQuery.page!==totalLength"
                  class="btn2"
                  @click="getCurrentPage(pageQuery.page+1);"
                >下一题</div>
                <div v-else class="btn2" @click="submit">提交试卷</div>
              </div>

              <div class="support">
                CopyRight © 2020 By
                <span class="up">Luqir</span>
              </div>
            </div>
            <!-- 信息栏 -->
            <div class="right">
              <div class="right-top">
                <ul>
                  <li class="right-top-time">
                    <div class="right-top-time-label">{{ status===2?'考试用时':"已用时间" }}</div>
                    <div class="right-top-time-data">{{ timeUse | timeFormat }}</div>
                  </li>

                  <template v-if="status===2">
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
                            <i class="el-icon-arrow-down"></i>
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
                      <div class="right-top-process-bar-item" :style="{width: progress + '%'}"></div>
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
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog :visible.sync="noticeSubmit" width="440px" center append-to-body>
      <span class="dialog-title">{{ submitNoticeText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeSubmit=false">取 消</el-button>
        <el-button type="primary" @click="submitSure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="editSubmit" width="440px" center append-to-body>
      <span class="dialog-title">是否放弃当前试卷重新选择？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSubmit=false">取 消</el-button>
        <el-button type="primary" @click="editFn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="redoVisible" width="440px" center append-to-body>
      <span class="dialog-title">重做错题？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="redoVisible=false">取 消</el-button>
        <el-button type="primary" @click="redoVisibleFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dynamicLoadScript from './dynamicLoadScript'
import { deepClone } from '@/helpers/utils.js'

export default {
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
    }
  },
  // components: { Left },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          name: '试卷名称',
          singleNum: 25, // 单选题数
          multipleNum: 25, // 多选题数
          judgeNum: 25, // 判断题数
          path: '' // 题库名称
        }
      }
    }
  },
  data() {
    return {
      status: 0, // 当前状态(0：选择试题；1：正在考试；2：交卷)
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
      percentScore: 0, // 正确率
      judgeShow: ['正确', '错误'],
      commitLength: 0, // 已答题目数
      totalLength: 0, // 总题目数
      totalLengthForPage: 0, // 总题目数：用于查看错题时统计总题数
      progress: 0, // 答题进度条百分比
      answerArr: [], // 所有答题数组
      rightAnswerArr: [],
      wrongAnswerArr: [],
      noticeSubmit: false,
      submitNoticeText: '',
      filterAnswerText: '全部',
      selectStyle: { 'pointer-events': 'unset' },
      examBool: false, // 考试->true,练习->false
      optionsBool: false, // 选项是否乱序
      editSubmit: false,
      redoBool: false,
      hackReset: true,
      redoVisible: false,
      list: [[], [], []], // 初始题库->二维
      listBat: [[], [], []], // 初始题库备份
      examList: [], // 所有题库
      listForPageArr: [{ type: 1 }], // 考卷显示题库->一维
      listForPageArrBat: [], // 考试题库备份
      pageQuery: {
        page: 1,
        limit: 1
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

      // total为零表示刚开始的空数组，解决“progress-bar-top”下报.type未定义问题
      const total = tempArr.reduce((total, item) => {
        return total + item.length
      }, 0)

      return total ? tempArr : [[{ type: 1 }]]
    }
  },
  watch: {
    commitLength(newLen, oldLen) {
      this.progress = (newLen / this.totalLength) * 100
    },
    'pageQuery.page'(newPage, oldPage) {
      newPage === 1
        ? (this.$refs.pageBtn1.className = 'btn1 first')
        : (this.$refs.pageBtn1.className = 'btn1')
    },
    status(newValue, oldValue) {
      // 考试状态
      if (newValue === 1) {
        this.timeUse = 0
        this.totalLength = 0
        this.totalLengthForPage = 0
        this.commitLength = 0
        this.progress = 0
        this.answerArr = []
        this.listForPageArr = []
        this.listForPageArrBat = []
        this.filterAnswerText = '全部'
        this.selectStyle['pointer-events'] = 'unset'
        this.signIdArr = []
        this.pageQuery.page = 1

        // 是否重做错题(不是则随机抽题组卷)
        if (!this.redoBool) {
          // 截取数组中的随机元素
          this.list = this.shuffleFun([...this.examList])
          this.init()
        } else {
          this.init()
        }

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
    dynamicLoadScript('/exam-data/中级.js', (err) => {
      if (err) {
        this.$message.error(err.message)
        return
      }

      const tempArr = [[], [], []]
      // eslint-disable-next-line no-undef
      examList.map((item) => {
        tempArr[item.type - 1].push(item)
      })

      // 克隆数组做备份
      this.examList = [...tempArr]

      this.status = 1
    })

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
  methods: {
    init() {
      // 遍历原题库将二维展开成一维
      let totalLength = 0
      let typeTemp = 0
      let indexTemp = 0
      ;[].concat.apply([], this.list).filter((item, index) => {
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
      // 备份二维题库，以便在筛选题库选 全部 时回填
      this.listBat = deepClone(this.list)
      this.totalLength = this.totalLengthForPage = totalLength
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
      for (let index = 0, len = this.listForPageArrBat.length; index < len; index++) {
        const item = deepClone(this.listForPageArrBat[index]) // 对象拷贝

        if (this.answerArr[item.id] && this.answerArr[item.id] === item.answer) {
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
      this.percentScore = Math.floor((this.rightAnswerArr.length / this.totalLength) * 10000) / 100
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
        const inputArr = this.$refs['answer' + questionsId][0].getElementsByClassName(
          'radioOrCheck'
        )
        // 首先要等radio被选中后才能获取
        if (type === 'radio') {
          // 获取题型
          for (let i = 0, len = inputArr.length; i < len; i++) {
            const element = inputArr[i]
            if (element.checked) {
              keyAnswer = element.id.charAt(0)
              element.nextElementSibling.firstElementChild.firstElementChild.style.display = 'unset'
              // 防bug 有时候获取不到:checked
              element.classList.add('checked')
            } else {
              // 判断题就一直显示
              element.nextElementSibling.firstElementChild.firstElementChild.style.display = 'none'
              element.classList.remove('checked')
            }
          }
        } else if (type === 'checkbox') {
          for (let i = 0, len = inputArr.length; i < len; i++) {
            const element = inputArr[i]
            if (element.checked) {
              keyAnswer += element.id.charAt()
              element.nextElementSibling.firstElementChild.firstElementChild.style.display = 'unset'
              // 防bug 有时候获取不到:checked
              element.classList.add('checked')
            } else {
              element.nextElementSibling.firstElementChild.firstElementChild.style.display = 'none'
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
      answerNode.nextElementSibling.firstElementChild.firstElementChild.style.display = 'unset'
      // 原错误答案红色显示（未答不显示红色）
      if (keyAnswer !== '' && keyAnswer !== correrAnswer) {
        // input->label
        const labelNode = document.getElementById(keyAnswer + questionsId).nextElementSibling
        labelNode.classList.add('wrong')
        // label->span->svg 隐藏错误答案的勾
        labelNode.firstElementChild.firstElementChild.style.display = 'none'
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
      this.answerArr.map((item) => {
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
          this.displayFun('none', 'inline-block')

          // 筛选试题之后要把 list 里面用于展示的数值改变
          this.wrongAnswerArr.map((item) => {
            this.list[item.type - 1][item.indexForShow - 1].indexForPage = item.indexForPage
          })
          this.getCurrentPage(1)
        } else if (command === 'right') {
          this.filterAnswerText = '答对'
          this.listForPageArr = this.rightAnswerArr
          this.displayFun('inline-block', 'none')

          // 筛选试题之后要把 list 里面用于展示的数值改变
          this.rightAnswerArr.map((item) => {
            this.list[item.type - 1][item.indexForShow - 1].indexForPage = item.indexForPage
          })
          this.getCurrentPage(1)
        } else {
          this.filterAnswerText = '全部'
          this.listForPageArr = this.listForPageArrBat
          this.displayFun('inline-block', 'inline-block')

          // 筛选试题之后要把 list 里面用于展示的数值改变
          this.list = this.listBat
          this.getCurrentPage(1)
        }
        this.totalLengthForPage = this.listForPageArr.length
        // 回填用户选择的选项
        this.$nextTick(() => this.pageFun())
      }
    },
    // 答对->错题不显示且不可跳转
    displayFun(rightAnswerPoint, wrongAnswerPoint) {
      this.rightAnswerArr.map((item) => {
        this.$refs['box' + item.id][0].parentElement.style['display'] = rightAnswerPoint
      })
      this.wrongAnswerArr.map((item) => {
        this.$refs['box' + item.id][0].parentElement.style['display'] = wrongAnswerPoint
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
        this.$refs['box' + id][0].firstElementChild.style.display = 'unset'
      } else {
        const index = this.signIdArr.indexOf(id)
        if (index > -1) {
          this.signIdArr.splice(index, 1)
        }
        event.currentTarget.className = 'sign'
        this.$refs['box' + id][0].firstElementChild.style.display = 'none'
      }
    },
    // 检测问题有几个选项(以第4个为准比较快,数据库共6个选项)
    getQuestionSelectNum(question) {
      return question.d ? (question.e ? (question.f ? 6 : 5) : 4) : question.c ? 3 : 2
    },
    cilckToJump(id, quesIndex) {
      const tempPage = Math.ceil(quesIndex / this.pageQuery.limit)
      if (this.pageQuery.page !== tempPage) {
        this.pageQuery.page = tempPage
        this.$nextTick(() => {
          this.pageFun()
          this.$refs['id' + id][0].scrollIntoView(true) // 顶部对齐
        })
      } else {
        this.$refs['id' + id][0].scrollIntoView(true) // 顶部对齐
      }
    },
    clearStatus() {
      // 交卷后禁止hover效果
      this.selectStyle['pointer-events'] = 'none'
      // 关闭计时器
      clearInterval(this.timer)
    },
    editFn() {
      this.status = 0
      this.redoBool = false
      this.editSubmit = false
    },
    pageFun() {
      document.getElementById('el-main').scrollTop = 0

      // 将当前分页的二维数组展开成一维
      const tempArr = []
      ;[].concat.apply([], this.listForPage).filter((item) => {
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
              const answerNode = document.getElementById(this.answerArr[ele.id] + ele.id)
              answerNode.setAttribute('checked', 'checked')
              // 防bug 有时候获取不到:checked
              answerNode.classList.add('checked')
              // input->label->span->svg
              answerNode.nextElementSibling.firstElementChild.firstElementChild.style.display =
                'unset'
            }
          } else {
            // 当前试题中answers节点下的所有input选项
            const inputArr = this.$refs['answer' + ele.id][0].getElementsByClassName('radioOrCheck')
            // 多选题选项
            const answerCharArr = this.answerArr[ele.id].split('')

            for (let j = 0, len = answerCharArr.length; j < len; j++) {
              const char = answerCharArr[j]
              inputArr[
                char.charCodeAt(0) - 97
              ].nextElementSibling.firstElementChild.firstElementChild.style.display = 'unset'
              inputArr[char.charCodeAt(0) - 97].checked = 'checked'
            }
          }
        } else if (this.status === 2) {
          // 交卷后状态，显示最终结果
          if (ele.type !== 2) {
            this.markRedFun(
              ele.id,
              typeof this.answerArr[ele.id] === 'undefined' ? '' : this.answerArr[ele.id]
            )
          } else {
            const correrAnswer = document
              .getElementById('rightAnswer' + ele.id)
              .getAttribute('answer')

            correrAnswer.split('').map((answer) => {
              const answerNode = document.getElementById(answer + ele.id)
              answerNode.setAttribute('checked', 'checked')
              // 防bug 有时候获取不到:checked
              answerNode.classList.add('checked')
              answerNode.nextElementSibling.firstElementChild.firstElementChild.style.display =
                'unset'
            })

            // 原错误答案红色显示（未答不显示红色）
            if (this.answerArr[ele.id] !== correrAnswer) {
              // 解析框变红
              this.$refs['analysis' + ele.id][0].classList.add('wrong')
              if (this.answerArr[ele.id]) {
                this.answerArr[ele.id].split('').map((val) => {
                  // 如果是多选之一则不动作
                  if (correrAnswer.indexOf(val) === -1) {
                    // input->label
                    const labelNode = document.getElementById(val + ele.id).nextElementSibling
                    labelNode.classList.add('wrong')
                    // label->span->svg 隐藏错误答案的勾
                    labelNode.firstElementChild.firstElementChild.style.display = 'none'
                  }
                })
              }
            }
          }
        }
      }
    },
    getCurrentPage(currentPage) {
      this.pageQuery.page = currentPage
      this.$nextTick(() => {
        this.pageFun()
      })
    },
    closeFun() {
      if (this.status === 1) {
        this.$confirm('确定离开当前页面？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('close')
          })
          .catch(() => {
            return false
          })
      } else {
        this.$emit('close')
      }
    },
    /**
     * @description 数组乱序——Fisher–Yates shuffle 洗牌算法
     * @param {array} arr 要乱序的数组
     */
    shuffle(arr) {
      if (arr.length === 1) return arr
      const len = arr.length
      for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    // 再考一次时需要重新截取数组 arr：[[],[],[]]
    shuffleFun(arr) {
      if (this.config.singleTotal !== 0 && this.config.singleTotal > this.config.singleNum) {
        this.shuffle(arr[0]) // 乱序数组
        arr[0] = arr[0].slice(0, this.config.singleNum) // 截取用户需要的题目数量
      }
      if (this.config.multipleTotal !== 0 && this.config.multipleTotal > this.config.multipleNum) {
        this.shuffle(arr[1]) // 乱序数组
        arr[1] = arr[1].slice(0, this.config.multipleNum) // 截取用户需要的题目数量
      }
      if (this.config.judgeTotal !== 0 && this.config.judgeTotal > this.config.judgeNum) {
        this.shuffle(arr[2]) // 乱序数组
        arr[2] = arr[2].slice(0, this.config.judgeNum) // 截取用户需要的题目数量
      }
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
.out-icon, .header-time, .header-icon, .progress-bar, .pagation-mobile {
  display: none;
}

html {
  overflow: hidden;
}

.exam {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  background-size: 100% 100%;
}

/deep/ .exam-question p, /deep/ .answers p, /deep/ .analysis p {
  margin: 0;
  line-height: unset;
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

  .out-btn {
    position: absolute;
    right: 50px;
    color: #1a8cfe;
    border-color: #1a8cfe;
  }
}

.el-main {
  height: calc(100vh - 70px);
  padding: 20px 230px 80px 350px;

  .content {
    margin: unset;
    max-width: unset;
    padding: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: #dcdfe6;

    &:hover {
      background: #1a8cfe;
    }
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

      &::-webkit-scrollbar-thumb {
        background: #dcdfe6;

        &:hover {
          background: #1a8cfe;
        }
      }

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
            right: -4px;
            color: #ff962a;
            display: none;
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

        &:last-child {
          padding-right: 20px;
        }
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
      width: 100px;
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
          height: 40px;
          line-height: 20px;
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
      border-radius: 4px 4px 0 0;
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
  }

  .question-content + .question-content {
    border-top: 1px solid #dedede;
  }

  .sign {
    display: inline-block;
    width: 46px;
    height: 20px;
    border-radius: 2px;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    color: #999;
    padding-left: 4px;
    cursor: pointer;
    line-height: 20px;
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
    word-wrap: break-word;
    display: flex;

    &-index {
      color: #1a8cfe;
      margin-right: 5px;
      margin-left: -10px;
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

  .radioOrCheck:checked + label, .radioOrCheck.checked + label {
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
      border: 1px solid #ff4b50 !important;

      & > svg {
        color: #ff4b50;
      }
    }
  }

  .answers label {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 15px 10px 45px;
    line-height: 20px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    position: relative;
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
        top: -3px;
        left: 1px;
        color: #c1c1cb;
        width: 19px;
        height: 19px;
        display: none;

        &.icon-error {
          left: -1.5px;
          top: -0.5px;
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
      cursor: default;
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

  .analysis-row + .analysis-row {
    margin-top: 10px;
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

.pagation {
  margin: 20px auto;

  /deep/ & .pagation-list span.bgprimary {
    background: #1a8cfe;
    border-color: #1a8cfe;
  }
}

@media (max-width: $MQMobile) {
  .header-name, .out-btn, .left, .right, .sign {
    display: none !important;
  }

  .el-header {
    background: #1a8cfe;
    height: 45px !important;
    box-shadow: unset;

    .header-time {
      display: unset;
      color: #ffffff;
      font-size: 16px;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    }

    .out-icon {
      display: unset;
      position: absolute;
      left: 9px;
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
    }

    .header-icon {
      display: unset;
      position: absolute;
      right: 10px;
      color: #fff;
      font-size: 20px;

      svg+svg {
        margin-left: 10px;
      }
    }
  }

  .el-main {
    background-color: #eff3f7;
    padding: 10px 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    .progress-bar {
      display: flex;
      flex-direction: column;
      background: #fff;
      margin: -10px -10px 10px;
      height: 44px;
      position: fixed;
      width: 100%;
      z-index: 99;

      &-top {
        display: flex;
        justify-content: space-between;
        padding: 11px 10px;
        color: #666;
        font-size: 14px;

        .font {
          font-weight: 500;
          font-size: 0px;

          span {
            color: #1a8cfe;
            font-size: 14px;

            &:last-child {
              color: #c1c1cb;
            }
          }
        }
      }

      /deep/ .el-progress-bar__outer, /deep/ .el-progress-bar__inner {
        border-radius: 0;
      }
    }

    .content {
      margin-top: 44px;
    }

    .answers {
      & > .select:hover {
        background: #fff;
      }
    }

    .body {
      border: 0;

      .support {
        display: none;
      }

      .questions {
        border-bottom: 0;

        &-title {
          display: none;
        }

        &-content {
          padding: 20px 20px 30px;

          .question-content {
            padding: 0;

            .exam-question {
              margin-bottom: 15px;

              &-index {
                display: none;
              }
            }

            .answers {
              .select:not(.judge) {
                & >label {
                  padding-left: 0;
                  padding-right: 0;

                  .select-icon {
                    display: none;
                  }

                  .words {
                    display: flex;

                    &-option {
                      border: 1px solid #656577;
                      width: 17px;
                      height: 18px;
                      padding-left: 1px;
                      border-radius: 50%;
                      text-align: center;

                      &-dot {
                        display: none;
                      }
                    }

                    &-html {
                      padding-left: 10px;
                    }
                  }
                }

                .radioOrCheck:checked + label, .radioOrCheck.checked + label {
                  .words-option {
                    border-color: #1a8cfe;
                    color: #fff;
                    background-color: #1a8cfe;
                  }
                }

                .radioOrCheck + label.wrong {
                  .words-option {
                    border-color: #ff4b50;
                    color: #fff;
                    background-color: #ff4b50;
                  }
                }
              }

              .select.judge {
                & >label {
                  padding-left: 0;
                  padding-right: 0;

                  .select-icon {
                    left: 0;
                    top: 11px;

                    svg {
                      display: unset !important;
                    }
                  }

                  .words {
                    padding-left: 10px;
                  }
                }

                .radioOrCheck + label.wrong .select-icon svg {
                  color: #ff4b50;
                }
              }
            }
          }
        }
      }

      .pagation {
        display: none;
      }

      .pagation-mobile {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        background-color: #eff3f7;
        width: 100%;
        margin-left: -10px;
        height: 65px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;

        &>div {
          height: 42px;
          border: 1px solid #1a8cfe;
          border-radius: 22px;
          display: flex;
          justify-content: center;
          align-items: center;

          &.btn1 {
            width: 100px;
            background: #fff;
            color: #1a8cfe;
            margin-right: 10px;

            &.first {
              color: #DCDFE6;
              border: 1px solid #DCDFE6;
              pointer-events: none;
            }

            &:active {
              background-color: #d4d4d4;
              border-color: #144076;
            }
          }

          &.btn2 {
            background: #1a8cfe;
            color: #fff;
            flex: 1;

            &:active {
              background-color: #2064b7;
              border-color: #1a5399;
            }
          }
        }
      }
    }
  }
}
</style>
