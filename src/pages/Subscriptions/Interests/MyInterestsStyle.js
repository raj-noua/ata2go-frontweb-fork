import { Button } from "react-bootstrap";
import styled from "styled-components";
import FONTS from "../../../config/fonts";
import { Colors } from "../../../config/colors";

export const CategoriesBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

export const HeadingBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 30px;
    position: relative; /* Ensure the HeadingBox is the reference point */
`;

export const ProductsBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

export const CategoryText = styled.p`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    color: ${Colors.primaryColor};
    margin-bottom: 0;
    transition: all 0.2s ease-in-out;
    text-transform: capitalize;
`;

export const EachCategory = styled.div`
    padding: 1em 1em;
    border: 1px solid ${Colors.grayColor};
    border-radius: 15px;
    /* margin-bottom: 24px; */

    h4 {
        font-size: 18px;
    }
`;

export const PreferencesButton = styled(Button)`
    position: fixed; /* Position relative to the HeadingBox */
    top: 15%; /* Adjust this value to align vertically */
    transform: translateY(-50%); /* Center the button vertically */
    right: 0; /* Position the button to the right */
    z-index: 1000; /* Ensure the button is above other elements */
    background-color: ${Colors.primaryColor};
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: ${Colors.darkColor};
    }
`;
