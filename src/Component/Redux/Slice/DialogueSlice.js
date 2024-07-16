import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";
const initialState = {
  dialogue: false,
  dialogueType: "",
  dialogueData: null,
  alertBox: false
};
export const login = createAsyncThunk("admin/login", async (payload) => {
  return apiInstance.post("admin/login", payload);
});

const DialogSlice = createSlice({
  name: "DialogSlice",
  initialState,
  reducers: {
    openDialog(state, action) {
      console.log("action", action);
      state.dialogue = true;
      state.dialogueType = action.payload.type || "";
      state.dialogueData = action.payload.data || null;
    },
    closeDialog(state, action) {
      state.dialogue = false;
      state.dialogueType = "";
      state.dialogueData = null;
    },
    openAlert(state, action) {
      state.alertBox = true
    },
    closeAlert(state, action) {
      state.alertBox = false
    }
  },
});
export default DialogSlice.reducer;
export const { openDialog, closeDialog, openAlert, closeAlert } = DialogSlice.actions