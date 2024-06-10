import { useContext, 
    useEffect, 
    useState }                      from "react";
import { toast }                    from "react-toastify";
import { Button }                   from "react-bootstrap";
import { useNavigate }              from "react-router-dom";
import styled                       from 'styled-components';
import { CategoriesBox, 
    CategoryText, 
    EachCategory, 
    HeadingBox, 
    ProductsBox }                   from "./MyInterestsStyle";
import LabelCheckBox                from "./LabelCheckBox";
import { TabContentContainer }      from "../../Tabs/tabContentStyle";
import { UserContext }              from "../../../App";
import { useGetAllCategoriesQuery } from "../../../services/categoryApi";
import { useUpdateUserMutation }    from "../../../services/userApi";


const ScrollableCategoriesBox = styled(CategoriesBox)`
max-height: calc(100vh - 150px); /* Adjust this height as needed */
    overflow-y: auto;
    margin-top: 10px; /* To create some space between the heading and the box */
    margin-bottom: 20px; /* To create some space between the footing */
`;

const StaticHeadingBox = styled(HeadingBox)`
    position: sticky;
    top: 0;
    background: white; /* Same background color as the container */
    z-index: 10; /* Ensure it stays on top */
    padding-bottom: 10px;
`;

const SubsInterests = ({ user }) => {
    const navigate                              = useNavigate();
    const { refetch, setRefetch }               = useContext(UserContext);
    const { data }                              = useGetAllCategoriesQuery();
    const [selectedCat, setSelectedCat]         = useState([]);
    const [updateUser]                          = useUpdateUserMutation();
    const [showCheckedOnly, setShowCheckedOnly] = useState(false);

    useEffect(() => {
        if (user) {
            setSelectedCat(user?.interests);
        }
    }, [user]);

    const handleSelectCat = s => {
        if (selectedCat?.includes(s)) {
            const subCats = selectedCat?.filter(d => d !== s);
            setSelectedCat(subCats);
        } else {
            setSelectedCat([...selectedCat, s]);
        }
    };

    const handleUpdate = () => {
        const data = {
            interests: selectedCat
        };
        if (selectedCat?.length > 0) {
            updateUser({ id: user?._id, data: data }).then(res => {
                if (res?.data?.status) {
                    toast.success(res?.data?.message);
                    setRefetch(refetch + 1);
                } else {
                    toast.error(res?.data?.message);
                }
            });
        } else {
            toast.error("Please select at least one item!");
        }
    };

    const toggleFilter = () => {
        setShowCheckedOnly(!showCheckedOnly);
    };

    return (
        <TabContentContainer>
            <StaticHeadingBox>
                <div className="d-flex align-items-center">
                    <h3 className="mb-0 pb-0">Select your Interests</h3>
                    <Button variant="primary" className="ms-2" onClick={toggleFilter}>
                        {showCheckedOnly ? 'Show All' : 'Filter Mine'}
                    </Button>
                    <Button variant="primary" className="ms-2" onClick={handleUpdate}>
                        Save
                    </Button>
                    <Button variant="primary" className="ms-2" onClick={() => navigate('/videos')}>
                        MyPromo
                    </Button>
                </div>
            </StaticHeadingBox>

            <ScrollableCategoriesBox>
    {data?.data
        ?.slice() // Create a shallow copy of the categories array
        ?.sort((a, b) => a.categoryName.localeCompare(b.categoryName)) // Sort categories
        ?.map(category => {
            const filteredSubCategories = showCheckedOnly
                ? category?.subCategories?.filter(product => selectedCat?.includes(`${category?.categoryName}|${product}`))
                : category?.subCategories;

            if (filteredSubCategories?.length === 0) return null;

            return (
                <EachCategory key={category?._id}>
                    <h4>{category?.categoryName}..</h4>
                    <ProductsBox>
                        {filteredSubCategories
                            ?.slice() // Create a shallow copy of the subcategories array
                            ?.sort((a, b) => a.localeCompare(b)) // Sort subcategories
                            ?.map(product => {
                                const concatenatedProduct = `${category?.categoryName}|${product}`;
                                return (
                                    <LabelCheckBox
                                        key={concatenatedProduct}
                                        isCategoryBox={true}
                                        checked={selectedCat?.includes(concatenatedProduct)}
                                        onChange={() => handleSelectCat(concatenatedProduct)}
                                    >
                                        <CategoryText>{product}</CategoryText>
                                    </LabelCheckBox>
                                );
                            })}
                    </ProductsBox>
                </EachCategory>
            );
        })}
</ScrollableCategoriesBox>

        </TabContentContainer>
    );
};

export default SubsInterests;
