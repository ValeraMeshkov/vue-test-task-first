<template>
  <div class="hotels">

    {{filters}}
    <hr>
    {{filtersClone}}

    <div class="hotel" v-for="(hotel,index) in getHotels" :key="index">
      <div class="left">
        <div class="name">{{hotel.name}}</div>
        <div class="parametrs">
          <div class="stars">
            <div v-for="star,index in 5" :key="index">
              <img v-if="index + 1 > hotel.stars" src="@/assets/star.svg">
              <img v-else src="@/assets/starActive.svg">
            </div>
          </div>

          <div class="type">{{hotel.type}}</div>

          <div class="circle"></div>

          <div class="amount">{{hotel.reviews_amount}}
            {{getAmountText(hotel.reviews_amount)}}</div>

          <img src="@/assets/geo.svg" alt="">

          <div class="country">{{hotel.country}}</div>

        </div>
        <div class="description">{{hotel.description}}</div>
      </div>

      <div class="right">
        <div class="price">{{hotel.min_price}} ₽</div>
        <div class="text">Цена за 1 ночь</div>

        <button class="booking">
          Забронировано
        </button>
      </div>
    </div>

    <div class="hotelMissing" v-if="!getHotels.length">
      <p>По данным параметрам ничего не найдено</p>
      <div class="text">
        Попробуйте изменить параметры фильтрации или вернуться в общий каталог
      </div>
      <button @click="filterClear" class="booking">Очистить фильтр</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import { clone } from '@/helpers';

export default {
  name: 'Hotels',
  components: {
  },
  computed: {
    ...mapState({
      hotels: (state) => state.hotels,
      filters: (state) => state.filters,
      filtersClone: (state) => state.filtersClone,
    }),

    getHotels() {
      return this.hotels
        .filter((el) => {
          if (this.filtersClone.selectedCountries.length === 0) return el;
          return this.filtersClone.selectedCountries.includes(el.country);
        })
        .filter((el) => this.filtersClone.comment <= el.reviews_amount)
        .filter((el) => {
          if (this.filtersClone.apartments.length === 0) return el;
          return this.filtersClone.apartments.includes(el.type);
        })
        .filter((el) => {
          if (this.filtersClone.grades.length === 0) return el;
          return this.filtersClone.grades.includes(el.stars);
        })
        .filter((el) => el.min_price >= this.filtersClone.prices[0]
        && el.min_price <= this.filtersClone.prices[1]);
    },
  },
  created() {
    this.filterApply();
  },
  methods: {
    ...mapActions({
      clearFilters: 'clearFilters',
      changeFiltersClone: 'changeFiltersClone',
    }),
    filterApply() {
      this.changeFiltersClone(clone(this.filters));
    },
    filterClear() {
      this.clearFilters();

      this.filterApply();
    },

    getAmountText(val) {
      let n = Math.abs(val);
      n %= 100;
      if (n >= 5 && n <= 20) { return 'отзывов'; }
      n %= 10;
      if (n === 1) { return 'отзыв'; }
      if (n >= 2 && n <= 4) { return 'отзыва'; }
      return 'отзывов';
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
.hotels{
  width: 835px;
  margin-top: 40px;
  .hotel{
    padding: 25px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #EAEAEA;
    border-radius: 15px;
    margin-bottom: 15px;
    .left{
      text-align: left;
      margin-right: 30px;
      .name{
        font-weight: 700;
        font-size: 20px;
      }
      .parametrs{
        display: flex;
        margin-top: 8px;
        color: #949494;
        align-items: center;

        .stars{
          display: flex;
          div{
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              margin-right: 5px;
            }
          }
        }
        .type{
          font-weight: 400;
          font-size: 14px;
          color: #868686;
          margin-right: 6px;
        }

        .circle{
          width: 4px;
          height: 4px;
          background:#868686;
          border-radius: 50%;
          margin-right: 8px;
        }

        .amount{
          font-weight: 400;
          font-size: 14px;
          color: #868686;
          margin-right: 15px;
        }
        .country{
          margin-left: 10px;
          font-weight: 400;
          font-size: 14px;
          color: #3A3A3A;
        }
      }
      .description{
        margin-top: 18px;
        font-weight: 400;
        font-size: 16px;
        color: #3A3A3A;
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        -ms-line-clamp: 2;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-box-orient: vertical;
        box-orient: vertical;
      }
    }
    .right{
      width: 180px;
      min-width: 180px;
      text-align: right;

      .price{
        font-weight: 700;
        font-size: 25px;
      }
      .text{
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #868686;
      }
      .booking{
          width: 100%;
          height: 40px;
          background: #c7f6e2;
          border-radius: 12px;
          color: #00BB6D;
          border: none;
          margin-top: 30px;
      }
    }
  }
  .hotelMissing{
    margin: auto;
    width: 500px;

    p{
      font-weight: 700;
      font-size: 18px;
      color: #3A3A3A;
    }
    .text{
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #969696;
    }
    button{
      width: 200px;
      height: 40px;
      background: #c7f6e2;
      border-radius: 12px;
      color: #7a6dcc;
      border: none;
      margin-top: 30px;
    }
  }
}
</style>
