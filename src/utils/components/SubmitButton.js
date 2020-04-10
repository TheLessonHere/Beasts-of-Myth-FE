import styled from 'styled-components';

export const SubmitButton = styled.button`
    display: flex;
    box-shadow: inset 0px 34px 0px -15px red;
    background-color: darkred;
    border: 1px solid #241d13;
    border-radius: 5px;
    margin: auto;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 9px 23px;
    text-decoration: none;
    text-shadow: 0px -1px 0px #7a2a1d;
    &&:hover {
        box-shadow: inset 0px 34px 0px -15px #FF3C3C;
        background-color: #b34332;
    }
    &&:active {
        position: relative;
	    top: 1px;
    }
`;