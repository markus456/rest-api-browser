<template>
  <span @click.stop="enabled = !enabled">
    <a id="container">{</a>
    <div v-show="enabled" class="value" v-for="v, k in json" v-bind:key="k">
      <a id="container">{{k}}</a>: <Json v-bind:json="v" />
    </div>
    <span v-show="!enabled">...</span>
    <a id="container">}</a>
  </span>
</template>

<script>
  export default {
      name: 'JsonObject',
      props: ['json'],
      data() {
          return {
              enabled: true,
          }
      },
      mounted() {
          var vm = this
          window.bus.$on('url-changed', function(url) {
              vm.$data.enabled = true
          })
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .value {
      margin-left: 1em;
  }
</style>
