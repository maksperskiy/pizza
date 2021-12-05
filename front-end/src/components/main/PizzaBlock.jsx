import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { toast } from "react-toastify";
import { addPizzaToCart } from './../../redux/actions/importActions';

const PizzaBlock = ({ pizzaId, name, types, sizes, price }) => {
    const { allSizes, allTypes, allPizzas, items } = useSelector(({ admin, cart }) => ({
        allSizes: admin.sizes,
        allTypes: admin.types,
        allPizzas: admin.pizzas,
        items: cart.items,
    }));
    const dispatch = useDispatch();

    const itemCount = [].concat.apply([], Object.values(items).map(obj => obj.items)).filter(pizza => pizza.name === name.value).length;

    // console.log(Object.values(items).map(item => item.items));
    const [activeType, setActiveType] = useState(allTypes.findIndex(type => type.typeId === types[0].typeId));
    // const [activeSize, setActiveSize] = useState(allSizes.findIndex(size => size.sizeId === sizes[0].sizeId));
    const [activeSize, setActiveSize] = useState(allSizes.findIndex(size => size.sizeId === sizes[0].sizeId));

    const activePizzas = allPizzas.filter(pizza => pizza.name.value === name.value)
                                .filter(pizza => pizza.type.value === allTypes[activeType].value)
                                .filter(pizza => pizza.size.value === allSizes[activeSize].value);

    const activePizza = activePizzas.filter((pizza, index) => {
        const curPizza = pizza.size.value;
        return index === activePizzas.findIndex(pizzaObj => {
            return pizzaObj.size.value === curPizza;
        });
    });

    const newSizes = allPizzas.filter(pizza => pizza.name.value === name.value && pizza.visible === true)
        .filter(pizza => pizza.type.value === allTypes[activeType].value)
        .map(pizza => pizza.size)
        .sort((prev, next) => {
            if(prev.value < next.value) {
                return -1;
            }
        });

    useEffect(() => {
        console.log(newSizes);
        const firstSize = allSizes.find(size => size.sizeId === newSizes[0].sizeId);
        const firstSizeIndex = allSizes.findIndex(size => size.value === firstSize.value);
        console.log(firstSize);
        console.log(firstSizeIndex);
        setActiveSize(firstSizeIndex);
    }, [activeType]);
    
    const onSelectType = index => {
        setActiveType(index);
    };

    const onSelectSize = index => {
        setActiveSize(index);
    };

    const onAddPizzaToCart = () => {
        const pizzaObj = activePizza.length && {
            id: activePizza[0].pizzaId,
            imageUrl: activePizza[0].name.image,
            name: activePizza[0].name.value,
            type: activePizza[0].type,
            size: activePizza[0].size,
            price: activePizza[0].price
        };
        activePizza.length && dispatch(addPizzaToCart(pizzaObj));

        activePizza.length && notify('pizza added to cart', 'success');
    };

    const notify = (message, type) => {
        toast[type](`🦄 ${message}`);
    };
    
    return (
        <div className="pizza-block">
            <img 
                className="pizza-block__image"
                src={`data:image/png;base64,${name.image}`}
                alt="Pizza" 
            />
            <h4 className="pizza-block__title">{name.value}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        allTypes.map((type, index) => 
                        <li 
                            key={`type_${index}`}
                            className={classnames({
                                'active': activeType === index,
                                'disabled': !types.some(curType => curType.typeId === type.typeId)
                            })}
                            onClick={() => onSelectType(index)}
                        >
                            {type.value}
                        </li>)
                    }
                </ul>
                <ul>
                    {
                        allSizes.map((size, index) => 
                        <li 
                            key={`type_${index}`}
                            className={classnames({
                                'active': activeSize === index,
                                'disabled': !newSizes.some(curSize => curSize.sizeId === size.sizeId)
                            })}
                            onClick={() => onSelectSize(index)}
                            style={{fontSize: '12px'}}
                        >
                            {size.name}, {size.value} см.
                        </li>)
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} р.</div>
                <button className="button button--outline button--add" onClick={onAddPizzaToCart}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{itemCount ? itemCount : 0}</i>
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
