<template>
  <span>
    <JsonArray v-if="Array.isArray(json)" v-bind:json="json"/>
    <JsonObject v-else-if="!Array.isArray(json) && json instanceof Object" v-bind:json="json"/>
    <a v-else-if="isUrl(json)" id="link" @click.stop="changeUrl" >{{json}}</a>
    <span v-else>{{JSON.stringify(json)}}</span>
  </span>
</template>

<script>
  export default {
      name: 'Json',
      props: ['json'],
      methods: {
          isUrl() {
              var s = this.$props.json
              return typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://'))
          },
          changeUrl(){
              window.bus.$emit('url-changed', this.$props.json)
          }
      }
  }
</script>

<style scoped>
  #link:hover {
      text-decoration: underline;
  }
</style>
