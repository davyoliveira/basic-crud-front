<template>
  <div>
    <img alt="Vue logo" src="@/assets/softplanLogo.png">
    <h1>Welcome to the CRUD of persons</h1>
    <button class="btn btn-primary" @click="goToPersonsPage">Go to CRUD persons</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  methods: {
    goToPersonsPage(){
      this.$router.push( {name : "personsPage"});
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
