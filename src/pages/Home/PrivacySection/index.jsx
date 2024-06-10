import { Col, Container, Image, Row }           from "react-bootstrap";
import { PrivacyWrapper, ContentBox, ImageBox } from "./privacySectionStyle";
import SectionTitle                             from "../../../components/SectionTitle";
import { staggerVariants, tileVariants }        from "../../../utils/FmVariants";
import { Images }                               from "../../../config/images";

const PrivacySection = ({ sectionId }) => {
    return (
        <PrivacyWrapper
            id={sectionId}
            variants={staggerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Container>
                <Row>
                    <Col md={12} lg={6}>
                        <SectionTitle>
                            Our
                            <br /> <span>Privacy </span>
                        </SectionTitle>
                        <ContentBox variants={tileVariants}>
                            <p>
                                At ATA2GO, we hold privacy and data protection in the highest regard. We are deeply committed to
                                safeguarding the personal information of our members and strictly adhere to our privacy policy, which
                                ensures that your data is not shared with any entity. We believe that each member has the right to full
                                disclosure regarding their individual profile data, and we uphold this principle by providing complete
                                transparency about all data we collect and how it is used.
                            </p>
                            <p>
                                We respect all legal and governmental obligations related to customer data protection and are committed to
                                implementing robust data security measures. Our adherence to these standards and regulations demonstrates
                                our unwavering commitment to protecting your privacy and ensuring the confidentiality, integrity, and
                                availability of your data.
                            </p>
                            <p>
                                Your trust is our top priority, and we continuously strive to maintain and enhance our data privacy measures
                                to safeguard your information.
                            </p>
                        </ContentBox>
                    </Col>
                    <Col md={12} lg={6}>
                        <ImageBox>
                            <Image src={Images.privacySectionImg} fluid />
                        </ImageBox>
                    </Col>
                </Row>
            </Container>
        </PrivacyWrapper>
    );
};
export default PrivacySection;
