import styled       from "styled-components";
import { Colors }   from "../../../../../config/colors";
import FONTS        from "../../../../../config/fonts";

export const InternetPlanWrapper = styled.div`
    background: rgba(255, 255, 255, 0.2);
    padding: 24px;
    border: 1px solid ${Colors.grayColor};
    box-shadow: inset 0px 1px 40px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(50px);
    border-radius: 10px;
    width: 100%;

    @media only screen and (min-width: 1200px) {
        min-width: 475px;
        width: 100%;
    }
`;

export const PlanInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
    position: relative;
    flex-wrap: wrap;

    @media only screen and (min-width: 1026px) and (max-width: 1200px) {
        justify-content: space-evenly;
        width: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        opacity: 0.2;
        width: 100%;
        height: 1px;
        border-radius: 20px;
        background-color: ${Colors.grayColor};
        left: 0;
        bottom: 0;
    }
`;
export const PlanPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media only screen and (max-width: 600px) {
        flex-wrap: wrap;
    }
`;

export const Price = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;

    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 1;
    text-align: center;
    margin-bottom: 0;
    color: ${Colors.primaryColor};

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.2;
        text-align: left;
        margin-bottom: 0.1rem;
        color: ${Colors.grayColor};
        display: block;
    }
`;
export const InternerSpeed = styled.h4`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.2;
    text-align: center;
    color: ${Colors.grayColor};
`;

export const PlanSpeed = styled.ul`
    display: inline-flex;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;

    @media only screen and (min-width: 1026px) and (max-width: 1200px) {
        justify-content: space-evenly;
        width: 100%;
    }

    li {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        gap: 4px;

        span {
            font-family: ${FONTS.lexend};
            font-style: normal;
            font-weight: 300;
            font-size: 16px;
            line-height: 1.2;

            color: ${Colors.grayColor};
        }
    }
`;

export const PlanContent = styled.div`
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;

    p {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 0;
        color: ${Colors.grayColor};
        position: relative;
        padding-left: 16px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto auto;
            width: 8px;
            height: 8px;
            border-radius: 30px;
            background: ${Colors.primaryColor};
        }
    }
`;
