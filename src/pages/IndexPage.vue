<template>
  <q-page class="row-auto items-center justify-evenly">
    <br><br>
    <div class="col-8 text-black text-center">
      <div class="text-h2 text-weight-light">
        Data <br> Transmitter
      </div>
    </div>
    <br><br>
    <div class="q-pa-xl">
      <usr_input/>
      <br>
    </div>
    <usr_button/>
  </q-page>
</template>

<script setup>
  import usr_input from 'components/usr_input.vue'
  import usr_button from 'components/usr_button.vue'
</script>

<style lang="scss">
  .q-page {
    background: #BE93C5;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
