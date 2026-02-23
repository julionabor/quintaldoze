const STORAGE_KEY = "zdcp_app_state";

const defaultState = {
	user: null,
	order: null,
};
const AppState = {
	get() {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;
	},

	set(newState) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
	},

	update(partial) {
		const current = this.get();
		this.set({ ...current, ...partial });
	},

	clear() {
		localStorage.removeItem(STORAGE_KEY);
	},
};
