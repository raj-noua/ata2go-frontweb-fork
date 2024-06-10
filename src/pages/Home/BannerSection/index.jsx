import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BannerWrapper, H1Title, H2Title, SubTitle } from "./bannerSectionStyle";
import { SVGImages } from "../../../config/images";
import { motion } from "framer-motion";
import { staggerVariants, tileVariants } from "../../../utils/FmVariants";
import { useNavigate } from "react-router-dom";

const BannerSection = ({ sectionId }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            const ele = document.querySelector("#header");
            const bannerEle = document.querySelector("#banner");
            bannerEle.style.height = `calc(100vh - ${ele.clientHeight + "px"}`;
        }, 1000);

        return () => {
            clearTimeout(myTimeout);
        };
    }, []);

    return (
        <BannerWrapper id={sectionId}>
            <Container>
                <Row>
                    <Col sm="12" lg="7">
                        <motion.div
                            className="contentBox"
                            variants={staggerVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}>
                            <H1Title variants={tileVariants}>ATA2GO</H1Title>
                            <H2Title variants={tileVariants}>Marketing Through Services at it's best!</H2Title>
                            <SubTitle variants={tileVariants}>Your Business is top priority</SubTitle>
                        </motion.div>
                    </Col>
                    <Col sm="12" lg="5"></Col>
                </Row>
            </Container>
            <SVGImages.DownScrollIcon className="floatImg" onClick={() => navigate("/#mission")} />
        </BannerWrapper>
    );
};
export default BannerSection;
