// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Profile from "../Profile/Profile";
// import axios from "axios";
// import Plans from "../Plans/Plans";
// import OrderHistory from "./OrderHistory";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [userPlan, setUserPlan] = useState([]);
//   const [services, setServices] = useState([]);
//   const [currentView, setCurrentView] = useState("Plan Status");
//   const [redeemHistory, setRedeemHistory] = useState([]);
//   const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("/user/userDetails");
//         setUser(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchUserPlan = async () => {
//       try {
//         const response = await axios.get("/user/currentplan");
//         setUserPlan(response.data);
//         setSelectedPlanIndex(0); // Default to the first plan
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUserProfile();
//     fetchUserPlan();
//   }, []);

//   useEffect(() => {
//     if (userPlan.length > 0) {
//       setServices(userPlan[selectedPlanIndex]?.plan.services);
//       setRedeemHistory(userPlan[selectedPlanIndex]?.plan.redeemHistory);
//     }
//   }, [selectedPlanIndex, userPlan]);

//   const handlePlanChange = (event) => {
//     setSelectedPlanIndex(event.target.value);
//   };

//   const renderContent = () => {
//     switch (currentView) {
//       case "Plan Status":
//         return (
//           <>
//             <div className="flex items-center mb-6">
//               <img
//                 src={user?.picture}
//                 alt="User Avatar"
//                 className="w-16 h-16 rounded-full mr-4"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold">{user?.name}</h2>
//                 <p className="text-gray-600">{user?.email}</p>
//               </div>
//             </div>

//             {userPlan.length > 0 ? (
//               <>
//                 <div className="mb-6 flex items-center">
//                   <h2 className="text-xl font-semibold mr-4">Your Plan:</h2>
//                   <select
//                     value={selectedPlanIndex}
//                     onChange={handlePlanChange}
//                     className="p-2 border rounded"
//                   > 
//                     {userPlan.map((plan, index) => (
//                       <option key={index} value={index}>
//                         {plan.plan.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold mb-4">Your Services</h2>
//                   <div className="space-y-4">
//                     {services?.map((item, index) => (
//                       <div key={index} className="p-4 border rounded-lg bg-gray-50">
//                         <h3 className="text-lg font-medium">{item.service.title}</h3>
//                         <p>
//                           Usage: {item.service?.calls} / {item.maxCalls}
//                         </p>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                           <div
//                             className="bg-blue-600 h-2.5 rounded-full"
//                             style={{
//                               width: `${(item.service.calls / item.maxCalls) * 100}%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="text-xl font-semibold mb-4">Redeem History</h2>
//                   <div className="space-y-4">
//                     {redeemHistory?.map((item) => (
//                       <div key={item._id} className="p-4 border rounded-lg bg-gray-50">
//                         <h3 className="text-lg font-medium">{item.title}</h3>
//                         <p>Calls: {item.calls}</p>
//                         <p>Date: {new Date(item.date).toLocaleString()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <Plans />
//             )}
//           </>
//         );

//       case "orderHistory":
//         return <OrderHistory />;
//       case "profile":
//         return <Profile />;
//       case "services":
//         return <Plans />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex margins">
//       <div className="fixed left-0">
//         <Sidebar setCurrentView={setCurrentView} />
//       </div>
//       <div className="w-full p-6 lg:ml-64">{renderContent()}</div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Profile from "../Profile/Profile";
import axios from "axios";
import Plans from "../Plans/Plans";
import OrderHistory from "./OrderHistory";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState([]);
  const [services, setServices] = useState([]);
  const [currentView, setCurrentView] = useState("Plan Status");
  const [redeemHistory, setRedeemHistory] = useState([]);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/user/userDetails");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserPlan = async () => {
      try {
        const response = await axios.get("/user/currentplan");
        setUserPlan(response.data);
        setSelectedPlanIndex(0); // Default to the first plan
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    fetchUserPlan();
  }, []);

  useEffect(() => {
    if (userPlan.length > 0) {
      setServices(userPlan[selectedPlanIndex]?.plan.services);
      setRedeemHistory(userPlan[selectedPlanIndex]?.plan.redeemHistory);
    }
  }, [selectedPlanIndex, userPlan]);

  const handlePlanChange = (event) => {
    setSelectedPlanIndex(event.target.value);
  };

  const groupRedeemHistoryByService = (history) => {
    return history.reduce((acc, item) => {
      const serviceTitle = item.title;
      if (!acc[serviceTitle]) {
        acc[serviceTitle] = [];
      }
      acc[serviceTitle].push(item);
      return acc;
    }, {});
  };

  const renderContent = () => {
    switch (currentView) {
      case "Plan Status":
        return (
          <>
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

            {userPlan.length > 0 ? (
              <>
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
                  <h2 className="text-xl font-semibold mb-4">Your Services</h2>
                  <div className="space-y-4">
                    {services?.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-medium">{item.service.title}</h3>
                        <p>
                          Usage: {item.service?.calls} / {item.maxCalls}
                        </p>
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

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Redeem History</h2>
                  <div className="space-y-4">
                    {Object.entries(groupRedeemHistoryByService(redeemHistory)).map(
                      ([serviceTitle, calls]) => (
                        <div key={serviceTitle} className="p-4 border rounded-lg bg-gray-50">
                          <h3 className="text-lg font-medium">{serviceTitle}</h3>
                          {calls.map((item, index) => (
                            <div key={index} className="ml-4">
                              <p>
                                Call {index + 1}: Date:{" "}
                                {new Date(item.date).toLocaleDateString()}, Time:{" "}
                                {new Date(item.date).toLocaleTimeString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Plans />
            )}
          </>
        );

      case "orderHistory":
        return <OrderHistory />;
      case "profile":
        return <Profile />;
      case "services":
        return <Plans />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex margins">
      <div className="fixed left-0">
        <Sidebar setCurrentView={setCurrentView} />
      </div>
      <div className="w-full p-6 lg:ml-64">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;


