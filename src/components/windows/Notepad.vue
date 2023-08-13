<template>
  <div class="notepad">
    <div class="file-bar">
      <div class="link">
        File
        <div class="submenu">
          <div class="link" v-on:click="download(realPath)">Save Locally ...</div>
          <div class="link" v-on:click="closeProgram">Exit</div>
        </div>
      </div>
      <a href="https://github.com/johnuberbacher/vue-95" target="_blank" class="link">
        About
      </a>
      <div class="link">Help</div>
    </div>
    <textarea v-model="fileContent" autofocus></textarea>
  </div>
</template>
<script>
export default {
  name: "Notepad",
  data() {
    return {
      fileContent: '',
      realPath: [],
      saveButton: false,
    };
  },
  props: {
    fileName: String,
    programsOpen: Array,
  },
  created() {
    this.loadContent(this.programsOpen, this.fileName)
  },
  methods: {
    loadContent(searchDirectory, fileSearch) {
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);
      this.realPath = filteredResult[0][4]
      console.log('NotePad URL :' + this.realPath);
      if (this.realPath)
        fetch(this.realPath)
          .then(response => response.text())
          .then(text => this.fileContent = text)
          .then(() => this.saveButton = true)
          .catch(err => console.log('Error loading file text:', err));
    },
    download(fileName) {
      if (fileName) window.location.href = fileName
      else window.open("data:x-application/text," + escape(this.fileContent))
    },
  },
  closeProgram(fileName) {
    this.$emit("closeProgram", fileName);
  },
}
</script>
<style lang="scss" scoped>
.notepad {
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
      pointer-events: all;
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

  textarea {
    border-radius: 0px;
    padding: 6px 6px;
    resize: none;
    height: 100%;
    width: 100%;
    pointer-events: all;
    box-shadow: none;
    outline: none;
    z-index: 0;

    &:focus,
    &:active {
      outline: none;
      box-shadow: inset 0 0 0px 1px black;
      border-radius: 0px;
    }
  }
}
</style>