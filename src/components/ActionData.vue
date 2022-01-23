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
        <el-table :data="tableProps" border style="width: 100%">
          <el-table-column label="名称">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row.name" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-select v-model="scope.row.dataType">
                  <el-option
                    v-for="item in dataTypes"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="数据(data)" name="2">
        <template #title>
          <div class="collapse-header">
            <span>数据(data)</span>
            <el-button plain @click.stop="addData">新增</el-button>
          </div>
        </template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="名称">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row.name" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-select v-model="scope.row.dataType">
                  <el-option
                    v-for="item in dataTypes"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import designer from '@/utils/designer'
import { DataTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class ActionData extends Vue {
  activeNames = ['1', '2']
  tableProps = designer.pageMetadata.props
  tableData = designer.pageMetadata.data
  dataTypes!: any[]
  beforeMount() {
    const arr = []
    for (const value in DataTypeEnum) {
      arr.push({ key: DataTypeEnum[value], value })
    }
    this.dataTypes = arr.splice(arr.length / 2, arr.length / 2)
    console.log(this.dataTypes)
  }

  addProp() {
    this.tableProps.push({
      name: '',
      dataType: DataTypeEnum.String
    })
  }

  addData() {
    this.tableData.push({
      name: '',
      dataType: DataTypeEnum.String
    })
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
