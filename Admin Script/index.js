const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const readline = require('readline');
const Admin = require('./adminModel');

// Function to hash the password
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Function to create admin user
async function createAdminUser(username, email, password) {
    const DB_URL = "mongodb+srv://kartikaggarwal2004:TBgi09oXQuArw37D@cluster0.llve40c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected")
    });

    // Connect to MongoDB      
    try {
  
        const hashedPassword = await hashPassword(password);

        const newUser = {
            email: email,
            password: hashedPassword,
            username: username
        };

        const result = await Admin.create(newUser);
        console.log(`New admin user created with the following id: ${result._id}`)
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        await db.close();
    }
}

// Function to get user input
function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(prompt, (ans) => {
        rl.close();
        resolve(ans);
    }));
}

// Main function
(async () => {
    try {
        const username = await getUserInput('Enter admin username: ');
        const email = await getUserInput('Enter admin email: ');
        const password = await getUserInput('Enter admin password: ');

        await createAdminUser(username, email, password);
    } catch (err) {
        console.error('Error:', err);
    }
})();



