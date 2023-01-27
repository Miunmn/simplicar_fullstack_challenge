import {configureStore} from "@reduxjs/toolkit"
import { accountReducer } from "./slices/account";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const middleware = [logger];

const persistConfig = {
	key: 'root',
	storage,
  }
const persistedReducer = persistReducer(persistConfig, accountReducer)

export const store =  configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: middleware
})
export const persistor = persistStore(store)


// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// // import rootReducer from './reducers'; // the value from combineReducers
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const persistConfig = {
//  key: 'root',
//  storage: storage,
//  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
// };


// const initialState = {
// 	val_two: 1
// }


// const FiveReducer = (state = initialState, action) => {
// 	switch(action.type){
// 		case 'MULTIPLY_FIVE': return {
// 			...state,
// 			val_five: state.val_five * 5
// 		}
		
// 		default: return state
// 	}
// }

// const TwoReducer = (state = initialState, action) => {
// 	switch(action.type){
// 		case 'MULTIPLY_TWO': return {
// 			...state,
// 			val_two: state.val_two * 2
// 		}
		
// 		default: return state
// 	}
// }

// const rootReducer = combineReducers({
// 	two: TwoReducer,
// 	five: FiveReducer
// })


// const pReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(pReducer);
// export const persistor = persistStore(store);
