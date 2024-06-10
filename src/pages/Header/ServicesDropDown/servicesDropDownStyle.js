import styled from "styled-components";
import { Colors } from "../../../config/colors";

export const ServicesDD = styled.div`
    .menu {
        /* filter: drop-shadow(1px 1px 1px #5116a9); */
        width: auto;
        position: relative;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 5px;
        /* background: #ffffff; */
        position: absolute;
        top: calc(100% + 1rem);
        border-radius: 10px;
        right: -100%;
        width: 100%;
        min-width: 210px;
        margin: auto;
        transform: translate(0%, 0%);
        padding: 0px 0;
        z-index: 9999;
    }

    li {
        background-color: #ffffff;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #00000029;
        color: ${Colors.darkColor};
        transform-origin: -20px 50%;
        display: flex;
        align-items: center;
        gap: 0.725rem;
        cursor: pointer;
        padding: 1rem;
        border-radius: 8px;

        svg {
            width: 26px;
            height: auto;
            transform: translateX(0px);
            transition: all 0.3s ease-in-out;
            color: ${Colors.secondaryColor};

            /* path {
                fill: ${Colors.secondaryColor} !important;
            } */
        }

        &:hover {
            color: ${Colors.primaryColor};
            background-color: ${Colors.lightBlueColor};

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
        padding: 0 0rem;
        cursor: pointer;
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
    }

    button .arrow path {
        stroke: #b0c3fb;
    }

    .nav-link {
        padding: 0 !important;
    }
`;
