//@todo: add to shopping list (breadcrumb can go)
// import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';
import { ref } from 'vue';
import useProductTools from 'hooks/useProductTools';
import ProductInfo from './ProductInfo/ProductInfo.vue';
import Icons from 'presentation/Icons/Icons.vue';

export default {
  name: 'PageProductDetail',
  setup() {
    const { allVariants, currentVariant, sku, error, product } =
      useProductTools(true);
    const showAddToShoppingList = ref(false);
    const productSku = ref(null);
    const openAddToShoppingList = () => {
      showAddToShoppingList.value = true;
    };
    const closeAddToShoppingList = () => {
      showAddToShoppingList.value = false;
    };
    return {
      openAddToShoppingList,
      closeAddToShoppingList,
      productSku,
      allVariants,
      currentVariant,
      error,
      sku,
      product,
    };
  },
  components: {
    // Breadcrumb,
    ProductInfo,
    // AddToShoppingList
    Icons,
  },
};
