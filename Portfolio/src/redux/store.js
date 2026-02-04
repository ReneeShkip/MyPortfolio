import { configureStore } from "@reduxjs/toolkit";
import resourcesReducer from "./resourcesSlice";
import favReducer from "./favsSlice";
import uiReducer from "./uislice";
import modalReducer from "./modalSlice";

export const store = configureStore({
    reducer: {
        resources: resourcesReducer,
        favReducer: favReducer,
        ui: uiReducer,
        modal: modalReducer
    },
});