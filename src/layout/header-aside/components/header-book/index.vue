<template>
  <el-tooltip effect="dark"
              :content="'操作手册'"
              placement="bottom"
  >
    <el-button class="d2-mr btn-text can-hover" type="text" @click="toDocument">
      <d2-icon name="book"/>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'headerBook',
  data () {
    return {
      documentUrl: process.env.VUE_APP_DOCUMENT_URL
    }
  },
  methods: {
    toDocument () {
      window.open(this.documentUrl, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
