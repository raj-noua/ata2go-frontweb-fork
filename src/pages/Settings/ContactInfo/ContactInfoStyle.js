import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import styled                                   from "styled-components";
import { motion }                               from "framer-motion";
import FONTS                                    from "../../../config/fonts";
import { Colors }                               from "../../../config/colors";

export const LoginContactForm = styled(motion(Form))`
    width: 100%;
    margin-bottom: 50px;
`;

export const FormLabelText = styled(motion(FormLabel))`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    color: ${Colors.grayColor};
`;
export const FormControlField = styled(motion(FormControl))`
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 10px;

    /* Stroke */
    border: 1px solid ${Colors.strokeColor};
    border-radius: 5px;

    &.form-control {
        background-color: transparent;
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.2;
        color: ${Colors.darkColor};

        &:disabled,
        &[disabled] {
            background-color: #eaf1ff !important;
        }
    }

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: ${Colors.darkColor} !important;
    }
`;

export const FormControlTextArea = styled(FormControlField)``;

export const FormButton = styled(motion(Button))`
    width: 80%;
    padding: 12px 26px;
    height: 46px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 200;
        font-size: 16px;
        line-height: 1.2;
        text-align: center;
        color: ${Colors.darkColor};
    }

    &.btn-outline-primary {
        &:hover {
            span {
                color: #ffffff;
            }
        }
    }

    &.btn-primary {
        span {
            color: #ffffff;
        }
    }
`;
