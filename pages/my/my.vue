<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
    <!-- <my-userinfo></my-userinfo> -->
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('m_user',['token'])
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
