import  { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import { auth } from "../firebase";
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    LastName: '',
    role: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        try {
          const response = await axios.get(
            `https://react-project-f71d3-default-rtdb.firebaseio.com/users/${user.uid}.json`
          );
          if (response.data) {
            setFormData({
              firstName: response.data.firstName || '',
              LastName: response.data.LastName || '',
              role: response.data.role || '',
              email: response.data.email || user.email,
              phoneNumber: response.data.phoneNumber || '',
              message: ''
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to fetch user data.',
          });
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please agree to the privacy policy before submitting.',
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://react-project-f71d3-default-rtdb.firebaseio.com/contacts/${userId}.json`,
        formData
      );
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Message sent successfully!',
      });
      setFormData({ firstName: '', LastName: '', role: '', email: '', phoneNumber: '', message: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
      });
      console.error("Error saving contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Contact Information */}
            <div className="lg:w-1/3 bg-[#05b0d6] p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                  <p className="text-sky-100">Orange Coding Academy</p>
                  <p className="text-sky-100">Zarqa - Jordan</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
                  <p className="text-sky-100">Email: contact@Elefyi.com</p>
                  <p className="text-sky-100">Phone: +962 799599201</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p className="text-sky-100">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-sky-100">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05b0d6] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      agreed ? "bg-[#05b0d6]" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        agreed ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                  <label className="text-sm text-gray-600">
                    By selecting this, you agree to our{" "}
                    <a href="#" className="font-semibold text-[#05b0d6] hover:text-[#048cab]">
                      privacy policy
                    </a>
                    .
                  </label>
                </div>

                <button
                id='blue-btn'
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#05b0d6] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#048cab] transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;