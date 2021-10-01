import React from 'react';
import { useSelector } from 'react-redux';

const Categories = ({ activeCategorie, onClickCategorie }) => {
    const { categorieItems } = useSelector(({ pizzas }) => ({
        categorieItems: pizzas.categories
    }));
    
    return (
        <div className="categories">
            <ul>
                <li className={activeCategorie === null ? 'active' : ''} onClick={() => onClickCategorie(null)}>Все</li>
                {
                    categorieItems && categorieItems.map((categorie, index) => 
                        <li
                            key={`categorie_${index}`}
                            className={activeCategorie === categorie.value ? 'active' : ''}
                            onClick={() => onClickCategorie(categorie.value)}
                        >
                            {categorie.value}
                        </li>)
                }
            </ul>
        </div>
    );
};

export default React.memo(Categories);
