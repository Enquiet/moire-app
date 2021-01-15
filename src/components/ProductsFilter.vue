<template>
     <aside class="filter">

                <form class="filter__form form" action="#" method="get" @submit.prevent="submitBtn">
                    <fieldset class="form__block">
                        <legend class="form__legend">Цена</legend>
                        <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice">
              <span class="form__value">От</span>
            </label>
                        <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice">
              <span class="form__value">До</span>
            </label>
                    </fieldset>

                 <ProductFilterCotigories :product-id.sync="currentProductId"/>

                    <fieldset class="form__block">
                        <legend class="form__legend">Цвет</legend>
                        <ul class="colors">
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#73B6EA" checked="">
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
                  <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                </label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#939393">
                  <span class="colors__value" style="background-color: #939393;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
                  <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
                  <span class="colors__value" style="background-color: #FF6B00;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFF">
                  <span class="colors__value" style="background-color: #FFF;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#000">
                  <span class="colors__value" style="background-color: #000;">
                </span></label>
                            </li>
                        </ul>
                    </fieldset>

                    <fieldset class="form__block">
                        <legend class="form__legend">Материал</legend>
                        <ul class="check-list">
                            <li class="check-list__item">
                                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    лен
                    <span>(3)</span>
                  </span>
                </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    хлопок
                    <span>(46)</span>
                  </span>
                </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    шерсть
                    <span>(20)</span>
                  </span>
                </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    шелк
                    <span>(30)</span>
                  </span>
                </label>
                            </li>

                        </ul>
                    </fieldset>

                    <fieldset class="form__block">
                        <legend class="form__legend">Коллекция</legend>
                        <ul class="check-list">
                            <li class="check-list__item">
                                <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                <span class="check-list__desc">
                  лето
                  <span>(3)</span>
                </span>
              </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                <span class="check-list__desc">
                  зима
                  <span>(46)</span>
                </span>
              </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                <span class="check-list__desc">
                  весна
                  <span>(20)</span>
                </span>
              </label>
                            </li>
                            <li class="check-list__item">
                                <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                <span class="check-list__desc">
                  осень
                  <span>(30)</span>
                </span>
              </label>
                            </li>

                        </ul>
                    </fieldset>

                    <button class="filter__submit button button--primery" type="submit" >
            Применить
          </button>
                    <button class="filter__reset button button--second" type="button" @click.prevent="clearBtn">
            Сбросить
          </button>
                </form>
            </aside>
</template>
<script>
import ProductFilterCotigories from './ProductFilterCotigories.vue'
export default {
  data () {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 0,
      currentProductId: 0
    }
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    maxPrice: {
      type: Number,
      default: 0
    },
    categoryId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    minPrice (value) {
      this.currentMinPrice = value
    },
    maxPrice (value) {
      this.currentMaxPrice = value
    },
    categoryId (value) {
      this.currentProductId = value
    }
  },
  methods: {
    submitBtn () {
      this.$emit('update:categoryId', this.currentProductId)
      this.$emit('update:maxPrice', this.currentMaxPrice)
      this.$emit('update:minPrice', this.currentMinPrice)
    },
    clearBtn () {
      this.$emit('update:categoryId', 0)
      this.$emit('update:maxPrice', 0)
      this.$emit('update:minPrice', 0)
    }
  },
  components: {
    ProductFilterCotigories
  }

}
</script>
