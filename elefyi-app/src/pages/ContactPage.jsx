import "../styles/MainStyle.css";
import { useState } from 'react';
import { auth, database } from "../firebase";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Field, Label, Switch } from '@headlessui/react';

  
function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phoneNumber: '',
    message: ''
  });


  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

   // تحديث القيم في النموذج
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال البيانات إلى Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the privacy policy before submitting.");
      return;
    }

    setLoading(true);
    try {
      const contactRef = ref(database, 'contacts');
      await set(contactRef, formData);
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', company: '', email: '', phoneNumber: '', message: '' });
    } catch (error) {
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
            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900">Last name</label>
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-900">Company</label>
            <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900">Phone number</label>
            <input id="phoneNumber" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-[#05b0d6]" required />
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
          <Switch
            checked={agreed}
            onChange={setAgreed}
            className={`relative inline-flex h-6 w-11 items-center rounded-full 
             ${agreed ? "bg-[#05b0d6]" : "bg-gray-300"} transition-colors duration-300`}
             >
              <span className="sr-only"></span>
              <span
              className={`inline-block h-5 w-10 transform rounded-full bg-black transition 
              ${agreed ? "translate-x-1" : "translate-x-7"}`}
              />
          </Switch>

            <Label className="text-sm text-gray-600">By selecting this, you agree to our <a href="#" className="font-semibold text-[#05b0d6]">privacy policy</a>.</Label>
          </Field>
        </div>
        <div className="mt-10">
          <button type="submit" disabled={loading} className="block w-full rounded-md bg-[#05b0d6] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs">
            {loading ? "Submitting..." : "Let's talk"}
          </button>
        </div>
        {success && <p className="mt-4 text-green-600">Message sent successfully!</p>}
      </form>
    </div>
    </div>
  );
}
export default ContactPage;