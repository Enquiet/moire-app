<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>

</template>

<script>
import Header from '@/components/TheHeader.vue'
import Footer from '@/components/TheFooter.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: { Header, Footer },
  methods: {
    ...mapActions('baskets', ['loadToCart']),
    ...mapMutations('baskets', ['updateAccessKey']),
    async getLoadCart () {
      try {
        await this.loadToCart()
      } catch {
        this.$router.replace({ name: '404' })
      }
    }
  },
  created () {
    const saveAccessKey = localStorage.getItem('userAccessKey')
    if (saveAccessKey) {
      console.log(saveAccessKey)
      this.updateAccessKey(saveAccessKey)
    }
    this.getLoadCart()
  }
}
</script>
