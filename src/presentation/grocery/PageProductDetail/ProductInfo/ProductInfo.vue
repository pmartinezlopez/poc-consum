<style src="./ProductInfo.scss" lang="scss" scoped></style>
<i18n src="./ProductInfo.txt" lang="yaml"></i18n>
<script src="./ProductInfo.js"></script>

<template>
  <div class="row" v-if="currentVariant">
    <div class="col-lg-5">
      <div class="product-details-tab">
        <ProductGallery :currentVariant="currentVariant" />
      </div>
    </div>
    <div class="col-lg-7">
      <div
        class="product-details-content product-details-ptb"
        data-test="product-data"
      >
        <h2 data-test="product-name">
          {{ currentVariant.name }}
        </h2>
        {{cart}}
        <h3>
          <BasePrice :price="currentVariant.scopedPrice" />{{productType.id === '58f284d8-d777-481f-acaf-cb476ac1d3b5' ? '/kg' : ''}}
        </h3>
        <VariableWeightSelector v-if="productType.id === '58f284d8-d777-481f-acaf-cb476ac1d3b5'" :sku="sku" />
        <VariantSelector
          :sku="sku"
          :allVariants="allVariants"
        />
        <!-- @todo: calculate in stock -->
        <!-- <div v-if="availableQ">
          {{ t('available') }}: {{ availableQuantity }}
        </div> -->
        <AddToCartForm
          :sku="sku"
          :isOnStock="true"
          :availableQuantity="10"
          :productId="productType.id"
        />
        <a href @click.prevent="openAddToShoppingList">
          <i class="dl-icon-heart"></i
          ><span>Lista de la compra</span>
        </a>

        <DetailsSection :currentVariant="currentVariant" />
      </div>
    </div>
  </div>
</template>
