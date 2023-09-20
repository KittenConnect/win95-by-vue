<template>
  <div class="login">
    <div class="login-window">
      <!-- <Program v-for="(file, index) in currentDirectory" v-bind:key="index" :fileName="file[0]" :fileIcon="file[1]"
        :fileType="file[2]" :files="file[4]" :programsOpen="programsOpen" @openProgram="openProgram" /> -->
      <img id="netlogon" :src="require('@/assets/img/netlogon.png')" height="64" />
      <div class="login-body">
        <div class="content">
          <img :src="require('@/assets/img/netlogin.png')" width="32" height="32" />
          <div class="form">
            <input autocomplete="false" name="hidden" type="text" style="display:none;">
            <p>Type a user name and password to connect to KittenOS.
            </p>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" class="form-control" autocomplete="off" v-model="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input :type="passwordType" autofocus id="password" class="form-control" autocomplete="off"
                v-model="password" v-on:keyup.enter="login">
            </div>
            <div class="form-group">
              <label for="domain">DOMAIN</label>
              <input type="text" disabled id="domain" class="form-control" autocomplete="off" v-model="domain">
            </div>
          </div>
        </div>

        <div class="login-buttons">
          <div class="button" v-on:click="login">OK</div>
          <div class="button" v-on:click="closeProgram">Cancel</div>
        </div>
      </div>
    </div>
    <div class="details-bar">
      <div>
        You're currently not logged in the KittenOS 95-E10 Latest Edition.
      </div>
    </div>
    <!-- Login Error Dialog  -->
    <div class="dialog" v-if="alert" @contextmenu="$event.preventDefault()">
      <div class="dialog-window">
        <div class="menu-bar">
          <div class="title">
            <span class="icon" :style="{
              backgroundImage:
                'url(' + require('@/assets/icon/Login.png') + ')',
            }"></span><span>Failed login</span>
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
            <div>The KittenOS password you typed is incorrect <br />Are you registered on {{ domain }} domain?</div>
          </div>
          <div class="dialog-buttons">
            <div class="button" v-on:click="reload">OK</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Program from "../desktop/programs/Program.vue";
export default {
  name: "Login",
  components: {
    // Program,
  },
  data() {
    return {
      username: 'Administrator',
      password: '',
      domain: 'KITTEN',
      currentDirectory: [],
      alert: false,
    };
  },
  props: {
    fileName: String,
    fileIcon: String,
    fileType: String,
    files: Array,
    programsOpen: Array,
  },
  computed: {
    passwordType() { return this.password.length > 0 ? 'password' : 'text' }
  },
  created() {
    // this.loadDirectory(this.programsOpen, this.fileName);
  },
  mounted() {
    this.$emit('resizeWindow', "400px", "220px", true)
  },
  methods: {
    reload() {
      window.location.href = '/'
    },
    login() {
      this.alert = true
    },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
    // loadDirectory(searchDirectory, fileSearch) {
    //   let filteredResult = searchDirectory
    //     .filter((row) => row[0] === fileSearch)
    //     .map((row) => row);
    //   this.currentDirectory = filteredResult[0][4];
    // },
    // openProgram(fileName, fileIcon, fileType, files) {
    //   this.$emit("openProgram", fileName, fileIcon, fileType, files);
    //   /*  if (fileType === "Folder") {
    //     let filteredResult = this.currentDirectory
    //       .filter((row) => row[0] === fileName)
    //       .map((row) => row);
    //     this.currentDirectory = filteredResult[0][4];
    //   } else {
    //     this.$emit("openProgram", fileName, fileIcon, fileType, files);
    //   }*/
    // },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  img {
    pointer-events: none;
  }

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
    justify-content: flex-start;
    user-select: none;
  }

  .login-window {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    overflow: hidden;
    @include v95Hover;
    // background-color: white;

    .login-body {
      display: flex;
      flex-direction: row;
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
        margin-top: 2%;
        text-align: center;
        height: 40px;

        div {
          margin-left: 16px;
          margin-top: 10%;
        }

        .form-group {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          margin-top: 2%;

          label {
            width: 25%;
          }

          input {
            @include v95Hover;
            width: 75%;
            margin-left: 5%;
            padding-left: 1%;
            // margin-top: 2%;

            &:active,
            &:focus {
              @include v95Hover;
            }
          }
        }

      }

      .button {
        @include v95;
        width: 75px;
        text-align: center;
        padding: 4px;
        margin: 4px;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        user-select: none;

        &:active,
        &:focus {
          @include v95Hover;
        }
      }
    }

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