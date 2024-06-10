import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { AboutImageContainer, AboutWrapper, ContentBox, InnerContent } from "./aboutSectionStyle";
import { staggerVariants, tile_Left2right, tile_right2Left } from "../../../utils/FmVariants";
import SectionTitle from "../../../components/SectionTitle";

const AboutSection = ({ sectionId }) => {
    return (
        <AboutWrapper id={sectionId}>
            <Container fluid className="px-0 mx-auto">
                <Row className="px-0 mx-auto">
                    <Col md="7" className="px-0 mx-auto">
                        <InnerContent
                            variants={staggerVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <SectionTitle variants={tile_Left2right}>
                                <span>About Us</span>
                            </SectionTitle>
                            <ContentBox variants={tile_Left2right}>
                                <p>
                                    We are passionate about creating innovative solutions that transform the way consumers interact with the 
                                    market. Driven by challenges and guided by our vision for a more equitable, sustainable, and prosperous 
                                    future, we strive to cater to the needs of our members while fostering a strong sense of community.
                                </p>
                                <p>
                                    We warmly invite entrepreneurs and professionals who share our values to contact us to discuss potential
                                    collaborations and opportunities for mutual growth. If you are ready to take on exciting challenges and 
                                    contribute to shaping the future of our platform, please do not hesitate to reach out to us for further
                                    inquiries. Together, we can shape a marketplace where benefits are shared fairly and consumers are empowered 
                                    to make informed and cost-effective decisions.
                                </p>
                                <p>
                                    Let's transform the Entrepreneurial Marketplace through Business Services Innovation, Technology application
                                    and Communal wealth generation.
                                </p>
                            </ContentBox>
                        </InnerContent>
                    </Col>
                    <Col md="5" className="px-0 mx-auto">
                        <AboutImageContainer
                            variants={staggerVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.div className="aboutImage" variants={tile_right2Left}>
                                {/* <Image src={Images.aboutUsSectionImage} fluid /> */}
                            </motion.div>
                        </AboutImageContainer>
                    </Col>
                </Row>
            </Container>
        </AboutWrapper>
    );
};
export default AboutSection;
