<template>

  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filters.priceFrom" :price-to.sync="filters.priceTo"
                     :category-id.sync="filters.categoryId" :colored.sync="filters.color"
                     :countProducts.sync="countProducts"/>
      <section class="catalog">
        <preloader v-if="productsLoading"/>
        <div class="failed" v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
        <ProductList :products="products"/>
        <VPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>
<script>
import ProductList from '@/components/product/ProductList'
import VPagination from '@/components/common/VPagination'
import ProductFilter from '@/components/product/ProductFilter'
import Preloader from '@/components/common/Preloader'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { mapActions } from 'vuex'

export default {
  components: {
    ProductList,
    VPagination,
    ProductFilter,
    Preloader
  },
  data () {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        color: ''
      },
      page: 1,
      productsPerPage: 3,
      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  computed: {
    stateData () {
      return this.$store.state.allProducts
    },
    products () {
      return this.stateData ? this.stateData.items : []
    },
    countProducts () {
      return this.stateData ? this.stateData.pagination.total : 0
    }
  },
  methods: {
    ...mapActions(['loadCategories', 'loadColors']),

    loadProducts () {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + 'api/products?page=1', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filters.categoryId,
              colorId: this.filters.color,
              minPrice: this.filters.priceFrom,
              maxPrice: this.filters.priceTo
            }
          })
          .then(response => this.$store.commit('takeProducts', response.data))
          .catch(() => this.productsLoadingFailed = true) //eslint-disable-line
          .then(() => this.productsLoading = false) //eslint-disable-line
      }, 0)
    }
  },
  watch: {
    page () {
      this.loadProducts()
    },
    filters: {
      handler () {
        this.loadProducts()
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.loadColors()
    this.loadCategories()
  }
}
</script>
<style scoped lang="scss">
.catalog {
  position: relative;
}

.failed {
  position: absolute;
  top: 30px;
}
</style>
