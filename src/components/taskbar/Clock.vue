<template>
  <div class="taskbar-clock">
    <div :style="{
      backgroundImage: 'url(' + require('@/assets/icon/Volume.png') + ')',
    }" class="taskbar-audio"></div>
    <span :title="this.currentDate">{{ this.currentTime }}</span>
  </div>
</template>
<script>
export default {
  name: "Clock",
  components: {},
  mounted() {
    this.setTimeClock(); this.timer = setInterval(this.setTimeClock, 1000);
  },
  data() {
    return {
      currentTime: '',
      currentDate: '',
      timer: '',
    };
  },
  methods: {
    setTimeClock() {
      let now = new Date()
      this.currentTime = now.toLocaleTimeString([], { timeStyle: "short" });
      this.currentDate = now.toLocaleDateString([], { dateStyle: "short" });
    },
  },
};
</script>
<style lang="scss" scoped>
.taskbar-clock {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  white-space: nowrap;
  user-select: none;
  padding: 2px 4px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(10, 10, 10) rgb(254, 254, 254) rgb(254, 254, 254) rgb(10, 10, 10);
  box-shadow: rgb(223 223 223) 1px 1px 0px 0px inset;

  .taskbar-audio {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    background-size: 16px 16px;
    position: relative;
    display: block;
  }
}
</style>
