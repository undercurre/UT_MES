<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <pn-no-select
          :bind-data="formData.PART_NO"
          @getData="setBindData"
          style="width: 200px"
          :multiple="false"
        ></pn-no-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button type="success" icon="el-icon-plus" @click="insertEvent">{{
          $t("publics.btn.add")
        }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          :disabled="isStatus"
          @click="submitClick"
          >提交</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-warning-outline"
          @click="ReviewClick"
          :disabled="isStatus"
          >审核</el-button
        >
        <el-button type="danger" icon="el-icon-edit" @click="changeClick"
          >变更</el-button
        >
        <!-- <el-button type="primary" @click="BulkCopy">批量复制</el-button> -->
        <el-button
          type="success"
          :disabled="isStatus"
          @click="addCategoryWork(0)"
          >新增类别工序</el-button
        >
      </custom-container-header>
    </template>
    <!-- 主表 -->
    <div class="StandardWorkingHoursManagement-center">
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
        :sort-config="{ trigger: 'cell' }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
        @cell-click="cellClick"
      >
        <vxe-table-column type="radio" :title="'选择'" width="100" />
        <vxe-table-column
          sortable
          field="PART_NO"
          min-width="150"
          :title="'料号'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="PART_NAME"
          min-width="180"
          :title="'品名'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="PART_DESC"
          min-width="150"
          :title="'描述'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="CUSTOM_MAX_USED_COUNT"
          min-width="100"
          :title="'版本'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="STATUS"
          min-width="100"
          :title="'状态'"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0" class="red-txt">新增</span>
            <span v-else-if="scope.row.STATUS === 1" style="color: orange"
              >待审核</span
            >
            <span v-else-if="scope.row.STATUS === 2" class="green-txt"
              >已审核</span
            >
          </template>
        </vxe-table-column>
        <vxe-table-column
          sortable
          field="CREATE_USER"
          min-width="150"
          :title="'创建人'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="CREATE_TIME"
          min-width="180"
          :show-overflow-tooltip="true"
          :title="'创建时间'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="AUDITOR_USER"
          min-width="150"
          :show-overflow-tooltip="true"
          :title="'审核人'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="AUDITOR_TIME"
          min-width="180"
          :show-overflow-tooltip="true"
          :title="'审核时间'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      style="padding: 10px 0; border-bottom: 1px solid rgb(229, 231, 237)"
      :current-page="formData.Page"
      :page-size="formData.Limit"
      :page-sizes="[15, 25, 35, 45]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 附表 -->
    <el-row style="margin-top: 20px">
      <el-col :span="16" style="padding-right: 10px">
        <div class="StandardWorkingHoursManagement-bottom-center">
          <vxe-table
            ref="bTable"
            border
            resizable
            height="100%"
            size="medium"
            align="center"
            highlight-hover-row
            highlight-current-row
            auto-resize
            keep-source
            :loading="loading2"
            :data="mainTable2"
            :edit-rules="bTableRules"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            @cell-click="cellClick2"
          >
            <vxe-table-column type="seq" width="50" />
            <vxe-table-column
              sortable
              field="CATEGORY_NAME"
              min-width="140"
              :title="'工序类别'"
              :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
            >
              <template v-slot:edit="{ row }">
                <el-select
                  v-model="row.CATEGORY_NAME"
                  filterable
                  :disabled="isStatus"
                  :placeholder="''"
                  style="width: 100%"
                  @change="changeCATEGORY_NAME(row)"
                >
                  <el-option
                    v-for="item in CategoryList"
                    :key="item.ID"
                    :label="item.CHINESE"
                    :value="item.CHINESE"
                  />
                </el-select>
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="SMT_COM_QTY"
              min-width="140"
              :title="'SMT元件数'"
            />
            <vxe-table-column
              sortable
              field="SMT_COUNT_QTY"
              min-width="120"
              :title="'SMT点数'"
            />
            <vxe-table-column
              sortable
              field="STANDARD_CAPACITY"
              min-width="140"
              :title="'标准产能(H)'"
            />
            <vxe-table-column
              sortable
              field="SOLDER_JOINTS_QTY"
              min-width="140"
              :title="'焊点数'"
            />
            <vxe-table-column
              sortable
              field="EFFICIENCY"
              min-width="120"
              :title="'效率(%)'"
              :edit-render="{
                name: '$input',
                props: { type: 'number', min: '0' },
              }"
            />
            <vxe-table-column
              sortable
              field="FIRST_TIME"
              min-width="160"
              :title="'首检时间(分钟)'"
              :edit-render="{
                name: '$input',
                props: { type: 'number', min: '0' },
              }"
            />
            <vxe-table-column
              :title="$t('as_cfe.tb_og')"
              min-width="210"
              align="center"
              fixed="right"
            >
              <template v-slot="{ row, $rowIndex }">
                <el-button
                  type="primary"
                  :disabled="isStatus"
                  @click.native.stop="viceAddClick(row, $rowIndex)"
                  >新增</el-button
                >
                <el-button
                  type="success"
                  :disabled="isStatus"
                  @click.native.stop="viceSaveClick(row, $rowIndex)"
                  >{{ $t("publics.btn.save") }}</el-button
                >
                <el-button
                  type="danger"
                  :disabled="isStatus"
                  @click.native.stop="viceDeleteClick(row, $rowIndex)"
                  >删除</el-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
      <el-col :span="8" style="padding-left: 10px">
        <div class="StandardWorkingHoursManagement-bottom-center">
          <vxe-table
            ref="bMinTable"
            border
            resizable
            height="100%"
            size="medium"
            align="center"
            highlight-hover-row
            highlight-current-row
            auto-resize
            keep-source
            :data="mainTable3"
            :loading="loading3"
            :edit-rules="bMainTableRules"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{
              trigger: 'click',
              mode: 'row',
              showStatus: true,
            }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column type="seq" width="50" />
            <vxe-table-column
              sortable
              field="OPERATION_NAME"
              min-width="140"
              :title="'工序名称'"
            >
              <template v-slot="{ row }">
                <el-select
                  :disabled="isStatus"
                  @change="changeOPERATION_NAME(row)"
                  v-model="row.OPERATION_NAME"
                  clearable
                  :placeholder="''"
                  style="width: 100%"
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
                    style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    "
                  >
                    <el-input
                      clearable
                      v-model="formDataCATEGORY.Key"
                      :placeholder="'请输入关键字'"
                      @keyup.enter.native="CATEGORYSearch"
                    />
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click.prevent="CATEGORYSearch"
                      >{{ $t("publics.btn.search") }}</el-button
                    >
                  </div>
                  <el-option
                    v-for="item in CATEGORY_List"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME"
                  >
                  </el-option>
                  <div
                    style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    "
                  >
                    <el-pagination
                      :pager-count="5"
                      :current-page="formDataCATEGORY.Page"
                      :page-size="formDataCATEGORY.Limit"
                      :page-sizes="[15, 25, 35, 45]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="CATEGORY_Page"
                      @size-change="CATEGORY_SizeChange"
                      @current-change="CATEGORY_CurrentChange"
                    />
                  </div>
                </el-select>
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="STANDARD_HUMAN"
              min-width="100"
              :title="'标准人力'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.STANDARD_HUMAN"
                  @input="checkSomething(row)"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="STANDARD_WORK_FORCE"
              min-width="140"
              :title="'标准工时(S)'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.STANDARD_WORK_FORCE"
                  @input="checkSomething(row)"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="SMT_COM_QTY"
              min-width="140"
              :title="'SMT元件数'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.SMT_COM_QTY"
                  @input="checkSomething(row)"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="SOLDER_JOINTS_QTY"
              min-width="140"
              :title="'焊点数'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.SOLDER_JOINTS_QTY"
                  @input="checkSomething(row)"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="SMT_COUNT_QTY"
              min-width="160"
              :title="'SMT点数'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.SMT_COUNT_QTY"
                  @input="checkSomething(row)"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="STANDARD_CAPACITY"
              min-width="140"
              :title="'标准产能(H)'"
            >
              <template v-slot="{ row }">
                <el-input
                  :disabled="isStatus"
                  v-model="row.STANDARD_CAPACITY"
                  @input="checkSomething"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              :title="$t('as_cfe.tb_og')"
              min-width="80"
              align="center"
              fixed="right"
            >
              <template v-slot="{ row }">
                <el-button
                  :disabled="isStatus"
                  type="danger"
                  @click="removeClick(row, row.$index)"
                  >{{ $t("publics.btn.delete") }}</el-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新增框 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="VisibleTitle"
      width="60%"
      :visible.sync="dialogVisible"
    >
      <el-form
        :show-message="false"
        :rules="addRules"
        ref="addForm"
        label-width="120px"
        :model="addForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'料号：'" prop="PART_NO">
              <pn-no-select
                :bind-data="addForm.PART_NO"
                @getData="getPartByPartNo"
                style="width: 100%"
                :multiple="false"
              ></pn-no-select>
            </el-form-item>
            <el-form-item :label="'描述：'">
              <el-input disabled v-model="addForm.PART_DESC" placeholder="请输入描述" />
            </el-form-item>
            <el-form-item :label="'创建人：'">
              <el-input disabled v-model="addForm.CREATE_USER" placeholder="请输入创建人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'品名：'">
              <el-input disabled v-model="addForm.PART_NAME" placeholder="请输入品名" />
            </el-form-item>
            <el-form-item :label="'状态：'">
              <span v-if="addForm.STATUS === 0" class="red-txt">新增</span>
              <span v-else-if="addForm.STATUS === 1" style="color: orange"
                >待审核</span
              >
              <span v-else-if="addForm.STATUS === 2" class="green-txt"
                >已审核</span
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="saveClick">{{
          $t("publics.btn.save")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  GetSiteStatisticsConditionList,
  LoadData,
  GetPartByPartNo,
  LoadWorkTimeTypeDetailList,
  LoadWorkTimeDetailList,
  SaveData,
  ModifyWorkTimeVersion,
  AuditWorkTimeHeader,
  SaveWorkTimeDetail,
  SaveWorkTimeTypeDetail
} from '@/api/MesWorkTimeHeader'
import PnNoSelect from '@/components/PnNoSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'MesWorkTimeHeader',
  mixins: [pagination],
  components: {
    customContainerHeader,
    PnNoSelect
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(this.addForm.PART_NO)
      if (this.addForm.PART_NO) {
        callback()
      } else {
        callback(new Error('请选择料号'))
      }
    }
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      CategoryList: [], // 工序类别
      CategoryBox: [],
      PartNototalPage: 0,
      loading: false,
      mainTable: [],
      loading2: false,
      mainTable2: [],
      VisibleTitle: '',
      dialogVisible: false,
      addForm: {},
      // 料号
      add_PART_NO_Form: {
        Page: 1,
        Limit: 15,
        TYPE: 2
      },
      isAdd: false,
      isAdd2: false,
      addRules: {
        PART_NO: [{ required: true, validator: validatePass }]
      },
      currentData: [],
      currentIndex: -1,
      formDataCATEGORY: {
        Page: 1,
        Limit: 15,
        TYPE: 10
      },
      CATEGORY_List: [],
      CATEGORY_Box: [],
      CATEGORY_Page: 0,
      mainTable3: [],
      isStatus: false,
      bMainTableRules: {
        OPERATION_NAME: [{ required: true, message: '请选择工序名称' }]
      },
      bTableRules: {
        CATEGORY_NAME: [{ required: true, message: '请选择工序类别' }]
      },
      loading3: false
    }
  },
  methods: {
    setBindData (val) {
      this.formData.PART_NO = val
      this.searchClick()
    },
    async getCATEGORY_ID_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.CATEGORY_Box = []
        this.CATEGORY_List = res.Result.data
        res.Result.data.map((item) => {
          this.CATEGORY_Box.push(item.NAME)
        })
      } else {
        this.getCATEGORY_ID_List({
          Page: this.formDataCATEGORY.Page,
          Limit: this.formDataCATEGORY.Limit,
          TYPE: 10
        })
      }
      this.CATEGORY_Page = res.Result.count ? res.Result.count : 0
    },
    async getIndex () {
      const res = await Index()
      const data = res.Result
      this.CategoryList = data.CategoryList || []
      data.CategoryList.map((item) => {
        this.CategoryBox.push(item.CHINESE)
      })
      // console.log('this.CategoryList:', this.CategoryList)
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result
        this.mainTable2 = []
        this.mainTable3 = []
        this.MST_ID = 0
      }
      this.totalPage = res.TotalCount ? res.TotalCount : 0
      // console.log("this.mainTable:", res.Result);
    },
    saveClick () {
      var that = this
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          var saveForm = {
            InsertRecords: [],
            UpdateRecords: [],
            RemoveRecords: []
          }
          saveForm.InsertRecords.push({
            ID: 0,
            PART_NO: that.addForm.PART_NO,
            STATUS: that.addForm.STATUS,
            CREATE_USER: that.userinfo.USER_NAME,
            AUDITOR_USER: '',
            UPDATE_USER: ''
          })
          SaveData(saveForm).then((res) => {
            if (res.Result) {
              that.clear()
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
    },
    // 提交
    submitClick () {
      if (!this.MST_ID || this.MST_ID === 0) {
        return this.$message.error('请选择需要提交的数据')
      }
      var that = this
      let submitData = {
        ID: that.MST_ID,
        STATUS: 1,
        AUDITOR_USER: that.userinfo.USER_NAME
      }
      AuditWorkTimeHeader(submitData).then((res) => {
        if (res.Result) {
          that.clear()
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 审核
    ReviewClick () {
      if (!this.MST_ID || this.MST_ID === 0) {
        return this.$message.error('请选择需要审核的数据')
      }
      var that = this
      let ReviewData = {
        ID: that.MST_ID,
        STATUS: 2,
        AUDITOR_USER: that.userinfo.USER_NAME
      }
      AuditWorkTimeHeader(ReviewData).then((res) => {
        if (res.Result) {
          that.clear()
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 变更
    changeClick () {
      if (!this.MST_ID || this.MST_ID === 0) {
        return this.$message.error('请选择需要变更的数据')
      }
      var that = this
      let changeData = {
        ID: that.MST_ID,
        CREATE_USER: that.userinfo.USER_NAME
      }
      ModifyWorkTimeVersion(changeData).then((res) => {
        if (res.Result) {
          that.clear()
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 批量复制
    BulkCopy () {},
    // 新增类别工序
    addCategoryWork (row) {
      if (!this.MST_ID || this.MST_ID === 0) {
        return this.$message.error('请选择需要新增类别工序的主表数据')
      }
      this.isAdd = true
      const record = {
        ID: 0,
        MST_ID: this.MST_ID,
        CATEGORY_ID: 0,
        SMT_COM_QTY: 0,
        SMT_COUNT_QTY: 0,
        STANDARD_CAPACITY: 0,
        EFFICIENCY: 0,
        FIRST_TIME: 0,
        SOLDER_JOINTS_QTY: 0,
        isSave: true
      }
      this.$refs.bTable.insertAt(record, row).then(({ row }) => {
        this.$refs.bTable.setActiveRow(row)
      })
    },
    cellClick (e) {
      this.MST_ID = e.row.ID
      this.isStatus = false
      if (e.row.STATUS >= 2) {
        this.isStatus = true
      }
      this.getLoadWorkTimeTypeDetailList()
      this.mainTable3 = []
    },
    cellClick2 (e) {
      // 审核状态
      if (this.isStatus) {
      } else {
        this.formDataCATEGORY.CATEGORY_ID = e.row.CATEGORY_ID
        this.getCATEGORY_ID_List(this.formDataCATEGORY)
      }
      this.currentIndex = e.$rowIndex
      this.currentData = e.row
      this.getLoadWorkTimeDetailList(this.currentData)
    },
    async getLoadWorkTimeTypeDetailList () {
      this.loading2 = true
      const res = await LoadWorkTimeTypeDetailList({
        MST_ID: this.MST_ID,
        Page: 1,
        Limit: 9999
      })
      this.loading2 = false
      this.mainTable2 = res.Result ? res.Result : []
    },
    // 查表3
    async getLoadWorkTimeDetailList (e) {
      this.loading3 = true
      const res = await LoadWorkTimeDetailList({
        MST_ID: e.MST_ID,
        CATEGORY_ID: e.CATEGORY_ID,
        Page: 1,
        Limit: 9999
      })
      this.loading3 = false
      this.mainTable3 = res.Result ? res.Result : []

      // var SOLDER_JOINTS_QTY = []
      // var SMT_COM_QTY = []
      // var SMT_COUNT_QTY = []
      // var STANDARD_CAPACITY = []
      // this.mainTable3.map((item) => {
      //   // 焊点数
      //   if (item.SOLDER_JOINTS_QTY >= 0) {
      //     SOLDER_JOINTS_QTY.push(item.SOLDER_JOINTS_QTY)
      //   }
      //   // SMT元件数
      //   if (item.SMT_COM_QTY >= 0) {
      //     SMT_COM_QTY.push(item.SMT_COM_QTY)
      //   }
      //   // SMT 点数
      //   if (item.SMT_COUNT_QTY >= 0) {
      //     SMT_COUNT_QTY.push(item.SMT_COUNT_QTY)
      //   }
      //   if (item.STANDARD_CAPACITY >= 0) {
      //     STANDARD_CAPACITY.push(item.STANDARD_CAPACITY)
      //   }
      // })
      // if (SOLDER_JOINTS_QTY && SOLDER_JOINTS_QTY.length > 0) {
      //   e.SOLDER_JOINTS_QTY = Math.min(...SOLDER_JOINTS_QTY)
      // } else {
      //   e.SOLDER_JOINTS_QTY = 0
      // }
      // if (SMT_COM_QTY && SMT_COM_QTY.length > 0) {
      //   e.SMT_COM_QTY = Math.min(...SMT_COM_QTY)
      // } else {
      //   e.SMT_COM_QTY = 0
      // }
      // if (SMT_COUNT_QTY && SMT_COUNT_QTY.length > 0) {
      //   e.SMT_COUNT_QTY = Math.min(...SMT_COUNT_QTY)
      // } else {
      //   e.SMT_COUNT_QTY = 0
      // }
      // if (STANDARD_CAPACITY && STANDARD_CAPACITY.length > 0) {
      //   e.STANDARD_CAPACITY = Math.min(...STANDARD_CAPACITY)
      // } else {
      //   e.STANDARD_CAPACITY = 0
      // }
    },
    // 表3新增
    viceAddClick (row, index) {
      console.log(row)
      if (row.ID <= 0) {
        return this.$message({
          message: '检查到工序类别信息暂未保存',
          type: 'warning'
        })
      }
      const record = {
        ID: 0,
        MST_ID: this.MST_ID,
        OPERATION_ID: this.currentData.OPERATION_ID,
        SMT_COM_QTY: 1,
        SMT_COUNT_QTY: 0,
        STANDARD_CAPACITY: 0,
        STANDARD_HUMAN: 1,
        SOLDER_JOINTS_QTY: 0,
        STANDARD_WORK_FORCE: 0
      }
      this.$refs.bMinTable.insertAt(record)
    },
    // 删除
    viceDeleteClick (row) {
      this.$confirm(this.$t('CallConfig._21'), this.$t('CallConfig._16'), {
        confirmButtonText: this.$t('CallConfig._17'),
        cancelButtonText: this.$t('CallConfig._18'),
        type: 'warning'
      }).then(async () => {
        if (row.ID <= 0) {
          this.$refs.bTable.remove(row)
          return this.$notify({
            title: this.$t('publics.tips.tips'),
            message: this.$t('publics.tips.deleteSuccess'),
            type: 'success',
            duration: 2000
          })
        }
        const res = await SaveWorkTimeTypeDetail({ RemoveRecords: [row] })
        if (res.Result) {
          this.$notify({
            title: this.$t('CallConfig._19'),
            message: this.$t('CallConfig._20'),
            type: 'success',
            duration: 2000
          })
          this.getLoadWorkTimeTypeDetailList()

          const bTable = this.$refs.bTable.getTableData()
          console.log(bTable)
          // 如果父表无数据则删除所有字表数据
          if (bTable.footerData && bTable.footerData.length <= 0) {
            const bmTable = this.$refs.bMinTable.getTableData()
            if (bmTable.fullData && bmTable.fullData.length > 0) {
              SaveWorkTimeDetail({ RemoveRecords: bmTable.fullData })
            }
          }
          this.mainTable3 = []
        }
      })
    },
    // 附表保存
    viceSaveClick (row) {
      console.log(row)
      console.log(this.currentData)
      if (this.currentData && this.currentData.length <= 0) {
        return this.$message({
          message: '请选择工序类别',
          type: 'warning'
        })
      } else if (row.ID !== this.currentData.ID) {
        return this.$message({
          message: '请保存对应的工序类别',
          type: 'warning'
        })
      }
      var that = this
      var bData = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      that.$refs.bTable.validate(async (valid) => {
        if (valid) {
          // 判断右侧表格是否通过
          const errMap = await that.$refs.bMinTable
            .validate()
            .catch((errMap) => errMap)
          console.log(errMap)
          if (!errMap) {
            const tableData = this.$refs.bMinTable.getTableData()
            console.log(tableData)
            var templist = []
            tableData.fullData.map((item) => {
              templist.push(item.OPERATION_ID)
            })
            if (new Set(templist).size !== templist.length) {
              return this.$message({
                message: '存在相同的工序名称',
                type: 'warning'
              })
            }
            bData.UpdateRecords = [
              {
                ID: this.currentData.ID,
                MST_ID: this.currentData.MST_ID,
                CATEGORY_ID: this.currentData.CATEGORY_ID,
                SMT_COM_QTY: this.currentData.SMT_COM_QTY,
                SMT_COUNT_QTY: this.currentData.SMT_COUNT_QTY,
                STANDARD_CAPACITY: this.currentData.STANDARD_CAPACITY,
                SOLDER_JOINTS_QTY: this.currentData.SOLDER_JOINTS_QTY,
                EFFICIENCY: this.currentData.EFFICIENCY,
                FIRST_TIME: this.currentData.FIRST_TIME
              }
            ]
            SaveWorkTimeTypeDetail(bData).then((res) => {
              if (res.Result) {
                that.isAdd = false
                that.saveWorkTimeDetail()
                that.getLoadWorkTimeTypeDetailList()
              }
            })
          }
        }
      })
    },
    saveWorkTimeDetail () {
      var that = this
      var postdata = this.$refs.bMinTable.getRecordset()
      console.log('postdata', postdata)
      var bMinData = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        that.$refs.bMinTable.validate((valid) => {
          if (valid) {
            that.$refs.bMinTable.getTableData().tableData.map((item) => {
              bMinData.UpdateRecords.push({
                ID: this.isAdd2 ? 0 : item.ID,
                MST_ID: this.currentData.MST_ID,
                OPERATION_ID: item.OPERATION_ID,
                SMT_COM_QTY: parseInt(item.SMT_COM_QTY),
                SMT_COUNT_QTY: parseInt(item.SMT_COUNT_QTY),
                STANDARD_CAPACITY: parseInt(item.STANDARD_CAPACITY),
                STANDARD_HUMAN: parseInt(item.STANDARD_HUMAN),
                SOLDER_JOINTS_QTY: parseInt(item.SOLDER_JOINTS_QTY),
                STANDARD_WORK_FORCE: parseInt(item.STANDARD_WORK_FORCE)
              })
            })

            // console.log(that.$refs.bMinTable.getTableData())
            console.log('bMinData', bMinData)
            SaveWorkTimeDetail(bMinData).then((res) => {
              if (res.Result) {
                that.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              // that.currentData = []
              // that.currentIndex = -1
            })
          }
        })
      } else {
        // that.$notify({
        //   title: this.$t('cdc._21'),
        //   message: this.$t('cdc._22'),
        //   type: 'success',
        //   duration: 2000
        // })
      }
    },
    removeClick (row, index) {
      var that = this
      that
        .$confirm(
          that.$t('publics.tips.makeSureDelete'),
          that.$t('publics.tips.tips'),
          {
            confirmButtonText: that.$t('publics.tips.confirm'),
            cancelButtonText: that.$t('publics.tips.cancel'),
            type: 'warning'
          }
        )
        .then(async () => {
          if (row.ID <= 0) {
            that.$refs.bMinTable.remove(row)
            return that.$notify({
              title: that.$t('publics.tips.tips'),
              message: that.$t('publics.tips.deleteSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          var bMinData = {
            InsertRecords: [],
            UpdateRecords: [],
            RemoveRecords: []
          }
          bMinData.RemoveRecords.push({
            ID: row.ID,
            MST_ID: row.MST_ID,
            OPERATION_ID: row.OPERATION_ID,
            SMT_COM_QTY: row.SMT_COM_QTY,
            SMT_COUNT_QTY: parseInt(row.SMT_COUNT_QTY),
            STANDARD_CAPACITY: parseInt(row.STANDARD_CAPACITY),
            STANDARD_HUMAN: parseInt(row.STANDARD_HUMAN),
            STANDARD_WORK_FORCE: parseInt(row.STANDARD_WORK_FORCE)
          })
          SaveWorkTimeDetail(bMinData).then((res) => {
            if (res.Result) {
              that.getLoadWorkTimeDetailList(that.currentData)
              that.$notify({
                title: that.$t('publics.tips.tips'),
                message: that.$t('publics.tips.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      // var that = this
      // let arr = []
      // this.mainTable3.map(item => {
      //   arr.push(item.ID)
      // })
      // console.log('arr：', arr)
      // console.log('row', row)
      // if (row.ID !== 0 && arr.indexOf(row.ID) !== -1) {
      //   that.$confirm(
      //     that.$t('publics.tips.makeSureDelete'),
      //     that.$t('publics.tips.tips'),
      //     {
      //       confirmButtonText: that.$t('publics.tips.confirm'),
      //       cancelButtonText: that.$t('publics.tips.cancel'),
      //       type: 'warning'
      //     }
      //   ).then(async () => {
      //     var bMinData = {
      //       InsertRecords: [],
      //       UpdateRecords: [],
      //       RemoveRecords: []
      //     }
      //     bMinData.RemoveRecords.push({
      //       ID: row.ID,
      //       MST_ID: row.MST_ID,
      //       OPERATION_ID: row.OPERATION_ID,
      //       SMT_COM_QTY: row.SMT_COM_QTY,
      //       SMT_COUNT_QTY: parseInt(row.SMT_COUNT_QTY),
      //       STANDARD_CAPACITY: parseInt(row.STANDARD_CAPACITY),
      //       STANDARD_HUMAN: parseInt(row.STANDARD_HUMAN),
      //       STANDARD_WORK_FORCE: parseInt(row.STANDARD_WORK_FORCE)
      //     })
      //     SaveWorkTimeDetail(bMinData).then((res) => {
      //       if (res.Result) {
      //         that.getLoadWorkTimeDetailList(that.currentData)
      //         that.$notify({
      //           title: that.$t('publics.tips.tips'),
      //           message: that.$t('publics.tips.deleteSuccess'),
      //           type: 'success',
      //           duration: 2000
      //         })
      //       }
      //     })
      //   })
      // } else {
      //   that.$confirm(
      //     that.$t('publics.tips.makeSureDelete'),
      //     that.$t('publics.tips.tips'),
      //     {
      //       confirmButtonText: this.$t('publics.tips.confirm'),
      //       cancelButtonText: this.$t('publics.tips.cancel'),
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     that.$refs.bMinTable.remove(row)
      //     that.getLoadWorkTimeDetailList(that.currentData)
      //   })
      // }
    },
    // 工序类别ID
    changeCATEGORY_NAME (e) {
      if (e.CATEGORY_NAME) {
        let index = this.CategoryBox.indexOf(e.CATEGORY_NAME)
        e.CATEGORY_ID = this.CategoryList[index].LOOKUP_CODE
        this.currentData = e
        this.formDataCATEGORY.CATEGORY_ID = e.CATEGORY_ID
        this.getCATEGORY_ID_List(this.formDataCATEGORY)
      }
    },
    changeOPERATION_NAME (e) {
      if (e.OPERATION_NAME) {
        let index = this.CATEGORY_Box.indexOf(e.OPERATION_NAME)
        e.OPERATION_ID = this.CATEGORY_List[index].ID
      }
    },
    checkSomething (row) {
      const checkData = this.$refs.bMinTable.getTableData().tableData
      var checkArr1 = []
      var checkArr2 = []
      var checkArr3 = []
      var checkArr4 = []
      // console.log('checkData:', checkData)
      checkData.map((item) => {
        checkArr1.push(item.SMT_COM_QTY)
        checkArr2.push(item.SMT_COUNT_QTY)
        checkArr3.push(item.STANDARD_CAPACITY)
        checkArr4.push(item.SOLDER_JOINTS_QTY)
      })
      // console.log(this.mainTable2[this.currentIndex])
      this.mainTable2[this.currentIndex].SMT_COM_QTY = Math.min(...checkArr1)
      this.currentData.SMT_COM_QTY = Math.min(...checkArr1)
      this.mainTable2[this.currentIndex].SMT_COUNT_QTY = Math.min(...checkArr2)
      this.currentData.SMT_COUNT_QTY = Math.min(...checkArr2)
      this.mainTable2[this.currentIndex].STANDARD_CAPACITY = Math.min(
        ...checkArr3
      )
      this.currentData.STANDARD_CAPACITY = Math.min(...checkArr3)
      this.currentData.SOLDER_JOINTS_QTY = Math.min(...checkArr4)

      console.log(row)
      // if(row.STANDARD_HUMAN && row.STANDARD_WORK_FORCE&&row.SMT_COM_QTY&&row.SOLDER_JOINTS_QTY&&row.SMT_COUNT_QTY){
      //   (3600*0.8)/【（BOM 贴片总元件数*0.15+ BOM插件总元件数*10+（0.055*BOM总元件数+12）】
      // }
    },
    compuInpt (row) {
      if (row.STANDARD_WORK_FORCE && row.STANDARD_HUMAN) {
        row.STANDARD_CAPACITY =
          (3600 / row.STANDARD_WORK_FORCE) * row.STANDARD_HUMAN
      }
    },
    CATEGORYSearch () {
      this.formDataCATEGORY.Page = 1
      this.getCATEGORY_ID_List(this.formDataCATEGORY)
    },
    CATEGORYSizeChange (Limit) {
      this.formDataCATEGORY.Page = 1
      this.formDataCATEGORY.Limit = Limit
      this.getCATEGORY_ID_List(this.formDataCATEGORY)
    },
    CATEGORYCurrentChange (Page) {
      this.formDataCATEGORY.Page = Page
      this.getCATEGORY_ID_List(this.formDataCATEGORY)
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    insertEvent () {
      this.VisibleTitle = '新增'
      this.dialogVisible = true
      this.addForm.STATUS = 0
      this.addForm.CREATE_USER = this.userinfo.USER_NAME
    },
    // 清除
    clear () {
      this.dialogVisible = false
      this.addForm = {}
      this.MST_ID = 0
      this.getLoadData()
    },
    getPartByPartChange (e) {

    },
    async getPartByPartNo (e) {
      this.addForm.PART_NO = e
      const res = await GetPartByPartNo({ partNo: this.addForm.PART_NO })
      const data = JSON.parse(res.Result)
      if (data && data !== 'null') {
        this.addForm.PART_NAME = data.NAME
        this.addForm.PART_DESC = data.DESCRIPTION
        this.$forceUpdate()
      }
    },
    CATEGORY_SizeChange (val) {
      this.add_PART_NO_Form.Page = 1
      this.add_PART_NO_Form.Limit = val
      this.getCATEGORY_ID_List(this.formDataCATEGORY)
    },
    CATEGORY_CurrentChange (val) {
      this.add_PART_NO_Form.Page = val
      this.getCATEGORY_ID_List(this.formDataCATEGORY)
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.getCATEGORY_ID_List(this.formDataCATEGORY)
  }
}
</script>

<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}

.StandardWorkingHoursManagement-center {
  height: 350px;
}
.StandardWorkingHoursManagement-bottom-center {
  /* margin-top: 20px; */
  height: calc(100vh - 600px);
}
</style>
