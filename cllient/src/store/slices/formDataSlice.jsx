// formDataSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    phoneNumber: '',
    specialization: '',
    resume: '',
    experience: '',
    education: '',
    organization: '',
    contactMethod: '',
    additionalInfo: '',
    referralSource: '',
    email: '',
    fullName: '',
    linkedIn: ''
  }
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
        state.formData = { ...action.payload };
    }
  }
});

export const { updateFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
