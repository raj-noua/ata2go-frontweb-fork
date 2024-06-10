import { Button, Container }    from "react-bootstrap";
import styled                   from "styled-components";
import { TabTitle }             from "../../../Tabs/tabContentStyle";
import { Images }               from "../../../../config/images";
import { Colors }               from "../../../../config/colors";

export const MarketingInnerContent = styled.div`
    width: 100%;
    background-image: linear-gradient(to right, rgba(${Colors.secondaryColorRgba}, 0.6), rgba(${Colors.primaryColorRgba}, 0.8)),
        url(${Images.afficialtemarketingVactor});
    background-position:
        center center,
        center center;
    background-size: cover, contain;
    border-radius: 15px;
    overflow: hidden;
    position: relative;

    @media only screen and (max-width: 767.98px) {
        background-repeat: no-repeat, no-repeat;
        background-size: cover, cover;
    }
`;

export const MarketingTitle = styled(TabTitle)`
    color: #ffffff !important;
    font-size: 3em;
`;
export const RestrictionText = styled.p`
    color: #ff3333 !important;
    margin-top: 30px;
`;
export const ImageOverlayContainer = styled(Container)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    .row {
        height: 100%;
    }
`;
export const ImageOverLayBox = styled.div`
    width: 100%;

    svg,
    img {
        opacity: 0;

        @media only screen and (max-width: 767.98px) {
            min-height: 425px;
        }
    }
`;
export const VideoButtonBox = styled.div`
    padding: 3em 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const VideoButton = styled(Button)`
    padding: 12px 26px;

    width: 100%;
    max-width: 406px;
    border-radius: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.2;
    text-align: center;
    color: #ffffff;
`;
