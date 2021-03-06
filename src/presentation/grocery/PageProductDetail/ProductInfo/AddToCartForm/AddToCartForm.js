import { required, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { shallowRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import useCartTools from 'hooks/useCartTools';
import { useStore } from 'vuex';
function Rules() {
  this.quantity = { required, numeric };
}

export default {
  name: 'AddToCartForm',
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
    addCaption: {
      type: String,
      default: 'addToCart',
    },
    productId: {
      required: true
    }
  },
  components: {
    BaseForm,
    ServerError,
    BaseInput,
  },
  setup(props) {
    const { t } = useI18n();
    const form = ref({ quantity: 1 });
    const rules = new Rules(form);
    const v = useVuelidate(rules, form);
    const showQuantityError = shallowRef(false);
    const { addLine, setLIPrice } = useCartTools();
    
    const weightFinalQtyPrice = ref('');
    const store = useStore();
    const setVariablePrice = (response) => {
      if (props.productId === '58f284d8-d777-481f-acaf-cb476ac1d3b5') {
        console.log(response);
        const itemVariableWeight = response.data.updateMyCart.lineItems[response.data.updateMyCart.lineItems.length - 1];
        const itemPrice = itemVariableWeight.price.value.centAmount;
        weightFinalQtyPrice.value = store.state.weightNumberQty / 1000 * itemPrice;
        weightFinalQtyPrice.value = Math.round(weightFinalQtyPrice.value);
        setLIPrice(itemVariableWeight.lineId, weightFinalQtyPrice.value, response.data.updateMyCart.version, response.data.updateMyCart.id);
      }
    }
    const addLineItem = () =>
      addLine(props.sku, Number(form.value.quantity), setVariablePrice);
    return { t, addLineItem, v, showQuantityError };
  },
};
