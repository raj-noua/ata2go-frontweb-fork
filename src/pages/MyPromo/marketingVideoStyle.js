import { styled }                   from "styled-components";
import { Colors }                   from "../../config/colors";
import { Button, Form, FormLabel }  from "react-bootstrap";
import FONTS                        from "../../config/fonts";

export const MarketingVideoSection = styled.section`
    padding: 3em 0 1em;
    margin-bottom: 30px;
`;

export const TableRow = styled.tr`
    cursor: pointer;
    &.active {
        td {
            --bs-table-color-type: rgba(${Colors.primaryColorRgba}, 0.2) !important;
            --bs-table-bg-type: rgba(${Colors.primaryColorRgba}, 0.2) !important;
            color: ${Colors.primaryColor};
        }
    }
`;

export const VideoContentSection = styled.section`
    margin-bottom: 2px;
`;

export const MarketingVideoContent = styled.div`
    padding: 0.4em;
    margin-bottom: 1px;
    background: ${Colors.lightBlueColor};
    border-radius: 20px; /* Round Edge */
`;

export const VideoDesc = styled.div`
    /* 14-Light */
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 10px;
    color: ${Colors.darkColor};
`;

export const VideoPlayerContainer = styled.div`
    aspect-ratio: 16 / 9;
    width: 100%;
    margin: 200 auto 10px;
    border-radius: 200px;

    > div {
        float: none;
        clear: both;
        width: 100%;
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 0px; // Adjust padding-top to reduce empty space at the top
        height: 0;
        border-radius: 20px; /* Round Edge of the video */ 
        overflow: hidden;

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`;
export const VideoMetaContent = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 24px;

    strong {
        width: 180px;
        display: inline-flex;
    }

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.2;
        color: ${Colors.grayColor};
        display: table-cell;
    }

    .titleCol {
        margin-bottom: 15px;
    }

    .contentCol {
        width: 100%;
        max-width: 800px;
    }
`;

export const CommentForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 17px;

    > div {
        width: 100%;
        max-width: 600px;
    }
`;

export const FormLabelText = styled(FormLabel)`
    font-family: ${FONTS.lexend};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: ${Colors.darkColor};
    flex: none;
    order: 0;
    flex-grow: 0;
`;
export const FormControlTextArea = styled(Form.Control)`
    padding: 14px 16px;
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
        width: 100%;
    }

    &:focus {
        outline: none !important;
        box-shadow: unset !important;
        border-color: ${Colors.strokeColor} !important;
    }
`;

export const FormButton = styled(Button)`
    /* width: 100%;
    max-width: 200px; */
    padding: 12px 26px;
    height: 46px;
    /* background: ${Colors.primaryColor}; */
    border-radius: 8px;

    span {
        font-family: ${FONTS.lexend};
        font-style: normal;
        font-weight: 200;
        font-size: 16px;
        line-height: 1;
        text-align: center;
        color: #ffffff;
    }
`;

export const CustomFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    height: 17%;
`;

export const CustomFilterInput = styled.input`
    width: 77% !important; /* Adjusted width */
    margin-top: auto !important; /* Align to bottom */
    vertical-align: bottom !important;
    display: block !important;
    height: auto !important; /* Ensure the height is appropriate */
    padding: 4px !important; /* Optional: Adjust padding for better appearance */
    background-color: yellow !important; /* Set background color to yellow */
    border: 1px solid ${Colors.strokeColor} !important; /* Optional: Add border */
    color: blue;
`;

export const CustomTableHeaderContainer = styled.div`
    background-color: #f8f9fa;
    padding: 3px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
    border: 2px solid #dee2e6; /* Add a border around the title */
    border-radius: 10px; /* Optional: Add border radius for rounded corners */
    /* margin-bottom: 20px; /* Add some space below the header */
`;

export const CustomTableHeaderTitle = styled.h2`
    margin: 0;
    font-size: 22px;
    /* font-weight: bold; */
    color: blue; /* Make the text blue */
`;


export const CustomTableHeader = ({ title }) => {
    return (
        <CustomTableHeaderContainer>
            <CustomTableHeaderTitle>{title}</CustomTableHeaderTitle>
        </CustomTableHeaderContainer>
    );
};