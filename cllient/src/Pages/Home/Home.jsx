import React from 'react';
import './Home.css'; // Import your CSS file for styling

function Home() {
  return (
    <div className="bg-gray-100">
    {/* Navigation */}
    <nav className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Pinnacle.biz</div>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-gray-300">About</a></li>
          <li><a href="#services" className="hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>

    {/* Landing Section */}
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Pinnacle.biz</h1>
        <p className="text-lg mb-8">Your ultimate destination for finding the perfect job</p>
        <a href="#about" className="btn btn-primary">Get Started</a>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse 
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
              cupidatat non proident, sunt in culpa qui officia deserunt mollit 
              anim id est laborum.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-3 gap-4">
            <img src="https://source.unsplash.com/random/400x300" alt="Placeholder" className="rounded-lg" />
            <img src="https://source.unsplash.com/random/400x301" alt="Placeholder" className="rounded-lg" />
            <img src="https://source.unsplash.com/random/400x302" alt="Placeholder" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="py-20 bg-blue-900 ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 ">Job Search</h3>
            <p>Find your dream job with ease using our advanced search features.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Resume Building</h3>
            <p>Create professional resumes that stand out to employers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Career Counseling</h3>
            <p>Get expert guidance and advice for your career advancement.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">If you have any questions or inquiries, feel free to reach out to us!</p>
            <p className="text-lg">Email: info@pinnacle.biz</p>
            <p className="text-lg">Phone: +1 123 456 7890</p>
          </div>
          <form className="max-w-md">
            <input type="text" placeholder="Your Name" className="form-input mb-4 w-full" />
            <input type="email" placeholder="Your Email" className="form-input mb-4 w-full" />
            <textarea placeholder="Your Message" className="form-textarea mb-4 w-full h-32"></textarea>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </div>
  );
}

export default Home;






