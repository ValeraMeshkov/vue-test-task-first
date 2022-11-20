export default {
  setFilter(state, obj) {
    state.filters[obj.prop] = obj.value;
  },
  setFilters(state, value) {
    state.filters = value;
  },
  setFiltersClone(state, value) {
    state.filtersClone = value;
  },
};
