import { useState, useEffect } from 'react';
import { updateFormData } from "../../store/slices/formDataSlice";
import { useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import PhoneComponent from '../../components/PhoneComponent/PhoneComponent';

const FormPage = () => {

  const [formData, setFormData] = useState({
    phoneNumber: '',
    specialization: '',
    file: '',
    experience: '',
    education: '',
    organization: '',
    contactMethod: '',
    additionalInfo: '',
    referralSource: '',
    email: '',
    fullName: '',
    linkedIn: '' // Add LinkedIn field
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setFormData({
      ...formData,
      email: user.email || '',
      fullName: user.name || ''
    });
  }, []); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResumeChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  }

  const validateLinkedIn = (url) => {
    const pattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    return pattern.test(url);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.organization) newErrors.organization = 'Organization is required';
    if (!formData.contactMethod) newErrors.contactMethod = 'Preferred contact method is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (formData.linkedIn && !validateLinkedIn(formData.linkedIn)) newErrors.linkedIn = 'Invalid LinkedIn profile URL';
    


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      }); 
      return;
    }

    const newForm = new FormData();

    newForm.append('fullName', formData.fullName);
    newForm.append('email', formData.email);
    newForm.append('phoneNumber', formData.phoneNumber);
    newForm.append('file', formData.file);
    newForm.append('linkedIn', formData.linkedIn);
    newForm.append('experience', formData.experience);
    newForm.append('education', formData.education);
    newForm.append('organization', formData.organization);
    newForm.append('contactMethod', formData.contactMethod);
    newForm.append('additionalInfo', formData.additionalInfo);
    newForm.append('referralSource', formData.referralSource);
    newForm.append('specialization', formData.specialization); 

    dispatch(updateFormData(formData));

    try{
      const response = await axios.post('/user/createProfile', newForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
       
      if (response.status === 200) {
        toast.success('Profile created successfully', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
        const {user} = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }

    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w[90%] lg:max-w-[80%]">
      <h1 className="text-3xl font-semibold mb-6">Create Profile</h1>
      <form className="space-y-6">        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled={true}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div> 
        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            type="text"
            id="linkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.linkedIn && <p className="text-red-500 text-sm">{errors.linkedIn}</p>}
        </div>
        <div>
          
          <PhoneComponent value={formData.phoneNumber} onChange={(phone) => setFormData({...formData, phoneNumber: phone})} />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
            What is your area of specialization? <span className="text-red-500">*</span>
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select specialization</option>
            <option value="Product">Product</option>
            <option value="Marketing & Sales">Marketing & Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Senior Management">Senior Management</option>
            <option value="Others">Others</option>
          </select>
          {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Upload your resume
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleResumeChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Years of Work Experience <span className="text-red-500">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select years of experience</option>
            <option value="0 to 2 Years">0 to 2 Years</option>
            <option value="2 to 5 Years">2 to 5 Years</option>
            <option value="5 to 10 Years">5 to 10 Years</option>
            <option value="10 Years and above">10 Years and above</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700">
            Highest Education <span className="text-red-500">*</span>
          </label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select highest education</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="Other">Other</option>
          </select>
          {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
        </div>
        {formData.education === 'Other' && (
          <div>
            <label htmlFor="otherEducation" className="block text-sm font-medium text-gray-700">
              Other Education
            </label>
            <input
              type="text"
              id="otherEducation"
              name="otherEducation"
              value={formData.otherEducation}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.otherEducation && <p className="text-red-500 text-sm">{errors.otherEducation}</p>}
          </div>
        )}
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Current Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preferred contact method <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="Phone"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Phone</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="contactMethod"
                value="Email"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Email</span>
            </label>
          </div>
          {errors.contactMethod && <p className="text-red-500 text-sm">{errors.contactMethod}</p>}
        </div>
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
            Any other requests, comments or information you would like to give us?
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700">
          Where did you hear about us?
          </label>
          <input
            type="text"
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.referralSource && <p className="text-red-500 text-sm">{errors.referralSource}</p>}
        </div>
        
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Save And Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
