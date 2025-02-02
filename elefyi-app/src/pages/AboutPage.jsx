import { motion } from "framer-motion";
import about from "../Images/about.png";
import Footer from "../components/footer"

const AboutUs = () => {
  return (
    <div className="pageContainer">
    <div className="bg-gray-50 min-h-screen py-10 px-4">
     

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mb-30 mt-20">
        <div className="md:w-1/2 text-left ml-10">
          <motion.h1
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          About Us
          </motion.h1>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          Our task management system is designed to simplify your life by organizing
          your tasks efficiently. With a user-friendly interface and powerful features,
          our goal is to enhance productivity and help communities achieve their goals
          effortlessly.         
             </motion.p>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
          </motion.p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src={about}
            alt="Task Management Illustration"
            className="w-80 md:w-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    

      <div className="max-w-4xl mx-auto mb-20 mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Our Purpose and Vision
        </h2>
        <motion.p
          className="text-gray-600 text-center mb-25"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We aim to empower individuals and teams to reach their full potential through 
          effective task management, fostering collaboration, and creating meaningful impact 
          in communities.
        </motion.p>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          How Does It Work?
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-[#05b0d6] to-purple-500 text-white rounded-full mb-4 shadow-lg">
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Steps to Register
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {registerSteps.map((step, index) => (
            <motion.div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="shadow-lg border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 border border-indigo-300 text-indigo-600 rounded-full mb-4">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const steps = [
  {
    title: "Create a Free Account",
    description: "Sign up with your email and start exploring the features.",
  },
  {
    title: "Build Your Task List",
    description: "Add, organize, and prioritize your tasks seamlessly.",
  },
  {
    title: "Achieve Your Goals",
    description: "Track progress and stay on top of your tasks effortlessly.",
  },
];

const registerSteps = [
  {
    title: "Sign Up",
    description: "Fill out the registration form with your details.",
  },
  {
    title: "Get Started",
    description: "Log in and start using our features to manage tasks.",
  },
  {
    title: "view task",
    description: "Easily track and manage your tasks from your dashboard..",
  },
];

export default AboutUs;