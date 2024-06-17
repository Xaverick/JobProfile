import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePlan = () => {
  const [title, setTitle] = useState('');
  const [validity, setValidity] = useState('');
  const [price, setPrice] = useState('');
  const [services, setServices] = useState([{ service: { title: '', calls: 0 }, maxCalls: 1 }]);
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('/user/getplans'); // Adjust the URL as necessary
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        // toast.error('Failed to fetch plans. Please try again.');
      }
    };

    fetchPlans();
  }, []);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    if (field === 'title') {
      newServices[index].service.title = value;
    } else if (field === 'maxCalls') {
      newServices[index].maxCalls = value;
    }
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { service: { title: '', calls: 0 }, maxCalls: 1 }]);
  };

  const removeService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const planData = {
      title,
      validity: parseInt(validity),
      price: parseFloat(price),
      services
    };
    try {
      const response = await axios.post('/admin/plans', planData); // Adjust the URL as necessary
      console.log('Plan created:', response.data);
      toast.success('Plan created successfully!');
      // Reset form
      setTitle('');
      setValidity('');
      setPrice('');
      setServices([{ service: { title: '', calls: 0 }, maxCalls: 1 }]);
      // Update plans list
      setPlans([...plans, response.data]);
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.error('Failed to create plan. Please try again.');
    }
  };

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value,
    }));
  };

  const handleServiceEditChange = (index, field, value) => {
    const newServices = [...selectedPlan.services];
    if (field === 'title') {
      newServices[index].service.title = value;
    } else if (field === 'maxCalls') {
      newServices[index].maxCalls = value;
    }
    setSelectedPlan((prevPlan) => ({
      ...prevPlan,
      services: newServices,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/admin/plans`, selectedPlan); // Adjust the URL as necessary
      console.log('Plan updated:', response.data);
      toast.success('Plan updated successfully!');
      // Update plans list
      const updatedPlans = plans.map((plan) =>
        plan._id === selectedPlan._id ? response.data : plan
      );
      setPlans(updatedPlans);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Failed to update plan. Please try again.');
    }
  };

  const handleDelete = async (planId) => {
    try {
      await axios.delete(`/admin/plans/${planId}`); // Adjust the URL as necessary
      toast.success('Plan deleted successfully!');
      const updatedPlans = plans.filter((plan) => plan._id !== planId);
      setPlans(updatedPlans);
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error('Failed to delete plan. Please try again.');
    }
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create Plan</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Validity (days)</label>
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Services</h2>
          {services.map((service, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <input
                  type="text"
                  placeholder="Service Title"
                  value={service.service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mr-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Max Calls"
                  value={service.maxCalls}
                  onChange={(e) => handleServiceChange(index, 'maxCalls', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Service
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Plan
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Existing Plans</h2>
        {plans.length === 0 ? (
          <p>No plans available.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Title</th>
                <th className="border-b px-4 py-2">Validity</th>
                <th className="border-b px-4 py-2">Price</th>
                <th className="border-b px-4 py-2">Services</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="border-b px-4 py-2">{plan.title}</td>
                  <td className="border-b px-4 py-2">{plan.validity} days</td>
                  <td className="border-b px-4 py-2">Rs. {plan.price.toFixed(2)}</td>
                  <td className="border-b px-4 py-2">
                    <ul>
                      {plan.services.map((service, index) => (
                               <li key={index}>{service.service.title} (Max Calls: {service.maxCalls})</li>
                            ))}
                          </ul>
                        </td>
                        <td className="border-b px-4 py-2">
                          <button
                            onClick={() => openEditModal(plan)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                          <button
                                onClick={() => handleDelete(plan._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg ml-3 hover:bg-red-700"
                            >
                             Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
      
            {isModalOpen && selectedPlan && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Plan</h2>
                <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={selectedPlan.title}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Validity (days)</label>
                    <input
                        type="number"
                        value={selectedPlan.validity}
                        onChange={(e) => handleEditChange('validity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        value={selectedPlan.price}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Services</h2>
                    <div className="max-h-64 overflow-y-auto">
                        {selectedPlan.services.map((service, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                            <input
                                type="text"
                                placeholder="Service Title"
                                value={service.service.title}
                                onChange={(e) => handleServiceEditChange(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mr-2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Max Calls"
                                value={service.maxCalls}
                                onChange={(e) => handleServiceEditChange(index, 'maxCalls', e.target.value)}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                        setSelectedPlan((prevPlan) => ({
                            ...prevPlan,
                            services: [...prevPlan.services, { service: { title: '', calls: 0 }, maxCalls: 1 }],
                        }))
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Add Service
                    </button>
                    </div>
                    <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => handleEditSubmit()}

                    >
                        Save Changes
                    </button>
                    </div>
                </form>
            </div>
        </div>
        )}
  
          </div>
        );
      };
      
export default CreatePlan;
      
