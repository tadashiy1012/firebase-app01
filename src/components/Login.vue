<template>
  <div>
    <p>state:<span>{{loginState}}</span></p>
    <div v-if="loginState">
      <p>login ok!</p>
      <button v-on:click="logoutClick">log out</button>
    </div>
    <div v-else>
      <button v-on:click="loginClick">log in</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { execLoginProcA, execLoginProcB, execLogout } from './../fbFuncs';
export default {
  computed: {
    loginState: function() {
      return this.$store.getters['login/getLogin'];
    }
  },
  methods: {
    loginClick: async function() {
      const result = await execLoginProcA();
      console.log(result);
      if (result.user === null || result.user === void 0) {
        const result = await execLoginProcB();
        console.log(result);
      } else {
        const result = await this.$store.dispatch('login/asyncSetLogin');
        console.log(result);
      }
    },
    logoutClick: async function() {
      const result = await execLogout();
      console.log(result);
      const payload = {newLoginState: false};
      const resultB = await this.$store.dispatch('login/setLogin', payload);
      console.log(resultB);
    }
  }
}
</script>
