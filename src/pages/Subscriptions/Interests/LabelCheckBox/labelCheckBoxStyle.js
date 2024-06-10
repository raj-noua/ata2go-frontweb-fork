import styled from "styled-components";
import { Colors } from "../../../../config/colors";

export const CheckBoxLabel = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;

    .outerBox {
        display: flex;
        align-items: center;
        gap: 10px;

        &.categoryBox {
            padding: 6px 12px;
            background: ${Colors.lightBlueColor};
            border: 2px solid ${Colors.primaryColor};
            box-shadow: 0px 2px 0px ${Colors.primaryColor};
            border-radius: 8px;
            transition: all 0.3s ease-in-out;

            img {
                width: 20px;
                height: 20px;
                object-fit: cover;
            }

            &.selected {
                box-shadow: none;
                background: ${Colors.secondaryColor};
                border-color: ${Colors.secondaryColor};

                p {
                    color: #ffffff !important;
                    transform: translateX(-5px);
                    transition: all 0.2s ease-in-out;
                }
            }
        }
    }

    input[type="checkbox"] {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    .checkbox {
        display: inline-block;
        width: 24px;
        height: auto;
        background: transparent;
        margin-right: 4px;
        border-radius: 6px;
        transition: all 0.5s ease-in-out;
    }

    .checkbox--active {
        border-color: ${Colors.secondaryColor};
        background: ${Colors.secondaryColor};
    }

    &.selected {
        box-shadow: none;
        background: transparent;
    }

    &:hover {
        .checkbox:not(.checkbox--active) .check-mark {
            stroke: ${Colors.secondaryColor};
            stroke-width: 3px;
            transition: all 0.1s ease-in-out;
        }
    }
`;
