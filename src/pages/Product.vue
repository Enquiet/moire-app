<template>
    <LoadingPage v-if="loadPage"/>
    <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
            {{this.productData.category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Носки с принтом мороженое
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="computedImage"  alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" srcset="img/product-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" srcset="img/product-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{this.productData.id}}</span>
        <h2 class="item__title">
           {{this.productData.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
               {{productData.price}} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ProductColors
                  :current-color.sync="currentColorId"
                  :colors="colors"
                />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option value="size.id" v-for="size in this.productData.sizes" :key="size.id">{{size.title}}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ProductColors from '@/components/ProductColors.vue'
import LoadingPage from '@/components/LoadingPage.vue'

export default {
  data () {
    return {
      currentColorId: null,
      loadPage: false
    }
  },
  components: {
    ProductColors, LoadingPage
  },
  computed: {
    ...mapState('products', ['productData']),
    id () {
      return Number(this.$route.params.id)
    },
    colors () {
      return this.productData.colors.map(c => c.color)
    },
    computedImage () {
      const color = this.productData.colors.find(c => c.color.id === this.currentColorId)
      return color ? color.gallery[0].file.url : null
    }
  },
  methods: {
    ...mapActions('products', ['getLoadProduct']),
    loadsPage () {
      this.loadPage = true
      this.loadPagesTimer = setTimeout(() => {
        this.getLoadProduct(this.id)
        this.loadPage = false
      }, 2000)
    }
  },
  async created () {
    await this.getLoadProduct(this.id)
    this.currentColorId = this.productData.colors[0].color.id
  },
  watch: {
    '$route.params.id': {
      handler () {
        this.loadsPage()
      },
      immediate: true
    }
  }

}
</script>
