<template>
    <div ref="desktop" class="desktop" @contextmenu="$event.preventDefault()">
        <div ref="background" class="background" />
        <!-- background-image: url('/WallpaperDog-5479332.jpg');
    background-size: contain; -->
        <div class="programs">
            <!-- <Window v-bind:key="index" v-for="(program, index) in programsOpen" :fileName="program[0]"
                :fileIcon="program[1]" :fileType="program[2]" :files="program[4]" :minimize="program[3]"
                :programsOpen="programsOpen" @openProgram="openProgram" @closeProgram="closeProgram"
                @minimizeWindow="minimizeWindow" height="190px" width="400px">
                <component :is="program[1]"></component>
            </Window> -->
            <Window v-bind:key="index" v-for="(program, index) in programsOpen" :fileName="program[0]"
                :fileIcon="program[1]" :fileType="program[2]" :files="program[4]" :minimize="program[3]"
                :programsOpen="programsOpen" @openProgram="openProgram" @closeProgram="closeProgram"
                @minimizeWindow="minimizeWindow" x="5%" y="5%">
                <component :is="program[1]"></component>
            </Window>
            <!-- <Program v-for="(program, index) in programs" v-bind:key="index" :fileName="program[0]" :fileIcon="program[1]"
          :fileType="program[2]" :files="program[4]" @openProgram="openProgram" /> -->
        </div>
        <!-- <DesktopContextMenu v-if="this.desktopContextMenuActive" :position="this.desktopContextMenuPosition"
            @fullscreenMode="$emit('fullscreenMode')" @crtMode="$emit('crtMode')" /> -->
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
    name: "LoginDesktop",
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
    // data() {
    //     // return {
    //     //     desktopContextMenuActive: false,
    //     //     desktopVolumeMenuActive: false,
    //     //     desktopContextMenuPosition: [0, 0],
    //     // };
    // },
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
        // resetDesktopContextMenu() {
        //     this.$emit("resetDesktopContext");
        //     this.desktopContextMenuActive = false;
        //     this.desktopVolumeMenuActive = false;
        // },
        // desktopContextMenu(e) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     this.$emit("resetDesktopContext");
        //     this.desktopContextMenuPosition[0] =
        //         e.pageX - this.$refs.desktop.getBoundingClientRect().left;
        //     this.desktopContextMenuPosition[1] =
        //         e.pageY - this.$refs.desktop.getBoundingClientRect().top;
        //     this.desktopContextMenuActive = true;
        // },
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
    background-image: url('/WallpaperDog-5479332.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    overflow: hidden;
    resize: both;

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