<template>
  <div class="attr-table">
    <el-table :data="tableData" border row-key="id" :default-expand-all="defaultExpandAll" empty-text="空数据">
      <el-table-column label="字段名称">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.name }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-input v-model="scope.row.name" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="字段描述">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.memo }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-input v-model="scope.row.memo" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="字段类型" width="180">
        <template #default="scope">
          <span v-if="!scope.row.isNew">{{ scope.row.dataType }}</span>
          <div v-else style="display: flex; align-items: center">
            <el-select v-model="scope.row.dataType" @change="dataTypeChange(scope.row)">
              <el-option v-for="item in dataTypes" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="默认值">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-select v-model="scope.row.defaultType">
              <el-option v-for="item in defaultTypes" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
            <el-input v-model="scope.row.default" v-if="scope.row.defaultType === DefaultEnum.STATIC"></el-input>
            <el-cascader
              v-else-if="scope.row.defaultType === DefaultEnum.INITPROP && props"
              :options="props"
              :props="{ value: 'name', label: 'name' }"
              @change="defaultChange(scope.row, scope.$index)"
              :ref="setCascaderRef"
            ></el-cascader>
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
import { DataTypeEnum, DefaultEnum } from '@/utils/enums'
import { reactive } from 'vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    tableData: Array,
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    props: Array
  }
})
export default class AttrTable extends Vue {
  dataTypes: any[] = []
  defaultTypes: any[] = []
  DataTypeEnum = DataTypeEnum
  DefaultEnum = DefaultEnum
  cascaderRefs: any[] = []

  beforeMount() {
    this.initDataTypeArray()
    this.iniDefaultTypeArray()
  }

  setCascaderRef(el: any) {
    if (el) {
      this.cascaderRefs.push(el)
    }
  }

  initDataTypeArray() {
    for (const value in DataTypeEnum) {
      this.dataTypes.push({ key: value, value: Object.getOwnPropertyDescriptor(DataTypeEnum, value)?.value })
    }
  }

  iniDefaultTypeArray() {
    this.defaultTypes = [
      { key: DefaultEnum.STATIC, value: '静态值' },
      { key: DefaultEnum.INITPROP, value: '初始化参数' }
    ]
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

  defaultChange(row: any, index: number) {
    const nodes = this.cascaderRefs[index - 1].getCheckedNodes()
    const path = [...nodes[0].pathValues]
    path[0] === 'props' && path.splice(0, 1)
    row.default_path = path
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
