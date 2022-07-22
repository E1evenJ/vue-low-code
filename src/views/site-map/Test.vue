<template>
  <Sprite :texture="sample"></Sprite>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import sampleImg from '../../assets/sample.png'

@Options({})
export default class Test extends Vue {
  sample = sampleImg
}
</script>
