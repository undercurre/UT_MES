<template>
  <el-col :span="span" class="col-md-3" style="padding: 0; height: 100%">
    <el-row class="row" style="height: 50%; padding: 0">
      <div class="border-container" style="height: 100%">
        <el-col
          :span="24"
          class="col-md-12 name-title-m"
          style="padding: 15px 0px 0 15px"
        >
          {{ $t("SOPRoutes._174") }}
        </el-col>
        <el-col :span="24" class="col-md-12" v-if="ROLEstsut">
          <el-row class="row">
            <el-col
              :span="10"
              :offset="1"
              class="col-md-6"
              v-if="$btnList.indexOf('SfcsShortage') !== -1"
            >
              <button
                id="queliao"
                data-type="0"
                class="btn-style btn-6"
                @click="innerVisible_but(0)"
              >
                {{ $t("SOPRoutes._175") }}
              </button>
            </el-col>
            <el-col
              :span="10"
              :offset="2"
              class="col-md-6"
              v-if="$btnList.indexOf('SfcsQuality') !== -1"
            >
              <button
                id="pinzhi"
                data-type="1"
                class="btn-style btn-2"
                @click="innerVisible_but(1)"
              >
                {{ $t("SOPRoutes._176") }}
              </button>
            </el-col>
            <el-col
              :span="10"
              class="col-md-6"
              :offset="1"
              v-if="$btnList.indexOf('SfcsDevice') !== -1"
            >
              <button
                id="shebei"
                data-type="2"
                class="btn-style btn-3"
                @click="innerVisible_but(2)"
              >
                {{ $t("SOPRoutes._177") }}
              </button>
            </el-col>
            <el-col
              :span="10"
              class="col-md-6"
              :offset="2"
              v-if="$btnList.indexOf('SfcsHelp') !== -1"
            >
              <button
                id="bangzhu"
                data-type="3"
                class="btn-style btn-1"
                @click="innerVisible_but(3)"
              >
                {{ $t("SOPRoutes._178") }}
              </button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="col-md-12" v-else>
          <el-row class="row">
            <el-col :span="12" class="col-md-6">
              <button
                id="queliao"
                data-type="0"
                class="btn-style btn-6"
                @click="innerVisible_but(0)"
              >
                {{ $t("SOPRoutes._175") }}
              </button>
            </el-col>
            <el-col :span="12" class="col-md-6">
              <button
                id="pinzhi"
                data-type="1"
                class="btn-style btn-2"
                @click="innerVisible_but(1)"
              >
                {{ $t("SOPRoutes._176") }}
              </button>
            </el-col>
            <el-row class="row">
              <el-col :span="12" class="col-md-6">
                <button
                  id="shebei"
                  data-type="2"
                  class="btn-style btn-3"
                  @click="innerVisible_but(2)"
                >
                  {{ $t("SOPRoutes._177") }}
                </button>
              </el-col>
              <el-col :span="12" class="col-md-6">
                <button
                  id="bangzhu"
                  data-type="3"
                  class="btn-style btn-1"
                  @click="innerVisible_but(3)"
                >
                  {{ $t("SOPRoutes._178") }}
                </button>
              </el-col>
            </el-row>
          </el-row>
        </el-col>
        <span class="top-left border-span" />
        <span class="top-right border-span" />
        <span class="bottom-left border-span" />
        <span class="bottom-right border-span" />
      </div>
    </el-row>
    <el-row class="row" style="height: 50%; padding: 15px 0 0 0">
      <div class="border-container" style="height: 100%; padding: 15px 0px">
        <el-col
          :span="24"
          class="col-md-12 name-title-m"
          style="margin-left: 15px"
        >
          {{ $t("SOPRoutes._182") }}
        </el-col>
        <div id="edubalance" style="color: floralwhite">
          <div
            id="msgArea"
            v-html="msgArea"
            style="margin-top: 3px; padding: 0px 15px 0px"
          ></div>
        </div>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
    </el-row>
  </el-col>
</template>

<script>
export default {
  props: {
    span: {
      default: 24,
      type: Number
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style type="text/css" lang="scss">
.el-carousel__arrow{
  font-size: 18px;
}
.primary-operation .el-dialog {
  height: 100%;
  margin: 0;
  background: #040f3c;
}
.primary-operation .el-dialog .el-dialog__body {
  padding: 0;
  height: 90%;
  background: #040f3c;
}
.sop .btn-style {
  margin: 0px;
  margin-top: 40px;
}
.sop .stamper {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 160px;
  height: 70px;
  line-height: 60px;
  margin: 140px 0 0 300px;
  text-align: center;
  font-size: 40px;
  font-weight: 900;
  font-family: '新宋体';
  transform: rotate(-20deg);
  cursor: pointer;
  border-radius: 50% / 50%;
}

.sop .yes_stamper {
  border: 5px solid rgba(18, 233, 35, 0.6);
  color: rgba(18, 233, 35, 0.6);
}

.sop .no_stamper {
  border: 5px solid rgba(255, 0, 0, 0.6);
  color: rgba(255, 0, 0, 0.6);
}
.sop .border-container {
  color: #ffffff;
}
.sop-dialog {
  overflow: hidden;
}
.sop-dialog .el-dialog__body {
  padding: 15px;
}
.sop-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}
.sop-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}
.sop-dialog-area label span {
  width: 80px;
}
.sop-dialog-button {
  padding-top: 15px;
  color: #fff;
  text-align: right;
}
/* 按钮 */
.kanban-title-tab {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 14px;
}
.kanban-title-tab span {
  width: 50px;
  height: 29px;
  line-height: 29px;
  margin-left: 10px;
  background: rgb(4, 15, 60);
  border-radius: 4px;
  border: 1px solid #23548c;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kanban-title-tab span:hover {
  background: rgb(4, 15, 60);
}
// 高度设置
.sop-center {
  height: calc(100vh - 90px - 60px);
}
</style>

<style>
.sop {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.carousel-text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background: rgba(0, 0, 0, 0.6);
}
.carousel-text .last {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 100%;
  padding: 0px 5px;
}
.sop .el-carousel {
  width: 100%;
  height: 100%;
}
.sop .el-carousel__container {
  width: 100%;
  height: 100%;
}
.sop .el-carousel__container .el-carousel__item {
  text-align: center;
}
.sop .el-carousel__container .el-carousel__item img {
  height: 100%;
}
.sop .btn-6:before {
  content: '';
  background-color: #53cdd8;
  position: absolute;
  z-index: -1;
  top: 0;
  right: -30px;
  height: 100%;
  width: 0;
  -webkit-transform: skew(45deg, 0);
  transform: skew(45deg, 0);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.sop .sp-titx {
  width: 100px !important;
}
.sop .callTable-radio .el-radio__label {
  display: none;
}
.sop-dialog-table {
  height: calc(100vh - 555px);
}
.sop .border-container .div-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.header-title {
  height: 80px;
  line-height: 80px;
}
</style>
