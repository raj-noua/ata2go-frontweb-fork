import styled from "styled-components";

export const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 992px;
    margin: auto;
    gap: 1em;

    @media only screen and (max-width: 767.98px) {
        justify-content: flex-start;
    }
`;
export const FeatureListItem = styled.li`
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 1em;

    svg {
        width: 24px;
        height: 24px;
    }

    span {
        width: calc(100% - 26px);
    }
`;
export const InternetPlanBox = styled.div`
    padding: 2em 15px;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 50%));
    gap: 2em; */
    width: 100%;
    position: relative;
    overflow: hidden;
    /* max-width: 1400px; */

    @media only screen and (max-width: 767.98px) {
        padding: 2em 0px;
    }
`;
