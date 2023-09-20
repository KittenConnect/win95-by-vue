<template>
  <div class="AOL">
    <div>
      <div>
        <span class="title">Critical Error</span>
        <span>A fatal exception 0x1337 has occurred at ./aol-wrapper.vb:1337 in
          "AOL.exe". The current application will be terminated.</span>
        <span><br />Press any key to continue <span>_</span></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AOL",
  props: {
    fileName: String,
  },
  methods: {
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
  },
  mounted() {
    this.$emit("maximize");
    this.$emit("toggleTaskBar");
    window.addEventListener("keypress", function (e) {
      this.$emit("toggleTaskBar")
      this.closeProgram(this.fileName, e);
    }.bind(this));
  }
};
</script>
<style lang="scss" scoped>
.AOL {
  display: block;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  >div {
    background: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    color: white;
    font-size: 16px;
    line-height: 20px;

    >div {
      background: blue;
      display: flex;
      flex-direction: column;
      text-align: left;
      max-width: 350px;

      span.title {
        color: blue;
        margin-bottom: 20px;
        background: white;
      }

      span span {
        animation: cursor-blink 1.5s steps(2) infinite;
      }
    }
  }

  @keyframes cursor-blink {
    0% {
      opacity: 0;
    }
  }
}
</style>