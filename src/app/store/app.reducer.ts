import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./shared/utils/utils";

export interface AppState {
	routerReducer: RouterReducerState<RouterStateUrl>;
}

export const appReducer: ActionReducerMap<AppState> = {
	routerReducer: routerReducer,
};

export function logger(
	reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
	return function (state: AppState, action: any): AppState {
		console.log("state", state);
		console.log("action", action);
		return reducer(state, action);
	};
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];