import React, { useState, useEffect } from 'react';
import { validateYupSchema } from 'formik';

const dummyData = [{
    type: "Beast",
    beast_name: "Jessie",
    search_id: "jessie"
},
{
    type: "Beast",
    beast_name: "James",
    search_id: "james"
},
{
    type: "Beast",
    beast_name: "Meowth",
    search_id: "meowth"
},
{
    type: "Move",
    move_name: "Punch",
    search_id: "punch"
},
{
    type: "Move",
    move_name: "Jump Kick",
    search_id: "jump kick"
},
{
    type: "Ability",
    ability_name: "Power-Up",
    search_id: "power-up"
},
{
    type: "Ability",
    ability_name: "Turnabout",
    search_id: "turnabout"
}];

export default function Searchbar(props){
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
            currSuggestions = dummyData.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
            });
        }
        setSuggestions(currSuggestions);
    }

    const renderResult = () => {
        if (suggestions.length > 0){
            const matchingObjs = suggestions.map(obj => {
                if (obj.type == "Beast"){
                    return <li key={obj.search_id}>{obj.beast_name}</li>;
                }
                else if (obj.type == "Move"){
                    return <li key={obj.search_id}>{obj.move_name}</li>;
                }
                else if (obj.type == "Ability"){
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
                    {dummyData.map(obj => {
                        if (obj.type == "Beast"){
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