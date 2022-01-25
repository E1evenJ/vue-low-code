<template>
  <div class="action-data">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="参数(props)" name="1">
        <template #title>
          <div class="collapse-header">
            <span>参数(props)</span>
            <el-button plain @click.stop="addProp">新增</el-button>
          </div>
        </template>
        <AttrTable :tableData="tableProps"></AttrTable>
      </el-collapse-item>
      <el-collapse-item title="数据(data)" name="2">
        <template #title>
          <div class="collapse-header">
            <span>数据(data)</span>
            <el-button plain @click.stop="addData">新增</el-button>
          </div>
        </template>
        <AttrTable :tableData="tableData"></AttrTable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { uuid } from '@/utils/common'
import designer from '@/utils/designer'
import { DataTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import AttrTable from './AttrTable.vue'

@Options({
  components: {
    AttrTable
  }
})
export default class ActionData extends Vue {
  activeNames = ['1', '2']
  tableProps = designer.pageMetadata.props
  tableData = designer.pageMetadata.data
  DataTypeEnum = DataTypeEnum

  addProp() {
    this.tableProps.push(this.generateNew())
  }

  addData() {
    this.tableData.push(this.generateNew())
  }

  private generateNew() {
    return {
      id: uuid(),
      name: '',
      memo: '',
      isNew: true,
      dataType: DataTypeEnum.STRING
    }
  }
}
</script>

<style lang="scss" scoped>
.action-data {
  min-height: 65.4vh;
  .collapse-header {
    display: flex;
    width: 100%;
    align-items: center;
    span {
      font-weight: bold;
    }
    .el-button {
      margin-left: 30px;
    }
  }
}
</style>
