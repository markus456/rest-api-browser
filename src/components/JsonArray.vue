<template>
  <span>
    <span v-if="enabled || json.length == 0">
      <a id="container"  @click.stop="enabled = !enabled">[</a>
      <div id="value" v-for="v, k in json" v-bind:key="k">
        <Json v-bind:json="v" />
      </div>
      <a id="container"  @click.stop="enabled = !enabled">]</a>
    </span>
    <span id="container"  @click.stop="enabled = !enabled" v-else>[...]</span>
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
