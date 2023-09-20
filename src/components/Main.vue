<template>
  <div class="container" :class="{ fullscreenMode: fullscreenMode, crtMode: crtMode }" v-on:click.right="noContextMenu">
    <div v-if="loggedIn">
      <Desktop :programs="programs" :programsOpen="programsOpen" @openProgram="openProgram" @closeProgram="closeProgram"
        @toggleTaskBar="toggleTaskBar" @minimizeWindow="minimizeWindow" @resetDesktopContext="resetDesktopContext"
        @fullscreenMode="toggleFullscreenMode" @crtMode="toggleCrtMode" />
      <Taskbar v-if="taskbarActive" :programs="programs" :programsOpen="programsOpen"
        :desktopStartMenuActive="desktopStartMenuActive" @toggleStartMenu="toggleStartMenu" @toggleTaskBar="toggleTaskBar"
        @toggleLoggedOn="toggleLoggedOn" @openProgram="openProgram" @minimizeWindow="minimizeWindow" />
    </div>
    <div v-else-if="programsOpen.length > 0">
      <LoginDesktop :programs="programs" :programsOpen="programsOpen" @openProgram="openProgram"
        @closeProgram="closeProgram" @minimizeWindow="minimizeWindow" @resetDesktopContext="resetDesktopContext"
        @fullscreenMode="toggleFullscreenMode" @crtMode="toggleCrtMode" />
    </div>
    <div v-else class="shutdown-screen">
      <span class="shutdown-message">It’s now safe to turn off your computer.</span>

      <span class="messages">This can be done by closing the page, or you can press Ctrl+R to reboot the computer.</span>

    </div>
    <span v-if="!fullscreenMode" ref="bottom-message" class="bottom-message">Reboot is invoked by reloading
      the page. ESC can close stuck windows if you click outside the screen.
    </span>
  </div>
</template>
<script>
import LoginDesktop from "./desktop/LoginDesktop.vue";
import Desktop from "./desktop/Desktop.vue";

