const cron = require('node-cron');
const User = require('../models/userModel');
const userPlanStatus = require('../models/userPlanStatus');


// Schedule a task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        const expiredPlans = await userPlanStatus.find(
            {expiryDate: { $lt: new Date() } },
        )
        
        expiredPlans.forEach(async (plan) => {
            const user = await User.findById(plan.userId);
            user.currentPlan.filter((p) => p.toString() !== plan._id.toString());
            await user.save();
        });

        await userPlanStatus.deleteMany({expiryDate: { $lt: new Date() }});
    } catch (error) {
        console.error('Error clearing expired plans:', error);
    }
});



