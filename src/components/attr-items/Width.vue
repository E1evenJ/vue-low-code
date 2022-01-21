<template>
  <div class="attr-item">
    <span class="label">{{ attrDesc.value }}</span>
    <el-slider
    class="attr-right"
      v-model="attrs.span"
      :min="attrDesc.min"
      :max="attrDesc.max"
      :step="attrDesc.step"
      show-stops
    ></el-slider>
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
export default class Width extends Vue {}
</script>
