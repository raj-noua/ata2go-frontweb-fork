import { configureStore }   from "@reduxjs/toolkit";
import { setupListeners }   from "@reduxjs/toolkit/query";
import { affiliatesApi }    from "../services/affiliateApi";
import { carApi }           from "../services/carApi";
import { carPartsApi }      from "../services/carPartsApi";
import { carRequestApi }    from "../services/carRequestApi";
import { categoriesApi }    from "../services/categoryApi";
import { coursesApi }       from "../services/courseApi";
import { internetsApi }     from "../services/internetApi";
import { notificationApi }  from "../services/notificationApi";
import { usersApi }         from "../services/userApi";
import { videosApi }        from "../services/videoApi";
import { billingApi }        from "../services/billingApi";

export const store = configureStore({
    reducer: {
        [affiliatesApi.reducerPath]:    affiliatesApi.reducer,
        [carApi.reducerPath]:           carApi.reducer,
        [carPartsApi.reducerPath]:      carPartsApi.reducer,
        [carRequestApi.reducerPath]:    carRequestApi.reducer,
        [categoriesApi.reducerPath]:    categoriesApi.reducer,
        [coursesApi.reducerPath]:       coursesApi.reducer,
        [internetsApi.reducerPath]:     internetsApi.reducer,
        [notificationApi.reducerPath]:  notificationApi.reducer,
        [usersApi.reducerPath]:         usersApi.reducer,
        [videosApi.reducerPath]:        videosApi.reducer,
        [billingApi.reducerPath]:        billingApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(affiliatesApi.middleware)
            .concat(carApi.middleware)
            .concat(carPartsApi.middleware)
            .concat(carRequestApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(coursesApi.middleware)
            .concat(internetsApi.middleware)
            .concat(notificationApi.middleware)
            .concat(usersApi.middleware)
            .concat(videosApi.middleware)
            .concat(billingApi.middleware)
});
setupListeners(store.dispatch);
