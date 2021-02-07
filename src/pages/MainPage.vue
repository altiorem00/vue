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
      <productFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId" :colored.sync="filterColor"/>
      <section class="catalog">
        <ProductList :products="products" @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"/>
        <VPagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>
<script>
import products from '@/data/products'
import ProductList from '@/components/ProductList'
import VPagination from '@/components/VPagination'
import productFilter from '@/components/productFilter'

export default {
  components: {
    ProductList,
    VPagination,
    productFilter
  },
  data () {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      page: 1,
      productsPerPage: 3
    }
  },
  computed: {
    filteredProducts () {
      let filteredProducts = products

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter(product => product.colors.includes(this.filterColor))
      }

      return filteredProducts
    },
    products () {
      const offset = (this.page - 1) * this.productsPerPage
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    countProducts () {
      return this.filteredProducts.length
    }
  }
}
</script>