import React from 'react';
import styled from 'styled-components';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@material-ui/core";
import { getBeastImage } from '../../../utils/getBeastImage';

export default function BeastRow(props){
    const { listItemClass,
            searchId,
            format,
            name,
            domain1,
            domain2,
            ability,
            hp,
            pa,
            pd,
            ma,
            md,
            sc } = props;

    const returnDomains = () => {
        if(domain2){
            const capDomain1 = domain1.charAt(0).toUpperCase() + domain1.slice(1);
            const capDomain2 = domain2.charAt(0).toUpperCase() + domain2.slice(1);
            return `${capDomain1}-${capDomain2}`;
        } else {
            const capDomain1 = domain1.charAt(0).toUpperCase() + domain1.slice(1);
            return `${capDomain1}`;
        }
    }

    return (
        <ListItem className={listItemClass} divider={true}>
            <ListItemText primary={`${format}`} />
            <ListItemAvatar>
                <Avatar
                    alt={`${name}-image`}
                    variant="square"
                    src={getBeastImage(searchId)} />
            </ListItemAvatar>
            <ListItemText primary={`${name}`} />
            <ListItemText primary={returnDomains()} />
            <ListItemText primary={`${ability}`} />
            <ListItemText primary={`${hp}`} />
            <ListItemText primary={`${pa}`} />
            <ListItemText primary={`${pd}`} />
            <ListItemText primary={`${ma}`} />
            <ListItemText primary={`${md}`} />
            <ListItemText primary={`${sc}`} />
        </ListItem>
    )
};