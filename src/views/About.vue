<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Application, Sprite } from 'pixi.js'
// import sampleImg from '../../assets/sample.png'

@Options({})
export default class Home extends Vue {
  mounted() {
    // const app = new Application()
    // this.$el.appendChild(app.view)
    // let sprite = Sprite.from(sampleImg)
    // app.stage.addChild(sprite)
    // // Add a variable to count up the seconds our demo has been running
    // let elapsed = 0.0
    // // Tell our application's ticker to run a new callback every frame, passing
    // // in the amount of time that has passed since the last tick
    // app.ticker.add((delta: number) => {
    //   // Add the time to our total elapsed time
    //   elapsed += delta
    //   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    //   // by 50 to slow the animation down a bit...
    //   sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0
    // })
  }
}
</script>
