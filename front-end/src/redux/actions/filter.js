const setCategorie = (categorie) => ({type: 'SET_CATEGORIE', payload: categorie});
const setSortBy = (sortBy) => ({type: 'SET_SORT_BY', payload: sortBy});
const setFilterPizzas = (pizzas) => ({type: 'SET_FILTER_PIZZAS', payload: pizzas});

export { setCategorie, setSortBy, setFilterPizzas };