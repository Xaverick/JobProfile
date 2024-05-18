/* eslint-disable react/prop-types */
import './Plans.css'; // Import your CSS file for styling
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';


function PlanCard({ plan }) {
  const profileData =  useSelector((state) => state.formData.formData);

  
  const handlePayment = async (plan) => {
    console.log('profileData', profileData);
    try {
      const newForm = new FormData();

      newForm.append('fullName', profileData.fullName);
      newForm.append('email', profileData.email);
      newForm.append('phoneNumber', profileData.phoneNumber);
      newForm.append('file', profileData.file);
      newForm.append('linkedIn', profileData.linkedIn);
      newForm.append('experience', profileData.experience);
      newForm.append('education', profileData.education);
      newForm.append('organization', profileData.organization);
      newForm.append('contactMethod', profileData.contactMethod);
      newForm.append('additionalInfo', profileData.additionalInfo);
      newForm.append('referralSource', profileData.referralSource);
      newForm.append('specialization', profileData.specialization); 
      newForm.append('amount', plan.amount);

      const order = await axios.post('/payment/create-order', newForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(order)
      const { amount, id: order_id, currency } = order.data.order;
      const file = order.data.file
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: 'Pinnacle Solution Pvt Ltd',
        description: `${plan.title} Plan`,
        order_id: order_id,
        handler: async (response) => {
          try {
            // newForm.append('response', JSON.stringify(response));
            // newForm.append('plan', JSON.stringify(plan));
            // console.log('newForm', newForm);
            const paymentResult = await axios.post('/payment/verify', {
              response,
              plan,
              profileData,
              file
            }
            );

            toast.success('Payment successful', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: true,
            });
            // You can redirect to the success page or update the UI accordingly
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
          name: newForm.fullName,
          email: newForm.email,
          contact: newForm.phoneNumber,
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
      toast.error("Fill the form and try again.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="plan-card bg-white shadow-lg rounded-lg overflow-hidden mx-4 my-8 md:my-0 md:w-96">
      <div className="plan-content flex flex-col justify-between h-full px-6 py-8">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">{plan.title}</h2>
          <p className="text-gray-600 text-lg mb-6">{plan.price}</p>
          <ul className="list-disc pl-6">
            {plan.benefits.map((benefit, index) => (
              <li key={index} className="text-lg mb-2">{benefit}</li>
            ))}
          </ul>
        </div>
        <button className="btn-buy-now block mx-auto mt-8" onClick={() => handlePayment(plan)}>Buy Now</button>
      </div>
    </div>
  );
}

function Plans() {
  const plans = [
    {
      title: "Silver",
      price: "Rs. 7999",
      amount : 7999,
      benefits: [
        "CV writing services",
        "Career counselling on up to 2 calls"      
      ]
    },
    {
      title: "Gold",
      price: "Rs. 9999",
      amount : 9999,
      benefits: [
        "CV writing services",
        "ATS Tricks & Tips",
        "Career counselling on up to 4 calls"
      ]
    },
    {
      title: "Diamond",
      price: "Rs. 10999",
      amount : 10999,
      benefits: [
        "CV writing services",
        "Linkedin Profile Building",
        "ATS Tricks & Tips",
        "Career counselling on up to 4 calls"
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-wrap justify-center">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default Plans;
