import { SVGImages }            from "../config/images";

import SetBilling               from "../pages/Settings/Billing";
import SetContactInfo           from "../pages/Settings/ContactInfo";
import SetNotifications         from "../pages/Settings/Notifications";
import SetSecurity              from "../pages/Settings/Security";

import SvcPartsAuto             from "../pages/Home/ServicesSection/PartsAuto";
import SvcInternet              from "../pages/Home/ServicesSection/Internet";
import SvcMarketing             from "../pages/Home/ServicesSection/Marketing";
import SvcLearning              from "../pages/Home/ServicesSection/Learning";
import SvcTranscript            from "../pages/Home/ServicesSection/Transcript";

import SubsInternet             from "../pages/Subscriptions/Internet";
import SubsLearning             from "../pages/Subscriptions/Learning";
import SubsInterests            from "../pages/Subscriptions/Interests";
import SubsPromo                from "../pages/Subscriptions/Promo";
import SubsPartsOrders          from "../pages/Subscriptions/PartsOrders";
import SubsPartsQuotes          from "../pages/Subscriptions/PartsQuotes";
// import SubsTranscript            from "../pages/Subscriptions/Transcript";


export const captchaKey = "6LeIMQEmAAAAALtXaLybRpVj5XnzXZrOXpuLu21m";
// export const captchaKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";


export const settingsData = [
    { id: 1, label: "ContactInfo",      content: SetContactInfo },
    { id: 2, label: "Security",         content: SetSecurity },
    { id: 3, label: "Notifications",    content: SetNotifications },
    { id: 4, label: "Billing",          content: SetBilling },
];

export const serviceTabs = [
    { id: "SvcInternet",        icon: SVGImages.HomeInternetIcon,   label: "Internet",      content: SvcInternet },
    { id: "SvcLearning",        icon: SVGImages.CourseIcon,         label: "Learning",      content: SvcLearning },
    { id: "SvcMarketing",       icon: SVGImages.MarketingIcon,      label: "Marketing",     content: SvcMarketing },
    { id: "SvcTranscript",      icon: SVGImages.MarketingIcon,      label: "Transcript",    content: SvcTranscript },
    { id: "SvcPartsAuto",       icon: SVGImages.CarIcon,            label: "Parts Order",   content: SvcPartsAuto },
    
];

export const subscriptionsData = [
    { id: 1, label: `My Interests`, content: SubsInterests },
    { id: 2, label: `My Promo`,     content: SubsPromo },
    { id: 3, label: `Internet`,     content: SubsInternet },
    { id: 4, label: `Learning`,     content: SubsLearning },
    { id: 5, label: `Parts Order`,  content: SubsPartsOrders },
    { id: 6, label: `Parts Quotes`, content: SubsPartsQuotes },
    // { id: 7, label: `Transcripts`, content: TranscriptSubscriptions },
];

export const internetPlans = [
    {
        id: 1,         price: 35,        speed: 10,        download: 10,        upload: 1,
        fearures: [`A song of 5 Mb in 4s.`, `A video of 50 Mb in 41s.`, `A song of 4 Gb in 57mins 15s.`],
    },

    {
        id: 2,        price: 40,        speed: 30,        download: 30,        upload: 10,
        fearures: [`A song of 5 Mb in 1s.`, `A video of 50 Mb in 13s.`, `A film of 4 Gb in 19mins 5s.`],
    },
    {
        id: 3,        price: 45,        speed: 60,        download: 60,        upload: 10,
        fearures: [`A song of 5 Mb in less than a second.`, `A video of 50 Mb in 6s.`, `A film of 4 Gb in 9 mins 32s.`],
    },
    {
        id: 4,        price: 60,        speed: 120,        download: 120,        upload: 20,
        fearures: [`A song of 5 Mb in less than a second.`, `A video of 50 Mb in 3s.`, `A film of 4 Gb in 4mins 46s.`],
    },
];

export const technologyCourses = [
    {
        id: 1,        price: 29,        couseName: "MS Word",        couseType: "Beginner",
        fearures: [`You can learn basic excel works.`],
    },
    {
        id: 2,        price: 49,        couseName: "MS Word",        couseType: "Advanced",
        fearures: [`You can learn advanced Word functionality`],
    },
    {
        id: 3,        price: 99,        couseName: "MS Word",        couseType: "Professional",
        fearures: [`You can learn professional Word With Consultation`],
    },
    {
        id: 4,        price: 35,        couseName: "Ms Excel",        couseType: "Beginner",
        fearures: [`Excel with all basic inputs`],
    },
    {
        id: 5,        price: 60,        couseName: "Ms Excel",        couseType: "Advanced",
        fearures: [`Most advances calculations with Excel`],
    },
    {
        id: 6,        price: 100,        couseName: "Ms Excel",        couseType: "Professional",
        fearures: [`Consulation on Advanced and busines Excel computations`],
    },
];

