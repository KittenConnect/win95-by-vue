<template>
  <div class="command">
    <div class="file-bar">
      <div class="link">
        File
        <div class="submenu">
          <!-- <div class="link" v-on:click="download(remoteDirectory)">Save Locally ...</div> -->
          <div class="link" v-on:click="closeProgram">Exit</div>
        </div>
      </div>
      <a href="https://github.com/ndabAP/vue-command" target="_blank" class="link">
        About
      </a>
      <div class="link">Help</div>
    </div>
    <!-- <textarea v-model="fileContent" autofocus></textarea> -->
    <vue-command v-if="prompt" :prompt="prompt" :hide-bar="true" font="W95A" :commands="commands" />
  </div>
</template>
<script>
import VueCommand, { createStdout, tableFormatter } from "vue-command";
import S3Directory from "../../data/S3Directory.vue";
import { Folders, getInfos } from "../../data/S3Directory.vue";
import "vue-command/dist/vue-command.css";

export default {
  name: "MS-DOS Prompt",
  data() {
    return {
      fileContent: '',
      remoteDirectory: [],
      workingDirectory: '/',
      workingDisk: 'C',
      prompt: ``,
      commands: {
        "hello": () => createStdout("Hello world"),
        "exit": () => this.closeProgram(this.fileName),
        // "cd": () => this.,
        "cd": async (args) => { if (args.length != 2); await this.changeDirectory(args[1]); return createStdout(`${this.workingDirectory}`) },
        "dir": (args) => {
          console.log(args); return createStdout(tableFormatter(
            this.remoteDirectory.map(
              a => getInfos(a)
            )
          ));
        },
        "reboot": () => { /* Mimic Win95-era reboot rundll invocation + reload page */
          localStorage.clear()
          location.reload()
          return createStdout('START C:\\Windows\\RUNDLL.EXE user.exe,exitwindowsexec ...')
        },
      },
    };
  },
  components: {
    VueCommand
  },
  props: {
    fileName: String,
    programsOpen: Array,
  },
  created() {
    this.loadContent(this.programsOpen, this.fileName)
    this.changeDirectory()
  },
  methods: {
    async changeDirectory(path = '/') {
      if (path === '..') {
        let p = this.workingDirectory.split('/').filter(e => e)
        p.pop()
        path = "/" + [...p].join('/')
      }
      if (!path.startsWith('/')) {
        let p = this.workingDirectory.split('/').filter(e => e)
        path = "/" + [...p, path].join('/')
        console.log(p)
        console.log(path)
      }
      this.remoteDirectory = await S3Directory(Folders.MinIO, path)
      this.workingDirectory = path
      this.prompt = `${this.workingDisk}:${this.workingDirectory.split('/').join('\\')}> `
      // if (!this.loaded) this.loaded = true
      // console.log('before')
      // (async () => {
      //   let dir = await .then((data) => data)
      //
      //   this.workingDirectory = path
      //   this.prompt = `${this.workingDisk}:${this.workingDirectory.split('/').join('\\')}> `
      //   if (!this.loaded) this.loaded = true
      //   // console.log('after-before before-after')
      //   //   (data) => {
      //   //     this.remoteDirectory = data
      //   //     this.workingDirectory = path
      //   //     this.prompt = `${this.workingDisk}:${this.workingDirectory.split('/').join('\\')}> `
      //   //     if (!this.loaded) this.loaded = true
      //   //     console.log('after-before before-after')
      //   //   }
      //   // )
      // })();
      // console.log('after')
    },
    listDirectory() {
      // this.workingDirectory = path
      // if (!path.startsWith('/')) {
      //   path = `${this.workingDirectory}/${path}`
      // }

      // this.prompt = `${this.workingDisk}:${this.workingDirectory.split('/').join('\\')}> `
    },
    loadContent(searchDirectory, fileSearch) {
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);
      this.remoteDirectory = filteredResult[0][4]
      console.log('CMD Path :' + this.remoteDirectory);
      if (this.remoteDirectory)
        this.workingDisk = this.remoteDirectory[0]
      // fetch(this.remoteDirectory)
      //   .then(response => response.text())
      //   .then(text => this.fileContent = text)
      //   .catch(err => console.log('Error loading DOS S3-Based directory:', err));
    },
    download(fileName) {
      window.location.href = fileName
    },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
  },
};
</script>
<style lang="scss" scoped>
.command {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .file-bar {
    background-color: rgba(191, 193, 192, 1);
    padding: 2px 0px 0px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    z-index: 1;

    .link {
      cursor: default;
      text-decoration: none;
      padding: 0px 4px 0px 4px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 18px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 4px;
        left: 4px;
        width: 6px;
        height: 1px;
        background: #000000;
      }

      &:hover,
      &:active {
        background-color: $highlightV95;
        color: white;

        &:after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: 4px;
          width: 6px;
          height: 1px;
          background: #ffffff;
        }

        >.submenu {
          display: block;
        }
      }

      .submenu {
        @include v95;
        color: initial;
        text-decoration: none;
        position: absolute;
        min-width: 122px;
        top: 100%;
        left: 0;
        display: none;
        padding: 2px;
        z-index: 10;
        user-select: none;
        background-color: rgba(191, 193, 192, 1);
      }
    }
  }

  .vue-command {
    border-radius: 0px;
    // padding: 6px 6px;
    resize: none;
    height: 100%;
    width: 100%;
    pointer-events: all;
    box-shadow: none;
    outline: none;
    z-index: 0;
    color: #f1f1f1;
    background-color: #111316;

    &:focus,
    &:active {
      outline: none;
      box-shadow: inset 0 0 0px 1px black;
      border-radius: 0px;
    }
  }
}
</style>