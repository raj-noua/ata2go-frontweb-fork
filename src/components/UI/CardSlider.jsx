import Slider           from "react-slick";
import { styled }       from "styled-components";
import { Colors }       from "../../config/colors";
import { SVGImages }    from "../../config/images";

const SliderContainer = styled.div`
    padding: 0 15px;

    .slick-list {
        padding: 0 20%;
    }

    .slick-slide {
        padding: 0 10px;
        opacity: 0.3;

        &.slick-active,
        &.slick-center,
        &.slick-current {
            opacity: 1;
        }
    }

    .slick-arrow {
        &::before {
            display: none;
        }
    }

    .slick-next,
    .slick-prev {
        z-index: 3;

        svg {
            background-color: #ffffff;
            border-radius: 50px;
            border: 1px solid #4f4949;
            path {
                stroke: ${Colors.primaryColor} !important;
            }
        }
    }

    .slick-next {
        right: 4px;
    }
    .slick-prev {
        left: 0px;
    }

    .slick-dots {
        bottom: -50px;
        button::before {
            font-size: 12px;
            color: ${Colors.secondaryColor};
        }

        .slick-active {
            button::before {
                color: ${Colors.primaryColor};
            }
        }
    }

    @media only screen and (max-width: 1400px) {
        .slick-list {
            padding: 0 10%;
        }
    }
    @media only screen and (max-width: 1200px) {
        .slick-list {
            padding: 0 5%;
        }
    }
    @media only screen and (max-width: 600px) {
        padding: 0 0 !important;
        .slick-list {
            padding: 0 0 !important;
        }
    }
`;

const CardSlider = ({ sliderConfig, children }) => {
    const newConfig = { ...sliderConfig, nextArrow: <SampleNextArrow />, prevArrow: <SamplePrevArrow /> };

    return (
        <SliderContainer>
            <Slider {...newConfig}>{children}</Slider>
        </SliderContainer>
    );
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, color: Colors.primaryColor }} onClick={onClick}>
            <SVGImages.ChevronRightIcon />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
            <SVGImages.ChevronLeftIcon />
        </div>
    );
}

export default CardSlider;
