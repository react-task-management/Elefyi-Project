import "../styles/MainStyle.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from "../firebase"; // تأكد من استيراد auth لمعرفة المستخدم الحالي
import { Switch } from '@headlessui/react';
import Swal from 'sweetalert2';

function ContactPage() {
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
  const [userId, setUserId] = useState(null); // تخزين معرف المستخدم

  // ✅ 1. جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // الحصول على المستخدم الحالي من Firebase Authentication
      if (user) {
        setUserId(user.uid); // حفظ معرف المستخدم

        try {
          const response = await axios.get(
            `https://react-project-f71d3-default-rtdb.firebaseio.com/users/${user.uid}.json`
          );
          
          if (response.data) {
            setFormData({
              firstName: response.data.firstName || '',
              LastName: response.data.LastName || '',
              role: response.data.role || '',
              email: response.data.email || user.email, // إذا لم تكن البيانات موجودة، استخدم البريد من auth
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

  // ✅ 2. تحديث القيم عند تغيير المدخلات
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 3. إرسال البيانات إلى Firebase عند الضغط على زر "إرسال"
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
    <div className="pageContainer">
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact US</h2>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900">First name</label>
              <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" required />
            </div>
            <div>
              <label htmlFor="LastName" className="block text-sm font-semibold text-gray-900">Last name</label>
              <input id="LastName" name="LastName" type="text" value={formData.LastName} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-900">Role</label>
              <input id="role" name="role" type="text" value={formData.role} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900">Phone number</label>
              <input id="phoneNumber" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
              <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600" required />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`relative inline-flex h-6 w-11 items-center rounded-full 
              ${agreed ? "bg-indigo-600" : "bg-gray-300"} transition-colors duration-300`}
            >
              <span className="sr-only">Agree to policies</span>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
              ${agreed ? "translate-x-6" : "translate-x-1"}`} />
            </Switch>

            <label className="text-sm text-gray-600">
              By selecting this, you agree to our <a href="#" className="font-semibold text-indigo-600">privacy policy</a>.
            </label>
          </div>

          <div className="mt-10">
            <button type="submit" disabled={loading} id="blue-btn" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500">
              {loading ? "Submitting..." : "Let's talk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;