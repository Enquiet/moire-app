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
            {{this.productData.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="productImageSelected"  alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item"
            v-for="(img, index) in listImage"
            :key="index"
          >
            <a type="button" class="pics__link"
              @click.prevent=" setProductImage(img.file.url)"
              :class="{'pics__link--current':img.file.url === productImageSelected}"
            >
              <img width="98" height="98" :src="img.file.url"  alt="Название товара">
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
          <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
            <div class="item__row item__row--center">
              <Counter :amount-product.sync="amountProduct"/>

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
                  <select class="form__select" type="text" name="category" v-model.number="productSize">
                    <option :value="size.id" v-for="size in this.productData.sizes" :key="size.id">{{size.title}}</option>
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
          <li class="tabs__item tabs__link"
          :class="{'tabs__link--current': infoProduct}"
          @click.prevent="infoProduct = true"
          >
             Информация о товаре
          </li>
          <li class="tabs__item tabs__link"
          :class="{'tabs__link--current': !infoProduct}"
          @click.prevent="infoProduct = false"
          >
            Доставка и возврат
          </li>
        </ul>
        <div class="item__content" v-if="infoProduct">
          <h3>Состав:</h3>
          <ul class="item__list materials" v-for="material in materials" :key="material.id">
            <li class="materials__item">
              {{material.title}}
            </li>
          </ul>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>
        </div>
        <div class="item__content"  v-else>
          <h3>Доставка:</h3>

          <p>
            1. Курьерская доставка по Москве и Московской области – 290 ₽<br>
            2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br>
          </p>

          <h3>Возврат:</h3>

          <p>
            Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
            Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.
            БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
            Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90 09<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ProductColors from '@/components/ProductColors.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import Counter from '@/components/Counter.vue'

export default {
  data () {
    return {
      currentColorId: null,
      loadPage: false,
      amountProduct: 1,
      infoProduct: true,
      productImageSelected: null,
      productSize: 0
    }
  },
  components: {
    ProductColors, LoadingPage, Counter
  },
  computed: {
    ...mapState('products', ['productData']),
    ...mapGetters('products', ['addFakeImages']),
    id () {
      return Number(this.$route.params.id)
    },
    colors () {
      return this.productData.colors.map(c => c.color)
    },
    materials () {
      return this.productData.materials.map(m => m)
    },
    listImage () {
      const arrImages = this.addFakeImages.find(img => img.color.id === this.currentColorId)
      return arrImages ? arrImages.gallery : null
    }
  },
  methods: {
    ...mapActions('products', ['getLoadProduct']),
    ...mapActions('baskets', ['addProductToCard']),
    async addToCart () {
      await this.addProductToCard({
        productId: this.productData.id,
        colorId: this.currentColorId,
        sizeId: this.productSize,
        quantity: this.amountProduct
      })
    },
    async loadsPage () {
      this.loadPage = true
      try {
        await this.getLoadProduct(this.id)
        this.loadPage = false
      } catch {
        this.loadPage = false
        this.$router.replace({ name: '404' })
      }
    },
    setProductImage (img) {
      this.productImageSelected = img
    }
  },
  watch: {
    '$route.params.id': {
      async handler () {
        await this.loadsPage()
        this.currentColorId = this.productData.colors[0].color.id
        this.productSize = this.productData.sizes[0].id
      },
      immediate: true,
      deep: true
    },
    currentColorId: {
      handler () {
        const color = this.productData.colors.find(c => c.color.id === this.currentColorId)
        this.productImageSelected = color.gallery[0].file.url
      }
    }
  }

}
</script>
<style lang="scss">
  .materials{
      padding: 0;
      margin: 0;
      list-style-type: none;
      &__item{
        margin: 0 0 5px;
        font-size: 16px;
        line-height: 28px;
        color: #222;
        font-weight: 300;
      }
    }
</style>
