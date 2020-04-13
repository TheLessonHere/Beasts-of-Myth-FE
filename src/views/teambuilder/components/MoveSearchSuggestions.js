import React, { useState, useEffect } from 'react';

export default function MoveSearchSuggestions(props){
    const { suggestions } = props;

    return (
        <div>
            {suggestions.map(suggestion =>
                <h3 key={suggestion}>{suggestion}</h3>
            )}
        </div>
    )
}