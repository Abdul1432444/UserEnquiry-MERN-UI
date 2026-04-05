import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from "./enquiry/EnquiryList";
const API = import.meta.env.VITE_API_URL;
const UserEnquiry = () => {
  const [enquiryList, setEnquiryList] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const saveEnquiry = (e) => {
    e.preventDefault();

    axios.post(`${API}api/website/enquiry/insert`, formData).then((res) => {
      console.log(res.data);
      toast.success("enquiry is saved successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
    });
  };
  const getAllEnquiry = () => {
    axios
      .get(`${API}api/website/enquiry/view`)
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      });
  };
  const getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };
  useEffect(() => {
    getAllEnquiry();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8">User Enquiry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE - FORM */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Enquiry Form</h2>

          <form className="space-y-4" onSubmit={saveEnquiry}>
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                onChange={getValue}
                name="name"
                value={formData.name}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Email</label>
              <input
                onChange={getValue}
                name="email"
                value={formData.email}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Phone</label>
              <input
                onChange={getValue}
                value={formData.phone}
                name="phone"
                type="text"
                placeholder="Enter your phone"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Message</label>
              <textarea
                onChange={getValue}
                value={formData.message}
                name="message"
                rows="4"
                placeholder="Enter your message"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
            </div>

            <button
              // onSubmit={saveEnquiry}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - TABLE */}
        <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} />
      </div>
    </div>
  );
};

export default UserEnquiry;
