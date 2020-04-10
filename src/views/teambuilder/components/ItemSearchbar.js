import React, { useState, useEffect } from 'react';

export default function ItemSearchbar(props){
    const { items } = props;
    const [suggestions, setSuggestions] = useState([]);
    const [defaultRender, setDefaultRender] = useState(true);

    useEffect(() => {
        if (suggestions.length > 0) {
            setDefaultRender(false)
        } else {
            setDefaultRender(true)
        }
    }, [ suggestions ])

    const onSearchChange = (event) => {
        const value = event.target.value;
        let currSuggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            currSuggestions = items.sort().filter(item => {
                const searchId = item.search_id;
                return regex.test(searchId);
            });
        }
        setSuggestions(currSuggestions);
    }

    const renderResult = () => {
        if (suggestions.length > 0){
            const matchingItems = suggestions.map(item => {
                return <li key={item.search_id}>{item.item_name}</li>;
            })
            return matchingItems;
        } else {
            return <li>No Matching Data</li>
        }
    };

    if(defaultRender){
        return (
            <div>
                <input onChange={onSearchChange} type="text" />
                <ul>
                    {items.map(item => {
                        return <li key={item.search_id}>{item.item_name}</li>
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <input onChange={onSearchChange} type="text" />
            <ul>
                {renderResult()}
            </ul>
        </div>
    )
}