<template>
  <div class="ProcessInspection">
    <div class="container-fluid"
         :class="{
      huise: !StationID || dialogStation && !WoNoBer || dialogWoNo
    }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="5"
                style="display: flex;justify-content: end;align-items: flex-end;height: 100%;font-size: 16px;line-height: 24px;">
          <div style="text-align: left;">
            <p style="font-size: 20px;margin-bottom: 10px;">{{ nowDate }}</p>
            <p>{{nowTime}}</p>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="kanban-title-panel">{{ StationName }}</div>
          <div class="kanban-title-right"></div>
        </el-col>
        <el-col :span="5"
                style="display: flex;justify-content: flex-end;height: 100%;font-size: 16px;line-height: 24px;">
          <div class="kanban-title-tab"
               style="padding-top: 10px;">
            <span style="width:80px" @click="InspectionReport">检验报告</span>
            <span @click="ESOPPreview">E-SOP</span>
            <span @click="WoNoClick">{{$t("CollectProducts._1")}}</span>
            <span @click="StationClick">{{$t("CollectProducts._2")}}</span>
            <span @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px - 67px);">
        <el-row>
          <el-col :span="6" :style="{'z-index':drawer?'9999':'0','position':drawer?'fixed':'static'}">
            <!-- 数据录入 -->
            <div class="block-center">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="block-center-content">
                  <div style="font-size: 20px;">{{$t("CollectProducts._3")}}</div>
                  <el-form ref="form"
                           :show-message="false"
                           class="collstat-form"
                           label-width="80px"
                           label-position="left">
                    <el-form-item class="collstat-form-item"
                                  :label="$t('产品数据')">
                      <Equipment :childVal="childVal"
                                 @SubcultureVal="sonData"
                                 ref='RefChildVal'></Equipment>
                    </el-form-item>
                    <el-form-item class="collstat-form-item"
                                  :label="$t('CollectProducts._4')">
                      <div style="display: flex;">
                        <el-input v-model="InputData"
                                  style="width: 78%;"
                                  clearable
                                  ref="inputDataRef"
                                  :disabled="disableRequest"
                                  @keyup.enter.native="enterChange"
                                  :placeholder="$t('CollectProducts._5')" />
                        <el-button style="width: 22%;"
                                   type="primary"
                                   @click="EmptyClick">{{$t('SfcsProductPallet.clean')}}</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item class="collstat-form-item"
                                  :label="$t('CollectProducts._6')">
                      <el-input v-model="OldValue"
                                style="width: 100%;"
                                disabled
                                placeholder=" " />
                    </el-form-item>
                    <el-form-item class="collstat-form-item"
                                  :label="$t('CollectProducts._49')">
                      <el-input v-model="qcDocNo"
                                style="width: 100%;"
                                disabled
                                placeholder=" " />
                    </el-form-item>
                     <el-form-item label="不良代码">
                              <BadCode :disabled="disableRequest" :bindData="DEFECT_CODE" @badCode="badCode" :tableWidth="300"/>
                    </el-form-item>
                    <el-form-item class="collstat-form-item"
                                  :label="$t('CollectProducts._46')">
                      <div style="display: flex;">
                        <el-input v-model="qcQty"
                                  style="width: 70%;"
                                  disabled
                                  placeholder=" " />
                        <el-button style="width: 30%;"
                                   type="primary"
                                   @click="QcDocFullClick">{{$t('CollectProducts._47')}}</el-button>
                      </div>
                    </el-form-item>

                    <el-form-item :label="$t('CollectProducts._7')">
                      <div class="result"
                           v-if="ResultRun === 0"><span>{{InfRoute}}</span></div>
                      <!-- 警告 -->
                      <div class="result"
                           v-if="ResultRun === 1"
                           style="background: #f9b72d;"><span>{{InfRoute}}</span></div>
                      <!-- 报错 -->
                      <div v-if="ResultRun === 2"
                           class="result"
                           style="background: #EF5757;color:#fce8bc"><span>{{InfRoute}}</span></div>
                    </el-form-item>
                  </el-form>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 警告 -->
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="block-information"><i class="el-icon-warning"></i>&nbsp;预警信息</div>
                <el-card v-show="WarningList.length !==0"
                         class="box-card no-shadow"
                         ref="yujingxinxi"
                         style="height: 80%;padding-top: 0px">
                  <div class="list"
                       style="height: 100%;overflow: auto">
                    <div class="item-x"
                         v-for="item in WarningList"
                         :key="item.ID"
                         @click="toWarning(item)">
                      <div style="display: flex;align-items: center;width: 50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        <el-tag effect="dark"
                                type="danger"
                                size="mini"
                                style="margin-right: 5px;"
                                v-if="item.STATUS === 0">{{ $t('homePage._9') }}</el-tag>
                        <el-tag effect="dark"
                                type="warning"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 1">{{ $t('homePage._10') }}</el-tag>
                        <el-tag effect="dark"
                                type="success"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 2">{{ $t('homePage._11') }}</el-tag>
                        <el-tag effect="dark"
                                type="info"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 3">{{ $t('homePage._12') }}</el-tag>
                        <el-popover placement="right"
                                    width="400"
                                    trigger="hover"
                                    disabled>
                          <div>
                            <el-form>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item :label="$t('homePage._13') + ':'">{{ item.CALL_CODE }}</el-form-item>
                                  <el-form-item :label="$t('homePage._14') + ':'">{{ item.LINE_TYPE }}</el-form-item>
                                  <el-form-item :label="$t('homePage._15') + ':'">{{ item.OPERATION_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._16') + ':'">{{ item.OPERATOR }}</el-form-item>
                                  <el-form-item :label="$t('homePage._17') + ':'">
                                    <span v-if="item.STATUS === 0">{{ $t('homePage._9') }}</span>
                                    <span v-if="item.STATUS === 1">{{ $t('homePage._10') }}</span>
                                    <span v-if="item.STATUS === 2">{{ $t('homePage._11') }}</span>
                                    <span v-if="item.STATUS === 3">{{ $t('homePage._12') }}</span>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item :label="$t('homePage._18') + ':'">{{ item.CALL_CONTENT }}</el-form-item>
                                  <el-form-item :label="$t('homePage._19') + ':'">{{ item.OPERATION_LINE_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._20') + ':'">{{ item.OPERATION_SITE_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._21') + ':'">{{ item.CREATE_TIME }}</el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
                          </div>
                          <span class="title"
                                slot="reference">{{item.CALL_CONTENT}}</span>
                        </el-popover>
                      </div>
                      <span class="time"
                            style="font-size: 14px">{{item.CREATE_TIME}}</span>
                    </div>

                  </div>
                </el-card>
                <div class="empty-page"
                     style="width: 100%;height: 100%;"
                     v-show="WarningList.length<=0">
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="9"
                  style="padding-left: 15px;box-sizing: border-box">
            <!-- 产品数据 -->
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <!-- 产品数据 -->
                <div class="block-center-content">
                  <div class="center-content-product">
                    <span>{{$t('CollectProducts._8')}}</span>
                  </div>
                  <el-row :gutter="24"
                          style="height: 85%;">
                    <el-col :span="12"
                            style="padding-top: 22px;">
                      {{$t('CollectProducts._9')}}：{{ProductData.Part_No}}
                    </el-col>
                    <el-col :span="12"
                            style="padding-top: 22px;">
                      {{$t('CollectProducts._60')}}：{{ProductData.Wo_No}}
                    </el-col>
                    <el-col :span="24"
                            style="padding-top: 12px;">
                      {{$t('CollectProducts._11')}}：{{ProductData.Name}}
                    </el-col>
                    <el-col :span="24"
                            style="padding-top: 12px;">
                      {{$t('CollectProducts._12')}}：{{ProductData.Description}}
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.Target_Qty}}</span>
                        {{$t('CollectProducts._13')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-red">
                        <span>{{ProductData.Pending_Qty}}</span>
                        {{$t('CollectProducts._14')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.Completed_Qty}}</span>
                        {{$t('CollectProducts._15')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-green">
                        <span>{{ProductData.Pass_Qty}}</span>
                        {{$t('CollectProducts._16')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-red">
                        <span>{{ProductData.Fail_Qty}}</span>
                        {{$t('CollectProducts._17')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.AchievementRate}}
                          <span v-if="ProductData.AchievementRate">%</span>
                        </span>
                        {{$t('CollectProducts._18')}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <!-- <div id="RestPcbCountBar"
                     style="height:100%;" /> -->
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!--收集记录 -->
            <div class="block">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div id="swiper1"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div class="block-center-content">
                    <div class="center-content-product">
                      <span>{{$t('CollectProducts._19')}}</span>
                    </div>
                    <div id="TodayWorkOrderSummary"
                         style="width: 100%;height: 82%;overflow: auto;">
                      <table class="ListTable table table-striped"
                             style="font-size:14px">
                        <thead>
                          <tr>
                            <td>{{$t("CollectProducts._20")}}</td>
                            <td>{{$t("CollectProducts._21")}}</td>
                            <td>{{$t("CollectProducts._22")}}</td>
                            <td>{{$t("CollectProducts._23")}}</td>
                            <td>{{$t("CollectProducts._24")}}</td>
                            <td>{{$t("CollectProducts._25")}}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in tableData"
                              :key="index">
                            <th>{{item.OBJECT_NAME}}</th>
                            <th>{{item.NEED_ASSEMBLY_QTY}}</th>
                            <th>{{item.COLLECTED_QTY}}</th>
                            <th>{{item.DATA_FORMAT}}</th>
                            <th>{{item.ODM_OBJECT_PN}}</th>
                            <th>{{item.FIXED_VALUE}}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="5"
                  style="padding-left: 15px;box-sizing: border-box">
            <!-- 信息汇总 -->
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div class="block-center-content">
                  <span style="font-size: 20px;">{{$t("CollectProducts._26")}}</span>
                  <div class="content-history">
                    <div class="content-history-list"
                         v-for="(item,index) in HistoricalData"
                         :key="index">
                      <div>SN：{{item.SN_No}}</div>
                      <div>{{$t("CollectProducts._27")}}：
                        <span v-if="item.Operation_Status == 'PASS'"
                              style="color:#179415">{{item.Operation_Status}}</span>
                        <span v-else-if="item.Operation_Status == 'FAIL'"
                              style="color:#EF5757">{{item.Operation_Status}}</span>
                        <span v-else>{{item.Operation_Status}}</span>
                      </div>
                      <div>{{$t("CollectProducts._28")}}：

                        {{item.Operation_Time}}
                      </div>
                      <div>{{$t("CollectProducts._29")}}：{{item.Operator}}</div>
                    </div>
                  </div>

                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div id="FirstPassRatePie"
                     style="height: 100%;padding-top: 10px;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <!--制程详细-->
          <el-col :span="4"
                  style="padding-left: 15px;box-sizing: border-box">
            <div class="block fullheight">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div id="swiper1"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div class="block-center-content">
                    <div class="center-content-product">
                      <span>{{$t('CollectProducts._69')}}</span>
                    </div>
                    <div id="TodayWorkOrderSummary"
                         style="width: 100%;overflow: auto;height:100%">
                      <Manufacturing :RouteId="this.ProductData.Route_Id" :OperationId="OPERATION_ID"></Manufacturing>
                    </div>
                  </div>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 主体 end -->
    </div>
    <!-- 检验报告 -->
    <el-dialog
      class="my-dialog"
      v-dialogDrag
      :title="'检验报告'"
      :visible.sync="dialogVist"
      width="80%"
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          clearable
          v-model="editForm.SN"
          @input="$forceUpdate()"
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
          <div class="ProcessInspection-center">
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
        <el-button @click="dialogVist = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="success" @click="saveClick">
          {{ $t("publics.btn.save") }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 预览作业 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._98')"
               :visible.sync="PrimaryOperation"
               :close-on-click-modal="false"
               width="100%"
               top="0"
               class="primary-operation">
      <iframe id="child"
              v-if="iframeUrl"
              width="100%"
              height="100%"
              :src="iframeUrl"></iframe>
    </el-dialog>
    <!-- 选择工单 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._30')"
               :visible.sync="dialogWoNo"
               width="30%"
               ref="WONODialog"
               :close-on-click-modal="false">
      <!--  :before-close="WONOleClose" -->
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('CollectProducts._31')">
          <el-select v-model="WoNoBer"
                     filterable
                     :placeholder="$t('CollectProducts._32')"
                     style="width: 100%"
                     @change="WoNoChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="WoNoFrom.WO_NO"
                        @input="getOrder"
                        @keyup.enter.native="getOrder"
                        :placeholder="$t('CollectProducts._33')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getOrder">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="(item,index) in WoNoList"
                       :key="index"
                       :label="item.WO_NO"
                       :value="item.WO_NO"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="WoNoFrom.Page"
                             :page-size="WoNoFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="WoNototalPage"
                             @size-change="WoNoSizeChange"
                             @current-change="WoNoCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogWoNo = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogWoNo = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择工位 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._34')"
               :visible.sync="dialogStation"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('SfcsOperationSites._8')"
                      prop="OPERATION_LINE_ID">
          <el-select v-model="StationFrom.OPERATION_LINE_ID"
                     style="width:100%"
                     @change="operationCjange"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="item in LineList"
                       :key="item.Id"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('CollectProducts._35')">
          <el-select v-model="StationID"
                     filterable
                     :placeholder="$t('CollectProducts._36')"
                     style="width: 100%"
                     @change="StationChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="StationFrom.OPERATION_SITE_NAME"
                        @input="getStatusList"
                        @keyup.enter.native="getStatusList"
                        :placeholder="$t('CollectProducts._37')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getStatusList">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="item in StationtoList"
                       :key="item.ID"
                       :disabled="!item.ID"
                       :label="item.OPERATION_SITE_NAME"
                       :value="item.ID"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="StationFrom.Page"
                             :page-size="StationFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="StationtotalPage"
                             @size-change="StationSizeChange"
                             @current-change="StationCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStation = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStation = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
    <ESOPDrawer
      :out-drawer = "drawer"
      :is-esop-drawer="true"
      :routeData="routeData"
      @getOutDrawer = 'setOutDrawer'
    >
    </ESOPDrawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  Station,
  GetWONO,
  SaveSite,
  CollectData,
  CollectProducts,
  SetQcDocFull
} from '@/api/CollectProducts'
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
import { LoadEarlyWarningData } from '@/api/AndonCallRecord'
import {
  AddOrModify
} from '@/api/SfcsOperationSites'
import BadCode from '@/components/BadCode/index'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import Voice from '@/libs/voice'
import Manufacturing from '@/components/Manufacturing'
import ESOPDrawer from '@/components/ESOPDrawer'
const voice = Voice()
// import qs from 'qs'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () { // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        this.$message({
          showClose: true,
          message: this.$t('smt.ns'),
          type: 'warning'
        })
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
    return {
      handleFullScreen: function ($this) {
        if (isFullScreen) {
          exitFull()
          isFullScreen = false
        } else {
          requestFullScreen()
          isFullScreen = true
        }
      }
    }
  }())
}
export default {
  components: {
    ESOPDrawer,
    BadCode,
    Manufacturing,
    Equipment: () => import('@/components/Equipment/index')
  },
  fs,
  name: 'ProcessInspection',
  data () {
    return {
      drawer: false,
      disableRequest: false,
      DEFECT_CODE: null,
      routeData: {},
      LineList: [],
      WarningList: [],
      nowDate: '', // 当前日期
      nowTime: '',
      // 预览作业
      PrimaryOperation: false,
      iframeUrl: '',
      // 工单
      WoNoBer: '',
      dialogWoNo: false,
      WoNoList: [],
      WoNoFrom: {
        WO_NO: '',
        Page: 1,
        Limit: 15
      },
      WoNototalPage: 0,
      // 工位
      dialogStation: false,
      StationID: '',
      StationtoList: [],
      StationFrom: {
        OPERATION_LINE_ID: undefined,
        OPERATION_SITE_NAME: '',
        OPERATION_CATEGORY: 25,
        ENABLED: 'Y',
        Page: 1,
        Limit: 15
      },
      StationtotalPage: 0,
      StationName: '---',
      // 输入数据
      InputData: '',
      OldValue: '', // 旧值
      qcDocNo: '', // 质捡单号
      qcQty: '', // 质捡数量
      // 保存站点
      SiteFrom: {
        SiteId: '',
        UserName: ''
      },
      SiteObj: '', // 实体
      ResultRun: '', // 状态
      InfRoute: '', // 结果
      //
      ProductData: { Route_Id: '' },
      HistoricalData: [],
      tableData: [],
      OPERATION_ID: '', // sop工位ID
      OPERATION_LINE_NAME: '', // 线体名称
      // 设备对接
      childVal: {},
      dialogVist: false,
      editForm: {},
      activeEditName: '1',
      botmEditData1: [], // 检验项目
      botmEditData2: [], // 检验参数
      botmEditData3: [], // 软件信息
      botmEditData4: [], // 设备仪器信息
      botmEditData5: [], // 采集部件信息
      botmEditData6: [], // 装置检验项信息
      botmEditData7: [], // 解绑部件信息
      botmEditData8: [], // 缺少装置信息
      botmEditPage: 0,
      bottomForm: {
        Page: 1,
        Limit: 15
      },
      eSaveForm: {
        InsertRecords: [],
        UpdateRecords: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'userId'
    ])
  },
  beforeDestroy () {
    if (this.formatDate) {
      clearInterval(this.formatDate) // 在Vue实例销毁前，清除时间定时器
    }
  },
  deactivated () {
  },
  destroyed () {
  },
  mounted () {
    this.currentTime()
  },
  created () {
    this.getOrder()
    this.getAddOrModify()
    this.SiteFrom.UserName = this.userinfo.USER_NAME
    if (!this.StationID) {
      this.dialogStation = true
    }
    if (!this.WoNoBer) {
      this.dialogWoNo = true
    }
    this.$nextTick(() => {
      this.getWoYidldPie()
    })
  },
  methods: {
    badCode (e) {
      this.DEFECT_CODE = e
      this.InputData = e
      this.enterChange(false)
    },
    async searchEditForm () {
      if (this.editForm.SN) {
        const res = await LoadData({ SN: this.editForm.SN })
        this.editForm = res.Result[0] ? res.Result[0] : []
      }
    },
    handleEditClick () {
      let e = this.activeEditName
      if (this.editForm.SN) {
        if (parseInt(e) === 1) {
          this.getLoadOutreportIteamDetailList()
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
      } else {
        this.$message.error('请输入订单号并查询')
      }
    },
    // 检验项目
    async getLoadOutreportIteamDetailList (e) {
      const res = await LoadOutreportIteamDetailList({
        MST_ID: this.editForm.ID,
        Page: this.bottomForm.Page,
        Limit: this.bottomForm.Limit
      })
      this.botmEditData1 = res.Result ? res.Result : []
      this.botmEditPage = res.TotalCount ? res.TotalCount : 0
    },
    // 检验参数
    async getLoadOutreportNoDetailList (e) {
      const res = await LoadOutreportNoDetailList({
        MST_ID: this.editForm.ID,
        Page: this.bottomForm.Page,
        Limit: this.bottomForm.Limit
      })
      this.botmEditData2 = res.Result ? res.Result : []
      this.botmEditPage = res.TotalCount ? res.TotalCount : 0
    },
    // 软件信息
    async getLoadSoftSnHistoryList (e) {
      if (this.editForm.ID) {
        const res = await LoadSoftSnHistoryList({
          MST_ID: this.editForm.ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData3 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 设备仪器信息
    async getLoadToolSnHistoryList (e) {
      if (this.editForm.ID) {
        const res = await LoadToolSnHistoryList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData4 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 采集部件
    async getLoadCollectComponentList (e) {
      if (this.editForm.ID) {
        const res = await LoadCollectComponentList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData5 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 装置检验
    async getLoadOutreportMechiDetailList (e) {
      if (this.editForm.ID) {
        const res = await LoadOutreportMechiDetailList({
          MST_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData6 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 解邦部件
    async getLoadBreakMechiDetailList (e) {
      if (this.editForm.ID) {
        const res = await LoadBreakMechiDetailList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData7 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    // 缺少装置信息
    async getLoadLackMechiDetailList (e) {
      if (this.editForm.ID) {
        const res = await LoadLackMechiDetailList({
          SN_ID: this.currentData.SN_ID,
          Page: this.bottomForm.Page,
          Limit: this.bottomForm.Limit
        })
        this.botmEditData8 = res.Result ? res.Result : []
        this.botmEditPage = res.TotalCount ? res.TotalCount : 0
      }
    },
    addClick (row) {
      const record = {
        ID: 0,
        MST_ID: this.editForm.ID,
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
    saveClick () {
      var that = this
      const saveData = {
        ID: this.editForm.ID,
        XM_QTY: this.editForm.XM_QTY,
        STATUS: this.editForm.STATUS,
        FINALLY_USER: this.editForm.FINALLY_USER
      }
      SaveMesOutreportHeader(saveData).then((res) => {
        if (res.Result) {
          that.editSave()
          // that.dialogVist = false
          that.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
      })
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
    setOutDrawer (val) {
      this.drawer = val
    },
    // 设备对接传来数据
    sonData (row) {
      this.ResultRun = row.RESULT
      this.InfRoute = row.RESULT_MSG
      this.childVal.DATA = row.DATA || ''
      if (row.WO_NO) {
        this.WoNoBer = row.WO_NO
        this.getCollectProducts()
      }
    },
    // 获取首页预警信息数据
    async getLoadEarlyWarningData () {
      const res = await LoadEarlyWarningData({ User_ID: this.userinfo.ID, SITE_ID: this.StationID })
      this.WarningList = res.Result ? res.Result : []
    },
    toWarningList () {
      window.open(window.location.origin + '#/WarningInformationList/index')
    },
    toWarning (item) {
      window.open(
        window.location.origin + '#/WarningInformation/index?ID=' + item.ID
      )
    },
    // 日期时间
    currentTime () {
      setInterval(this.formatDate, 500)
    },
    formatDate () {
      let date = new Date()
      let year = date.getFullYear() // 年
      let month = date.getMonth() + 1 // 月
      let day = date.getDate() // 日
      let hour = date.getHours() // 时
      hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
      let minute = date.getMinutes() // 分
      minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
      let second = date.getSeconds() // 秒
      second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
      month = month < 10 ? '0' + month : month // 如果只有一位，则前面补零
      this.nowDate = `${year}` + this.$t('CollectProducts._38') + `${month}` + this.$t('CollectProducts._39') + `${day}` + this.$t('CollectProducts._40')
      this.nowTime = `${hour}:${minute}:${second}`
    },
    // 检验报告
    InspectionReport () {
      this.editForm = {
        SN: this.OldValue
      }
      if (this.editForm.SN.length > 0) {
        this.searchEditForm()
        this.handleEditClick()
      }
      this.dialogVist = true
    },
    // E-SOP预览
    ESOPPreview () {
      if (this.ProductData.Part_No === '') {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._36'),
          type: 'warning'
        })
        return
      }
      this.drawer = true
      this.routeData = {
        siteId: this.StationID, // 站点ID
        partNo: this.ProductData.Part_No, // 料号
        operationId: this.OPERATION_ID, // 工位ID
        wono: this.ProductData.Wo_No, // 工单
        description: this.ProductData.Description, // 机型
        operationlionname: this.OPERATION_LINE_NAME, // 线体名称
        operationlionid: this.StationFrom.OPERATION_LINE_ID, // 线体id
        stationname: this.StationName // 工位名称
      }
      // let routeData = this.$router.resolve({
      //   path: '/SOPsimple/SOP/index',
      //   query: {
      //     // partNo: this.ProductData.Part_No, // 料号
      //     // operationId: this.OPERATION_ID // sop工位ID // 工位ID
      //     siteId: this.StationID, // 站点ID
      //     partNo: this.ProductData.Part_No, // 料号
      //     operationId: this.OPERATION_ID, // 工位ID
      //     wono: this.ProductData.Wo_No, // 工单
      //     description: this.ProductData.Description, // 机型
      //     operationlionname: this.OPERATION_LINE_NAME, // 线体名称
      //     operationlionid: this.StationFrom.OPERATION_LINE_ID, // 线体id
      //     stationname: this.StationName // 工位名称
      //   }
      // })
      // window.open(routeData.href, '_blank')
    },
    // 工单
    WoNoClick () {
      this.dialogWoNo = true
    },
    WoNoChange () {
      this.getCollectProducts()
      this.dialogWoNo = false
    },

    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
      }
    },
    operationCjange (e) {
      this.LineList.map(v => {
        if (e === v.Id) {
          this.OPERATION_LINE_NAME = v.OPERATION_LINE_NAME
          console.log(v, '====')
        }
      })
      this.StationID = ''
      this.StationFrom.Page = 1
      this.getStatusList()
    },
    async getOrder () {
      const res = await GetWONO(this.WoNoFrom)
      this.WoNototalPage = res.TotalCount
      this.WoNoList = res.Result || []
      if (this.WoNototalPage === 0) {
        this.WoNoList.push({
          LOOKUP_TYPE: '',
          NAME: '',
          ROWNO: ''
        })
      }
    },
    WoNoSizeChange (Limit) {
      this.WoNoFrom.Page = 1
      this.WoNoFrom.Limit = Limit
      this.getOrder()
    },
    WoNoCurrentChange (Page) {
      this.WoNoFrom.Page = Page
      this.getOrder()
    },
    // 工位
    StationClick () {
      this.dialogStation = true
    },
    StationChange (e) {
      if (this.SiteFrom.OPERATION_LINE_ID !== undefined) {
        this.$message.error(this.$t('SfcsOperationSites._9'))
        return
      }
      this.SiteFrom.SiteId = e
      this.getSaveSite()
      console.log(e, 'eeee')
      this.StationtoList.map(v => {
        if (e === v.ID) {
          this.StationName = v.OPERATION_SITE_NAME
          this.OPERATION_ID = v.OPERATION_ID
        }
      })
      this.getCollectProducts()
      this.getLoadEarlyWarningData()
      // 设备对接信息
      this.childVal.SITE_ID = e
      this.childVal.Entity = true
      this.$refs.RefChildVal.FatherClick(this.childVal)
    },
    async getStatusList () {
      const res = await Station(this.StationFrom)
      this.StationtotalPage = res.TotalCount
      const data = JSON.parse(res.Result)
      this.StationtoList = data || []
      if (!this.StationtoList.length) {
        this.StationtoList.push({
          OPERATION_SITE_NAME: '',
          ID: ''
        })
      }
    },
    StationSizeChange (Limit) {
      this.StationFrom.Page = 1
      this.StationFrom.Limit = Limit
      this.getStatusList()
    },
    StationCurrentChange (Page) {
      this.StationFrom.Page = Page
      this.getStatusList()
    },

    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = (date.getDate()).toString()
      var hour = (date.getHours()).toString()
      return day + this.$t('smt.day') + hour + this.$t('smt.time')
    },
    WONOleClose (done) {
      if (!this.WoNoBer) {
        this.$message.error(this.$t('CollectProducts._32'))
      } else {
        done()
      }
    },
    handleClose (done) {
      if (!this.StationID) {
        this.$message.error(this.$t('CollectProducts._36'))
      } else {
        done()
      }
    },
    async EmptyClick () {
      this.InputData = ''
      this.SiteObj.data = ''
      this.InfRoute = ''
      this.OldValue = ''
      this.ResultRun = ''
      this.getSaveSite()
    },
    // 保存站点
    async getSaveSite () {
      const res = await SaveSite(this.SiteFrom)
      if (res.Result) {
        this.SiteObj = res.Result
        this.tableData = res.Result.collectDataViews ? res.Result.collectDataViews : []
        this.dialogStation = false
      }
      console.log(res, 'resres')
    },
    // 回车
    async enterChange (isBadCode) {
      if (this.StationID === '') {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._36'),
          type: 'warning'
        })
        return
      }
      this.OldValue = this.InputData
      this.SiteObj.data = this.InputData
      // 工单号
      if (this.ProductData.Wo_No) {
        this.SiteObj.woNo = this.ProductData.Wo_No
      } else {
        this.SiteObj.woNo = ''
      }
      this.disableRequest = true
      const res = await CollectData(this.SiteObj)
      this.disableRequest = false
      this.$nextTick(function () {
        this.$refs.inputDataRef.focus()
      })
      if (isBadCode) {
        this.DEFECT_CODE = null
      }
      this.InputData = ''
      const data = res.Result
      if (data) {
        // 实体有数据再次设备对接
        if (this.childVal.DATA) {
          this.childVal.SN = this.OldValue// 设置
          this.InputData = ''
          this.childVal.DATA_TYPE = 3
          this.$refs.RefChildVal.FatherClick(this.childVal)
        }
        this.SiteObj = data
        this.ResultRun = data.result
        // 声音设置
        // eslint-disable-next-line
        if (this.ResultRun == 0) {
          voice.success()
        }
        // eslint-disable-next-line
        if (this.ResultRun == 1) {
          voice.warning()
        }
        // eslint-disable-next-line
        if (this.ResultRun == 2) {
          voice.error()
        }
        this.InfRoute = data.msg ? data.msg : ''
        this.tableData = data.collectDataViews ? data.collectDataViews : []
        this.StationID = data.sfcsOperationSites.ID // StationID 工位
        this.WoNoBer = data.woNo // WoNoBer 工单
        this.qcDocNo = data.spotCheck.qcDocNo // 质捡单号
        this.qcQty = data.spotCheck.qcQty // 质捡数量
        this.WoNoBer = data.woNo // 工单
        this.getCollectProducts()
      }
      // 报错处理
      if (res.warnResult) {
        this.ResultRun = res.warnResult.result
        // 声音设置
        // eslint-disable-next-line
        if (this.ResultRun == 0) {
          voice.success()
        }
        // eslint-disable-next-line
        if (this.ResultRun == 1) {
          voice.warning()
        }
        // eslint-disable-next-line
        if (this.ResultRun == 2) {
          voice.error()
        }
        this.InfRoute = res.warnResult.msg ? res.warnResult.msg : ''
        this.tableData = res.warnResult.collectDataViews ? res.warnResult.collectDataViews : []
      }
    },
    // 产生质检
    async QcDocFullClick () {
      if (!this.OldValue) {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._5'),
          type: 'warning'
        })
        return
      }
      if (!this.SiteObj.spotCheck) {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._50'),
          type: 'warning'
        })
        return
      }
      this.SiteObj.data = this.OldValue
      const res = await SetQcDocFull(this.SiteObj)
      const data = res.Result
      // 成功处理
      if (data) {
        this.SiteObj = data
        this.InfRoute = data.msg ? data.msg : ''
        this.ResultRun = data.result
        // 声音设置
        if (this.ResultRun === 0) {
          voice.success()
        }
        if (this.ResultRun === 1) {
          voice.warning()
        }
        if (this.ResultRun === 2) {
          voice.error()
        }
        this.tableData = data.collectDataViews ? data.collectDataViews : []
        this.WoNoBer = '' // 工单
        this.qcDocNo = '' // 质捡单号
        this.qcQty = '' // 质捡数量
      }
      // 报错处理
      if (res.warnResult) {
        this.ResultRun = res.warnResult.result
        // 声音设置
        if (this.ResultRun === 0) {
          voice.success()
        }
        if (this.ResultRun === 1) {
          voice.warning()
        }
        if (this.ResultRun === 2) {
          voice.error()
        }
        this.InfRoute = res.warnResult.msg ? res.warnResult.msg : ''
        this.tableData = res.warnResult.collectDataViews ? res.warnResult.collectDataViews : []
      }
    },

    // 获取产品数据、历史数据、不良
    async getCollectProducts () {
      if (!this.StationID || !this.WoNoBer) {
        return
      }
      var Productsform = {
        SiteID: this.StationID, // StationID 工位
        WO_NO: this.WoNoBer// WoNoBer 工单
      }
      const res = await CollectProducts(Productsform)
      console.log(res)
      if (res.Result) {
        this.ProductData = res.Result
        this.HistoricalData = res.Result.HistoricalData || []
        const FailData = res.Result.FailData || []
        // const FailData = [
        //   { ID: 0, DEFECT_CODE: 'ICT_FAIL', Fail_Name: 'ICT测试不良', Percentage: 96 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良2', Percentage: 56 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良3', Percentage: 56 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良4', Percentage: 56 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良5', Percentage: 56 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良6', Percentage: 56 },
        //   { ID: 3, DEFECT_CODE: 'ICT_FAIL2', Fail_Name: 'ICT测试不良7', Percentage: 56 }
        // ]
        console.log(FailData, 'FailDataFailData')
        /* 不良Top5 */
        // if (FailData.length > 0) {
        var arrxAxis = [] // new Array[]; 数组
        var arrseries = [] // new Array[]; 数组
        for (var i in FailData) {
          arrxAxis.push(FailData[i].Fail_Name + '(' + FailData[i].Fail_Qty + ')')
          var obj = {} // 对象
          obj.value = FailData[i].Fail_Qty
          obj.name = FailData[i].Fail_Name + '(' + FailData[i].Fail_Qty + ')'
          arrseries.push(obj)
        }
        this.FirstPassRatePie.hideLoading() // 隐藏加载动画
        this.FirstPassRatePie.setOption({ // 加载数据图表
          legend: {
            data: arrxAxis
          },
          series: [{
            // 根据名字对应到相应的系列
            data: arrseries
          }]
        })
      }
      // }
    },
    async getWoYidldPie () {
      /* =====================首不良Top5 =========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        title: {
          id: 3,
          text: this.$t('smt._3'),
          padding: [10, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: 20
          }
        },
        color: ['#F4AA61', '#4EC7B8', '#90C9F6', '#FE8463', '#B5C334'],
        tooltip: {
          trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: '{b} :' + this.$t('pdl._15') + '{d}%'
        },
        legend: {
          left: 'center',
          bottom: '10',
          type: 'scroll',
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          },
          data: []
        },
        series: [
          {
            name: this.$t('pdl._16'),
            // type: 'pie',
            // radius: '60%',
            // center: ['40%', '50%'],
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['20%', '40%'],
            avoidLabelOverlap: false,
            data: [],
            label: {
              // normal: { formatter: '{b}[{d}%]' }
              normal: {
                formatter: (data) => {
                  return data.name.split('(')[0] + ': ' + data.percent + '%'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.FirstPassRatePie.setOption(optionFirstPassRate, true)
      window.onresize = () => {
        this.FirstPassRatePie.resize()
      }
    }
  },
  watch: {
    PrimaryOperation (val) {
      if (!val) {
        this.iframeUrl = ''
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../CollectProducts/index.css';
.ProcessInspection {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  .huise {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale' x='0' y='0' width='100%' height='100%'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    filter: gray;
  }

  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .kanban-title-tab {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    font-size: 16px;
  }
  .kanban-title-tab span {
    width: 60px;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    background: #23548c;
    border-radius: 4px;
    border: 1px solid #009fef;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .kanban-title-tab span:hover {
    background: #009fef;
  }
  /* 12 */
  .collstat-form .collstat-form-item {
    color: #fff;
    font-size: 16px;
    // margin-bottom: -4px !important;
  }
  /* 12 */
  .collstat-form .result {
    width: 100%;
    font-size: 20px;
    /* height: 100px; */
    height: calc((100vh - 380px - 280px) / 2 - 14px);
    overflow: auto;
    background: #179415;
    border-radius: 6px;
  }
  .collstat-form .result span{
    display: inline-block;
    padding:14px
  }

  .block-information {
    background: #f9b72d;
    height: 20%;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
  .center-content-product {
    font-size: 20px;
    border-bottom: 1px solid #bbbbbb;
    width: 100%;
    /*position: relative;
  left: -12px;*/
    padding: 0 0px 12px;
  }
  .center-content-product span {
    margin-left: 12px;
  }
  /* 产品数据 */
  .product-row-col {
    height: 28.5%;
  }
  .product-col {
    padding-top: 22px;
    display: flex;
    justify-content: center;
  }
  .product-col-center {
    background: #eaf1f8;
    font-size: 18px;
    color: #000;
    height: 100%;
    /* height: calc((100vh - 630px - 0px) / 2 - 14px); */
    width: 70%;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .product-col-center span {
    width: 100%;
    font-size: 18px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-col-red {
    color: #ef5757;
  }
  .product-col-green {
    color: #179415;
  }
  tr th,
  tr td {
    padding: 6px;
  }
  #TodayWorkOrderSummary::-webkit-scrollbar {
    display: none;
  }
  /* 历史数据 */
  .content-history {
    width: 100%;
    height: 84%;
    overflow-x: hidden;
    margin-top: 10px;
  }
  .content-history::-webkit-scrollbar {
    display: none;
  }
  .content-history-list {
    border-radius: 21px;
    background: #37587d;
    padding: 12px;
    margin-top: 10px;
  }
  /* 预警 */
  .item-x {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #666;
    line-height: 2.5;
    justify-content: space-between;
    border-bottom: 1px dashed #e5e5e5;
    cursor: pointer;
  }
  .item-x:hover {
    color: #000;
  }
  .item-x .title {
    width: 100px;
    color: #ffffff;
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .item-x .time {
    color: #fff;
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .load-more {
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.ProcessInspection-center {
  height: calc(100vh - 600px);
}
.ProcessInspection {
  .collstat-form .el-form-item__label {
    color: #ffffff;
    font-size: 16px;
    padding: 0;
  }
  .el-card__body {
    height: 100%;
    background: #37587d;
  }
  .el-form-item--small .el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
