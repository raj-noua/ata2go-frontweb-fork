import { Col, Container, Row }                                      from "react-bootstrap";
import { ServicesSectionWrapper, ContentBox, ServicesContainer }    from "./servicesSectionStyle";
import SectionTitle                                                 from "../../../../components/SectionTitle";
import ServiceContents                                              from "../_ServiceContents";

const ServicesSection = ({ sectionId }) => {
    return (
        <ServicesSectionWrapper
            id={sectionId}
            // variants={staggerVariants}
            // initial="offscreen"
            // whileInView="onscreen"
            // viewport={{ once: true, amount: 0.1 }}
        >
            <Container>
                <Row>
                    <Col sm="12" lg="12">
                        <SectionTitle>
                            Our
                            <br /> <span>Services</span>
                        </SectionTitle>
                    </Col>
                    <Col sm="12" lg="12">
                        <ContentBox>
                            <p>We strive to offer a diverse range of services tailored to meet the evolving needs of our members.</p>
                            <p>Leading the pack in our current offerings is high-speed and reliable home internet services.</p>
                            <p>
                                {`Our technology courses, focusing on Microsoft Word and Excel, are designed to enhance your digital literacy
                                specially in today's ubiquitus context of cloud offerings. For those with a base knowledge, we will work to
                                elevate your professional skills. Discuss with our staff for professional consulting services that are
                                adapted to your projects or businesses.`}
                            </p>
                            <p>
                                Additionally, we extend Car Parts Consultations to guide you through the often-complex world of automotive
                                parts, helping you make informed decisions. Contact us to discover your purchase options.
                            </p>
                            <p>
                                We are dedicated to providing exceptional value through these services. Our commitment to quality and member
                                satisfaction remains at the forefront of our service delivery, as we continuously explore new ways to expand
                                and refine our offerings in response to the ever-changing demands of the modern consumer landscape.
                            </p>
                        </ContentBox>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <ServicesContainer>
                            <ServiceContents />
                        </ServicesContainer>
                    </Col>
                </Row>
            </Container>
        </ServicesSectionWrapper>
    );
};
export default ServicesSection;
