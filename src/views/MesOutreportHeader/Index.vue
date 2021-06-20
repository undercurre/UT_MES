<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-select
          v-model="formData.WO_NO"
          clearable
          :placeholder="'请选择生产订单号'"
          style="width: 150px"
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
              v-model="formDataWO_NO.Key"
              :placeholder="'请输入关键字'"
              @keyup.enter.native="Form_WO_NO_Search"
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="Form_WO_NO_Search"
              >{{ $t("publics.btn.search") }}</el-button
            >
          </div>
          <el-option
            v-for="item in WO_NO_List"
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
              :current-page="formDataWO_NO.Page"
              :page-size="formDataWO_NO.Limit"
              :page-sizes="[15, 25, 35, 45]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="WO_NO_Page"
              @size-change="formWO_NO_SizeChange"
              @current-change="formWO_NO_CurrentChange"
            />
          </div>
        </el-select>
        <el-input
          clearable
          v-model="formData.SN"
          style="width: 150px"
          :placeholder="'请输入产品流水号'"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          v-model="formData.PN"
          clearable
          :placeholder="'请选择料号'"
          style="width: 150px"
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
              v-model="formDataPART_NO.Key"
              :placeholder="'请输入关键字'"
              @keyup.enter.native="Form_PART_NO_Search"
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="Form_PART_NO_Search"
              >{{ $t("publics.btn.search") }}</el-button
            >
          </div>
          <el-option
            v-for="item in PART_NO_List"
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
              :current-page="formDataPART_NO.Page"
              :page-size="formDataPART_NO.Limit"
              :page-sizes="[15, 25, 35, 45]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="PART_NO_Page"
              @size-change="formPART_NO_SizeChange"
              @current-change="formPART_NO_CurrentChange"
            />
          </div>
        </el-select>

        <el-select
          v-model="formData.STATUS"
          clearable
          :placeholder="'请选择状态'"
          style="width: 150px"
        >
          <el-option
            v-for="item in STATUS_List"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="searchClick">{{
          $t("publics.btn.search")
        }}</el-button>
        <!-- <el-button type="primary" @click.prevent="filterFlag = true">{{
          $t("publics.btn.AdvancedSearch")
        }}</el-button> -->
        <!-- <el-button type="danger" @click="ReviewClick">{{
          $t("publics.btn.Review")
        }}</el-button> -->
        <!-- <el-button type="primary" icon="el-icon-plus" @click="addClick(-1)">{{
          $t("publics.btn.add")
        }}</el-button> -->
        <!-- <el-button
          type="danger"
          icon="el-icon-delete"
          @click="removeClick"
          >{{ $t("publics.btn.delete") }}</el-button
        > -->
        <!-- <el-button type="success" @click="saveClick">{{
          $t("publics.btn.save")
        }}</el-button> -->
        <el-button type="danger"  icon="el-icon-s-order" @click="ExportClick">{{
          $t("publics.btn.export")
        }}</el-button>
      </custom-container-header>
    </template>
    <!-- 主表 -->
    <div class="MesOutreportHeader-center">
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
        <vxe-table-column
          sortable
          type="radio"
          width="80"
          :title="$t('cne.t_1')"
        />
        <vxe-table-column
          sortable
          field="WO_NO"
          min-width="180"
          :title="'生产订单号'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="SN"
          min-width="180"
          :title="'产品流水号'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="PART_NO"
          min-width="180"
          :title="'料号'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="MODEL"
          min-width="180"
          :title="'品名'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="DESCRIPTION"
          min-width="180"
          :title="'描述'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="XM_NAME"
          min-width="180"
          :title="'项目名称'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="XM_CODE"
          min-width="150"
          :title="'项目编号'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="XM_TYPE"
          min-width="120"
          :title="'分组标记'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="XM_QTY"
          min-width="120"
          :title="'项目数量'"
          :edit-render="{ name: '$input', props: {} }"
        />
        <vxe-table-column
          sortable
          field="TEST_USER"
          min-width="185"
          :title="'测试人员'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="FINALLY_USER"
          min-width="150"
          :title="'终检人员'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="FINALLY_TIME"
          min-width="150"
          :title="'完工日期'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="STATUS"
          min-width="100"
          :title="'状态'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
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
          :title="$t('as_cfe.tb_og')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button type="primary" @click="editClick(row, row.$index)">{{
              $t("publics.btn.edit")
            }}</el-button>
            <el-button type="danger" @click="ReviewClick(row, row.$index)">{{
              $t("publics.btn.Review")
            }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      style="padding: 10px 0"
      :current-page="formData.Page"
      :page-size="formData.Limit"
      :page-sizes="[15, 25, 35, 45]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- tabs -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <!-- 检验项目 -->
      <el-tab-pane name="1" label="检验项目">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData1"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="CHECK_TYPE_NAME"
              min-width="150"
              :title="'检验类型'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_ITEAM"
              min-width="150"
              :title="'检验项'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_CONTENT"
              min-width="150"
              :title="'检验内容'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="RESULT"
              min-width="150"
              :title="'检验结果'"
            >
              <template v-slot="{ row }">
                <span v-show="row.RESULT === 'Y'" class="green-txt">合格</span>
                <span v-show="row.RESULT === 'N'" class="red-txt">不合格</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="MSG"
              min-width="150"
              :title="'备注'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 检验参数 -->
      <el-tab-pane name="2" label="检验参数">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData2"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="CHECK_TYPE_NAME"
              min-width="150"
              :title="'检验类型'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_ITEAM"
              min-width="150"
              :title="'检验项'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_CONTENT"
              min-width="150"
              :title="'检验内容'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
                sortable
                field="CHECK_NAME"
                min-width="150"
                :title="'检验参数'"
                :edit-render="{ name: '$input', props: {readonly: true} }"
              />
            <vxe-table-column
              sortable
              field="VALUE"
              min-width="150"
              :title="'检验值'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 软件信息 -->
      <el-tab-pane name="3" label="软件信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData3"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="SOFT_NAME"
              min-width="150"
              :title="'软件名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="SOFT_VERSION"
              min-width="150"
              :title="'软件版本'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_CODE"
              min-width="150"
              :title="'校验码'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="SOFT_CREATE_TIME"
              min-width="150"
              :title="'软件生成时间'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 设备仪器信息 -->
      <el-tab-pane name="4" label="设备仪器信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData4"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="TOOL_NAME"
              min-width="150"
              :title="'仪器名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="TOOL_MODEL"
              min-width="150"
              :title="'仪器型号'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="TOOL_CODE"
              min-width="150"
              :title="'仪器编号'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 采集部件信息 -->
      <el-tab-pane name="5" label="采集部件信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData5"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_NAME"
              min-width="150"
              :title="'部件名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_DESC"
              min-width="150"
              :title="'部件型号'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_QTY"
              min-width="150"
              :title="'部件数量'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COLLECT_TIME"
              min-width="150"
              :title="'作业时间'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COLLECT_BY"
              min-width="150"
              :title="'作业人员'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 装置检验项信息 -->
      <el-tab-pane name="6" label="装置检验项信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData6"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_NAME"
              min-width="150"
              :title="'部件名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CHECK_CONTENT"
              min-width="150"
              :title="'检验内容'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="RESULT"
              min-width="150"
              :title="'检验结果'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            >
              <template v-slot="{ row }">
                <el-switch
                  v-model="row.CHECK_ITEAM"
                  :active-text="$t('publics.btn.yes')"
                  :inactive-text="$t('publics.btn.no')"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  active-value="Y"
                  inactive-value="N"
                />
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              field="MSG"
              min-width="150"
              :title="'备注'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 解绑部件信息 -->
      <el-tab-pane name="7" label="解绑部件信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData7"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="COMP_NAME"
              min-width="150"
              :title="'部件名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_DESC"
              min-width="150"
              :title="'部件型号'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="QTY"
              min-width="150"
              :title="'部件数量'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CREATE_TIME"
              min-width="150"
              :title="'作业时间'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CREATE_USER"
              min-width="150"
              :title="'作业人员'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <!-- 缺少装置信息 -->
      <el-tab-pane name="8" label="缺少装置信息">
        <div class="MesOutreportHeader-bottom-center">
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
            show-overflow
            keep-source
            :data="bottomData8"
            :loading="bottomLoading"
            :mouse-config="{ selected: true }"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              sortable
              min-width="80"
              type="seq"
              :title="'序号'"
            />
            <vxe-table-column
              sortable
              field="COMP_NAME"
              min-width="150"
              :title="'部件名称'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="COMPONENT_DESC"
              min-width="150"
              :title="'部件型号'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="QTY"
              min-width="150"
              :title="'部件数量'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CREATE_TIME"
              min-width="150"
              :title="'作业时间'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              sortable
              field="CREATE_USER"
              min-width="150"
              :title="'作业人员'"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="pagination">
      <el-pagination
        :current-page="bottomForm.Page"
        :page-size="bottomForm.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="bottomPage"
        @size-change="handleBottomSizeChange"
        @current-change="handleBottomCurrentChange"
      />
    </div>
    <!-- 抽屉 筛选 -->
    <el-drawer
      :title="$t('MesProductionPreMst._18')"
      :visible.sync="filterFlag"
      direction="ltr"
    >
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("MesProductionPreMst._19") }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="searchClick"
              >{{ $t("MesProductionPreMst._20") }}</el-button
            >
            <el-button
              style="float: right; padding: 3px 0; margin-right: 20px"
              type="text"
              @click="resetListQuery"
              >{{ $t("MesProductionPreMst._21") }}</el-button
            >
          </div>
          <el-form
            class="custom-form"
            ref="formData"
            label-position="top"
            label-width="80px"
            :model="formData"
            size="mini"
          >
            <el-form-item :label="$t('cdc._10')">
              <el-input v-model="formData.Key" placeholder=" " clearable />
            </el-form-item>
            <el-form-item :label="'料号'">
              <el-select
                v-model="formData.PN"
                clearable
                :placeholder="'请选择料号'"
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
                    v-model="formDataPART_NO.Key"
                    :placeholder="'请输入关键字'"
                    @keyup.enter.native="Form_PART_NO_Search"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="Form_PART_NO_Search"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </div>
                <el-option
                  v-for="item in PART_NO_List"
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
                    :current-page="formDataPART_NO.Page"
                    :page-size="formDataPART_NO.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="PART_NO_Page"
                    @size-change="formPART_NO_SizeChange"
                    @current-change="formPART_NO_CurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="'生产订单号'">
              <el-select
                v-model="formData.WO_NO"
                clearable
                :placeholder="'请选择生产订单号'"
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
                    v-model="formDataWO_NO.Key"
                    :placeholder="'请输入关键字'"
                    @keyup.enter.native="Form_WO_NO_Search"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="Form_WO_NO_Search"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </div>
                <el-option
                  v-for="item in WO_NO_List"
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
                    :current-page="formDataWO_NO.Page"
                    :page-size="formDataWO_NO.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="WO_NO_Page"
                    @size-change="formWO_NO_SizeChange"
                    @current-change="formWO_NO_CurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="'状态'">
              <el-select
                v-model="formData.STATUS"
                clearable
                :placeholder="'请选择状态'"
                style="width: 100%"
              >
                <el-option
                  v-for="item in STATUS_List"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
    <!-- 编辑 -->
    <el-dialog
      class="my-dialog"
      v-dialogDrag
      :title="'编辑'"
      :visible.sync="dialogVist"
      width="80%"
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          clearable
          v-model="editForm.SN"
          style="width: 150px"
          :placeholder="'请输入产品流水号'"
          @keyup.enter.native="searchEditForm"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchEditForm"
          >{{ $t("publics.btn.search") }}</el-button
        >
      </div>
      <!-- 编辑表单 -->
      <el-form
        :model="editForm"
        ref="editForm"
        :show-message="false"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'生产订单号：'">
              <span>{{ editForm.WO_NO || "" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品流水号：'">
              <span>{{ editForm.SN || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'品名：'">
              <span>{{ editForm.MODEL || "" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'料号：'">
              <span>{{ editForm.PART_NO || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'描述：'">
              <span>{{ editForm.DESCRIPTION || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'项目名称：'">
              <span>{{ editForm.XM_NAME || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'项目编号：'">
              <span>{{ editForm.XM_CODE || "" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'分组标记：'">
              <span>{{ editForm.XM_TYPE || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'项目数量：'">
              <el-input
                type="number"
                min="0"
                clearable
                v-model="editForm.XM_QTY"
                style="width: 150px"
                :placeholder="'项目数量'"
              />
              <span>个</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'测试人员：'">
              <span>{{ editForm.TEST_USER || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'终检人员：'">
              <el-input
                clearable
                v-model="editForm.FINALLY_USER"
                style="width: 150px"
                :placeholder="'请输入终检人员'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'完工日期：'">
              <span>{{ editForm.FINALLY_TIME || "" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 编辑表格 -->
      <el-tabs
        v-model="activeEditName"
        type="border-card"
        @tab-click="handleEditClick"
      >
        <!-- 检验项目 -->
        <el-tab-pane name="1" label="检验项目">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable1"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData1"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="CHECK_TYPE_NAME"
                min-width="150"
                :title="'检验类型'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_ITEAM"
                min-width="150"
                :title="'检验项'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_CONTENT"
                min-width="150"
                :title="'检验内容'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="RESULT"
                min-width="150"
                :title="'检验结果'"
              >
                <template v-slot="{ row }">
                  <el-switch
                    :width="80"
                    v-model="row.RESULT"
                    active-text="合格"
                    inactive-text="不合格"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                    active-value="Y"
                    inactive-value="N"
                  />
                </template>
              </vxe-table-column>
              <vxe-table-column
                sortable
                field="MSG"
                min-width="150"
                :title="'备注'"
                :edit-render="{ name: '$input', props: {} }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 检验参数 -->
        <el-tab-pane name="2" label="检验参数">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable2"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData2"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="CHECK_TYPE_NAME"
                min-width="150"
                :title="'检验类型'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_ITEAM"
                min-width="150"
                :title="'检验项'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_CONTENT"
                min-width="150"
                :title="'检验内容'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_NAME"
                min-width="150"
                :title="'检验参数'"
                :edit-render="{ name: '$input', props: {readonly: true} }"
              />
              <vxe-table-column
                sortable
                field="VALUE"
                min-width="150"
                :title="'检验值'"
                :edit-render="{ name: '$input', props: {} }"
              />

            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 软件信息 -->
        <el-tab-pane name="3" label="软件信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable3"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData3"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="SOFT_NAME"
                min-width="150"
                :title="'软件名称'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <vxe-table-column
                sortable
                field="SOFT_VERSION"
                min-width="150"
                :title="'软件版本'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <vxe-table-column
                sortable
                field="CHECK_CODE"
                min-width="150"
                :title="'校验码'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <vxe-table-column
                sortable
                field="SOFT_CREATE_TIME"
                min-width="150"
                :title="'软件生成时间'"
                :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
              >
                <template v-slot:edit="{ row }">
                  <el-date-picker
                    style="width: 100%"
                    v-model="row.SOFT_CREATE_TIME"
                    type="datetime"
                    placeholder=""
                  />
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 设备仪器信息 -->
        <el-tab-pane name="4" label="设备仪器信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable4"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData4"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="TOOL_NAME"
                min-width="150"
                :title="'仪器名称'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="TOOL_MODEL"
                min-width="150"
                :title="'仪器型号'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="TOOL_CODE"
                min-width="150"
                :title="'仪器编号'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 采集部件信息 -->
        <el-tab-pane name="5" label="采集部件信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable5"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData5"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_NAME"
                min-width="150"
                :title="'部件名称'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_DESC"
                min-width="150"
                :title="'部件型号'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_QTY"
                min-width="150"
                :title="'部件数量'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COLLECT_TIME"
                min-width="150"
                :title="'作业时间'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COLLECT_BY"
                min-width="150"
                :title="'作业人员'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 装置检验项信息 -->
        <el-tab-pane name="6" label="装置检验项信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable6"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData6"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_NAME"
                min-width="150"
                :title="'部件名称'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CHECK_CONTENT"
                min-width="150"
                :title="'检验内容'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="RESULT"
                min-width="150"
                :title="'检验结果'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              >
                <template v-slot="{ row }">
                  <el-switch
                    v-model="row.CHECK_ITEAM"
                    :active-text="$t('publics.btn.yes')"
                    :inactive-text="$t('publics.btn.no')"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                    active-value="Y"
                    inactive-value="N"
                  />
                </template>
              </vxe-table-column>
              <vxe-table-column
                sortable
                field="MSG"
                min-width="150"
                :title="'备注'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 解绑部件信息 -->
        <el-tab-pane name="7" label="解绑部件信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable7"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData7"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="COMP_NAME"
                min-width="150"
                :title="'部件名称'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_DESC"
                min-width="150"
                :title="'部件型号'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="QTY"
                min-width="150"
                :title="'部件数量'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CREATE_TIME"
                min-width="150"
                :title="'作业时间'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CREATE_USER"
                min-width="150"
                :title="'作业人员'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
        <!-- 缺少装置信息 -->
        <el-tab-pane name="8" label="缺少装置信息">
          <div class="MesOutreportHeader-bottom-center">
            <vxe-table
              ref="eTable8"
              border
              resizable
              height="100%"
              size="medium"
              align="center"
              highlight-hover-row
              highlight-current-row
              auto-resize
              show-overflow
              keep-source
              :data="botmEditData8"
              :loading="bottomLoading"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                min-width="80"
                type="seq"
                :title="'序号'"
              />
              <vxe-table-column
                sortable
                field="COMP_NAME"
                min-width="150"
                :title="'部件名称'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="COMPONENT_DESC"
                min-width="150"
                :title="'部件型号'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="QTY"
                min-width="150"
                :title="'部件数量'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CREATE_TIME"
                min-width="150"
                :title="'作业时间'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                sortable
                field="CREATE_USER"
                min-width="150"
                :title="'作业人员'"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 尾巴 -->
      <span slot="footer" class="dialog-footer">
        <el-button
          v-show="activeEditName === '3'"
          type="primary"
          @click="addClick(0)"
        >
          {{ $t("publics.btn.add") }}
        </el-button>
        <el-button @click="close">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="success" @click="saveClick">
          {{ $t("publics.btn.save") }}
        </el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  GetSiteStatisticsConditionList,
  LoadData,
  SaveMesOutreportHeader,
  LoadOutreportIteamDetailList,
  LoadOutreportNoDetailList,
  LoadSoftSnHistoryList,
  LoadToolSnHistoryList,
  LoadCollectComponentList,
  LoadOutreportMechiDetailList,
  LoadBreakMechiDetailList,
  LoadLackMechiDetailList,
  AuditOutreportHeader,
  SaveOutreportIteamDetail,
  SaveOutreportNoDetail,
  SaveSoftSnHistory,
  SaveOutreportMechiDetail
} from '@/api/MesOutreportHeader'
import { mapGetters } from 'vuex'
export default {
  name: 'MesOutreportHeader',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      // 料号
      formDataPART_NO: {
        Page: 1,
        Limit: 15,
        TYPE: 2
      },
      PART_NO_Page: 0,
      PART_NO_List: [],
      // 工单
      formDataWO_NO: {
        Page: 1,
        Limit: 15,
        TYPE: 3
      },
      WO_NO_Page: 0,
      WO_NO_List: [],
      STATUS_List: [
        {
          value: 0,
          label: '新增'
        },
        {
          value: 1,
          label: '待审核'
        },
        {
          value: 2,
          label: '已审核'
        }
      ],
      loading: false,
      mainTable: [],
      totalPage: 0,
      activeName: '1',
      bottomLoading: false,
      bottomData1: [], // 检验项目
      bottomData2: [], // 检验参数
      bottomData3: [], // 软件信息
      bottomData4: [], // 设备仪器信息
      bottomData5: [], // 采集部件信息
      bottomData6: [], // 装置检验项信息
      bottomData7: [], // 解绑部件信息
      bottomData8: [], // 缺少装置信息
      bottomForm: {
        Page: 1,
        Limit: 15
      },
      bottomPage: 0,
      botmEditData1: [], // 检验项目
      botmEditData2: [], // 检验参数
      botmEditData3: [], // 软件信息
      botmEditData4: [], // 设备仪器信息
      botmEditData5: [], // 采集部件信息
      botmEditData6: [], // 装置检验项信息
      botmEditData7: [], // 解绑部件信息
      botmEditData8: [], // 缺少装置信息
      botmEditPage: 0,
      activeEditName: '1',
      filterFlag: false,
      MST_ID: 0,
      currentData: {},
      dialogVist: false,
      editForm: {},
      eSaveForm: {
        InsertRecords: [],
        UpdateRecords: []
      },
      exportUrl: ''
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getPART_NO_List(this.formDataPART_NO)
        this.getWO_NO_List(this.formDataWO_NO)
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
      console.log('this.mainTable:', res.Result)
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 料号
    // 查询
    Form_PART_NO_Search () {
      this.formDataPART_NO.Page = 1
      this.getPART_NO_List(this.formDataPART_NO)
    },
    async getPART_NO_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.PART_NO_List = res.Result.data
      } else {
        this.getPART_NO_List({
          Page: this.formDataPART_NO.Page,
          Limit: this.formDataPART_NO.Limit,
          TYPE: 2
        })
      }
      this.PART_NO_Page = res.Result.count
    },
    // 工单
    // 查询
    Form_WO_NO_Search () {
      this.formDataWO_NO.Page = 1
      this.getWO_NO_List(this.formDataWO_NO)
    },
    async getWO_NO_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.WO_NO_List = res.Result.data
      } else {
        this.getWO_NO_List({
          Page: this.formDataWO_NO.Page,
          Limit: this.formDataWO_NO.Limit,
          TYPE: 3
        })
      }
      this.WO_NO_Page = res.Result.count
    },
    // 审核
    ReviewClick () {
      if (!this.MST_ID) {
        return this.$message.error('请选择需要审核数据')
      }
      var that = this
      this.$confirm(this.$t('SMTmaintenance._46'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((v) => {
        const ReviewData = {
          ID: this.MST_ID,
          XM_QTY: this.currentData.XM_QTY,
          STATUS: 2,
          FINALLY_USER: this.userinfo.USER_NAME
        }
        AuditOutreportHeader(ReviewData).then((res) => {
          if (res.Result) {
            that.clear()
            that.getLoadData()
            that.$notify({
              title: this.$t('msh._103'),
              message: this.$t('msh._109'),
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    },
    saveClick () {
      var that = this
      const saveData = {
        ID: this.MST_ID,
        XM_QTY: this.editForm.XM_QTY,
        STATUS: this.editForm.STATUS,
        FINALLY_USER: this.editForm.FINALLY_USER
      }
      SaveMesOutreportHeader(saveData).then((res) => {
        if (res.Result) {
          console.log('111')
          that.editSave()
          console.log('666')
          that.clear()
          that.getLoadData()
          that.dialogVist = false
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 编辑
    editClick (row) {
      this.handleEditClick()
      this.editForm = Object.assign({}, row)
      this.dialogVist = true
    },
    async searchEditForm () {
      const res = await LoadData({ SN: this.editForm.SN })
      this.editForm = res.Result ? res.Result[0] : []
    },
    async editSave () {
      var num = this.activeEditName
      var that = this
      if (parseInt(num) === 1) {
        var postdata1 = this.$refs.eTable1.getRecordset()
        if (
          postdata1.insertRecords.length ||
          postdata1.removeRecords.length ||
          postdata1.updateRecords.length
        ) {
          that.eSaveForm.InsertRecords = postdata1.insertRecords
          that.eSaveForm.UpdateRecords = postdata1.updateRecords
          await SaveOutreportIteamDetail(that.eSaveForm)
        }
      } else if (parseInt(num) === 2) {
        var postdata2 = this.$refs.eTable2.getRecordset()
        if (
          postdata2.insertRecords.length ||
          postdata2.removeRecords.length ||
          postdata2.updateRecords.length
        ) {
          that.eSaveForm.InsertRecords = postdata2.insertRecords
          that.eSaveForm.UpdateRecords = postdata2.updateRecords
          await SaveOutreportNoDetail(that.eSaveForm)
        }
      } else if (parseInt(num) === 3) {
        var postdata3 = this.$refs.eTable3.getRecordset()
        if (
          postdata3.insertRecords.length ||
          postdata3.removeRecords.length ||
          postdata3.updateRecords.length
        ) {
          that.eSaveForm.InsertRecords = postdata3.insertRecords
          that.eSaveForm.UpdateRecords = postdata3.updateRecords
          await SaveSoftSnHistory(that.eSaveForm)
        }
      } else if (parseInt(num) === 6) {
        var postdata6 = this.$refs.eTable6.getRecordset()
        if (
          postdata6.insertRecords.length ||
          postdata6.removeRecords.length ||
          postdata6.updateRecords.length
        ) {
          that.eSaveForm.InsertRecords = postdata6.insertRecords
          that.eSaveForm.UpdateRecords = postdata6.updateRecords
          await SaveOutreportMechiDetail(that.eSaveForm)
        }
      }
    },
    addClick (row) {
      const record = {
        ID: 0,
        MST_ID: this.MST_ID,
        SOFT_NAME: '',
        SOFT_VERSION: '',
        CHECK_CODE: '',
        SOFT_CREATE_TIME: '',
        CREATE_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        CREATOR: ''
      }
      this.$refs.eTable3.insertAt(record, row).then(({ row }) => {
        this.$refs.eTable3.setActiveRow(row)
      })
    },
    // 导出
    ExportClick () {
      if (!this.MST_ID) {
        return this.$message.error('请选择需要导出文件')
      }
      if (this.exportUrl.length <= 0) {
        return this.$message.error('选择数据没有配置导出文件')
      }
      console.log(this.exportUrl + '&SnId=' + this.currentData.SN_ID)
      window.open(this.exportUrl + '&SnId=' + this.currentData.SN_ID)
    },
    cellClick (e) {
      this.MST_ID = e.row.ID
      this.currentData = e.row
      this.exportUrl = e.row.URL
      this.editForm = e.row
      this.getLoadOutreportIteamDetailList(0)
      this.handleEditClick()
    },
    handleClick (tab) {
      let e = this.activeName
      if (this.MST_ID) {
        if (parseInt(e) === 1) {
          this.getLoadOutreportIteamDetailList(0)
        } else if (parseInt(e) === 2) {
          this.getLoadOutreportNoDetailList(0)
        } else if (parseInt(e) === 3) {
          this.getLoadSoftSnHistoryList(0)
        } else if (parseInt(e) === 4) {
          this.getLoadToolSnHistoryList(0)
        } else if (parseInt(e) === 5) {
          this.getLoadCollectComponentList(0)
        } else if (parseInt(e) === 6) {
          this.getLoadOutreportMechiDetailList(0)
        } else if (parseInt(e) === 7) {
          this.getLoadBreakMechiDetailList(0)
        } else if (parseInt(e) === 8) {
          this.getLoadLackMechiDetailList(0)
        }
      }
    },
    handleEditClick () {
      let e = this.activeEditName
      if (this.editForm.SN) {
        if (parseInt(e) === 1) {
          this.getLoadOutreportIteamDetailList(1)
        } else if (parseInt(e) === 2) {
          this.getLoadOutreportNoDetailList(1)
        } else if (parseInt(e) === 3) {
          this.getLoadSoftSnHistoryList(1)
        } else if (parseInt(e) === 4) {
          this.getLoadToolSnHistoryList(1)
        } else if (parseInt(e) === 5) {
          this.getLoadCollectComponentList(1)
        } else if (parseInt(e) === 6) {
          this.getLoadOutreportMechiDetailList(1)
        } else if (parseInt(e) === 7) {
          this.getLoadBreakMechiDetailList(1)
        } else if (parseInt(e) === 8) {
          this.getLoadLackMechiDetailList(1)
        }
      }
    },
    // 检验项目
    async getLoadOutreportIteamDetailList (e) {
      this.bottomLoading = e === 0
      const res = await LoadOutreportIteamDetailList({
        MST_ID: this.MST_ID,
        Page: this.bottomForm.Page,
        Limit: this.bottomForm.Limit
      })
      this.bottomLoading = false
      if (e === 0) {
        this.bottomData1 = res.Result ? res.Result : []
        this.bottomPage = res.TotalCount ? res.TotalCount : 0
      } else if (e === 1) {
        this.botmEditData1 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 检验参数
    async getLoadOutreportNoDetailList (e) {
      this.bottomLoading = e === 0
      const res = await LoadOutreportNoDetailList({
        MST_ID: this.MST_ID,
        Page: this.bottomForm.Page,
        Limit: this.bottomForm.Limit
      })
      this.bottomLoading = false
      if (e === 0) {
        this.bottomData2 = res.Result ? res.Result : []
        this.bottomPage = res.TotalCount ? res.TotalCount : 0
      } else if (e === 1) {
        this.botmEditData2 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 软件信息
    async getLoadSoftSnHistoryList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadSoftSnHistoryList({
          MST_ID: this.MST_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData3 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData3 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 设备仪器信息
    async getLoadToolSnHistoryList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadToolSnHistoryList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData4 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData4 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 采集部件
    async getLoadCollectComponentList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadCollectComponentList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData5 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData5 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 装置检验
    async getLoadOutreportMechiDetailList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadOutreportMechiDetailList({
          MST_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData6 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData6 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 解邦部件
    async getLoadBreakMechiDetailList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadBreakMechiDetailList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData7 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData7 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 缺少装置信息
    async getLoadLackMechiDetailList (e) {
      if (this.MST_ID) {
        this.bottomLoading = e === 0
        const res = await LoadLackMechiDetailList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.bottomLoading = false
        if (e === 0) {
          this.bottomData8 = res.Result ? res.Result : []
          this.bottomPage = res.TotalCount ? res.TotalCount : 0
        } else if (e === 1) {
          this.botmEditData8 = res.Result ? res.Result : []
          this.botmEditPage = res.TotalCount ? res.TotalCount : 0
        }
      }
    },
    // 清除
    clear () {
      this.MST_ID = 0
      this.currentData = {}
      this.exportUrl = ''
      this.editForm = {}
      this.formDataPART_NO = {
        Page: 1,
        Limit: 15,
        TYPE: 2
      }
      this.formDataWO_NO = {
        Page: 1,
        Limit: 15,
        TYPE: 3
      }
    },
    // 重置
    resetListQuery () {
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.formDataPART_NO = {
        Page: 1,
        Limit: 15,
        TYPE: 2
      }
      this.formDataWO_NO = {
        Page: 1,
        Limit: 15,
        TYPE: 3
      }
    },
    close () {
      this.dialogVist = false
      this.getLoadData()
    },
    handleBottomSizeChange (val) {
      this.bottomForm.Limit = val
      this.handleClick()
    },
    handleBottomCurrentChange (val) {
      this.bottomForm.Page = val
      this.handleClick()
    },
    formPART_NO_SizeChange (val) {
      this.formDataPART_NO.Page = 1
      this.formDataPART_NO.Limit = val
      this.getPART_NO_List(this.formDataPART_NO)
    },
    formPART_NO_CurrentChange (val) {
      this.formDataPART_NO.Page = val
      this.getPART_NO_List(this.formDataPART_NO)
    },
    formWO_NO_SizeChange (val) {
      this.formDataWO_NO.Page = 1
      this.formDataWO_NO.Limit = val
      this.getWO_NO_List(this.formDataWO_NO)
    },
    formWO_NO_CurrentChange (val) {
      this.formDataWO_NO.Page = val
      this.getWO_NO_List(this.formDataWO_NO)
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}

.MesOutreportHeader-center {
  height: calc(100vh - 570px);
}
.MesOutreportHeader-bottom-center {
  height: calc(100vh - 600px);
}
.MesOutreportHeader-bottom-center .el-tabs--border-card > .el-tabs__content {
  padding: 10px !important;
}
</style>
