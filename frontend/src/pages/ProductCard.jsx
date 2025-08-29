import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ACCESS_TOKEN } from '../constants';
import Axios from "axios";
import useProfile from '../hooks/useProfile';

const ProductCard = ({ product }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);
  const [profile, isLoading, error] = useProfile();
  const navigate = useNavigate();
  if(!product)
  {
    return <h1>loading...</h1>
  }
  // console.log(product.image);

  // React Hook Form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",  // profile আসলে পরে fill হবে
      description: "",
      image: null,
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

// Review Form submission
const onSubmit = async (data) => {
  try {
    console.log("Product ID:", product.id);
    console.log("Token:", token);
    console.log("Profile email:", profile?.email);

    if (!product.id) return alert("Product ID missing!");
    if (!profile?.email) return alert("Please login to submit review!");

    const formData = new FormData();
    formData.append("description", data.description);
    // number format এ পাঠান
    formData.append("product", parseInt(product.id));
    if (data.image && data.image[0]) formData.append("image", data.image[0]);
    formData.append("product", product.id.toString()); // string এ convert করুন

    // FormData content check করুন
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await Axios.post(`${BASE_URL}/api/review/`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Review submitted:", res.data);
    reset();
    alert("Review submitted successfully!");
  } catch (err) {
    console.error("Full error:", err);
    console.error("Response data:", err.response?.data);
    alert("Error submitting review: " + (err.response?.data?.message || "Please check your input"));
  }
};

  // console.log(profile?.email);

  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.category?.title}</p>
      <p className="mt-1 text-gray-700 line-clamp-3">
        {product.description?.substring(0, 70)}.... 
        <Link to={`/product/${product.id}`} className="ml-2 text-blue-600 hover:underline">
          More ..
        </Link>
      </p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-red-600 font-bold">
          ৳{product.selling_price?.toLocaleString()}
        </span>
        {product.marcket_price > product.selling_price && (
          <span className="text-gray-400 line-through">
            ৳{product.marcket_price?.toLocaleString()}
          </span>
        )}
      </div>

      {/* Review Form */}
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold mb-2">Leave a Review</h3>
       
        <textarea
          placeholder="Your review"
          {...register("description", { required: true })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="file"
          {...register("image")}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
        <Link className='btn btn-primary mx-5' to={`review/${product.id}`}>Show review</Link>
      </form>
    </div>
  );
};

export default ProductCard;
