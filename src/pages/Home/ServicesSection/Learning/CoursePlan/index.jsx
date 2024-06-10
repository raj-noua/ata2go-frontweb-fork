import { SVGImages } from "../../../../../config/images";
import { tileVariants } from "../../../../../utils/FmVariants";
import { CourseInfo, CoursePlanWrapper, PlanContent, PlanInfo, PlanPrice, Price, PlanSpeed } from "./coursePlanStyle";

const CoursePlan = ({ courseData: course }) => {
    return (
        <CoursePlanWrapper variants={tileVariants}>
            <PlanInfo>
                <PlanPrice>
                    <Price>
                        {course?.price}
                        <span>.00$</span>
                    </Price>
                    <SVGImages.SepratorLine />
                    <CourseInfo>
                        <h2>{course?.courseName}</h2>
                        <span>{course?.courseLevel}</span>
                    </CourseInfo>
                </PlanPrice>
                <PlanSpeed>
                    <li>
                        <span>Sessions: {course?.session ? course?.session : 0}</span>
                    </li>
                    <li>
                        <span>Projects: {course?.project ? course?.project : 0}</span>
                    </li>
                </PlanSpeed>
            </PlanInfo>
            <PlanContent>
                <p>{course?.description}</p>
            </PlanContent>
        </CoursePlanWrapper>
    );
};

export default CoursePlan;
