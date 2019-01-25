<template>
    <div class="text-xs-center">
      <h1>Board</h1>
       <v-btn
        color="red lighten-2"
        @click="barrierOnOff"
        dark
      >
        Turn On
      </v-btn>
      
  </div>
</template>
<script>
  export default {
    data() {
      return {
        barrier: false,
      }
    },
    methods: {
      barrierOnOff() {
        this.$electron.ipcRenderer.send('bgpio', { type: 'Barrier', value: this.barrier })
      },
    },
  }
</script>