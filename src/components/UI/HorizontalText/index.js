import React                        from "react";
// import { HorizontalTextWrapper } from "./horizontalTextStyle";
import { ScrollTextWrapper }        from "./horizontalTextStyle";

const HorizontalText = props => {
    return (
        <ScrollTextWrapper className={props.className} $bottom={props.bottom} $color={props.color} $isAcitve={props.isAcitve}>
            <div className="ScrollInfo_Contents">
                <h4 className="ScrollInfo_Text">{props.title}</h4>
                <div className="ScrollInfo_Line"></div>
            </div>
        </ScrollTextWrapper>
    );
};

export default HorizontalText;
