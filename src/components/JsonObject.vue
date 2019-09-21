<template>
  <span>
    <span v-if="enabled">
    <a id="container" @click.stop="enabled = !enabled">{</a>
    <div v-show="enabled" class="value" v-for="v, k in json" v-bind:key="k">
      <a id="container">{{k}}</a>: <Json v-bind:json="v" />
    </div>
    <a id="container" @click.stop="enabled = !enabled">}</a>
    </span>
    <span v-else id="container" @click.stop="enabled = !enabled">{...}</span>
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
