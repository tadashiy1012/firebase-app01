<template><div>
  <div>
    <h2>database view</h2>
    <div v-if="loginState">
      <textarea v-model="dbData"></textarea>
      <br />
      <button v-on:click="clickFetchBtn">fetch</button>
    </div>
    <div v-else>
      <p>component is hidden. Please login.</p>
    </div>
  </div>
  <div>
    <h2>database input</h2>
    <div v-if="loginState">
      <label>
        <span>name</span>
        <input type="text" v-model="inName" />
      </label>
      <br />
      <label>
        <span>body</span>
        <input type="text" v-model="inBody" />
      </label>
      <br />
      <button v-on:click="clickSendBtn">send</button>
    </div>
    <div v-else>
      <p>component is hidden. Please login.</p>
    </div>
  </div>
</div></template>

<script>
import { execFetchDb, execPushDb } from './../fbFuncs';
export default {
  data: function() {
    return {
      inName: '',
      inBody: ''
    };
  },
  computed: {
    loginState: function() {
      return this.$store.getters['login/getLogin'];
    },
    dbData: function() {
      const ss = this.$store.getters['db/getSnapshot'];
      console.log(ss);
      return JSON.stringify(ss);
    }
  },
  methods: {
    clickFetchBtn: async function() {
      const result = await this.$store.dispatch('db/fetchSnapshot');
      console.log(result);
    },
    clickSendBtn: async function() {
      console.log(this.inName, this.inBody);
      const tgt = {
        sender: this.inName,
        body: this.inBody
      };
      const result = await this.$store.dispatch('db/pushData', tgt);
      console.log(result);
      alert('send ok!');
      const result2 = await this.$store.dispatch('db/fetchSnapshot');
      console.log(result2);
    }
  }
}
</script>
