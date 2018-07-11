<template>
  <div>
    <h2>database view</h2>
    <textarea v-model="dbData"></textarea>
    <br />
    <button v-on:click="clickFetchBtn" v-if="loginState">fetch db data</button>
  </div>
</template>

<script>
import { execFetchDb } from './../funcs';
export default {
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
      const fetched = await execFetchDb()
      console.log(fetched.val());
      const result = await this.$store.dispatch('db/setSnapshot', fetched.val());
      console.log(result);
    }
  }
}
</script>
