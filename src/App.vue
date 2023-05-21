<template>
      <headerComponent v-if="showHeader"/>
      <RouterView />
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import headerComponent from './components/public/headerComponent.vue'
import removeUserWhenExpired from './composable/removeUserWhenExpired.js'
export default{
  data(){
    return{
        showHeader: false,
        listOfPagesWithDefaultHeader: ['landingpage', 'aboutus', 'dishes', 'viewdish']
    }
  },
  components: {
    headerComponent
  },
  watch: {
        '$route': function(newVal, oldVal) {
          removeUserWhenExpired(localStorage.getItem("token"), localStorage.getItem("user"))
          if(this.listOfPagesWithDefaultHeader.includes(newVal.name)) this.showHeader = true
          else  this.showHeader = false
        },
  }
}
</script>
<style scoped>

</style>
