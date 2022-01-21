<template>
  <div class="attr-item">
    <span class="label">{{ attrDesc.value }}</span>
    <el-select class="attr-right" v-model="attrs.inputType">
      <el-option
        v-for="item in attrDesc.renderValue"
        :key="item.key"
        :label="item.label"
        :value="item.key"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    uuid: String,
    attrs: Object,
    attrDesc: Object,
  },
})
export default class InputType extends Vue {}
</script>
