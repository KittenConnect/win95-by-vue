<template>
  <div v-bind:style="{
    left: this.getX + 'px',
    top: this.getY + 'px',
  }" class="desktopContextMenu" ref="menu">
    <!-- <div class="link"><span>Arrange Icons</span> <span>›</span></div>
    <div class="link">Line Up Icons</div> -->
    <div v-on:click="this.$emit('crtMode')" class="link">Disable&nbsp;CRT/Flicker</div>
    <div v-on:click="this.$emit('fullscreenMode')" class="link">Fullscreen Mode</div>
    <div class="divider"></div>
    <div class="link"><span>New</span> <span>›</span></div>
    <div class="divider"></div>
    <div class="link">Properties</div>
  </div>
</template>
<script >
export default {
  name: "DesktopContextMenu",
  props: {
    position: Array,
  },
  data() {
    return {
      showContextMenu: this.active,
    };
  },
  mounted: function () {
    let self = this.$refs.menu.getBoundingClientRect(); let parent = self.parentNode.getBoundingClientRect();

    if (parent) {
      console.log(parent)
      console.log(self)
      console.log([(self.x - parent.x) + self.width <= parent.width])
      console.log([(self.y - parent.y) + self.height <= parent.height])
      // if (parent.height - self.height <= this.x)
      //   this.desktopContextMenuPosition[0] =
      //     e.pageX - this.$refs.desktop.getBoundingClientRect().left;
      // this.desktopContextMenuPosition[1] =
      //   e.pageY - this.$refs.desktop.getBoundingClientRect().top;
      // this.$refs.menu.style.left = `calc(${parent.style.left} + 5%)`;
      // this.$refs.menu.style.top = `calc(${parent.style.top} + 5%)`;
    }
  },
  computed: {
    getX() {
      return (
        this.$refs.menu.getBoundingClientRect().x - this.$refs.menu.parentNode.getBoundingClientRect().x
      ) + this.$refs.menu.getBoundingClientRect().width <= this.$refs.menu.parentNode.getBoundingClientRect().width ?
        this.position[0] : this.position[0] - this.$refs.menu.getBoundingClientRect().width
    },
    getY() { return (this.$refs.menu.getBoundingClientRect().y - this.$refs.menu.parentNode.getBoundingClientRect().y) + this.$refs.menu.getBoundingClientRect().height <= this.$refs.menu.parentNode.getBoundingClientRect().height ? this.position[0] : this.position[1] - this.$refs.menu.getBoundingClientRect().height },
    // getY() { return this.password.length > 0 ? 'password' : 'text' },
  },
};
</script>
<style lang="scss" scoped>
.desktopContextMenu {
  @include v95();
  position: absolute;
  min-width: 122px;
  padding: 2px;
  z-index: 10;
  user-select: none;

  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    height: 24px;
    padding: 4px 8px 4px 16px;

    &:hover {
      background-color: $highlightV95;
      color: white;
    }

    span {
      &:nth-of-type(2) {
        font-weight: bold;
      }
    }
  }

  .divider {
    margin-right: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(254, 254, 254) rgb(223 223 223) rgb(254, 254, 254) rgb(254, 254, 254);
  }
}
</style>