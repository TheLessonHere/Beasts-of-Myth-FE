import React, { useState, useEffect } from 'react';

export default function LibrarySearchbar(props){
    const { allLibraries } = props;
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
            currSuggestions = allLibraries.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
            });
        }
        setSuggestions(currSuggestions);
    }

    const renderResult = () => {
        if (suggestions.length > 0){
            const matchingObjs = suggestions.map(obj => {
                if (obj.data_type === "Beast"){
                    return <li key={obj.search_id}>{obj.beast_name}</li>;
                }
                else if (obj.data_type === "Move"){
                    return <li key={obj.search_id}>{obj.move_name}</li>;
                }
                else if (obj.data_type === "Ability"){
                    return <li key={obj.search_id}>{obj.ability_name}</li>;
                } else {
                    return <li>No Matching Data</li>;
                }
            })
            return matchingObjs;
        } else {
            return <li>No Matching Data</li>
        }
    };

    if(defaultRender){
        return (
            <div>
                <input onChange={onSearchChange} type="text" />
                <ul>
                    {allLibraries.map(obj => {
                        if (obj.data_type === "Beast"){
                            return <li key={obj.search_id}>{obj.beast_name}</li>
                        }
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