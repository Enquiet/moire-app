<template>
  <header class="header">
    <div class="header__wrapper container">
        <span class="header__info">Каталог</span>
        <a class="header__logo" href="#">
            <img src="img/svg/moire_logo.svg" alt="Логотип интернет магазина Технозавррр" width="116" height="34">
        </a>
        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>
        <router-link class="header__cart" :to="{name:'cart'}" aria-label="Корзина с товарами">
            <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95185 0.751831C6.3512 0.751831 4.17336 2.70695 4.17336 5.2012V5.88602H3.15064C1.81969 5.88602 0.722082 6.92878 0.653918 8.25798L0.00334884 20.9441C-0.0699397 22.3732 1.06906 23.5721 2.50007 23.5721H15.4036C16.8346 23.5721 17.9736 22.3732 17.9004 20.9441L17.2498 8.25798C17.1816 6.92878 16.084 5.88602 14.7531 5.88602H13.7303V5.2012C13.7303 2.70695 11.5525 0.751831 8.95185 0.751831ZM13.7303 9.11431C13.9458 9.2697 14.086 9.52287 14.086 9.80881C14.086 10.2814 13.7029 10.6645 13.2303 10.6645C12.7578 10.6645 12.3746 10.2814 12.3746 9.80881C12.3746 9.52287 12.5149 9.2697 12.7303 9.11431V6.88602H5.17336V9.11431C5.38882 9.2697 5.52906 9.52287 5.52906 9.80881C5.52906 10.2814 5.14595 10.6645 4.67336 10.6645C4.20077 10.6645 3.81767 10.2814 3.81767 9.80881C3.81767 9.52287 3.95791 9.2697 4.17336 9.11431V6.88602H3.15064C2.35207 6.88602 1.6935 7.51167 1.65261 8.30919L1.00204 20.9953C0.958063 21.8528 1.64147 22.5721 2.50007 22.5721H15.4036C16.2622 22.5721 16.9456 21.8528 16.9017 20.9953L16.2511 8.3092C16.2102 7.51167 15.5516 6.88602 14.7531 6.88602H13.7303V9.11431ZM12.7303 5.88602V5.2012C12.7303 3.3331 11.0771 1.75183 8.95185 1.75183C6.82661 1.75183 5.17336 3.3331 5.17336 5.2012V5.88602H12.7303Z" fill="black"/>
            </svg>
            <span class="header__count" aria-label="Количество товаров" v-if="productIndncator >= 1">{{productIndncator}}</span>
        </router-link>
    </div>
</header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('baskets', ['cartProductData']),
    productIndncator () {
      return this.cartProductData.items ? this.cartProductData.items.length : null
    }
  }
}
</script>
