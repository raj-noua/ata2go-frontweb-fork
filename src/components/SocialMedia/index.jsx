import styled                   from "styled-components";
import { SVGImages }            from "../../config/images";
import { Link }                 from "react-router-dom";
import { Colors }               from "../../config/colors";
import { motion }               from "framer-motion";
import { tileSmallVariants }    from "../../utils/FmVariants";

const SocialMediaWrapper = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5em;
`;
const SocialMediaItem = styled(motion(Link))`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5em;

    width: 40px;
    height: 40px;
    padding: 10px;

    /* Secondary */
    background: ${Colors.secondaryColor};
    border-radius: 60px;
    transform: translateY(0px);
    transition: all 0.3s ease-in-out;

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        transform: translateY(-3px);
        transition: all 0.2s ease-in-out;
        background: ${Colors.primaryColor};
    }
`;

const SocialMedia = () => {
    return (
        <SocialMediaWrapper>
            <SocialMediaItem to="#" title="Facebook" variants={tileSmallVariants}>      <SVGImages.FacebookIcon />      </SocialMediaItem>
            <SocialMediaItem to="#" title="Youtube" variants={tileSmallVariants}>       <SVGImages.YoutubeIcon />       </SocialMediaItem>
            <SocialMediaItem to="#" title="Instagram" variants={tileSmallVariants}>     <SVGImages.InstagramIcon />     </SocialMediaItem>
            <SocialMediaItem to="#" title="Twitter" variants={tileSmallVariants}>       <SVGImages.TwitterIcon />       </SocialMediaItem>
        </SocialMediaWrapper>
    );
};

export default SocialMedia;