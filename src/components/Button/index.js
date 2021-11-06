import React from "react";
import { Wrapper } from "./Button.styles";
import PropTypes from 'prop-types'

const Button = ({callback,text}) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
)

Button.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
}

export default Button