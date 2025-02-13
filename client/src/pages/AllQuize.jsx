import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllQuize = () => {
  // Fetch data from an API endpoint
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allQuizes"], // Should be an array
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/quizs");
      return response.data;
    },
  });

  if (isLoading)
    return <p className="grid place-items-center">Loading quizzes...</p>;
  if (error) return <p>Error fetching quizzes!</p>;

  // delete data form database
  const deleteQuize = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/quizs/${id}`
        );

        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your quiz has been deleted.",
            icon: "success",
          });

          // when data was deleted then refeth the data from the database
          refetch();
        }
      }
    });
  };

  // edit data form database
  return (
    <div className="">
      <div className="px-5 my-5 md:px-10 md:my-8 lg:px-20 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {data?.map((quize) => (
          <div className="border p-5 rounded-md shadow-sm space-y-1" key={quize._id}>
            <h1 className=""><span className="font-bold">Quize:</span> {quize.title}</h1>
            <p> <span className="font-bold">Created Date: </span>{ quize.date}</p>
            <p>{quize.description?.slice(0, 100)}...</p>
            <div className="flex justify-end mt-2 space-x-3">
              <Link
                to={`/dashboard/update-quize/${quize._id}`}
                className="bg-green-500 text-white flex items-center justify-center w-10 h-10 rounded-lg transition duration-300 hover:bg-green-600 shadow-md"
              >
                <BiMessageSquareEdit size={24} />
              </Link>
              <button
                onClick={() => deleteQuize(quize._id)}
                className="bg-red-500 text-white flex items-center justify-center w-10 h-10 rounded-lg transition duration-300 hover:bg-red-600 shadow-md"
              >
                <MdOutlineDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuize;
