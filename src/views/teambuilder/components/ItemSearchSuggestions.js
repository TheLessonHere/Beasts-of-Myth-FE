import React, { useState, useEffect } from 'react';

export default function ItemSearchSuggestions(props){
    const { suggestions } = props;

    return (
        <div>
            {suggestions.map(suggestion =>
                <h3 key={suggestion.item_id}>{suggestion.item_name}</h3>
            )}
        </div>
    )
}