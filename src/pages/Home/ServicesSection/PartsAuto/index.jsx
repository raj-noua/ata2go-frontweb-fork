import { useNavigate }          from "react-router-dom";
import { useContext }           from "react";
import { UserContext }          from "../../../../App";
import { CarPartsInnerContent,
         RestrictionText,
         PartsOrderButton }                                     from "./carPartsStyle";
import { BoldContent, 
         TabContentContainer, 
         TabTitle, 
         TextContent }  from "../../../Tabs/tabContentStyle";

const SvcPartsAuto = ({ tabLabel, sectionID }) => {
    const navigator = useNavigate();
    const { user } = useContext(UserContext);
    return (
        <TabContentContainer id={sectionID} className="pt-0">
            <CarPartsInnerContent>
                <TabTitle className="text-center">{tabLabel}</TabTitle>
                <TextContent>
                    <p>Being part of ATA2GO provides you with distinct advantages when it comes to car parts.</p>
                    <p>
                        We understand that navigating through the complex world of automotive parts can be daunting with a wide range of
                        prices leaving you feeling uncertain and hesitant.
                    </p>
                </TextContent>
                <BoldContent>
                    <p>{`That's where we come in!`}</p>
                </BoldContent>
                <TextContent>
                    <p>
                        Our team has access to various supplier that can help with new or the occasional used part. With dedicated part
                        consultants that are always ready to guide you through the process, we will assist you to obtain the parts your
                        vehicule needs within your budget.
                    </p>
                    <p>
                        {`Whether you're seeking advice on routine replacements or specific components for a restoration project, we've got you
                    covered. Our collective purchasing power allows us to negotiate better prices with suppliers, and these savings are
                    passed directly to you. This means you get high-quality parts at lower costs, maximizing your investment in your
                    vehicle.`}
                    </p>
                    <PartsOrderButton variant="secondary" disabled={!user?._id} onClick={() => navigator("/subscriptions?tab=parts-order")}>
                        Select Parts Order
                    </PartsOrderButton>
                    {!user?._id && <RestrictionText>Please Login to Order Parts!</RestrictionText>}
                </TextContent>
            </CarPartsInnerContent>
        </TabContentContainer>
    );
};

export default SvcPartsAuto;
