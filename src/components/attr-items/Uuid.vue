<template>
  <div class="attr-item">
    <span class="label">{{ attrDesc.value }}</span>
    <span class="attr-right">{{ uuid }}</span>
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
export default class Uuid extends Vue {}
</script>
