import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const AllQuize = () => {
  // Fetch data from an API endpoint
  const { data, isLoading, error } = useQuery({
    queryKey: ["allQuizes"], // Should be an array
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/quizs");
      return response.data;
    },
  });

  if (isLoading) return <p className="grid place-items-center">Loading quizzes...</p>;
  if (error) return <p>Error fetching quizzes!</p>;

    
    
    // delete data form database 
  return (
    <div className="">
      <div className="px-5 my-5 md:px-10 md:my-8 lg:px-20 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {data?.map((quize) => (
          <div className="border p-5 rounded-md shadow-sm" key={quize._id}>
            <h1 className="font-bold mb-2">{quize.title}</h1>
            <p>{quize.description?.slice(0, 100)}...</p>
            <div className="flex justify-end mt-2 space-x-2">
              <button>
                <BiMessageSquareEdit size={24} className="bg-green-500 w-8 h-8 rounded-md"/>
              </button>
              <button>
                <MdOutlineDelete size={24} className="bg-red-500 w-8 h-8 rounded-md"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuize;
