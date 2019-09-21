<template>
  <div>

    <div id="header">
      <p>REST API Browser</p>
      <input v-model="uri"
             @keyup.enter="doFetch"
             @keyup.up="prevUrl"
             @keyup.down="nextUrl"
             placeholder="Enter REST-API URL"
             type="url"
             autofocus/>
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
              uri: '',
              history: []
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
                  .then(() => {
                      if (this.$data.history[this.$data.history.length - 1] != this.$data.uri) {
                          this.$data.history.push(this.$data.uri)
                      }
                      this.$data.history_pos = this.$data.history.length - 1
                  })
                  .catch(err => this.$data.raw_data = 'Failed to fetch API: ' + err)
          },
          prevUrl() {
              if (this.$data.history_pos > 0) {
                  this.$data.history_pos--
              }
              this.$data.uri = this.$data.history[this.$data.history_pos]
          },
          nextUrl() {
              if (this.$data.history_pos < this.$data.history.length -1) {
                  this.$data.history_pos++
                  this.$data.uri = this.$data.history[this.$data.history_pos]
              }
          },
      }
  }
</script>

<style>
  #header {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: left;
      color: #d9eeec;
      background-color: #64b3cd;
      border: 1px solid #da9833;
  }

  #header p {
      padding-right: 15px;
  }

  #header input {
      flex: auto;
      font-size: 16px;
      padding-left: 15px;
      font-family: monospace;
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
      background-color: #d9eeec;
      font-family: monospace;
  }

  #container {
      background-color: #d9eeec;
      color: #3c70a4;
  }

  #container:hover {
      background-color: #64b2cd;
  }

</style>
