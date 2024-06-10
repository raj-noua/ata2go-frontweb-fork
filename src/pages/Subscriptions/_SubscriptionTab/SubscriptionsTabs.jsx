import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import MyInterests from '../Interests'; // Adjust the path accordingly
import PartsOrder from '../PartsOrders'; // Adjust the path accordingly
import Internet from '../Internet';
import Learning from '../Learning';
import MyPromo from '../Promo';
import PartsQuotes from '../PartsQuotes';
import { 
    TabComponentWrapper, 
    TabContentBox, 
    TabNavItem, 
    TabNavList, 
    TabNavHeader
} from "./SubscriptionsTabsStyle";

// Mapping of tab IDs to query parameters
const tabMapping = {
    'my-interests': 'My Interests',
    'my-promo': 'My Promo',
    'internet': 'Internet',
    'learning': 'Learning',
    'parts-order': 'Parts Order',
    'parts-quotes': 'Parts Quotes',
};

const SubscriptionsTabs = ({ tabs, user, refetch, setRefetch }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('my-interests'); // default tab

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const tab = query.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <TabComponentWrapper id="Subscriptions">
            <TabNavHeader>
                <TabNavList selectedid={activeTab} tabcount={tabs.length}>
                    {Object.keys(tabMapping).map((tabKey) => (
                        <TabNavItem
                            key={tabKey}
                            className={tabKey === activeTab ? "TabNavItem selected" : "TabNavItem"}
                            onClick={() => handleTabChange(tabKey)}
                        >
                            <NavLink to={`/subscriptions?tab=${tabKey}`}>
                                <span>{tabMapping[tabKey]}</span>
                            </NavLink>
                        </TabNavItem>
                    ))}
                    <div className="slider">
                        <div className="indicator"></div>
                    </div>
                </TabNavList>
            </TabNavHeader>

            <TabContentBox>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'my-interests' && <MyInterests user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {activeTab === 'my-promo' && <MyPromo user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {activeTab === 'internet' && <Internet user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {activeTab === 'learning' && <Learning user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {activeTab === 'parts-order' && <PartsOrder user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {activeTab === 'parts-quotes' && <PartsQuotes user={user} refetch={refetch} setRefetch={setRefetch} />}
                        {/* Add more tab components here based on their respective activeTab values */}
                    </motion.div>
                </AnimatePresence>
            </TabContentBox>
        </TabComponentWrapper>
    );
};

export default SubscriptionsTabs;
