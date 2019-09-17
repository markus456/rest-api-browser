<template>
  <div>

    <div id="header">
      <h2>REST API Browser</h2>
    </div>

    <div id="inputs">
      <input v-model="uri" @keyup.enter="doFetch" placeholder="Enter REST-API URL"/>
      <button @click="doFetch">OK</button>
    </div>

    <Json id="content" v-if="raw_data" v-bind:json="raw_data" />
  </div>
</template>

<script>
  export default {
      name: 'Browser',
      data () {
          return {
              raw_data: null,
              uri: ''
          }
      },
      mounted() {
          var vm = this
          window.bus.$on('url-changed', function(url) {
              vm.$data.uri = url
              vm.doFetch()
          })
      },
      methods: {
          doFetch() {
              if (!this.$data.uri.startsWith('http://') && !this.$data.uri.startsWith('https://'))
              {
                  this.$data.uri = 'http://' + this.$data.uri
              }

              fetch(this.$data.uri)
                  .then(res => res.json())
                  .then(d => this.$data.raw_data = d)
                  .catch(err => this.$data.raw_data = 'Failed to fetch API: ' + err)
          }
      }
  }
</script>

<style>
  #header {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  #inputs {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  #content {
      position: absolute;
      left: 5%;
      margin: 1em;
      right: 5%;
  }

  #container:hover {
      background-color: #f0f0fa;
  }

</style>
