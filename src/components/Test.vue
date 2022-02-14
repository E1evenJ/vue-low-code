<template>
  <div class="page-Z7iQnA">
    <el-input v-model="data1.field1" placeholder="请输入"></el-input>
    <div class="el-row">
      <el-form><el-form-item :size="undefined"></el-form-item></el-form>
    </div>
  </div>
</template>

<script lang="js">
export default {
  components: {},
  data() {
    return { data1: { field1: null } }
  },
  watch: {},
  methods: {
    fn_QeX6cP() {
        console.log(111111)
    }
  },
  beforeCreate() {
      console.log(111)
  },
  created() {
    if (this.data1.field1 === '1') {
      this.fn_QeX6cP()
    }
  },
  beforeMount() {
    this.fn_QeX6cP()
  },
  mounted() { console.log(111)},
  beforeUpdate() {console.log(111)},
  updated() {console.log(111)},
  beforeUnmount() {console.log(111)},
  unmounted() {console.log(111)},
  errorCaptured() {console.log(111)},
  renderTracked() {console.log(111)},
  renderTriggered() {console.log(111)}
}
</script>

<style lang="scss" scoped>
.test {
}
</style>
