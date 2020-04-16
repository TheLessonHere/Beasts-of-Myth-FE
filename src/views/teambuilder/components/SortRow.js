import React from 'react';
import styled from 'styled-components';

const SortRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    background: lightgrey;
    border-bottom: 1px solid darkgrey;
    height: 25px;
    color: black;
`;

const DeadButton = styled.button`
    justify-self: flex-start;
    margin-right: auto;
    margin-left: 0;
    padding-right: 25px;
    padding-left: 25px;
    background: lightgrey;
    border: none;
    height: 100%;
    color: black;
`;

const DomainButton = styled.button`
    justify-self: center;
    margin-right: auto;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;
    background: lightgrey;
    border: none;
    height: 100%;
    color: black;
`;

const HPButton = styled.button`
    justify-self: flex-end;
    margin-right: 0;
    margin-left: auto;
    padding-right: 20px;
    padding-left: 20px;
    background: lightgrey;
    border: none;
    height: 100%;
    color: black;
`;

const StatButton = styled.button`
    justify-self: flex-end;
    margin-right: 0;
    margin-left: 0;
    padding-right: 20px;
    padding-left: 20px;
    background: lightgrey;
    border: none;
    height: 100%;
    color: black;
`;

const SCButton = styled.button`
    justify-self: flex-end;
    margin-right: 0;
    margin-left: 0;
    padding-right: 40px;
    padding-left: 20px;
    background: lightgrey;
    border: none;
    height: 100%;
    color: black;
`;

export default function SortRow(props){
    const { sortDomain, sortHP, sortPA, sortPD, sortMA, sortMD, sortSC } = props;

    return (
        <SortRowContainer>
            <DeadButton className="sortcol startcol">Sort: </DeadButton>
            <DeadButton className="sortcol namecol">Name</DeadButton>
            <DomainButton className="sortcol domcol" onClick={sortDomain}>Domain</DomainButton>
            <DeadButton className="sortcol abilitycol">Ability</DeadButton>
            <HPButton className="sortcol statcol" onClick={sortHP}>HP</HPButton>
            <StatButton className="sortcol statcol" onClick={sortPA}>PA</StatButton>
            <StatButton className="sortcol statcol" onClick={sortPD}>PD</StatButton>
            <StatButton className="sortcol statcol" onClick={sortMA}>MA</StatButton>
            <StatButton className="sortcol statcol" onClick={sortMD}>MD</StatButton>
            <SCButton className="sortcol statcol" onClick={sortSC}>SC</SCButton>
        </SortRowContainer>
    )
};