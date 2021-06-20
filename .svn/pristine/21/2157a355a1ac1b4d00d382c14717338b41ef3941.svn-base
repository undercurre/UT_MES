<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <el-select
          v-model="formData.FAMILY_ID"
          clearable
          :placeholder="'请选择产品系列'"
          style="width: 200px"
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
              v-model="formDataFAMILY.Key"
              :placeholder="'请输入关键字'"
              @keyup.enter.native="Form_FAMILY_NAME_Search"
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="Form_FAMILY_NAME_Search"
              >{{ $t("publics.btn.search") }}</el-button
            >
          </div>
          <el-option
            v-for="item in FAMILY_List"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
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
              :current-page="formDataFAMILY.Page"
              :page-size="formDataFAMILY.Limit"
              :page-sizes="[15, 25, 35, 45]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="FAMILY_Page"
              @size-change="formFAMILY_SizeChange"
              @current-change="formFAMILY_CurrentChange"
            />
          </div>
        </el-select>
        <el-select
          v-model="formData.PART_NO"
          clearable
          :placeholder="'请选择料号'"
          style="width: 200px"
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
          v-model="formData.OPERATION_ID"
          clearable
          :placeholder="'请选择工序'"
          style="width: 200px"
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
              v-model="formDataOPERATION.Key"
              :placeholder="'请输入关键字'"
              @keyup.enter.native="Form_OPERATION_Search"
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="Form_OPERATION_Search"
              >{{ $t("publics.btn.search") }}</el-button
            >
          </div>
          <el-option
            v-for="item in OPERATION_List"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
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
              :current-page="formDataOPERATION.Page"
              :page-size="formDataOPERATION.Limit"
              :page-sizes="[15, 25, 35, 45]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="OPERATION_Page"
              @size-change="formOPERATION_SizeChange"
              @current-change="formOPERATION_CurrentChange"
            />
          </div>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button type="success" icon="el-icon-plus" @click="insertEvent">{{
          $t("publics.btn.add")
        }}</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete" @click="removeClick()">{{
          $t("publics.btn.delete")
        }}</el-button> -->
      </custom-container-header>
    </template>
    <!-- 主表 -->
    <div class="InspectionReportConfiguration-center">
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
          field="FAMILY_NAME"
          min-width="180"
          :title="'产品系列'"
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
          field="PART_NAME"
          min-width="180"
          :title="'品名'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="PART_DESC"
          min-width="180"
          :title="'描述'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="TEMP_NAME"
          min-width="150"
          :title="'模板'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="OPERATION_NAME"
          min-width="150"
          :title="'检验工序'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ENABLE"
          min-width="100"
          :title="$t('ser.Sort')"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.ENABLE == 'Y'"
              style="font-weight: 800; color: green"
              >{{ $t("ser.yes") }}</span
            >
            <span v-else style="font-weight: 800; color: red">{{
              $t("ser.no")
            }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          sortable
          field="CREATE_TIME"
          min-width="150"
          :title="'创建时间'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="CREATOR"
          min-width="150"
          :title="'创建人'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="UPDATE_USER"
          min-width="150"
          :title="'修改人'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="UPDATE_TIME"
          min-width="150"
          :title="'修改时间'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          field="ORGANIZE_NAME"
          min-width="150"
          :title="'组织'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          sortable
          :title="$t('MesQualityItems._27')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button type="primary" @click="editClick(row, row.$index)">{{
              $t("publics.btn.edit")
            }}</el-button>
            <el-button type="danger" @click="removeClick(row, row.$index)">{{
              $t("publics.btn.delete")
            }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      style="padding: 10px 0; border-bottom: 1px solid #96989b"
      :current-page="formData.Page"
      :page-size="formData.Limit"
      :page-sizes="[15, 25, 35, 45]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 附表 -->
    <div>
      <el-row>
        <!-- 左 -->
        <el-col :span="14">
          <!-- 左按钮 -->
          <div style="margin: 10px 0">
            <el-select
              clearable
              v-model="leftForm.CHECK_TYPE_ID"
              style="width: 200px"
              :placeholder="'请选择检验类型'"
            >
              <el-option
                v-for="item in FianllyCheckTypeList"
                :key="item.LOOKUP_CODE"
                :label="item.MEANING"
                :value="item.LOOKUP_CODE"
              />
            </el-select>
            <el-button type="primary" @click.prevent="searchClick2">{{
              $t("publics.btn.search")
            }}</el-button>
            <el-button type="primary" @click="insertEvent2(-1)">{{
              $t("publics.btn.add")
            }}</el-button>
            <el-button type="success" @click="saveClick2">{{
              $t("publics.btn.save")
            }}</el-button>
          </div>
          <!-- 左表 -->
          <div class="InspectionReportConfiguration-bottom-center">
            <vxe-table
              ref="xTable2"
              id="xTable2"
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
              :data="mainTable2"
              :loading="loading2"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :radio-config="{ labelField: 'name', trigger: 'row' }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
              @cell-click="cellClick2"
            >
              <vxe-table-column
                sortable
                type="radio"
                width="80"
                :title="$t('cne.t_1')"
              />
              <vxe-table-column
                sortable
                field="CHECK_TYPE_ID"
                min-width="150"
                :title="'检验类型'"
                :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
              >
                <template v-slot:edit="{ row }">
                  <el-select
                    v-model="row.CHECK_TYPE_ID"
                    filterable
                    :placeholder="''"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in FianllyCheckTypeList"
                      :key="item.LOOKUP_CODE"
                      :label="item.MEANING"
                      :value="item.LOOKUP_CODE"
                    />
                  </el-select>
                </template>
              </vxe-table-column>
              <vxe-table-column
                sortable
                field="CHECK_ITEAM"
                min-width="150"
                :title="'检验项'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <vxe-table-column
                sortable
                field="CHECK_CONTENT"
                min-width="150"
                :title="'检验内容'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <vxe-table-column
                sortable
                field="IS_QUANT"
                min-width="150"
                :title="'有无量化'"
              >
                <template v-slot="{ row }">
                  <el-switch
                    v-model="row.IS_QUANT"
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
                field="ENABLE"
                min-width="100"
                :title="$t('ser.Sort')"
              >
                <template v-slot="{ row }">
                  <el-switch
                    v-model="row.ENABLE"
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
                :title="'排序'"
                field="ORDER_NO"
                width="90"
                :edit-render="{ name: 'input', props: {   } }"
              />
            </vxe-table>
          </div>
          <!-- 左分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="leftForm.Page"
              :page-size="leftForm.Limit"
              :page-sizes="[15, 25, 35, 45]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPage2"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
            />
          </div>
        </el-col>
        <el-col :span="1">
          <div class="InspectionReportConfiguration-center">
            <div class="VerticalLine"></div>
          </div>
        </el-col>
        <!-- 右 -->
        <el-col :span="9">
          <!-- 右按钮 -->
          <div style="margin: 10px 0">
            <el-button type="primary" @click="insertEvent3(-1)">{{
              $t("publics.btn.add")
            }}</el-button>
            <el-button type="success" @click="saveClick3()">{{
              $t("publics.btn.save")
            }}</el-button>
          </div>
          <!-- 右表 -->
          <div class="InspectionReportConfiguration-bottom-center">
            <vxe-table
              ref="xTable3"
              id="xTable3"
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
              :data="mainTable3"
              :loading="loading2"
              :mouse-config="{ selected: true }"
              :sort-config="{ trigger: 'cell' }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
              :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            >
              <vxe-table-column
                sortable
                type="radio"
                width="80"
                :title="$t('cne.t_1')"
              />
              <vxe-table-column
                sortable
                field="CHECK_TYPE_ID"
                min-width="120"
                :title="'检验类型'"
                :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
              >
                <template v-slot:edit="{ row }">
                  <el-select
                    v-model="row.CHECK_TYPE_ID"
                    filterable
                    :placeholder="''"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in FianllyCheckTypeList"
                      :key="item.LOOKUP_CODE"
                      :label="item.MEANING"
                      :value="item.LOOKUP_CODE"
                    />
                  </el-select>
                </template>
              </vxe-table-column>
              <vxe-table-column
                sortable
                field="CHECK_NAME"
                min-width="120"
                :title="'检验参数'"
                :edit-render="{ name: '$input', props: {} }"
              />
              <!-- <vxe-table-column
                field="ENABLE"
                min-width="80"
                :title="$t('ser.Sort')"
              >
                <template v-slot="{ row }">
                  <el-switch
                    v-model="row.ENABLE"
                    :active-text="$t('publics.btn.yes')"
                    :inactive-text="$t('publics.btn.no')"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                    active-value="Y"
                    inactive-value="N"
                  />
                </template>
              </vxe-table-column> -->
              <vxe-table-column :title="'排序'" field="ORDER_NO" width="80" :edit-render="{ name: 'input', props: {   } }" />
            </vxe-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 新增框 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="VisibleTitle"
      width="60%"
      :visible.sync="dialogVisible"
    >
      <el-form ref="addForm" label-width="120px" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'产品系列'">
              <el-select
                v-model="addForm.FAMILY_NAME"
                clearable
                :placeholder="''"
                style="width: 100%"
                @change="changeFAMILY_NAME(addForm)"
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
                    v-model="add_FAMILY_Form.Key"
                    :placeholder="'请输入产品系列'"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="FAMILY_NAME_Search"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </div>
                <el-option
                  v-for="item in FAMILY_List"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.NAME"
                >
                  <!-- <span style="float: left">{{ item.NAME }}</span>
                <span style="float: right">{{ item.DESCRIPTION }}</span> -->
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
                    :current-page="add_FAMILY_Form.Page"
                    :page-size="add_FAMILY_Form.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="FAMILY_Page"
                    @size-change="FAMILY_SizeChange"
                    @current-change="FAMILY_CurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="'品名'">
              <el-input  disabled v-model="addForm.PART_NAME" />
            </el-form-item>
            <el-form-item :label="'模板'">
              <el-select
                v-model="addForm.TEMP_ID"
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
                ></div>
                <el-option
                  v-for="item in FianllyReportList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="'组织'">
              <el-cascader
                v-model="addForm.ORGANIZE_ID"
                :options="organizeList"
                style="width: 100%"
                :show-all-levels="false"
                placeholder=" "
                :props="casProps"
                @change="handleChangeCascader(addForm.ORGANIZE_ID)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'料号'">
              <el-select
                v-model="addForm.PART_NO"
                clearable
                :placeholder="''"
                style="width: 100%"
                @change="getPartByPartNo"
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
                    v-model="add_PART_NO_Form.Key"
                    :placeholder="'请输入关键词'"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="PART_NO_Search"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </div>
                <el-option
                  v-for="item in PART_NO_List"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.NAME"
                />
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
                    :current-page="add_PART_NO_Form.Page"
                    :page-size="add_PART_NO_Form.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="PART_NO_Page"
                    @size-change="PART_NO_SizeChange"
                    @current-change="PART_NO_CurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="'描述'">
              <el-input disabled  v-model="addForm.PART_DESC" />
            </el-form-item>
            <el-form-item :label="'检验工序'">
              <el-select
                v-model="addForm.OPERATION_NAME"
                clearable
                :placeholder="''"
                style="width: 100%"
                @change="changeOPERATION_NAME(addForm)"
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
                    v-model="add_OPERATION_Form.Key"
                    :placeholder="'请输入关键词'"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="OPERATION_Search"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </div>
                <el-option
                  v-for="item in OPERATION_List"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.NAME"
                />
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
                    :current-page="add_OPERATION_Form.Page"
                    :page-size="add_OPERATION_Form.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="OPERATION_Page"
                    @size-change="OPERATION_SizeChange"
                    @current-change="OPERATION_CurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('ser.Sort')">
              <el-switch
                v-model="addForm.ENABLE"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clear">{{ $t("ssc_rd.cancel") }}</el-button>
        <el-button type="primary" @click="saveClick">{{
          $t("publics.btn.save")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  GetSiteStatisticsConditionList,
  SaveData,
  DeleteOneById,
  LoadOutreportIteamConfigList,
  SaveOutreportIteamConfig,
  LoadOutreportNoConfigList,
  SaveOutreportNoConfig,
  GetPartByPartNo
} from '@/api/MesOutreportConfig'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { mapGetters } from 'vuex'
export default {
  name: 'MesOutreportConfig',
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
      addForm: {},
      formDataFAMILY: {
        Page: 1,
        Limit: 15,
        TYPE: 9
      },
      formDataPART_NO: {
        Page: 1,
        Limit: 15,
        TYPE: 2
      },
      formDataOPERATION: {
        Page: 1,
        Limit: 15,
        TYPE: 10
      },
      // 产品系列
      add_FAMILY_Form: {
        Page: 1,
        Limit: 15,
        TYPE: 9
      },
      FAMILY_Page: 0,
      FAMILY_List: [],
      FAMILY_NAME: [],
      // 料号
      add_PART_NO_Form: {
        Page: 1,
        Limit: 15,
        TYPE: 2
      },
      PART_NO_Page: 0,
      PART_NO_List: [],
      FianllyCheckTypeList: [], // 检验类型
      FianllyReportList: [], // 模板
      add_OPERATION_Form: {
        Page: 1,
        Limit: 15,
        TYPE: 10
      },
      OPERATION_Page: 0,
      OPERATION_List: [], // 检验工序
      OPERATION_NAME: [],
      loading: false,
      mainTable: [],
      totalPage: 0,
      leftForm: {
        Page: 1,
        Limit: 15,
        CHECK_TYPE_ID: null
      },
      rightForm: {
        Page: 1,
        Limit: 999999999
      },
      currentIndex: -1, // 当前index值
      mainTable2: [],
      loading2: false,
      totalPage2: 0,
      mainTable3: [],
      loading3: false,
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      planData: [],
      LineTypeList: [],
      PhysicalName: '',
      LINEName: '',
      form: {
        ID: 0,
        PHYSICAL_LOCATION: '',
        LINE: '',
        OPERATION_LINE_NAME: '',
        PLANT_CODE: '',
        ENABLED: 'N'
      },
      saveForm: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      validRules: {
        TEMP_ID: [
          {
            required: true,
            message: '请选择模板'
          }
        ]
      },
      MST_ID: 0,
      dialogVisible: false,
      VisibleTitle: '',
      isAdd: false
    }
  },
  methods: {
    async getIndex () {
      // this.FianllyReportList.push({
      //   label: '',
      //   value: ''
      // })
      const res = await Index()
      let data = res.Result
      // 模板
      let FianllyReportBOX = data.FianllyReportList
        ? data.FianllyReportList
        : []
      FianllyReportBOX.map((item) => {
        this.FianllyReportList.push({
          label: item.MEANING,
          value: item.LOOKUP_CODE
        })
      })
      // 检验类型
      this.FianllyCheckTypeList = data.FianllyCheckTypeList
        ? data.FianllyCheckTypeList
        : []
      // console.log('模板:', this.FianllyReportList)
      // console.log('检验类型:', this.FianllyCheckTypeList)
    },
    async getLoadData () {
      this.formData.USER_ID = this.userinfo.ID
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount
      console.log('this.mainTable:', res.Result)
    },
    // 查主表
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },

    // 产品系列
    // 查询
    Form_FAMILY_NAME_Search () {
      this.formDataFAMILY.Page = 1
      this.getFAMILY_List(this.formDataFAMILY)
    },
    FAMILY_NAME_Search () {
      this.add_FAMILY_Form.Page = 1
      this.getFAMILY_List(this.add_FAMILY_Form)
    },
    async getFAMILY_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.FAMILY_List = res.Result.data
      } else {
        // this.FAMILY_List = [{ ID: 0, NAME: '' }]
        this.getFAMILY_List({
          Page: this.add_FAMILY_Form.Page,
          Limit: this.add_FAMILY_Form.Limit,
          TYPE: 9
        })
      }
      this.FAMILY_Page = res.Result.count
      this.FAMILY_List.map((item) => {
        this.FAMILY_NAME.push(item.NAME)
      })
    },
    // 赋值
    changeFAMILY_NAME (e) {
      if (e.FAMILY_NAME) {
        let index = this.FAMILY_NAME.indexOf(e.FAMILY_NAME)
        this.addForm.FAMILY_ID = this.FAMILY_List[index].ID
      }
    },

    // 料号
    // 查询
    Form_PART_NO_Search () {
      this.formDataPART_NO.Page = 1
      this.getPART_NO_List(this.formDataPART_NO)
    },
    PART_NO_Search () {
      this.add_PART_NO_Form.Page = 1
      this.getPART_NO_List(this.add_PART_NO_Form)
    },
    async getPART_NO_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.PART_NO_List = res.Result.data
      } else {
        this.getPART_NO_List({
          Page: this.add_PART_NO_Form.Page,
          Limit: this.add_PART_NO_Form.Limit,
          TYPE: 2
        })
      }
      this.PART_NO_Page = res.Result.count
    },
    // 检验工序
    // 查询
    Form_OPERATION_Search () {
      this.formDataOPERATION.Page = 1
      this.getOPERATION_List(this.formDataOPERATION)
    },
    OPERATION_Search () {
      this.add_OPERATION_Form.Page = 1
      this.getOPERATION_List(this.add_OPERATION_Form)
    },
    async getOPERATION_List (e) {
      const res = await GetSiteStatisticsConditionList(e)
      if (res.Result.data.length > 0) {
        this.OPERATION_List = res.Result.data
      } else {
        this.getOPERATION_List({
          Page: this.add_OPERATION_Form.Page,
          Limit: this.add_OPERATION_Form.Limit,
          TYPE: 10
        })
      }
      this.OPERATION_Page = res.Result.count
      this.OPERATION_List.map((item) => {
        this.OPERATION_NAME.push(item.NAME)
      })
    },
    // 赋值
    changeOPERATION_NAME (e) {
      let index = this.OPERATION_NAME.indexOf(e.OPERATION_NAME)
      this.addForm.OPERATION_ID = this.OPERATION_List[index].ID
    },
    // 清除
    clear () {
      this.dialogVisible = false
      this.MST_ID = 0
      this.form = {
        ID: 0,
        PHYSICAL_LOCATION: '',
        LINE: '',
        OPERATION_LINE_NAME: '',
        PLANT_CODE: '',
        ENABLED: 'N'
      }
      this.addForm = {
        CREATOR: '',
        UPDATE_USER: '',
        ENABLE: 'Y'
      }
      this.add_FAMILY_Form = {
        Page: 1,
        Limit: 15,
        TYPE: 9
      }
      this.add_PART_NO_Form = {
        Page: 1,
        Limit: 15,
        TYPE: 2
      }
      this.add_OPERATION_Form = {
        Page: 1,
        Limit: 15,
        TYPE: 10
      }
    },
    async getPartByPartNo () {
      const res = await GetPartByPartNo({ partNo: this.addForm.PART_NO })
      const data = JSON.parse(res.Result)
      if (data && data !== 'null') {
        this.addForm.PART_NAME = data.NAME
        this.addForm.PART_DESC = data.DESCRIPTION
        this.$forceUpdate()
      }
    },
    // 新增
    insertEvent () {
      this.VisibleTitle = '新增'
      this.isAdd = true
      this.clear()
      this.addForm.CREATOR = this.userinfo.USER_NAME
      this.dialogVisible = true
    },
    // 编辑
    editClick (row) {
      this.VisibleTitle = '编辑'
      this.addForm = row
      this.isAdd = false
      this.addForm.UPDATE_USER = this.userinfo.USER_NAME
      this.dialogVisible = true
    },
    // 删除
    removeClick (row, index) {
      this.$confirm('确认要删除选中的数据吗？', this.$t('msh._102'), {
        type: 'warning'
      }).then(() => {
        DeleteOneById(this.MST_ID).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('msh._103'),
              message: this.$t('msh._104'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          }
        })
      })
    },
    saveClick () {
      var that = this
      if (this.isAdd) {
        this.saveForm.InsertRecords.push(this.addForm)
      } else {
        this.saveForm.UpdateRecords.push(this.addForm)
      }
      SaveData(this.saveForm).then((response) => {
        if (response.Result) {
          that.clear()
          that.isAdd = false
          that.getLoadData()
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    cellClick (e) {
      console.log('主表选中e:', e)
      this.MST_ID = e.row.ID
      this.leftForm.MST_ID = e.row.ID
      this.rightForm.MST_ID = e.row.ID
      this.rightForm.CHECK_TYPE_ID = null
      this.currentIndex = e.$rowIndex
      this.getOutreportIteamConfigList()
      this.getOutreportNoConfigList()
    },
    cellClick2 (e) {
      console.log('附表选中e:', e)
      this.rightForm.CHECK_TYPE_ID = e.row.CHECK_TYPE_ID
      this.getOutreportNoConfigList()
    },
    async getOutreportIteamConfigList () {
      this.loading2 = true
      const res = await LoadOutreportIteamConfigList(this.leftForm)
      this.loading2 = false
      this.mainTable2 = res.Result ? res.Result : []
      this.totalPage2 = res.TotalCount
      this.$refs.xTable2.sort('ORDER_NO', 'asc')
    },
    async getOutreportNoConfigList () {
      this.loading3 = true
      const res = await LoadOutreportNoConfigList(this.rightForm)
      this.loading3 = true
      this.mainTable3 = res.Result ? res.Result : []
      this.totalPage3 = res.TotalCount
      this.$refs.xTable3.sort('ORDER_NO', 'asc')
    },
    searchClick2 () {
      this.leftForm.Page = 1
      this.getOutreportIteamConfigList()
    },
    formFAMILY_SizeChange (val) {
      this.formDataFAMILY.Page = 1
      this.formDataFAMILY.Limit = val
      this.getFAMILY_List(this.formDataFAMILY)
    },
    formFAMILY_CurrentChange (val) {
      this.formDataFAMILY.Page = val
      this.getFAMILY_List(this.formDataFAMILY)
    },
    FAMILY_SizeChange (val) {
      this.add_FAMILY_Form.Page = 1
      this.add_FAMILY_Form.Limit = val
      this.getFAMILY_List(this.add_FAMILY_Form)
    },
    FAMILY_CurrentChange (val) {
      this.add_FAMILY_Form.Page = val
      this.getFAMILY_List(this.add_FAMILY_Form)
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
    PART_NO_SizeChange (val) {
      this.add_PART_NO_Form.Page = 1
      this.add_PART_NO_Form.Limit = val
      this.getPART_NO_List(this.add_PART_NO_Form)
    },
    PART_NO_CurrentChange (val) {
      this.add_PART_NO_Form.Page = val
      this.getPART_NO_List(this.add_PART_NO_Form)
    },
    formOPERATION_SizeChange (val) {
      this.formDataOPERATION.Page = 1
      this.formDataOPERATION.Limit = val
      this.getOPERATION_List(this.formDataOPERATION)
    },
    formOPERATION_CurrentChange (val) {
      this.formDataOPERATION.Page = val
      this.getOPERATION_List(this.formDataOPERATION)
    },
    OPERATION_SizeChange (val) {
      this.add_OPERATION_Form.Page = 1
      this.add_OPERATION_Form.Limit = val
      this.getOPERATION_List(this.add_OPERATION_Form)
    },
    OPERATION_CurrentChange (val) {
      this.add_OPERATION_Form.Page = val
      this.getOPERATION_List(this.add_OPERATION_Form)
    },
    handleSizeChange2 (val) {
      this.formData.Limit = val
      this.getOutreportIteamConfigList()
    },
    handleCurrentChange2 (val) {
      this.formData.Page = val
      this.getOutreportIteamConfigList()
    },
    insertEvent2 (row) {
      if (!this.leftForm.MST_ID) {
        return this.$message.error('缺少主表ID，请选择')
      }
      const record = {
        ID: 0,
        MST_ID: this.leftForm.MST_ID,
        CHECK_TYPE_ID: null,
        CHECK_ITEAM: '',
        CHECK_CONTENT: '',
        IS_QUANT: 'N',
        ENABLE: 'Y',
        ORDER_NO: this.$refs.xTable2.getTableData().tableData.length + 1,
        CREATOR: this.userinfo.USER_NAME,
        UPDATE_USER: this.userinfo.USER_NAME
      }
      this.$refs.xTable2.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable2.setActiveRow(row)
      })
    },
    saveClick2 () {
      var that = this
      var leftSaveForm = {}
      let postdata2 = this.$refs.xTable2.getRecordset()
      if (
        postdata2.insertRecords.length ||
        postdata2.removeRecords.length ||
        postdata2.updateRecords.length
      ) {
        this.$refs.xTable2.validate((valid) => {
          if (valid) {
            leftSaveForm.InsertRecords = postdata2.insertRecords
            leftSaveForm.UpdateRecords = postdata2.updateRecords
            leftSaveForm.RemoveRecords = postdata2.removeRecords
            SaveOutreportIteamConfig(leftSaveForm).then((res) => {
              if (res.Result) {
                this.getOutreportIteamConfigList()
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
    insertEvent3 (row) {
      const record = {
        ID: 0,
        MST_ID: this.rightForm.MST_ID,
        CHECK_TYPE_ID: null,
        CHECK_NAME: '',
        ORDER_NO: this.$refs.xTable3.getTableData().tableData.length + 1,
        CREATE_USER: this.userinfo.USER_NAME,
        UPDATE_USER: this.userinfo.USER_NAME
      }
      this.$refs.xTable3.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable3.setActiveRow(row)
      })
    },
    saveClick3 () {
      var that = this
      var rightSaveForm = {}
      let postdata3 = this.$refs.xTable3.getRecordset()
      if (
        postdata3.insertRecords.length ||
        postdata3.removeRecords.length ||
        postdata3.updateRecords.length
      ) {
        this.$refs.xTable2.validate((valid) => {
          if (valid) {
            rightSaveForm.InsertRecords = postdata3.insertRecords
            rightSaveForm.UpdateRecords = postdata3.updateRecords
            rightSaveForm.RemoveRecords = postdata3.removeRecords
            SaveOutreportNoConfig(rightSaveForm).then((res) => {
              if (res.Result) {
                that.getOutreportNoConfigList()
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
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE

      this.organizeList = []
      manager = this.unique(manager)
      manager.map((item) => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(
          ...[tmp[tmp.length - 1]].filter((_i) => _i && _i)
        )
      })
    },
    unique (obj) {
      const res = new Map()
      return obj.filter(
        (a) => !res.has(a.ORGANIZE_ID) && res.set(a.ORGANIZE_ID, 1)
      )
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.form.ORGANIZE_ID = e[e.length - 1]
      }
      this.addForm.ORGANIZE_ID = this.form.ORGANIZE_ID
    }
  },
  created () {
    this.formData.USER_ID = this.userinfo.ID
    this.getIndex()
    this.getPART_NO_List({ Page: 1, Limit: 15, TYPE: 2 })
    this.getFAMILY_List({ Page: 1, Limit: 15, TYPE: 9 })
    this.getOPERATION_List({ Page: 1, Limit: 15, TYPE: 10 })
    this.getOrganize()
    this.getLoadData()
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
.VerticalLine {
  width: 1px;
  margin: 0 auto;
  height: calc(100vh - 500px);
  border-right: 1px solid #96989b;
}
</style>
<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}

.InspectionReportConfiguration-center {
  height: calc(100vh - 550px);
}
.InspectionReportConfiguration-bottom-center {
  height: calc(100vh - 600px);
}
</style>
