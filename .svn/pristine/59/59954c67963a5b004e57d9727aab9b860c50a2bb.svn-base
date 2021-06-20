<template>
  <el-select
    clearable
    :multiple = "multiple"
    @change="changeModel"
    v-model="localData"
    :disabled="disabled"
    style="width: 100%"
    :placeholder="placeholderStr"
    @visible-change="focusKey"
  >
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      :style="{'width':tableWidth+'px','display':'flex','padding':'0 20px 0 10px','position':'sticky','top':'6px','background':'#fff','z-index':'90'}"
    >
      <el-input
        v-model="listQuery.Key"
        @input="searchClick"
        placeholder="请输入关键字"
        @keyup.enter.native="searchClick"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click.prevent="searchClick"
      >{{ $t("publics.btn.search") }}</el-button>
    </div>
    <el-option
      v-for="item in list"
      :key="item.DEFECT_CODE"
      :label="item.DEFECT_CODE"
      :value="item.DEFECT_CODE"
      :disabled="item.disabled"
    >
      <span style="float: left">{{ item.DEFECT_CODE}} {{item.DEFECT_TYPE_NAME}}</span>
      <span style="float: right">{{ item.CHINESE_DESCRIPTION }}</span>
    </el-option>
    <div
      :style="{'width':tableWidth+'px','position':'sticky','bottom':'6px','background':'#fff','z-index':'90','padding-left':'15px'}"
    >
      <el-pagination
        :current-page="listQuery.Page"
        :page-size="listQuery.Limit"
        :page-sizes="[15, 25, 35, 45]"
        :layout="tableWidth<600?'total,prev, pager, next':'total, sizes, prev, pager, next, jumper'"
        :total="total"
        @size-change="paginationSizeChange"
        @current-change="paginationCurrentChange"
      />
    </div>
  </el-select>
</template>

<script>
import helper from '@/api/Helper'
const API = helper('SfcsDefectConfig')
export default {
  name: 'BadCode',
  data () {
    return {
      localData: this.bindData,
      list: [],
      listQuery: {
        Key: '',
        Page: 1,
        Limit: 15,
        TYPE: 11
      },
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    changeModel (e) {
      this.$emit('badCode', this.localData)
    },
    focusKey () {
      this.listQuery.Key = ''
      this.getList()
    },
    searchClick () {
      this.listQuery.Page = 1
      this.getList()
    },
    async getList () {
      const res = await API.LoadData(this.listQuery)
      if (res.Result) {
        if (res.Result.length === 0) {
          this.list = [{ ID: '', DEFECT_CODE: '暂无数据', disabled: true }]
          this.total = 0
        } else {
          this.list = res.Result
          this.total = res.TotalCount
        }
      }
    },
    paginationSizeChange (Limit) {
      this.listQuery.Limit = Limit
      this.getList()
    },
    paginationCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getList()
    }
  },
  props: {
    bindData: {
      type: [String, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholderStr: {
      type: String,
      default: '请选择不良代码'
    },
    tableWidth: {
      type: Number,
      default: 600
    }
  },
  watch: {
    bindData: {
      handler (val) {
        this.localData = val
      }
    }
  }
}
</script>

<style scoped>

</style>
