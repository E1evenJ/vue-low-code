<template>
  <div class="attr-item">
    <span class="label">{{ attrDesc.value }}</span>
    <el-checkbox class="attr-right" v-model="attrs.textClear"></el-checkbox>
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
export default class TextClear extends Vue {}
</script>
