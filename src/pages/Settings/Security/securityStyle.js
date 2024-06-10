import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import styled                                   from "styled-components";
import { motion }                               from "framer-motion";
import FONTS                                    from "../../../config/fonts";
import { Colors }                               from "../../../config/colors";

export const SecurityFormContainer = styled(motion(Form))`
    width: 100%;
    margin-bottom: 30px;
`;

export const FormLabelText = styled(motion(FormLabel))`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.2;
    color: ${Colors.placeHolderColor};
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
        color: ${Colors.grayColor};
    }

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: ${Colors.darkColor} !important;
    }
`;
export const FormSelectField = styled(motion(Form.Select))`
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 10px;

    /* Stroke */
    border: 1px solid ${Colors.strokeColor};
    border-radius: 5px;

    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.2;
    color: ${Colors.grayColor};

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: ${Colors.darkColor} !important;
    }
`;

export const FormControlTextArea = styled(FormControlField)``;

export const FormButton = styled(motion(Button))`
    width: auto;
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

export const ShowHidePassField = styled(motion.div)`
    position: relative;

    .form-control {
        padding-right: 5.5em !important;
    }

    button {
        position: absolute !important;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none !important;

        svg {
            width: 24px;
            height: 24px;
            path {
                stroke: ${Colors.placeHolderColor};
            }
        }

        &:hover {
            background-color: transparent !important;
        }
    }

    &:focus {
        border-color: #ffffff;
    }
`;
