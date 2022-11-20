<template>
  <div class="filters">

    <div class="block">
      <p>Страна</p>
      <Input placeholder="Поиск стран" @inputText="inputCountry"/>
      <div class="countries" v-if="filtersCountries.length">
        <div class="country" v-for="(country, index) in filtersCountries" :key="index">
          <input type="checkbox" :id="country" :value="country"
          v-model="filters.selectedCountries">
          <label :for="country">{{country}}</label>
        </div>
      </div>
      <div v-else class="countriesMissing">
        К сожалению, по вашему запросу ничего не найдено :(</div>
    </div>

    <div class="block">
      <p>Тип</p>
      <div class="apartments">
        <div>
          <input type="checkbox" id="apartments" value="Апартаменты" v-model="filters.apartments">
            <label for="apartments">Апартаменты</label>
        </div>
        <div>
          <input type="checkbox" id="hotel" value="Отель" v-model="filters.apartments">
          <label for="hotel">Отель</label>
        </div>
      </div>
    </div>

    <div class="block">
      <p>Количество звезд</p>
      <div class="grades">
        <div class="grade" v-for="(grade, index) in grades" :key="index">
          <input type="checkbox" :id="grade.value" :value="grade.value" v-model="filters.grades">
          <label :for="grade.value">{{grade.text}}</label>
        </div>
      </div>
    </div>

    <div class="block">
      <p>Количество отзывов (от)</p>
      <InputNumber placeholder="Например, от 10" @inputNumber="inputComment"/>
    </div>

    <div class="block">
      <p>Цена</p>
      <div class="prices">
          <InputNumber placeholder="от 0 ₽" @inputNumber="inputPriceFirst"/>
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <InputNumber placeholder="до 100 500 ₽" @inputNumber="inputPriceSecond"/>
      </div>
      <div class="priceSlider">
        <Slider :min="0" :max="100500" v-model="filters.prices" :format="formatPrices"/>
      </div>
    </div>

    <div class="block">
      <button class="applyBut" @click="filterApply">Применить фильтр</button>
      <button class="clearBut" @click="filterClear">Очистить фильтр</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import { clone } from '@/helpers';
import Slider from '@vueform/slider';
import Input from '@/components/Input.vue';
import InputNumber from '@/components/InputNumber.vue';

export default {
  name: 'Filters',
  components: {
    Slider, Input, InputNumber,
  },
  data() {
    return {
      grades: [
        { text: '1 звезда', value: 1 },
        { text: '2 звезды', value: 2 },
        { text: '3 звезды', value: 3 },
        { text: '4 звезды', value: 4 },
        { text: '5 звезд', value: 5 },
      ],
      formatPrices(value) {
        return `${value.toFixed(0)} ₽`;
      },
    };
  },
  computed: {
    ...mapState({
      filters: (state) => state.filters,
      filtersClone: (state) => state.filtersClone,
      countries: (state) => state.countries,
    }),
    filtersCountries() {
      return this.countries
        .filter((el) => el.toLowerCase().indexOf(this.filters.inputCountry.toLowerCase()) !== -1);
    },
  },
  methods: {
    ...mapActions({
      clearFilters: 'clearFilters',
      changeFilter: 'changeFilter',
      changeFiltersClone: 'changeFiltersClone',
    }),
    inputCountry(val) {
      this.changeFilter({ prop: 'inputCountry', value: val });
    },
    inputComment(val) {
      this.changeFilter({ prop: 'comment', value: val });
    },
    inputPriceFirst(val) {
      this.changeFilter({ prop: 'prices', value: [val, this.filters.prices[1]] });
    },
    inputPriceSecond(val) {
      this.changeFilter({ prop: 'prices', value: [this.filters.prices[0], val] });
    },
    filterApply() {
      this.changeFiltersClone(clone(this.filters));
    },
    filterClear() {
      this.clearFilters();
      this.filterApply();
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped>
@import "@/styles/app.scss";

.home{
  display: flex;
  justify-content: center;
  padding: 50px;
}
.filters{
  margin-right: 40px;
  width: 325px;
  .block{
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p{
      font-size: 16px;
      font-weight: 700;
    }

    .countries{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      border: 1px solid #EAEAEA;
      border-radius: 10px;
      padding: 10px;
      width: 100%;
      height: 200px;
      overflow-y: scroll;
      .country{
        display: flex;
        align-items: center;
      }
    }
    .countriesMissing{
      margin-top: 10px;
      border: 1px solid #EAEAEA;
      border-radius: 10px;
      padding: 10px;
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .apartments{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: #FAFAFA;
      width: 100%;
      border: 1px solid #EAEAEA;
      border-radius: 10px;
      padding: 10px;

      div{
        width: 100%;
        text-align: left;
        height: 40px;
        display: flex;
        align-items: center;
      }

      div:first-child{
        border-bottom: 1px solid #EAEAEA;
      }
    }

    .grades{
      border: 1px solid #EAEAEA;
      border-radius: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
    }

    .prices{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 50px;
    }
    .priceSlider{
      width: 100%;
    }

    .applyBut, .clearBut{
      background: #6A53F5;
      width: 100%;
      height: 56px;
      border: 1px solid #EAEAEA;
      border-radius: 10px;
      color: #fff;
    }
     .clearBut{
      background: #fff;
      margin-top: 15px;
      color: #3A3A3A;
    }
  }

  input[type='checkbox'] {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
}
</style>
