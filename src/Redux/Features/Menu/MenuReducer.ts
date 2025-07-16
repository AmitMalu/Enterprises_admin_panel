import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuState } from "./Types";

const initialState: MenuState = {
  activeMenu: "Dashboard", //to track Currently active Top Menu
  activeSubMenu: null, //to track Currently active Sub Menu
  openedMenu: "", //to open/close top Menu
};

const menuReducer = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // setActiveMenu(state, action: PayloadAction<string>) {
    //   state.activeMenu = action.payload;
    //   state.openedMenu =
    //     state.openedMenu === action.payload ? "" : action.payload;
    // },
    // setActiveSubMenu(state, action: PayloadAction<string | null>) {
    //   state.activeSubMenu = action.payload;
    // },
    setMenuOpen(state, action: PayloadAction<string>) {
      state.openedMenu =
        state.openedMenu === action.payload ? "" : action.payload;
    },
    resetMenuState(state) {
      state.activeMenu = "Dashboard";
      state.activeSubMenu = null;
      state.openedMenu = "";
    },
  },
});

export const { resetMenuState, setMenuOpen } = menuReducer.actions;
export default menuReducer.reducer;
