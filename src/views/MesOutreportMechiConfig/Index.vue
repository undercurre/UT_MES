<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-input
          clearable
          v-model="formData.Key"
          style="width: 200px"
          :placeholder="'请输入产品系列'"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button type="primary" icon="el-icon-search" @click="searchClick">{{
          $t("publics.btn.search")
        }}</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addClick(-1)">{{
          $t("publics.btn.add")
        }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="removeClick"
          >{{ $t("publics.btn.delete") }}</el-button
        >
        <el-button type="success" icon="el-icon-check" @click="saveClick">{{
          $t("publics.btn.save")
        }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-current-row
        highlight-hover-row
        show-overflow
        auto-resize
        keep-source
        :loading="loading"
        :data="mainTable"
        :edit-rules="validRules"
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
        @cell-click="cellClick"
      >
        <vxe-table-column
          sortable
          type="radio"
          width="80"
          :title="$t('cne.t_1')"
        />
        <vxe-table-column
          sortable
          field="FAMILY_NAME"
          min-width="150"
          :title="'产品系列'"
          :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
        >
          <template v-slot:edit="{ row }">
            <el-select
              v-model="row.FAMILY_NAME"
              filterable
              clearable
              :placeholder="''"
              style="width: 100%"
              @change="changeFAMILY_NAME(row)"
            >
              <el-option
                v-for="item in FAMILY_List"
                :key="item.ID"
                :label="item.NAME"
                :value="item.NAME"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          sortable
          field="CHECK_CONTENT"
          min-width="150"
          :title="'检验内容'"
          :edit-render="{ name: 'input', props: {   } }"
        />
        <vxe-table-column
          sortable
          field="UN_PRICE"
          min-width="150"
          :title="'单价'"
          :edit-render="{name:'input',props:{type:'number',min: '0'}}"
        />
        <vxe-table-column sortable :title="'排序'" field="ORDER_NO" width="80" :edit-render="{ name: 'input', props: {   } }"  />
        <vxe-table-column
          sortable
          field="CREATE_TIME"
          min-width="150"
          :title="'创建时间'"
          :edit-render="{ name: '$input', props: {  readonly: true  } }"
        />
        <vxe-table-column
          sortable
          field="CREATE_USER"
          min-width="150"
          :title="'创建人'"
          :edit-render="{ name: '$input', props: {  readonly: true  } }"
        />
        <vxe-table-column
          sortable
          field="UPDATE_USER"
          min-width="150"
          :title="'修改人'"
          :edit-render="{ name: '$input', props: {  readonly: true  } }"
        />
        <vxe-table-column
          sortable
          field="UPDATE_TIME"
          min-width="150"
          :title="'修改时间'"
          :edit-render="{ name: '$input', props: {  readonly: true  } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  Index,
  GetSiteStatisticsConditionList,
  LoadData,
  SaveData,
  DeleteOneById
} from '@/api/MesOutreportMechiConfig'
export default {
  name: 'MesOutreportMechiConfig',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      FAMILY_List: [], // 产品系列
      FAMILY_NAME: [],
      loading: false,
      mainTable: [],
      MST_ID: 0,
      validRules: {
        CHECK_CONTENT: [
          {
            required: true,
            message: '请输入内容'
          }
        ]
      },
      SelectedData: []
    }
  },
  methods: {

    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getFAMILY_List()
        this.getLoadData()
      }
    },
    async getFAMILY_List () {
      const res = await GetSiteStatisticsConditionList({ TYPE: 9 })
      this.FAMILY_List = res.Result.data ? res.Result.data : []
      this.FAMILY_List.map((item) => {
        this.FAMILY_NAME.push(item.NAME)
      })
    },
    // 产品系列
    changeFAMILY_NAME (e) {
      let index = this.FAMILY_NAME.indexOf(e.FAMILY_NAME)
      e.FAMILY_ID = this.FAMILY_List[index].ID
    },
    async getLoadData () {
      const res = await LoadData(this.formData)
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount
      this.$refs.xTable.sort('ORDER_NO', 'asc')
      this.MST_ID = 0
      console.log('this.mainTable:', res.Result)
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    addClick (row) {
      const record = {
        ID: 0,
        FAMILY_ID: 0,
        FAMILY_NAME: '',
        CHECK_CONTENT: '',
        UN_PRICE: 0,
        ORDER_NO: this.$refs.xTable.getTableData().tableData.length + 1,
        CREATE_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss '),
        CREATE_USER: this.userinfo.USER_NAME,
        // UPDATE_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss '),
        UPDATE_USER: ''
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    removeClick () {
      var that = this
      if (!this.MST_ID || this.MST_ID === 0) {
        return this.$message.error('请选择需要删除数据')
      }
      this.$confirm(
        '确认要删除选中的数据吗？',
        this.$t('msh._102'),
        {
          type: 'warning'
        }
      ).then(() => {
        that.$refs.xTable.remove(this.SelectedData)
        var num = 1
        var saveForm = {
          removeRecords: [],
          updateRecords: []
        }
        that.$refs.xTable.getTableData().tableData.map(item => {
          item.ORDER_NO = num
          saveForm.updateRecords.push(item)
          num += 1
        })
        saveForm.removeRecords.push(this.SelectedData)
        console.log('saveForm:', saveForm)
        SaveData(saveForm).then((response) => {
          if (response.Result) {
            that.MST_ID = 0
            that.getLoadData()
            that.$notify({
              title: that.$t('msh._103'),
              message: that.$t('msh._104'),
              type: 'success',
              duration: 2000
            })
          }
        })
        // DeleteOneById(that.MST_ID).then(res => {
        //   if (res.Result) {
        //     that.getLoadData()
        //     var num = 1
        //     var saveForm = {
        //       updateRecords: []
        //     }
        //     that.$refs.xTable.getTableData().tableData.map(item => {
        //       item.ORDER_NO = num
        //       saveForm.updateRecords.push(item)
        //       num += 1
        //     })
        //     SaveData(saveForm).then(res => {
        //       that.MST_ID = 0
        //       that.getLoadData()
        //       that.$notify({
        //         title: that.$t('msh._103'),
        //         message: that.$t('msh._104'),
        //         type: 'success',
        //         duration: 2000
        //       })
        //     })
        //   }
        // })
      })
    },
    saveClick () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        var beforeArr = []
        that.$refs.xTable.getTableData().tableData.map(item => {
          beforeArr.push(parseInt(item.ORDER_NO))
        })
        var afterArr = [...new Set(beforeArr)]
        if (beforeArr.length !== afterArr.length) {
          return this.$message.error('排序不能重复')
        }
        that.$refs.xTable.validate((valid) => {
          if (valid) {
            var saveForm = {
              insertRecords: [],
              updateRecords: [],
              removeRecords: []
            }
            saveForm.insertRecords = postdata.insertRecords
            saveForm.updateRecords = postdata.updateRecords
            saveForm.removeRecords = postdata.removeRecords
            SaveData(saveForm).then((response) => {
              if (response.Result) {
                that.MST_ID = 0
                that.getLoadData()
                that.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    },

    cellClick (e) {
      console.log('e:', e)
      this.MST_ID = e.row.ID
      this.SelectedData = e.row
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style>
</style>
