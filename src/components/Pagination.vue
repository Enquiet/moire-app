<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item" @click.prevent="switchPage(page - 1)">
        <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled':page === 1 }" aria-label="Предыдущая страница">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.31836 11.0343L1.31836 6.0343L6.31836 1.0343" stroke="#222222"/>
          </svg>
        </a>
      </li>
      <li class="pagination__item "  v-for="pageNumber in Pages" :key="pageNumber" @click.prevent="paginate(pageNumber)">
        <a class="pagination__link" :class="{'pagination__link--current': pageNumber === page}">
        {{pageNumber}}
        </a>
      </li>
      <li class="pagination__item" @click.prevent="switchPage(page + 1)">
        <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled':page === Pages}" href="#" aria-label="Следующая страница">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25 11.0343L6.25 6.0343L1.25 1.0343" stroke="#222222"/>
          </svg>
        </a>
      </li>
    </ul>
</template>
<script>
export default {
  props: {
    page: {
      type: Number,
      default: 0
    },
    allProducts: {
      type: Number,
      default: 0
    },
    PerProducts: {
      type: Number,
      default: 0
    }
  },
  methods: {
    paginate (page) {
      this.$emit('update:page', page)
    },
    switchPage (pages) {
      if (pages >= 1 && pages <= this.Pages) {
        this.paginate(pages)
      }
    }
  },
  computed: {
    Pages () {
      return Math.ceil(this.allProducts / this.PerProducts)
    }
  }
}
</script>
