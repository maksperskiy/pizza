import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { toast } from "react-toastify";
import { addPizzaToCart } from './../../redux/actions/importActions';

const PizzaBlock = ({ cookSession, status, customer, pizzas, address, promo, price, allCook }) => {
    // const { allSizes, allTypes, allPizzas, items } = useSelector(({ admin, cart }) => ({
    //     allSizes: admin.sizes,
    //     allTypes: admin.types,
    //     allPizzas: admin.pizzas,
    //     items: cart.items,
    // }));
    // const dispatch = useDispatch();

    // const itemCount = [].concat.apply([], Object.values(items).map(obj => obj.items)).filter(pizza => pizza.name === name.value).length;

    // // console.log(Object.values(items).map(item => item.items));
    // const [activeType, setActiveType] = useState(allTypes.findIndex(type => type.typeId === types[0].typeId));
    // // const [activeSize, setActiveSize] = useState(allSizes.findIndex(size => size.sizeId === sizes[0].sizeId));
    // const [activeSize, setActiveSize] = useState(allSizes.findIndex(size => size.sizeId === sizes[0].sizeId));

    // const activePizzas = allPizzas.filter(pizza => pizza.name.value === name.value)
    //                             .filter(pizza => pizza.type.value === allTypes[activeType].value)
    //                             .filter(pizza => pizza.size.value === allSizes[activeSize].value);

    // const activePizza = activePizzas.filter((pizza, index) => {
    //     const curPizza = pizza.size.value;
    //     return index === activePizzas.findIndex(pizzaObj => {
    //         return pizzaObj.size.value === curPizza;
    //     });
    // });

    // const newSizes = allPizzas.filter(pizza => pizza.name.value === name.value && pizza.visible === true)
    //     .filter(pizza => pizza.type.value === allTypes[activeType].value)
    //     .map(pizza => pizza.size)
    //     .sort((prev, next) => {
    //         if(prev.value < next.value) {
    //             return -1;
    //         }
    //     });

    // useEffect(() => {
    //     console.log(newSizes);
    //     const firstSize = allSizes.find(size => size.sizeId === newSizes[0].sizeId);
    //     const firstSizeIndex = allSizes.findIndex(size => size.value === firstSize.value);
    //     console.log(firstSize);
    //     console.log(firstSizeIndex);
    //     setActiveSize(firstSizeIndex);
    // }, [activeType]);
    
    // const onSelectType = index => {
    //     setActiveType(index);
    // };

    // const onSelectSize = index => {
    //     setActiveSize(index);
    // };

    // const onAddPizzaToCart = () => {
    //     const pizzaObj = activePizza.length && {
    //         id: activePizza[0].pizzaId,
    //         imageUrl: activePizza[0].name.image,
    //         name: activePizza[0].name.value,
    //         type: activePizza[0].type,
    //         size: activePizza[0].size,
    //         price: activePizza[0].price
    //     };
    //     activePizza.length && dispatch(addPizzaToCart(pizzaObj));

    //     activePizza.length && notify('pizza added to cart', 'success');
    // };

    // const notify = (message, type) => {
    //     toast[type](`🦄 ${message}`);
    // };
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>{
                cookSession === null ? 
                    String(cookSession) : 
                    allCook.length && allCook[allCook.findIndex(cook => cook.cookId === cookSession['cookId'])]['name']}
            </div>
            <div>{status}</div>
            <div>{customer.name}</div>
            <div style={{display: 'flex'}}>
                {pizzas.map((pizza, index) => {
                    return <div style={{marginRight: '15px'}}>
                        <div>{index + 1}. {pizza.name.value}</div>
                        <div>{pizza.type.value} тесто</div>
                        <div>{pizza.size.value} см.</div>
                        <div>{pizza.category.value}</div>
                        <div>{pizza.price} р.</div>
                    </div>
                })}
            </div>
            <div>{address}</div>
            <div>{String(promo)}</div>
            <div>{price}</div>
        </div>
    );
};

export default PizzaBlock;
