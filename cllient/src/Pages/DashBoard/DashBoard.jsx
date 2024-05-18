import { useState, useEffect } from 'react';
// import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link } from 'react-router-dom';
import { updateFormData } from "../../store/slices/formDataSlice";
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching email and full name from local storage
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setFormData({
      ...formData,
      email: user.email || '',
      fullName: user.name || ''
    });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleCountryCodeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, countryCode: value });
  };

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

  const handleNext = () => {
    dispatch(updateFormData(formData));
    // console.log(formData);
  }



  return (
    <div className="container mx-auto px-4 py-8 max-w-[80%]">
      <h1 className="text-3xl font-semibold mb-6">Resume Writing Services</h1>
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
            // onChange={handleChange}
            disabled={true}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
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
        </div>
        <div className="flex items-center">
          <select
            name="countryCode"
            value={formData.countryCode || '+91'} // Default to India code
            onChange={handleCountryCodeChange}
            className="appearance-none border border-gray-300 rounded-md py-2 px-4 mr-2"
          >
            <option value="+1">+1 (USA)</option>
            <option value="+91">+91 (India)</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            maxLength={formData.countryCode === '+1' ? 10 : 12} // Adjust max length based on country code
            pattern="[0-9]*" // Allow only numeric input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            placeholder="Enter phone number"
          />
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
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Upload your resume <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleResumeChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
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
            Where did you hear about us? <span className="text-red-500">*</span>
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
          </div>
        
        <div className="flex justify-center">
          <button onClick={handleNext}>
          <Link to="/plans"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Next
          </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
