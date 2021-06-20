<!--
 * @Author: your name
 * @Date: 2021-03-05 16:51:58
 * @LastEditTime: 2021-03-05 16:56:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/views/RunCardReport/children/lib/SmTsnreel.vue
-->
<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'SmTsnreel', // SMTSNREEL
  components: { JzGrid },
  props: {
    value: {
      required: true,
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      validRules: {},
      // 钢网编号，线别名称，绑定时间（创建日期）,作业员(CREATE_BY)
      columns: [
        {
          width: 210,
          field: 'SN',
          title: '流水号'
        },
        {
          width: 210,
          field: 'PART_NO',
          title: '物料料号'
        },
        {
          width: 210,
          field: 'NAME',
          title: '物料名称'
        },
        {
          width: 210,
          field: 'DESCRIPTION',
          title: '物料规格'
        },
        {
          width: 210,
          field: 'FEEDER',
          title: '飞达'
        },
        {
          width: 210,
          field: 'LOCATION',
          title: '站位'
        },
        {
          width: 210,
          field: 'TRACE_TIME',
          title: '时间'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
