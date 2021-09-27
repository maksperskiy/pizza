const addPizzaToCart = (pizza) => ({type: 'ADD_PIZZA_TO_CART', payload: pizza});
const clearCart = () => ({type: 'CLEAR_CART'});
const removePizzaFromCart = (id) => ({type: 'REMOVE_PIZZA_FROM_CART', payload: id});
const minusCountPizza = (id) => ({type: 'MINUS_COUNT_PIZZA', payload: id});
const plusCountPizza = (id) => ({type: 'PLUS_COUNT_PIZZA', payload: id});

export { addPizzaToCart, clearCart, removePizzaFromCart, minusCountPizza, plusCountPizza };