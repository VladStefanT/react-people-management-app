import { createSlice } from "@reduxjs/toolkit";

import peopleData from "../data/people.json";

export const peopleSlice = createSlice({
  name: "people",
  initialState: { value: peopleData },
  reducers: {
    addPerson: (state, action) => {
      state.value.push(action.payload);
    },
    deletePerson: (state, action) => {
      state.value = state.value.filter(
        (person) => person.id !== action.payload.id
      );
    },
    editPerson: (state, action) => {
      state.value.forEach((person) => {
        if (person.id === action.payload.id) {
          person.name = action.payload.name;
          person.department = action.payload.department;
        }
        return person;
      });
    },
  },
});

export const { addPerson, deletePerson, editPerson } = peopleSlice.actions;
export default peopleSlice.reducer;
