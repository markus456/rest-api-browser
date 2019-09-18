<template>
  <span @click.stop="enabled = !enabled">
    <a id="container">[</a>
    <span v-if="enabled || json.length == 0">
      <div id="value" v-for="v, k in json" v-bind:key="k">
        <Json v-bind:json="v" />
      </div>
    </span>
    <span v-else>...</span>
    <a id="container">]</a>
  </span>
</template>

<script>
  export default {
      name: 'JsonArray',
      props: ['json'],
      data() {
          return {
              enabled: false,
          }
      },
      mounted() {
          var vm = this
          window.bus.$on('url-changed', function(url) {
              vm.$data.enabled = false
          })
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #value {
      margin-left: 1em;
  }
</style>
