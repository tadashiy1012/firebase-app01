<template>
  <div>
    <h2>database delete</h2>
    <div v-if="loginState">
      <select name="dbKey" v-model="selectedKey">
        <option v-for="(item, index) in keys" v-bind:key="index">
          {{ item }}
        </option>
      </select>
      <br />
      <button v-on:click="clickDeleteBtn">delete</button>
    </div>
    <div v-else>
      <p>component is hidden. Please login.</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedKey: ''
    };
  },
  computed: {
    loginState: function() {
      return this.$store.getters['login/getLogin'];
    },
    keys: function() {
      const ss = this.$store.getters['db/getSnapshot'];
      const keys = Object.keys(ss);
      this.selectedKey = keys[0];
      return keys;
    }
  },
  methods: {
    clickDeleteBtn: async function() {
      console.log(this.selectedKey);
      const result = await this.$store.dispatch('db/deleteData', this.selectedKey);
      console.log(result);
      alert('delete ok!');
      const result2 = await this.$store.dispatch('db/fetchSnapshot');
      console.log(result2);
    }
  }
}
</script>
