<template>
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
</template>

<script>
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
      const result = await this.$store.dispatch('db/fetchSnapshot');
      console.log(result);
    }
  }
}
</script>
