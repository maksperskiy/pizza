import React from 'react';
import classnames from 'classnames';

const Button = ({ children, cart, outline, back, pay }) => {
    const btnClasses = classnames({
        'button--cart': cart,
        'button--outline': outline,
        'go-back-btn': back,
        'pay-btn': pay,
    });

    return (
        <button className={`button ${btnClasses}`}>
            { children }
        </button>
    );
};

export default Button;
