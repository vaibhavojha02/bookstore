import React, { useEffect, useState } from "react";
import Courses from "../courses/Courses";

import { Link } from "react-router-dom";
import Cards from "./Cards";
import axios from "axios";

const Course = () => {
  const [book, setBook] = useState([]);
  const fetchDataFromApi = async () => {
    const url = "http://localhost:4001/book";
    const response = await axios.get(url);
    console.log(response);
    setBook(response.data); //conatins book
  };
  useEffect(() => {
    fetchDataFromApi();
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container md:px-20  px-4 py-28 dark:bg-slate-900 dark:text-white">
        <div className=" items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            we're delighted to have you{" "}
            <span className=" font-extrabold text-pink-600">Here! :)</span>
          </h1>
          <p className="mt-12">
            Sure, here's a randomly generated paragraph consisting of
            approximately 50 words: "The sun dipped below the horizon, casting a
            warm glow across the tranquil landscape. Birds chirped softly in the
          </p>
          <button className="btn btn-secondary mt-8">
            <Link to="/">back</Link>
          </button>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
