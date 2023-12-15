<template>
  <div class="embed">
    <embed ref="embed" :src="openURL" />
    <!-- <div class="details-bar">
      <div>
        {{ this.$refs.embed ? "1" : "0" }}
        object(s)
      </div>
    </div> -->
  </div>
</template>
<script>

export default {
  name: "Internet",
  data() {
    return {
      openURL: [],
    };
  },
  props: {
    fileName: String,
    programsOpen: Array,
  },
  created() {
    this.loadURL(this.programsOpen, this.fileName);
  },
  methods: {
    loadURL(searchDirectory, fileSearch) {
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);
      this.openURL = filteredResult[0][4] || [/*'https://en.m.wikipedia.org/wiki/Windows_95', */'https://pierrepapierciseaux.net/.skynet/'];
      console.log(`Embeding URL : ${this.openURL}`);
    },
    closeProgram(fileName) {
      this.$emit("closeProgram", fileName);
    },
  },
};
</script>
<style lang="scss" scoped>
.embed {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

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

  embed {
    resize: none;
    height: 100%;
    width: 100%;
  }
}
</style>