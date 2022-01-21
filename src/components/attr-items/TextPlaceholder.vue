<template>
  <div class="attr-item">
    <span class="label">{{ attrDesc.value }}</span>
    <el-input class="attr-right" v-model="attrs.placeholder"></el-input>
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
export default class TextPlaceholder extends Vue {}
</script>
