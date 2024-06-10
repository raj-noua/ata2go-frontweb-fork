// import { SVGImages } from "../../../../config/images";
import { Col, Image, Row }      from "react-bootstrap";
import { useNavigate }          from "react-router-dom";
import { useContext }           from "react";
import {
    ImageOverLayBox,
    ImageOverlayContainer,
    MarketingInnerContent,
    MarketingTitle,
    RestrictionText,
    VideoButton,
    VideoButtonBox
} from "./marketingStyle";
import { TabContentContainer }  from "../../../Tabs/tabContentStyle";
import { Images }               from "../../../../config/images";
import { UserContext }          from "../../../../App";

const SvcMarketing = ({ tabLabel, sectionID }) => {
    const navigator = useNavigate();
    const { user } = useContext(UserContext);
    return (
        <TabContentContainer id={sectionID} className="px-0">
            <MarketingInnerContent>
                <ImageOverlayContainer>
                    <Row>
                        <Col sm={12} md={6} lg={7}></Col>
                        <Col sm={12} md={6} lg={5}>
                            <VideoButtonBox>
                                <MarketingTitle>Affiliate {tabLabel}</MarketingTitle>
                                <VideoButton variant="secondary" disabled={!user?._id} onClick={() => navigator("/videos")}>
                                    Videos
                                </VideoButton>
                                {!user?._id && <RestrictionText>Please Login to see the videos!</RestrictionText>}
                            </VideoButtonBox>
                        </Col>
                    </Row>
                </ImageOverlayContainer>
                <ImageOverLayBox>
                    <Image src={Images.afficialtemarketingVactor} fluid />
                </ImageOverLayBox>
            </MarketingInnerContent>
        </TabContentContainer>
    );
};

export default SvcMarketing;
