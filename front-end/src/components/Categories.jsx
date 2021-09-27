import React from 'react';

const Categories = ({ categorieItems, activeCategorie, onClickCategorie }) => {
    return (
        <div className="categories">
            <ul>
                <li className={activeCategorie === null ? 'active' : ''} onClick={() => onClickCategorie(null)}>Все</li>
                {
                    categorieItems && categorieItems.map((categorie, index) => 
                        <li
                            key={`categorie_${index}`}
                            className={activeCategorie === index ? 'active' : ''}
                            onClick={() => onClickCategorie(index)}
                        >
                            {categorie}
                        </li>)
                }
            </ul>
        </div>
    );
};

export default React.memo(Categories);
