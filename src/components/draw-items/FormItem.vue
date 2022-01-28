<template>
  <el-col
    class="form-item"
    :uuid="uuid"
    :span="attrs?.span || 6"
    :class="attrs?.class"
    :data-draggable="draggable"
    :data-droppable="droppable"
  >
    <el-form-item :label="attrs?.label" :label-width="attrs && attrs['label-width']" :size="attrs?.size">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { getComponentDescriptor } from '@/core/definition/DescriptorFactory'
import { ComponentTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    uuid: String,
    type: String,
    attrs: Object
  }
})
export default class FormItem extends Vue {
  declare type: ComponentTypeEnum
  get draggable() {
    return getComponentDescriptor(this.type).draggable
  }

  get droppable() {
    return getComponentDescriptor(this.type).droppable
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  position: relative;
  outline: 1px dashed #ccc;
  min-height: 42px;
  > div {
    width: 100%;
  }
  .el-form-item {
    align-items: center;
    margin-bottom: 0;
    padding-left: 5px;
    :deep .el-form-item__content {
      .nest-drag-box {
        padding: 5px;
      }
    }
  }
}
</style>
