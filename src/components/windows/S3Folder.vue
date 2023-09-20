<template>
  <div class="folder">
    <div class="file-explorer" @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="onDrop">
      <!-- <Program v-for="(file, index) in remoteDirectory" v-bind:key="index" :fileName="`${file[0]} - ${file[1]}`"
        :files="file[2]" fileIcon="Folder" fileType="S3Folder" :programsOpen="programsOpen" @openProgram="openProgram" /> -->
      <Program v-for="(file, index) in remoteDirectory" v-bind:key="index" :fileName="file[0]" :fileIcon="file[1]"
        :fileType="file[2]" :files="file[4]" :programsOpen="programsOpen" @openProgram="openProgram" />
    </div>
    <div class="details-bar">
      <div>
        {{ this.remoteDirectory ? this.remoteDirectory.length : "0" }} object(s)
      </div>
      <div v-if="isDragging">
        Release to upload your files
      </div>
      <div v-if="uploadFiles.length > 0"> {{ this.uploadFiles.length }} object(s) remaining for upload</div>
    </div>

    <!-- Upload a File Dialog  -->
    <div class="dialog" v-if="uploadFiles.length > 0" @contextmenu="$event.preventDefault()">
      <div class="dialog-window">
        <div class="menu-bar">
          <div class="title">
            <span class="icon" :style="{
              backgroundImage:
                'url(' + require('@/assets/icon/Programs.png') + ')',
            }"></span><span>Failed upload</span>
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
            <!-- <div>
              Your administrator still needs to aprove the file before it's available on the network. <br />
              <br />
              Do you really want to send {{
                uploadFiles[0].name }} ?
            </div> -->
            <div>Cannot upload {{ uploadFiles[0].name }} for the moment, contact your administrator if the problem
              persists.</div>
          </div>
          <div class="dialog-buttons">
            <!-- <form action="http://johnsmith.s3.amazonaws.com/" method="post" enctype="multipart/form-data" ref="uploadForm"
              style="display: none;">
              Key to upload: <input type="input" name="key" value="user/eric/" /><br />
              <input type="hidden" name="acl" value="public-read" />
              <input type="hidden" name="success_action_redirect"
                value="http://johnsmith.s3.amazonaws.com/successful_upload.html" />
              Content-Type: <input type="input" name="Content-Type" value="image/jpeg" /><br />
              <input type="hidden" name="x-amz-meta-uuid" value="14365123651274" />
              Tags for File: <input type="input" name="x-amz-meta-tag" value="" /><br />
              <input type="hidden" name="AWSAccessKeyId" value="AKIAIOSFODNN7EXAMPLE" />
              <input type="hidden" name="Policy" value="POLICY" />
              <input type="hidden" name="Signature" value="SIGNATURE" />
              File: <input ref="fileinput" type="file" name="file" /> <br />

            <input type="submit" name="submit" value="Upload to Amazon S3" />
            </form> -->
            <!-- <div class="button" v-on:click="upload(uploadFiles.shift())">Yes</div>
            <div class="button" v-on:click="uploadFiles.shift()">No</div> -->
            <div class="button" v-on:click="uploadFiles.shift()">OK</div>
            <div class="button" v-on:click="uploadFiles = []">Cancel</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Program from "../desktop/programs/Program.vue";
import S3Directory from "../../data/S3Directory.vue";
import { Folders } from "../../data/S3Directory.vue";

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

export default {
  name: "Folder",
  components: {
    Program,
  },
  data() {
    return {
      remoteDirectory: [],
      uploadFiles: [],
      isDragging: false,
      remoteURL: '',
      remotePath: '',
      remoteName: '',
      remoteData: {},
    };
  },
  props: {
    fileName: String,
    fileIcon: String,
    fileType: String,
    files: Array,
    programsOpen: Array,
  },
  mounted() {
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, this.preventDefaults)
    })

    this.loadDirectory(this.programsOpen, this.fileName);
  },
  unmounted() {
    events.forEach((eventName) => {
      document.body.removeEventListener(eventName, this.preventDefaults)
    })
  },
  methods: {
    preventDefaults(e) {
      e.preventDefault()
    },

    async loadDirectory(searchDirectory, fileSearch) {
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);

      this.remoteData = filteredResult[0][4]
      this.remoteName = filteredResult[0][4][0];
      this.remoteURL = filteredResult[0][4][1];
      this.remotePath = filteredResult[0][4][2];

      this.remoteDirectory = await S3Directory(Folders.MinIO, this.remotePath)
    },

    openProgram(fileName, fileIcon, fileType, files) {
      this.$emit("openProgram", fileName, fileIcon, fileType, files);
      /*  if (fileType === "Folder") {
        let filteredResult = this.remoteDirectory
          .filter((row) => row[0] === fileName)
          .map((row) => row);
        this.remoteDirectory = filteredResult[0][4];
      } else {
        this.$emit("openProgram", fileName, fileIcon, fileType, files);
      }*/
    },

    upload(file) {
      // var formData = new FormData()
      // formData.append('key', policy.key)
      // formData.append('acl', policy.acl)
      // formData.append('success_action_status', policy.success_action_status)
      // formData.append('policy', policy.policy)
      // formData.append('x-amz-credential', policy['x-amz-credential'])
      // formData.append('x-amz-algorithm', policy['x-amz-algorithm'])
      // formData.append('x-amz-date', policy['x-amz-date'])
      // formData.append('x-amz-security-token', policy['x-amz-security-token'])
      // formData.append('x-amz-signature', policy['x-amz-signature'])
      let formData = this.$refs.uploadForm;
      formData.append('Content-Type', file.type)
      formData.append('file', file)
      // this.$refs.fileinput.items.add(file)
      console.log(formData)
      console.log(this.$refs.uploadForm)
    },

    onDrop(e) {
      this.isDragging = false;
      console.log('Donne vas-y Donne')
      console.log(e.dataTransfer.files)
      this.uploadFiles = [...e.dataTransfer.files]
      // .files = this.uploadFiles[0]
      // this.$emit('files-dropped', [...e.dataTransfer.files])
    },

    dragover() {
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.folder {
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

    .link {
      cursor: default;
      padding: 0px 4px 0px 4px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 18px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
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

  .details-bar {
    @include v95Hover;
    background-color: rgba(191, 193, 192, 1);
    padding: 4px 2px 2px 2px;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    user-select: none;

    .divider {
      @include v95;
      height: 100%;
      margin-right: 4px;
      border-style: solid;
      border-width: 1px;
      // border-color: rgb(254, 254, 254) rgb(223 223 223) rgb(254, 254, 254) rgb(254, 254, 254);
    }
  }

  .file-explorer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    overflow: auto;
    @include v95Hover;
    background-color: white;

    .program {
      color: inherit;

      &:active {
        color: white;
      }
    }
  }
}

.dialog {
  position: fixed;
  top: 5%;
  right: 0;
  bottom: 0;
  left: 5%;
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
    width: 435px;
    height: 120px;
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
        height: 60px;

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