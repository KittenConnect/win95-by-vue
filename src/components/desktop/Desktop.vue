<template>
  <div ref="desktop" class="desktop" v-on:click.left="resetDesktopContextMenu" v-on:click.right="desktopContextMenu">
    <div ref="background" class="background" />
    <div class="programs">
      <Window v-bind:key="program[0]" v-for="program in programsOpen" :fileName="program[0]" :fileIcon="program[1]"
        :fileType="program[2]" :files="program[4]" :minimize="program[3]" :fixedSize="program[5]"
        :programsOpen="programsOpen" @openProgram="openProgram" @closeProgram="closeProgram"
        @minimizeWindow="minimizeWindow" @toggleTaskBar="toggleTaskBar" @fullscreenMode="toggleFullScreen">
        <component :is="program[1]"></component>
      </Window>
      <Program v-for="(program, index) in programs" v-bind:key="index" :fileName="program[0]" :fileIcon="program[1]"
        :fileType="program[2]" :files="program[4]" @openProgram="openProgram" />
    </div>
    <DesktopContextMenu v-if="this.desktopContextMenuActive" :position="this.desktopContextMenuPosition"
      @fullscreenMode="$emit('fullscreenMode')" @crtMode="$emit('crtMode')" />
  </div>
</template>
<script>
import Window from "../windows/Window.vue";
import Internet from "../windows/Internet.vue";
import Folder from "../windows/Folder.vue";
import Notepad from "../windows/Notepad.vue";
import Program from "./programs/Program.vue";
import DesktopContextMenu from "./DesktopContextMenu.vue";
export default {
  name: "Desktop",
  components: {
    Program,
    DesktopContextMenu,
    Window,
    Notepad,
    Folder,
    Internet,
  },
  props: {
    programs: Object,
    programsOpen: Object,
    savedFiles: Object,
  },
  data() {
    return {
      desktopContextMenuActive: false,
      desktopVolumeMenuActive: false,
      desktopContextMenuPosition: [0, 0],
    };
  },
  methods: {
    openProgram(fileName, fileIcon, fileType, files) {
      this.$emit("openProgram", fileName, fileIcon, fileType, files);
    },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
    minimizeWindow(fileName) {
      this.$emit("minimizeWindow", fileName);
    },
    toggleTaskBar(state = undefined) {
      this.$emit("toggleTaskBar", state);
    },
    toggleFullScreen() {
      this.$emit("fullscreenMode");
    },
    resetDesktopContextMenu() {
      this.$emit("resetDesktopContext");
      this.desktopContextMenuActive = false;
      this.desktopVolumeMenuActive = false;
    },
    desktopContextMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit("resetDesktopContext");
      this.desktopContextMenuPosition[0] =
        e.pageX - this.$refs.desktop.getBoundingClientRect().left;
      this.desktopContextMenuPosition[1] =
        e.pageY - this.$refs.desktop.getBoundingClientRect().top;
      this.desktopContextMenuActive = true;
      console.log(`Opening Desktop Context Menu`)
      console.log(this.desktopContextMenuPosition)
      console.log([this.$refs.desktop.getBoundingClientRect().width, this.$refs.desktop.getBoundingClientRect().height])
    },
  },
};
</script>
<style lang="scss" scoped>
.desktop {
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  background-color: #008080;
  background: url('/WallpaperDog-5479332.jpg') no-repeat center center fixed;
  // background: url('/WallpaperWin95-2023.jpeg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  // background-image: url('/WallpaperDog-5479332.jpg');
  // background-size: contain;
  // background-repeat: no-repeat;
  // overflow: hidden;
  // resize: none;

  .programs {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
}
</style>