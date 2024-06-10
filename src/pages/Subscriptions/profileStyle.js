import { styled }   from "styled-components";
import FONTS        from "../../config/fonts";
import { Colors }   from "../../config/colors";

export const ProfileSection = styled.section`
    padding: 0em 0px 0;
    min-height: 310px;
    .container {
        @media only screen and (max-width: 767.98px) {
            max-width: 100% !important;
        }
    }
`;
export const PageHeading = styled.h3`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 1.2;
    color: ${Colors.darkColor};
`;
