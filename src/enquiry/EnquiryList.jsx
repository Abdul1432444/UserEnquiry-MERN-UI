import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const EnquiryList = ({ data, getAllEnquiry }) => {
  const deleteRow = (delid) => {
    axios
      .delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
      .then(() => {
        toast.success("enquiry deleted successfully");
      });
    getAllEnquiry();
  };
  let editRow = (editId) => {
    axios
      .get(`http://localhost:8000/api/website/enquiry/single/${editId}`)
      .then((res) => {
        let data = res.data;
        console.log(data.enquiry);
      });
  };
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Enquiry List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">SR NO</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Message</th>
              <th className="p-2">Delete</th>
              <th className="p-2">Edit</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.phone}</td>
                  <td className="p-2">{item.message}</td>
                  <td
                    className="p-2 text-red-500 cursor-pointer hover:underline"
                    onClick={() => deleteRow(item._id)}
                  >
                    Delete
                  </td>
                  <td
                    onClick={() => editRow(item._id)}
                    className="p-2 text-blue-500 cursor-pointer hover:underline"
                  >
                    Edit
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-2 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryList;
