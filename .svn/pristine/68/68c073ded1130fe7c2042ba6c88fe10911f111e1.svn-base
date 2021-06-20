<template>
  <el-select clearable
             style="width:200px"
             v-model="bindData[bindProp]"
             :placeholder="placeholderStr">
    <!-- 占位元素 -->
    <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #ffffff;top: 0;z-index: 99"></div>
    <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
    <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
      <el-input v-model="listQuery.Key"
                @input="searchQueryList"
                :placeholder="this.$t('publics.tips.enterKeyWord')"
                clearable />
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.prevent="searchQueryList">{{ $t('publics.btn.search') }}</el-button>
    </div>
    <el-option style="width: 600px"
               v-for="item in customerList"
               :key="item.CATEGORY_ID"
               :label="item.CATEGORY_NAME"
               :value="item.CATEGORY_ID">
      <span style="float: left">{{ item.CATEGORY_NAME }}</span>
      <span style="float: right">{{ item.DESCRIPTION }}</span>
    </el-option>
    <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
      <el-pagination :pager-count="5"
                     :current-page="listQuery.Page"
                     :page-size="listQuery.Limit"
                     :page-sizes="[10, 20, 30, 40]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="listQuery.totalPage"
                     @size-change="listQuerySizeChange"
                     @current-change="listQueryCurrentChange" />
    </div>
  </el-select>
</template>

<script>
import { LoadData as _LoadData } from '@/api/SmtResourceCategory'

export default {
  name: 'Pnselect',
  methods: {
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getCustomerList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getCustomerList()
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getCustomerList()
    },
    async getCustomerList () {
      this.listQuery.OBJECT_ID = this.bindData.OBJECT_ID
      const res = await _LoadData(this.listQuery)
      if (res.Result) {
        this.localCustomerList = res.Result ? JSON.parse(res.Result) : []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.localCustomerList.length) {
          this.localCustomerList.push({
            CATEGORY_NAME: '',
            CATEGORY_ID: ''
          })
        }
      }
    }
  },
  created () {
    this.getCustomerList()
  },
  data () {
    return {
      localCustomerList: this.customerList
    }
  },
  props: {
    // 绑定数据（from）
    bindData: {
      type: Object
    },
    // 上面绑定的数据的属性
    bindProp: {
      type: String
    },
    // 使用的placeholderStr
    placeholderStr: {
      type: String
    },
    // 分页
    listQuery: {
      type: Object
    },
    // 列表
    customerList: {
      type: Array
    }
  },
  watch: {
    bindData: {
      handler (val, oldVal) {
        this.$emit('getbindData', val)
      },
      deep: true
    },
    localCustomerList: {
      handler (val, oldVal) {
        this.$emit('getbindList', val)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
