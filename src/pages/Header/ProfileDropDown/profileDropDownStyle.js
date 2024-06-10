import styled from "styled-components";
import { Colors } from "../../../config/colors";

export const ProfileDD = styled.div`
    .menu {
        /* filter: drop-shadow(1px 1px 1px #5116a9); */
        /* width: 300px; */
        position: relative;
    }

    ul {
        display: flex;
        flex-direction: column;
        /* gap: 10px; */
        background: #ffffff;
        position: absolute;
        top: calc(100% + 1rem);
        border-radius: 10px;
        right: -100%;
        width: 100%;
        min-width: 150px;
        margin: auto;
        transform: translate(0%, 0%);
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #00000029;
        padding: 10px 0;
    }

    /* li {
        color: ${Colors.primaryColor};
        transform-origin: -20px 50%;
        display: flex;
        align-items: center;
        gap: 0.725rem;
        cursor: pointer;
        padding: 0.5rem 1.5rem;

        svg {
            width: 16px;
            height: auto;
            transform: translateX(0px);
            transition: all 0.3s ease-in-out;
        }

        &:hover {
            background-color: ${Colors.lightBlueColor};
            svg {
                transform: translateX(5px);
                transition: all 0.3s ease-in-out;
            }
        }
    } */

    li {
        transform-origin: -20px 50%;
        display: flex;
        align-items: center;
        gap: 0.725rem;
        cursor: pointer;
        padding: 0.7rem 1.5rem;

        svg {
            width: 16px;
            height: auto;
            transform: translateX(0px);
            transition: all 0.3s ease-in-out;
            color: ${Colors.secondaryColor};
        }

        &:hover {
            color: ${Colors.primaryColor};
            //background-color: ${Colors.lightBlueColor};

            svg {
                color: ${Colors.primaryColor};
                transform: translateX(5px);
                transition: all 0.3s ease-in-out;
            }
        }

        span {
            font-size: 14px;
        }
    }

    ul,
    li {
        list-style: none;
        margin: 0;
    }

    button {
        background: transparent;
        color: ${Colors.primaryColor};
        border: none;
        border-radius: 10px;
        /* padding: 10px 20px; */
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        .userProfile {
            width: 24px;
            height: 24px;
        }

        > svg path {
            stroke: #ffffff;
            transition: all 0.3s ease-in-out;
        }

        .arrow path {
            stroke: #b0c3fb;
        }

        &.scrolled {
            > svg path {
                /* stroke: ${Colors.grayColor}; */
                transition: all 0.3s ease-in-out;
            }
        }
    }
`;
