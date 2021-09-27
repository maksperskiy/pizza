import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoader = (props) => {
    return (
        <ContentLoader 
            speed={2}
            width={280}
            height={426}
            viewBox="0 0 280 426"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <circle cx="140" cy="114" r="115" /> 
            <rect x="-1" y="236" rx="0" ry="0" width="280" height="25" /> 
            <rect x="0" y="280" rx="10" ry="10" width="280" height="82" /> 
            <rect x="130" y="379" rx="30" ry="30" width="150" height="45" /> 
            <rect x="0" y="390" rx="0" ry="0" width="86" height="26" />
        </ContentLoader>
    );
}

export default PizzaLoader;