const store = require("./store");
const { fetchUserDetails, userDetailActions } = require("./store/slices/userDetailSlice");

store.subscribe(() => {
  console.log(`STATE AFTER UPDATE:`, store.getState());
});

store.dispatch(userDetailActions.setLoading(true));
store.dispatch(userDetailActions.setLoading(false));
store.dispatch(userDetailActions.setError(true));
store.dispatch(userDetailActions.setError(false));
store.dispatch(fetchUserDetails());
