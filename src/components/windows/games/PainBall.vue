<template>
  <div class="embed">
    <div>
      <div>
        <input autocomplete="false" id="hidden" name="hidden" type="text" style="display:none;">
        <embed tabindex="0" id="game" src="https://alula.github.io/SpaceCadetPinball/index.html" v-on:load="loaded" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PainBall",
  props: {
    fileName: String,
  },
  data() {
    return {
      refocused: false,
    }
  },
  methods: {
    loaded() {
      // document.getElementById('game').addEventListener('keyup', this.onEscapeKeyUp);
      window.addEventListener("keyup", this.onEscapeKeyUp);
    },
    exit(ev) {
      this.$emit("toggleTaskBar", true)
      window.removeEventListener("keyup", this.onEscapeKeyUp);
      this.$emit("closeProgram", this.fileName, ev);
    },
    onEscapeKeyUp(evt) {
      console.log('ESCAPE')
      console.log(evt)
      if (evt.keyCode === 27) {
        this.exit()
      }
    },
  },
  mounted() {
    this.$emit("maximize");
    this.$emit("toggleTaskBar", false);

    // document.getElementById('game').addEventListener("load", function (ev) {
    //   console.log('Embed Loaded')
    //   // console.log(ev.target.)
    //   // Array.from(ev.target.getElementsByClassName('button close')).forEach(
    //   //   function (element) {
    //   //     console.log(element)
    //   //     element.addEventListener("keypress", function (e) {
    //   //       this.$emit("toggleTaskBar")
    //   //       this.closeProgram(this.fileName, e);
    //   //     }.bind(this));
    //   //     // do stuff
    //   //   }
    //   // );
    // })

    // window.
  }
};
</script>
<style lang="scss" scoped>
.embed {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;

  >div {
    display: flex;
    min-width: 100%;
    min-height: 100%;

    >div {
      display: flex;
      min-width: 100%;
      min-height: 100%;

      embed {
        resize: none;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>