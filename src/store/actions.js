export default {
  /**
   * Изменение фильтра
   */
  changeFilter(context, obj) {
    context.commit('setFilter', obj);
  },
  /**
   * Очистка фильтра
   */
  clearFilters(context) {
    context.commit('setFilters', {
      inputCountry: '',
      selectedCountries: [],
      comment: null,
      apartments: [],
      grades: [],
      prices: [0, 100500],
    });
  },
  /**
   * Изменение фильтра копии
   */
  changeFiltersClone(context, value) {
    context.commit('setFiltersClone', value);
  },
};
