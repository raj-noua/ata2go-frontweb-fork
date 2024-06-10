import { MissionWrapper, ContentBox } from "./missionSectionStyle";
import { staggerVariants, tileVariants } from "../../../utils/FmVariants";
import { Container } from "react-bootstrap";
import SectionTitle from "../../../components/SectionTitle";

const MissionSection = ({ sectionId }) => {
    return (
        <MissionWrapper
            id={sectionId}
            variants={staggerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Container>
                <ContentBox variants={tileVariants}>
                    <SectionTitle>
                        Our
                        <br /> <span>Mission</span>
                    </SectionTitle>
                    <p>
                        We believe in fostering a strong community of consumers who are joined together under one umbrella, leveraging their
                        combined purchasing power and resulting in the ability to obtain better prices and enhanced value across a wide
                        range of goods and services.
                    </p>
                    <p>
                        Our vision is to become the go-to platform that enables individuals to seamlessly be part of a formidable client
                        base that drives down costs without compromising on quality or satisfaction.
                    </p>
                    <p>
                        This innovative approach not only benefits our members, but also promotes fairness and transparency in the
                        marketplace, ensuring that all parties benefit from mutually advantageous relationships.
                    </p>
                    <p>
                        As we continue to grow and expand our member base, our commitment to creating a positive impact on the lives of our
                        members remains unwavering. We commit to sharing financial success achieved through our negotiations back to our
                        members, further enriching their lives and empowering them to make informed choices.
                    </p>
                    <p>
                        Through collaboration, unity, and the power of numbers, ATA2GO aims to reshape the way consumers engage with the
                        market, ultimately forging a more equitable, sustainable, and prosperous future for all.
                    </p>
                </ContentBox>
            </Container>
        </MissionWrapper>
    );
};
export default MissionSection;
