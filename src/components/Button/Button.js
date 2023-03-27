import { BaseButtonStyle } from "./style";
import styled from 'styled-components';
import { ReactComponent as NextArrow} from "../../images/next_arrow.svg";

const NextArrowStyle = styled.div`
  display: ${props => (props.buttonSize == ButtonSize.LARGE) ? "block" : "none"};
  marign-right: 10px;
`

export const ButtonSize = {
  NORMAL: 0,
  LARGE: 1,
};

export const ButtonTheme = {
  GREEN: 0,
  GRAY: 1,
};

Object.freeze(ButtonSize, ButtonTheme);

const Button = ({buttonSize, buttonTheme, disabled, handler ,children}) =>{
  if (!buttonSize) {
    buttonSize = ButtonSize.NORMAL;
  }
  if (!buttonTheme) {
    buttonTheme = ButtonTheme.GREEN;
  }

  return <BaseButtonStyle buttonSize={buttonSize} buttonTheme={buttonTheme} disabled={disabled} onClick={handler}>
    {children}
    <NextArrowStyle buttonSize={buttonSize} buttonTheme={buttonTheme}>
      <NextArrow fill={buttonTheme == ButtonTheme.GREEN ? "#FFFFFF" : "#A0A0A0"} />
    </NextArrowStyle>
    </BaseButtonStyle>
};

export default Button;