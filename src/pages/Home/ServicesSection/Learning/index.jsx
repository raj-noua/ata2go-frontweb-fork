import { useNavigate }          from "react-router-dom";
import { useContext }           from "react";
import { UserContext }          from "../../../../App";
import { CoursesBox }                                               from "./technologyCoursesStyle";
import CoursePlan                                                   from "./CoursePlan";
import { BoldContent, TabContentContainer, TabTitle, TextContent,
         OrderButton,
         RestrictionText }                                          from "../../../Tabs/tabContentStyle";
import { useGetAllCoursesQuery }                                    from "../../../../services/courseApi";
import CardSlider                                                   from "../../../../components/UI/CardSlider";



const SvcLearning = ({ tabLabel, sectionID }) => {
    const navigator = useNavigate();
    const { user } = useContext(UserContext);
    const { data } = useGetAllCoursesQuery();
    const settings = {
        className: "slider center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "20%",
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    centerPadding: "10%"
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: "5%"
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerPadding: "0%"
                }
            }
        ]
    };
    return (
        <TabContentContainer id={sectionID}>
            <TabTitle className="text-center">{tabLabel}</TabTitle>
            <BoldContent>
                <p>
                    Looking to use Microsoft Word for a basic document or to enhance the appearance of your documents, letters, and
                    presentations? Our advisors will guide you step-by-step.
                </p>
            </BoldContent>
            <TextContent>
                <p>
                    Does Excel seem like a puzzle to you? Look no further! We will start from the simplest form and grow with you at every
                    step to create professional and efficient spreadsheets. Internet technologies are highly imaged and can sometimes be
                    confusing. No more hassle as our advisors will help you differentiate and use popular cloud platforms.
                </p>
                <p>
                    Our services are tailored to your level and we offer professional consultation services to meet your specific individual
                    or business needs.
                </p>
            </TextContent>
            <CoursesBox>
                {data?.data?.length > 0 && (
                    <CardSlider sliderConfig={settings}>
                        {data?.data?.map(course => {
                            return <CoursePlan key={course._id} courseData={course} />;
                        })}
                    </CardSlider>
                )}
            </CoursesBox>
            <OrderButton variant="secondary" disabled={!user?._id} onClick={() => navigator("/subscriptions?tab=learning")}>
                My Learning Program
            </OrderButton>
            {!user?._id && <RestrictionText>Login to Order Learning Program!</RestrictionText>}
        </TabContentContainer>
    );
};

export default SvcLearning;
