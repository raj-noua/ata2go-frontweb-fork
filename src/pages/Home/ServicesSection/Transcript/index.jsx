// import { SVGImages }          from "../../../../config/images";
import { useNavigate }          from "react-router-dom";
import { useContext }           from "react";
import { Col, Image, Row }      from "react-bootstrap";
import {
    ImageOverLayBox,
    ImageOverlayContainer,
    TranscriptInnerContent,
    TranscriptTitle,
    RestrictionText,
    VideoButton,
    VideoButtonBox
}                               from "./transcriptStyle";
import { TabContentContainer }  from "../../../Tabs/tabContentStyle";
import { Images }               from "../../../../config/images";
import { UserContext }          from "../../../../App";


import React from 'react';

const SvcTranscript = ({ tabLabel, sectionID }) => {
    const navigator = useNavigate();
    const { user } = useContext(UserContext);
    return (
        <TabContentContainer id={sectionID} className="px-0">
            <TranscriptInnerContent>
                <ImageOverlayContainer>
                    <Row>
                        <Col sm={12} md={6} lg={7}></Col>
                        <Col sm={12} md={6} lg={5}>
                            <VideoButtonBox>
                                <TranscriptTitle>Affiliate {tabLabel}</TranscriptTitle>
                                <VideoButton variant="secondary" disabled={!user?._id} onClick={() => navigator("/transcript")}>
                                    Videos
                                </VideoButton>
                                {!user?._id && <RestrictionText>Please Login to transcribe!</RestrictionText>}
                            </VideoButtonBox>
                        </Col>
                    </Row>
                </ImageOverlayContainer>
                <ImageOverLayBox>
                    <Image src={Images.afficialteTranscriptVactor} fluid />
                </ImageOverLayBox>
            </TranscriptInnerContent>
        </TabContentContainer>
    );
};

export default SvcTranscript;
