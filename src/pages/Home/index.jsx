import AboutSection from "./AboutSection";
import BannerSection from "./BannerSection";
import ContactSection from "./ContactSection";
import MissionSection from "./MissionSection";
import PrivacySection from "./PrivacySection";
import ServicesSection from "./ServicesSection/_Main";

const Home = () => {
    return (
        <>
            <BannerSection sectionId="banner" />
            <MissionSection sectionId="mission" />
            <AboutSection sectionId="about" />
            <ServicesSection sectionId="services" />
            <PrivacySection sectionId="privacy" />
            <ContactSection sectionId="contact" />
        </>
    );
};
export default Home;
