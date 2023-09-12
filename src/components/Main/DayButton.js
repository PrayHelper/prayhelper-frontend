import React, {useState} from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Day_Calender from '../../images/day_calender.svg';
import Day_Calender_hover from "../../images/DayCalender_hover.svg";
import { getMonth, getYear, getDate } from "date-fns";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";


const DayBtnSet = styled.div`
    display: flex;
    position: absolute;
    background-color: white;
    width: 100%;
    border-top: 1px solid white;
    padding-bottom: 26px;
    transition: all 0.5s ease-in-out;
    z-index: 102;
    box-shadow : 0 2px 4px rgba(0, 0, 0, 0.2);
`
const DayBtn = styled.button`
    font-size: 10px;
    margin-right : 8px;
    border: 1px solid #75BD62;
    border-radius: 8px;
    padding: 4px 15px;
    transition: all 0.3s ease-in-out;
`

const DayCalender = styled(Logo)`
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: -150%;
  z-index: 400;
`;

const DatePickerHeader = styled.div`
  /* background: #7bab6e; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 15px 16px 12px;
  /* align-items: center; */
`;

const DatePickerHeaderDate = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const Day_Button = ({dayInfo, visible}) =>{
    const [colorThree ,setColorThree] = useState('white');
    const [colorSeven ,setColorSeven] = useState('#75BD62');
    const [colorThirty ,setColorThirty] = useState('white');
    const [colorHundred ,setColorHundred] = useState('white');
    const [fontThree ,setFontThree] = useState('#75BD62');
    const [fontSeven ,setFontSeven] = useState('white');
    const [fontThirty ,setFontThirty] = useState('#75BD62');
    const [fontHundred ,setFontHundred] = useState('#75BD62');
    // const [startDate, setStartDate] = useState(new Date());
    // const [dayText, setDayText] = useState("");
    const [dayToggle, setDayToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [updateDate, setUpdateDate] = useState(null);
    var nextDay = new Date();


    // const dateClick = (date) =>{
    //     // setStartDate(date);
    //     console.log(date);
    //     colorChange(date);
    //     setToggle(!Toggle);
    //     setColorThree('white');
    //     setColorSeven('white');
    //     setColorThirty('white');
    //     setColorHundred('white');
    //     setFontThree('#75BD62');
    //     setFontSeven('#75BD62');
    //     setFontThirty('#75BD62');
    //     setFontHundred('#75BD62');
    //     var year = getYear(date);
    //     var month = ((getMonth(date)+1) < 10) ? "0" + (getMonth(date) + 1) : (getMonth(date)+1);
    //     var date = (getDate(date) < 10) ? "0" + getDate(date) : getDate(date);
    //     let res_data = year + "/" +  month + "/" + date;
    //     setDayText(res_data);
    //     setDayToggle(true);
    //     console.log(date);
    //   }

    const colorChange = (e) =>{
        if(e.target == undefined){
            let res_data = getYear(e) + "-" + (getMonth(e)+1) + "-" + getDate(e);
            console.log(res_data)
            var today = new Date();
            var dday = new Date(res_data);
            var result = Math.ceil((dday - today)/(1000*60*60*24));
            dayInfo(result);
        }
        else{
            var sliceStringFive = e.target.className.slice(-5);
            var sliceStringSix = e.target.className.slice(-6);
            var sliceStringSeven = e.target.className.slice(-7);
            setDayToggle(false);
            if(sliceStringFive === "three"){ 
                setColorThree('#75BD62');
                setColorSeven('white');
                setColorThirty('white');
                setColorHundred('white');
                setFontThree('white');
                setFontSeven('#75BD62');
                setFontThirty('#75BD62');
                setFontHundred('#75BD62');
                dayInfo(3);
                nextDay.setDate(nextDay.getDate() + 3);
                calculateDate(nextDay);
            }   
            else if(sliceStringFive === "seven"){ 
                setColorThree('white');
                setColorSeven('#75BD62');
                setColorThirty('white');
                setColorHundred('white');
                setFontThree('#75BD62');
                setFontSeven('white');
                setFontThirty('#75BD62');
                setFontHundred('#75BD62');
                dayInfo(7);
                nextDay.setDate(nextDay.getDate() + 7);
                calculateDate(nextDay)
            }   
            else if(sliceStringSix === "thirty"){ 
                setColorThree('white');
                setColorSeven('white');
                setColorThirty('#75BD62');
                setColorHundred('white');
                setFontSeven('#75BD62');
                setFontThree('#75BD62');
                setFontThirty('white');
                setFontHundred('#75BD62');
                dayInfo(30);
                nextDay.setDate(nextDay.getDate() + 30);
                calculateDate(nextDay)
            }   
            else if(sliceStringSeven === "hundred"){ 
                setColorThree('white');
                setColorSeven('white');
                setColorThirty('white');
                setColorHundred('#75BD62');
                setFontSeven('#75BD62');
                setFontThirty('#75BD62');
                setFontThree('#75BD62');
                setFontHundred('white');
                dayInfo(100);
                nextDay.setDate(nextDay.getDate() + 100);
                calculateDate(nextDay)
            }   
        }
    }

    const onToggle = () =>{
      console.log("짜잔")
      setShowDatePicker(!showDatePicker);
    }

    const onChangeDatePicker = (date) => {
        setSelectedDate(date); // 선택된 날짜 업데이트
        calculateDate(date);
        setShowDatePicker(false); // DatePicker 닫기
        // setIsClickedDay(true);
        setDayToggle(true);
        setColorThree('white');
        setColorSeven('white');
        setColorThirty('white');
        setColorHundred('white');
        setFontThree('#75BD62');
        setFontSeven('#75BD62');
        setFontThirty('#75BD62');
        setFontHundred('#75BD62');

      };

    const calculateDate = (date) =>{
        var today = new Date();
        var gap = date.getTime() - today.getTime();
        var result = Math.ceil(gap / (1000 * 60 * 60 * 24))
        console.log(result);
        dayInfo(result);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${yyyy}-${mm}-${dd}`; // 포맷된 날짜 생성
        setUpdateDate(formattedDate);   
    }
    
    return(
        !showDatePicker ? <DayBtnSet style={{opacity : visible ? "1" : "0" , top: visible ? "100%" : "50%"}}>
            <DayBtn className="three" onClick={colorChange} style={{backgroundColor: colorThree, marginLeft:'24px', color: fontThree}}>3일</DayBtn>
            <DayBtn className="seven" onClick={colorChange} style={{backgroundColor: colorSeven, color:  fontSeven}}>7일</DayBtn>
            <DayBtn className="thirty" onClick={colorChange} style={{backgroundColor: colorThirty, color: fontThirty}}>30일</DayBtn>
            <DayBtn className="hundred" onClick={colorChange} style={{backgroundColor: colorHundred, color: fontHundred}}>100일</DayBtn>
            <DayCalender src ={!dayToggle ? Day_Calender : Day_Calender_hover} onClick={onToggle}/>
            {updateDate != null ? <div style={{marginLeft: "4px",color: "#75BD62", fontSize:'12px', paddingTop:'4px'}} onClick={onToggle}>{"~" + updateDate}</div> : ""}
        </DayBtnSet> 
        : 
        <DayBtnSet style={{paddingBottom : "0px"}}>
         <DatePickerContainer>
                <DatePicker
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <DatePickerHeader>
                      <DatePickerHeaderDate>
                        {date.getFullYear()}년 {date.getMonth() + 1}월
                      </DatePickerHeaderDate>
                      <div style={{ gap: "12px", display: "flex" }}>
                        {!prevMonthButtonDisabled && (
                          <img
                            onClick={
                              !prevMonthButtonDisabled
                                ? decreaseMonth
                                : undefined
                            }
                            disabled={prevMonthButtonDisabled}
                            src="../images/ic_left_arrow.svg"
                            alt="icon_left_arrow"
                          />
                        )}
                        <img
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          src="../images/ic_right_arrow.svg"
                          alt="icon_right_arrow"
                        />
                      </div>
                    </DatePickerHeader>
                  )}
                  selected={selectedDate}
                  onChange={(date) => onChangeDatePicker(date)}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  popperPlacement="bottom-start"
                  onClickOutside={() => setShowDatePicker(false)}
                  locale={ko}
                  inline
                />
              </DatePickerContainer>
        {!showDatePicker ? <div style={{marginLeft: "8px",color: "#75BD62", fontSize:'12px', paddingTop:'4px'}}>{"~" + updateDate}</div> : ""}
        </DayBtnSet> 
    )
}

export default Day_Button;