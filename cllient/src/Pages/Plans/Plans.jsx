import { useState, useEffect } from "react";
import classNames from "classnames";
import { useSwipeable } from "react-swipeable";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const capitalizeTitle = (title) => {
  return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const PricingPanel = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('/user/getplans');
        const plans = response.data.sort((a, b) => a.price - b.price);
        setPlans(plans);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlans();

  }, []);


  const handlePayment = async (plan) => {
    try {

      const userProfile = await axios.get('/user/getProfile');
      const user = userProfile.data;

      const order = await axios.post('/payment/create-order', {
        amount: plan.price,
      });

      console.log(order)
      const { amount, id: order_id, currency } = order.data.order;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: 'Pinnacle Solution Pvt Ltd',
        description: `${plan.title} Plan`,
        order_id: order_id,
        handler: async (response) => {
          try {

            const paymentResult = await axios.post('/payment/verify', {
              response,
              plan
            }
            );

            toast.success('Payment successful', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: true,
            });

            const userResponse = await axios.get('/user/userDetails');
            const user = userResponse.data;

            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
            }

            navigate('/dashboard')

          } catch (error) {
            console.error(error);
            toast.error('Payment Verification Failed Pls contact admin', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: true,
            });
          }
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phoneNumber,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
          hide_topbar: true,

        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(1);

  const handleSelectPlan = (index) => {
    setSelectedPlan(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSelectPlan(selectedPlan === plans.length - 1 ? 0 : selectedPlan + 1),
    onSwipedRight: () => handleSelectPlan(selectedPlan === 0 ? plans.length - 1 : selectedPlan - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });


  return (
    <div {...swipeHandlers} className="flex flex-col justify-center items-center min-h-screen lg:mt-[20px]">
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {plans.map((plan, index) => (
          <div
            key={plan.title}
            className={classNames(
              "flex flex-col justify-between bg-white rounded-lg shadow-lg p-6 transition-transform duration-300",
              {
                "scale-110 translate-y-[10px] shadow-xxl sm:ml-5 sm:mr-5":
                  selectedPlan === index,
                "hover:scale-105": selectedPlan !== index,
              }
            )}
            onClick={() => handleSelectPlan(index)}
          >
            <div>
              <h2 className="text-xl font-bold mb-4">{capitalizeTitle(plan.title)}</h2>
              <div className="text-3xl font-bold mb-4">Rs. {plan.price}</div>
              <ul className="text-left mb-6">
                {plan.services.map((item) => (
                  <li key={item._id} className="mb-2">
                    <svg
                      className="h-6 w-6 inline-block mr-2 fill-current text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10l4 4 10-10"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.service.title} - {item.maxCalls} calls
                  </li>
                ))}
              </ul>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlePayment(plan)}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};


export default PricingPanel;
