// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Json from './components/Json'
import JsonObject from './components/JsonObject'
import JsonArray from './components/JsonArray'

Vue.config.productionTip = false

Vue.component('Json', Json)
Vue.component('JsonObject', JsonObject)
Vue.component('JsonArray', JsonArray)

// Message bus global communication
window.bus = new Vue()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
