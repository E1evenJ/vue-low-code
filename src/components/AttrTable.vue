<template>
  <div class="attr-table">
    <el-table :data="tableData" border row-key="id" :default-expand-all="defaultExpandAll">
      <el-table-column label="名称">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.name }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-input v-model="scope.row.name" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.memo }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-input v-model="scope.row.memo" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.dataType }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-select v-model="scope.row.dataType" @change="dataTypeChange(scope.row)">
              <el-option v-for="item in dataTypes" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button-group v-if="scope.row.isNew">
              <el-button
                v-if="[DataTypeEnum.OBJECT, DataTypeEnum.ARRAY].includes(scope.row.dataType)"
                @click="addPropChild(scope.row)"
              >
                <el-icon><plus /></el-icon>
              </el-button>
              <el-button @click="removeProp(scope.row)">
                <el-icon><delete /></el-icon>
              </el-button>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { uuid } from '@/utils/common'
import { DataTypeEnum } from '@/utils/enums'
import { reactive } from 'vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    tableData: Array,
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  }
})
export default class AttrTable extends Vue {
  dataTypes: any[] = []
  DataTypeEnum = DataTypeEnum

  beforeMount() {
    this.initDataTypeArray()
  }

  initDataTypeArray() {
    for (const value in DataTypeEnum) {
      this.dataTypes.push({ key: value, value: Object.getOwnPropertyDescriptor(DataTypeEnum, value)?.value })
    }
  }

  addPropChild(row: any) {
    row.children = row.children || reactive([])
    row.children.push(this.generateNew())
  }

  removeProp(row: any) {
    console.log(row)
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

  dataTypeChange(row: any) {
    if (![DataTypeEnum.ARRAY, DataTypeEnum.OBJECT].includes(row.dataType)) {
      row.children && (row.children.length = 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.attr-table {
  .el-table :deep {
    .el-table__cell {
      .cell {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
