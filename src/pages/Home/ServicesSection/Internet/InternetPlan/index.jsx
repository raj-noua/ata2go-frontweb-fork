import { SVGImages }        from "../../../../../config/images";
import { tileVariants }     from "../../../../../utils/FmVariants";
import { 
    InternerSpeed, 
    InternetPlanWrapper, 
    PlanContent, 
    PlanInfo, 
    PlanPrice, 
    PlanSpeed, 
    Price 
}                           from "./internetPlanStyle";

const InternetPlan = ({ planData: plan }) => {
    return (
        <InternetPlanWrapper variants={tileVariants}>
            <PlanInfo>
                <PlanPrice>
                    <Price>     {plan.price}    <div>       <span>.00$</span>   <span>/mois</span>  </div>  </Price>
                    <SVGImages.SepratorLine />
                    <InternerSpeed>{plan.downloadSpeed} Mbps</InternerSpeed>
                </PlanPrice>
                <PlanSpeed>
                    <li> <SVGImages.DownloadIcon />     <span>{plan.downloadSpeed}  mbps</span>     </li>
                    <li> <SVGImages.UploadIcon />       <span>{plan.uploadSpeed}    mbps</span>     </li>
                </PlanSpeed>
            </PlanInfo>
            <PlanContent>
                {plan?.extraInfo?.map((feature, index) => {
                    return <p key={index}>{feature}</p>;
                })}
            </PlanContent>
        </InternetPlanWrapper>
    );
};

export default InternetPlan;
