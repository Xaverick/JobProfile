import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlanStatus = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [updatedServices, setUpdatedServices] = useState([]);
  const [profile, setProfile] = useState(null);
  const [redeemHistory, setRedeemHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNoteIndex, setEditNoteIndex] = useState(null);

  const [userPlan, setUserPlan] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await axios.get(`/admin/currentplan/${userId}`);
        setUserPlan(response.data.plan);
        setUser(response.data.user);
        setProfile(response.data.profile);
        setSelectedPlanIndex(0); // Default to the first plan
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPlan();
  }, [userId]);

  useEffect(() => {
    if (userPlan.length > 0) {
      setServices(userPlan[selectedPlanIndex]?.plan.services);
      setUpdatedServices(userPlan[selectedPlanIndex]?.plan.services.map(service => ({ ...service, newCalls: service.service.calls })));
      setRedeemHistory(userPlan[selectedPlanIndex]?.plan.redeemHistory);
    }
  }, [selectedPlanIndex, userPlan]);

  const handlePlanChange = (event) => {
    setSelectedPlanIndex(event.target.value);
    setServices(userPlan[event.target.value]?.plan.services);
    setUpdatedServices(userPlan[event.target.value]?.plan.services.map(service => ({ ...service, newCalls: service.service.calls })));
    setRedeemHistory(userPlan[event.target.value]?.plan.redeemHistory);
  };

  const handleInputChange = (index, value) => {
    const newServices = [...updatedServices];
    newServices[index].newCalls = value;
    setUpdatedServices(newServices);
  };

  const handleSave = async (serviceId, newCalls, index, note) => {
    try {
      setIsNoteModalOpen(false);
      setLoading(true);
      const response = await axios.put(`/admin/updateUserPlan/${userId}/${serviceId}/${userPlan[selectedPlanIndex]._id}`, { calls: newCalls, note });
      const newServices = [...services];
      newServices[index].service.calls = newCalls;
      setServices(newServices);
      setRedeemHistory(response.data.plan.redeemHistory);
      setLoading(false);
      setNote('');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setNote('');
    }
  };

  const openNoteModal = (serviceId, newCalls, index) => {
    console.log(serviceId, newCalls, index);
    setSelectedService({ serviceId, newCalls, index });
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setNote('');
    setSelectedService(null);
  };

  const openEditNoteModal = (index, note) => {
    setEditMode(true);
    setEditNoteIndex(index);
    setNote(note);
    setIsNoteModalOpen(true);
  };

  const handleEditNoteSave = async () => {
    try {
      setLoading(true);
      setIsNoteModalOpen(false);
      const response = await axios.put(`/admin/editRedeemNote/${userId}/${redeemHistory[editNoteIndex]._id}/${userPlan[selectedPlanIndex]._id}`, { note });
      const newRedeemHistory = [...redeemHistory];
      newRedeemHistory[editNoteIndex].notes = note;
      setRedeemHistory(newRedeemHistory);
      setLoading(false);
      setEditMode(false);
      setNote('');
      setEditNoteIndex(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setEditMode(false);
      setNote('');
      setEditNoteIndex(null);

    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Please wait, updating status...</h2>
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mx-auto animate-spin"></div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center mb-6">
          <img
            src={user?.picture}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {profile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Full Name:</h2>
              <p>{profile.fullName}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Phone:</h2>
              <p>{profile.phoneNumber}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Experience:</h2>
              <p>{profile.experience}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Specialization:</h2>
              <p>{profile.specialization}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Education:</h2>
              <p>{profile.education}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Organization:</h2>
              <p>{profile.organization}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Contact Method:</h2>
              <p>{profile.contactMethod}</p>
            </div>
            {profile.linkedIn && (
              <div>
                <h2 className="text-lg font-semibold">LinkedIn:</h2>
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View LinkedIn
                </a>
              </div>
            )}
            {profile.resume && (
              <div className="col-span-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    View Resume
                  </a>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="mb-6 flex items-center">
          <h2 className="text-xl font-semibold mr-4">Your Plan:</h2>
          <select
            value={selectedPlanIndex}
            onChange={handlePlanChange}
            className="p-2 border rounded"
          >
            {userPlan.map((plan, index) => (
              <option key={index} value={index}>
                {plan.plan.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">User Services</h2>
          <div className="space-y-4">
            {updatedServices.map((item, index) => (
              <div key={item._id} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">{item.service.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <p>Usage: {item.service?.calls} / {item.maxCalls}</p>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max={item.maxCalls}
                      value={item.newCalls}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-lg mr-2"
                    />
                    <button
                      onClick={() => openNoteModal(item._id, item.newCalls, index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(item.service.calls / item.maxCalls) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Redeem History</h2>
        <div className="space-y-4">
          {redeemHistory?.map((item, index) => (
            <div key={item._id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-start">
              <div className="w-1/3">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p>Calls: {item.calls}</p>
                <p>Date: {new Date(item.date).toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-inner ml-4 w-2/3 relative">
                <h3 className="text-lg font-medium mb-2">Note</h3>
                <p>{item.notes}</p>
                <button
                  onClick={() => openEditNoteModal(index, item.notes)}
                  className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isNoteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Note" : "Add Note"}</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter your note here"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeNoteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={editMode ? handleEditNoteSave : () => handleSave(selectedService.serviceId, selectedService.newCalls, selectedService.index, note)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanStatus;

