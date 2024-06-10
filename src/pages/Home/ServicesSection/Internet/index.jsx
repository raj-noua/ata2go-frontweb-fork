import { FeatureList, FeatureListItem, InternetPlanBox }    from "./homeInternetStyle";
import { SVGImages }                                        from "../../../../config/images";
import { useGetAllInternetsQuery }                          from "../../../../services/internetApi";
// import { internetPlans }                                 from "../../../../utils/constants";
import CardSlider                                           from "../../../../components/UI/CardSlider";
import InternetPlan                                         from "./InternetPlan";
import { BoldContent, TabContentContainer, TabTitle }       from "../../../Tabs/tabContentStyle";

const features = ["Unlimited downloads", "Free service installation", "Free modem rental and included Wifi*"];

const SvcInternet = ({ tabLabel, sectionID }) => {
    const { data, isLoading } = useGetAllInternetsQuery();
    const settings = {
        className: "slider center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "20%",
        slidesToShow: 1,
        dots: true,
        speed: 500,
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

    if (isLoading) {
        return <p>Loading</p>;
    }
    return (
        <TabContentContainer id={sectionID}>
            <TabTitle className="text-center">{tabLabel}</TabTitle>
            <BoldContent>
                <p>
                    With ATA2GO, sign up for the best internet packages with $0 startup fees! Each package is commitment-free and includes:
                </p>
            </BoldContent>
            <FeatureList>
                {features.map((feature, i) => {
                    return (
                        <FeatureListItem key={i}>   <SVGImages.CheckCircleIcon />   <span>{feature}</span>  </FeatureListItem>
                    );
                })}
            </FeatureList>
            <InternetPlanBox>
                {data?.data?.length > 0 && (
                    <CardSlider sliderConfig={settings}>
                        {data?.data?.map(plan => {
                            return <InternetPlan key={plan._id} planData={plan} />;
                        })}
                    </CardSlider>
                )}
            </InternetPlanBox>
        </TabContentContainer>
    );
};

export default SvcInternet;
