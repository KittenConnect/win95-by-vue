<template>
  <div class="dialog" @contextmenu="$event.preventDefault()">
    <div class="dialog-window">
      <div class="menu-bar">
        <div class="title">
          <span class="icon" :style="{
            backgroundImage:
              'url(' + require('@/assets/icon/' + fileIcon + '.png') + ')',
          }"></span><span>Confirmation needed</span>
        </div>
        <div class="actions">
          <div>
            <img :src="require('@/assets/icon/minimize.png')" />
          </div>
          <div>
            <img :src="require('@/assets/icon/maximize.png')" />
          </div>
          <div>
            <img :src="require('@/assets/icon/close.png')" />
          </div>
        </div>
      </div>
      <div class="dialog-body">
        <div class="content">
          <img :src="require('@/assets/icon/Warning.png')" width="32" height="32" />
          <div>Cannot display {{ fileName }}.<br /> Do you really want to open it ?</div>
        </div>
        <div class="dialog-buttons">
          <div class="button" v-on:click="download(realPath)">Yes</div>
          <div class="button" v-on:click="closeProgram">No</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  data() {
    return {
      realPath: [],
      fileIcon: [],
    };
  },
  props: {
    fileName: String,
    programsOpen: Array,
  },
  created() {
    this.loadDirectory(this.programsOpen, this.fileName);
  },
  methods: {
    loadDirectory(searchDirectory, fileSearch) {
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);
      console.log('File DL :');
      this.fileIcon = filteredResult[0][1];
      this.realPath = filteredResult[0][4];
      console.log(this.realPath);
    },
    download(fileName) {
      this.closeProgram(fileName)
      window.location.href = fileName
    },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  // position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .menu-bar {
    height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: $highlightV95;
    padding: 0px 3px;

    .title {
      padding: 2px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: white;

      .icon {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        background-size: 14px 14px;
        position: relative;
        margin-bottom: 2px;
        display: block;
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      div {
        width: 16px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(191, 193, 192, 1);
        border-style: solid;
        border-width: 1px;
        border-color: rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10) rgb(254, 254, 254);
        box-shadow: rgb(223 223 223) 1px 1px 0px 0px inset;

        img {
          -webkit-filter: invert(40%);
          filter: invert(40%);
        }
      }
    }
  }

  .dialog-window {
    width: 300px;
    height: 105px;
    padding: 2px;
    position: relative;
    z-index: 21;
    background-color: rgba(191, 193, 192, 1);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10) rgb(254, 254, 254);
    box-shadow: rgb(223 223 223) 1px 1px 0px 0px inset,
      rgb(132 133 132) 0px 0px 0px 1px inset;

    .dialog-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding: 16px 16px 8px 16px;
        margin-bottom: 4px;
        text-align: center;
        height: 40px;

        div {
          margin-left: 16px;
        }
      }

      .dialog-buttons {
        display: flex;
      }

      .button {
        @include v95;
        width: 90px;
        text-align: center;
        padding: 4px;
        margin: 4px;
        pointer-events: auto;
        display: flex;
        flex-direction: column;

        &:active,
        &:focus {
          @include v95Hover;
        }
      }
    }
  }
}
</style>