const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  id: null,
  email: "",
  userName: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
};

// Asynchronous Actions

const fetchUserDetails = createAsyncThunk("userDetails/fetchUserDetails", async () => {
  try {
    const { data } = await axios.get('https://mocki.io/v1/77e4c4be-ab40-4ae9-8bfc-5f9dce1aaa36');
    return data;
  }
  catch (err) {
    throw err;
  }
});


const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state, _action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        const { id, name, email } = action.payload;
        state.email = email;
        state.userName = name;
        state.id = id;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, _action) => {
        state.isError = true;
        state.isLoading = false;
      });
  }
});

module.exports = {
  userDetailActions: userDetailSlice.actions,
  fetchUserDetails,
  userDetailReducer: userDetailSlice.reducer,
};

 