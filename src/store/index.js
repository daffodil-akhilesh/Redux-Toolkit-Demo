const { configureStore } = require("@reduxjs/toolkit");
const userDetailSlice =  require("./slices/userDetailSlice");

// Custom Middleware
const logger = (_store) => (next) => (action) => {
  console.log(`TYPE: ${action.type} | Payload:`, action.payload);
  return next(action);
}

const store = configureStore({
  reducer: {
    userDetail: userDetailSlice.userDetailReducer,
  },
  devTools: true,
  middleware: (gDM) => gDM().concat(logger), 
});

module.exports =  store;