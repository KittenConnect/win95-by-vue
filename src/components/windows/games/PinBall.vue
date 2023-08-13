<template>
  <div class="embed">
    <embed :src="openURL" />
    <!-- <div class=emscripten id=status>Downloading...</div> -->
    <!-- <div class=emscripten><progress hidden id=progress max=100 value=0></progress></div> -->
    <!-- <canvas class="emscripten" id="canvas" style="display:none;" tabindex=-1></canvas> -->
    <!-- <script async src="https://alula.github.io/SpaceCadetPinball/SpaceCadetPinball.js"></script> JS below for Vue compat -->
  </div>
</template>
<script>
export default {
  name: "Internet",
  data() {
    return {
      openURL: [],
    };
  },
  props: {
    fileName: String,
    programsOpen: Array,
  },
  created() {
    // this.loadURL(this.programsOpen, this.fileName);
  },
  mounted() {
    // this.display()
  },
  methods: {
    display() {
      var statusElement = document.getElementById("status"),
        progressElement = document.getElementById("progress"),
        canvas = document.getElementById("canvas"),
        Module = {
          preRun: [],
          postRun: [],
          print: function () {
            var e = document.getElementById("output");
            return e && (e.value = ""),
              function (e) {
                arguments.length > 1 && (e = Array.prototype.slice.call(arguments).join(" ")), console.log(e)
              }
          }(),
          printErr: function (e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments).join(" ")), console.error(e)
          },
          canvas: function () {
            var e = canvas;
            console.log('Canvas:' + e)
            return e.addEventListener("webglcontextlost", (function (e) {
              alert("WebGL context lost. You will need to reload the page."), e.preventDefault()
            }), !1), e
          }(),
          setStatus: function (e) {
            if (Module.setStatus.last || (Module.setStatus.last = {
              time: Date.now(),
              text: ""
            }), e !== Module.setStatus.last.text) {
              var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/),
                n = Date.now();
              if (!(t && n - Module.setStatus.last.time < 30)) {
                if (Module.setStatus.last.time = n, Module.setStatus.last.text = e, t) e = t[1], progressElement.value = 100 * parseInt(t[2]), progressElement.max = 100 * parseInt(t[4]), progressElement.hidden = !1;
                else progressElement.value = null, progressElement.max = null, progressElement.hidden = !0, document.getElementById("canvas").style.display = "";
                statusElement.innerHTML = e, "" === e ? (statusElement.style.display = "none", progressElement.style.display = "none") : (statusElement.style.display = "", progressElement.style.display = "")
              }
            }
          },
          totalDependencies: 0,
          monitorRunDependencies: function (e) {
            this.totalDependencies = Math.max(this.totalDependencies, e), Module.setStatus(e ? "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" : "All downloads complete.")
          }
        };
      Module.setStatus("Downloading..."), window.onerror = function () {
        Module.setStatus("Exception thrown, see JavaScript console"), Module.setStatus = function (e) {
          e && Module.printErr("[post-exception status] " + e)
        }
      }

      let script = document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = "https://alula.github.io/SpaceCadetPinball/SpaceCadetPinball.js";

      document.head.appendChild(script);
      document.head.removeChild(script);
    },
    // loadURL(searchDirectory, fileSearch) {
    //   let filteredResult = searchDirectory
    //     .filter((row) => row[0] === fileSearch)
    //     .map((row) => row);
    //   console.log('Internet URL :');
    //   this.openURL = filteredResult[0][4] || ['https://www.google.com/webhp?igu=1'];
    //   console.log(this.openURL);
    // },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
  },
};
</script>
<style lang="scss" scoped>
.embed {
  height: 100%;
  overflow: hidden;

  embed {
    display: flex;
    resize: none;
    height: 100vw;
    width: 100vh;
  }
}
</style>