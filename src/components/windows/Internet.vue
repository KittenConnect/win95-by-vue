<template>
  <div class="embed">
    <embed :src="openURL" />
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
      console.log('Embeding URL :');
      let filteredResult = searchDirectory
        .filter((row) => row[0] === fileSearch)
        .map((row) => row);
      this.openURL = filteredResult[0][4] || [/*'https://en.m.wikipedia.org/wiki/Windows_95', */'https://pierrepapierciseaux.net/.skynet/'];
      console.log(this.openURL);
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

  embed {
    resize: none;
    height: 100%;
    width: 100%;
  }
}
</style>