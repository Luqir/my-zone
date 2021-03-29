<template>
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
                @click="$emit('cilckToJump',{id:ques.id,quesIndex:ques.indexForPage})"
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
</template>

<script>
export default {
  filters: {
    typeFilter(type) {
      if (type === 1) return '单选题'
      else if (type === 2) return '多选题'
      else if (type === 3) return '判断题'
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [[], [], []]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
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

@media (max-width: $MQMobile) {
  .left {
    display: none !important;
  }
}
</style>
