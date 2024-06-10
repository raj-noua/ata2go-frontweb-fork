import { useGetVideosBySubCategoryQuery } from "../../../services/videoApi";

const useFetchVideosForSubCategories = (subCategories) => {
    const results = subCategories.map(subCategory => {
        const { data: videoData } = useGetVideosBySubCategoryQuery(subCategory);
        return { subCategory, videoData };
    });

    return results;
};

export default useFetchVideosForSubCategories;
