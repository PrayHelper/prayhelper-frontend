import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import {GiPlantSeed} from 'react-icons/gi'; 
import styled from "styled-components";
import { style } from "@mui/system";
import Rectangle_img from "../images/Rectangle_img.svg"
import Logo from "./Logo";
import Share_mode from "./Share_mode";

const Main_Content = styled.div`
    display: flex;
    width: 350px;
    height: 30px;
    margin-left : 16px;
    margin-right : 16px;
    margin-top : 22px; 
`

const Name_content = styled.div`
    width: 34px;
    height: 17px;
    margin-right : 17px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
`;

const Text_content = styled.div`
    width: 246px;
    padding : 0px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const Dday_content = styled.div`
    width : 30px;
    font-size : 10px;
    heigth : 20px;
    margin-right : 20px;
`;
const Click_img = styled(Logo)``;

function Prayer_content({content, day_toggle}){
    const {dday,text,checked, name, count} = content;

    return(
        <Main_Content>
            <Name_content>{name}</Name_content>
            <Text_content>{text}</Text_content>
            {day_toggle ? <Dday_content>{"D-"+ dday}</Dday_content> : <Dday_content>{count + "회"}</Dday_content>}
            <div className="image"><Click_img src={Rectangle_img}/></div>
        </Main_Content>
    )
}

export default Prayer_content;