import Taskbar from "./taskbar/Taskbar.vue";
import Directory from "../data/Directory.vue";
export default {
  name: "Main",
  props: {
    msg: String,
  },
  components: {
    Desktop,
    LoginDesktop,
    Taskbar,
  },
  data() {
    return {
      fullscreenMode: false,
      crtMode: true,
      desktopStartMenuActive: false,
      taskbarActive: false,
      programsOpen: [],
      loggedIn: false,
      programs: Directory,
      savedFiles: [],
      loginTitle: "Welcome To KittenOS Secret File Server"
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()

    if (!this.loggedIn) this.openProgram(this.loginTitle, 'Login', 'Login')
  },
  methods: {
    onResize() {
      this.fullscreenMode = this.fullscreenMode ? true : this.checkIsMobile()
      console.log(`Resize : ${window.innerWidth}x${window.innerHeight} => Fullscreen: ${this.fullscreenMode}`)
    },
    checkIsMobile() {
      // return false
      return window.innerWidth <= 720 || window.innerHeight <= 540
    },
    openProgram(fileName, fileIcon, fileType, files) {
      if (this.programsOpen.find(([title]) => title === fileName)) {
        console.log(`${fileName} found`);
      } else {
        console.log(`Opening ${fileName}`);

        // console.log(this.programs
        //   .filter((row) => row[0] === fileType)
        //   .map((row) => row));

        this.programsOpen.push([fileName, fileIcon, fileType, true, files]);
        this.toggleStartMenu(false)
      }

    },
    closeProgram(fileName) {
      console.log(`Closing ${fileName}`);

      if (fileName === this.loginTitle && !this.loggedIn) this.toggleLoggedOn() // Special Win95 Case

      for (let i = 0; i < this.programsOpen.length; i++) {
        console.log(this.programsOpen[i])
        if (this.programsOpen[i][0] == fileName) {
          console.log(`closing ${i}`)
          this.programsOpen.splice(i, 1);
        }
      }

      console.log(this.programsOpen)

      this.toggleStartMenu(false)
    },
    saveFile(fileName, fileIcon, fileType) {
      if (this.programsOpen.find(([title]) => title === fileName)) {
        console.log("Cant save file/folder as a real program");
      }
      if (this.savedFiles.find(([title]) => title === fileName)) {
        console.log("This saved file/filename already exists!");
      } else {
        this.savedFiles.push([fileName, fileIcon, fileType, true, []]);
      }
    },
    minimizeWindow(fileName) {
      if (!this.taskbarActive) return // refuse minimizing if taskbar is hiden

      this.toggleStartMenu(false)

      for (let i = 0; i < this.programsOpen.length; i++) {
        if (this.programsOpen[i][0] == fileName)
          this.programsOpen[i][3] = !this.programsOpen[i][3];
      }
    },
    resetDesktopContext() {
      this.desktopStartMenuActive = false;
    },
    toggleStartMenu(state = undefined) {
      console.log(state)
      if (state !== undefined) this.desktopStartMenuActive = state;
      else this.desktopStartMenuActive = !this.desktopStartMenuActive;
    },
    toggleLoggedOn() {
      this.loggedIn = !this.loggedIn;
      this.taskbarActive = this.loggedIn;
    },
    toggleTaskBar(state = undefined) {
      if (state !== undefined) this.taskbarActive = state;
      else this.taskbarActive = !this.taskbarActive;

      console.log(`Toogling TaskBar [${state}] => ${this.taskbarActive}`)

      if (!this.taskbarActive) this.fullscreenMode = this.fullscreenMode ? this.checkIsMobile() : this.fullscreenMode
    },
    closeStartMenu() {
      this.desktopStartMenuActive = false;
    },
    toggleFullscreenMode(mode = undefined) {
      if (mode !== undefined) this.fullscreenMode = mode;
      else this.fullscreenMode = !this.fullscreenMode;
    },
    toggleCrtMode() {
      this.crtMode = !this.crtMode;
    },
    noContextMenu(e) {
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-family: "W95A";
  font-smooth: never;
  -webkit-font-smoothing: none;
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }

  5% {
    opacity: 0.34769;
  }

  10% {
    opacity: 0.23604;
  }

  15% {
    opacity: 0.90626;
  }

  20% {
    opacity: 0.18128;
  }

  25% {
    opacity: 0.83891;
  }

  30% {
    opacity: 0.65583;
  }

  35% {
    opacity: 0.67807;
  }

  40% {
    opacity: 0.26559;
  }

  45% {
    opacity: 0.84693;
  }

  50% {
    opacity: 0.96019;
  }

  55% {
    opacity: 0.08594;
  }

  60% {
    opacity: 0.20313;
  }

  65% {
    opacity: 0.71988;
  }

  70% {
    opacity: 0.53455;
  }

  75% {
    opacity: 0.37288;
  }

  80% {
    opacity: 0.71428;
  }

  85% {
    opacity: 0.70419;
  }

  90% {
    opacity: 0.7003;
  }

  95% {
    opacity: 0.36108;
  }

  100% {
    opacity: 0.24387;
  }
}

.container {
  width: 100%;
  max-width: 640px;
  height: 480px;
  position: relative;
  overflow: hidden;

  &.crtMode {
    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(18, 16, 16, 0.1);
      opacity: 0;
      z-index: 100;
      pointer-events: none;
      animation: flicker 0.15s infinite;
    }

    &:before {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%,
          rgba(0, 0, 0, 0.1) 50%),
        linear-gradient(90deg,
          rgba(255, 0, 0, 0.1),
          rgba(0, 255, 0, 0.1),
          rgba(0, 0, 255, 0.1));
      z-index: 100;
      box-shadow: inset 0 0 100px rgba(0, 0, 0, 1);
      background-size: 100% 3px, 3px 100%;
      pointer-events: none;
    }
  }

  &.fullscreenMode {
    max-width: 100%;
    height: 100%;

    .desktop {
      height: 100% !important;
    }
  }

  >div {
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-direction: column;
  }

  .shutdown-screen {
    resize: none;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;

    span.shutdown-message {
      color: darkorange;
      font-size: xx-large;
    }

    span {
      color: #f1f1f1;
      margin: 1%;
    }
  }
}

.bottom-message {
  position: fixed;
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, 0%);
}

// .shutdown-screen {
//   border-radius: 0px;
//   // padding: 6px 6px;
//   resize: none;
//   height: 100%;
//   width: 100%;
//   pointer-events: none;
//   box-shadow: none;
//   outline: none;
//   z-index: 0;
//   color: #f1f1f1;
//   background-color: #111316;
//   margin: auto;
//   // border: 3px solid green;
//   padding: 10px;
// }
</style>
