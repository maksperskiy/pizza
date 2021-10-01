import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCategorie, setSortBy } from './../../redux/actions/importActions';
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from './../../components/importComponents';

const sortPopupItems = [
    {name: 'популярности', type: 'rating', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'}
];

const Home = ({ pizzas, isLoaded, activeCategorie, activeSortBy }) => {
    const dispatch = useDispatch();
    
    const onSelectCategorie = useCallback(index => {
        dispatch(setCategorie(index));    
    }, [dispatch]);

    const onSelectSortBy = useCallback(sortBy => {
        dispatch(setSortBy(sortBy));
    }, [dispatch]);

    return (
        <div className="container container--home">
            <div className="content__top">
                <Categories 
                    activeCategorie={activeCategorie} 
                    onClickCategorie={onSelectCategorie} 
                />
                <SortPopup
                    sortPopupItems={sortPopupItems}
                    activeSortBy={activeSortBy}
                    onClickSortBy={onSelectSortBy}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded ? 
                        pizzas.map((pizza, index) => <PizzaBlock key={`pizza_${index}`} {...pizza} />) :
                        Array(10).fill(0).map((item, index) => <PizzaLoader key={`loader_${index}`} />)
                }
            </div>
        </div>
    );
};

export default Home;
