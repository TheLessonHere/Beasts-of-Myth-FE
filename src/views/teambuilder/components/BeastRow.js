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
    const { listItemClass, beast } = props;
    const { search_id,
            format,
            beast_name,
            domain1,
            domain2,
            ability,
            hp,
            pa,
            pd,
            ma,
            md,
            sc } = beast;

    const returnDomains = (domain1, domain2) => {
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
                    alt={`${beast_name}-image`}
                    variant="square"
                    src={getBeastImage(search_id)} />
            </ListItemAvatar>
            <ListItemText primary={`${beast_name}`} />
            <ListItemText primary={returnDomains(domain1, domain2)} />
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