import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateQuize = () => {
  // get quiz data from useLoaderData hook using id from route params
  const data = useLoaderData();
  // to navigate user
  const navigate = useNavigate();

  const handelUpdateQuize = async (e, id) => {
    e.preventDefault();

    // to get update data from users
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const updatedData = { title, description };

    // update the data from databaes
    try {
      const response = await axios.put(
        `https://job-assignment-1.vercel.app/quizs/${id}`,
        updatedData
      );

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Quiz has been successfully updated.",
          icon: "success",
        });
        navigate("/dashboard/all-quize");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update quiz. Please try again.",
        icon: "error",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md md:w-[500px] w-full">
        <h1 className="text-center font-bold mb-5">Update Quize</h1>
        <form
          onSubmit={(e) => handelUpdateQuize(e, data._id)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Quize Title</label>
            <Input
              type="text"
              placeholder="Quize Title here..."
              className="mt-1"
              required
              name="title"
              defaultValue={data.title}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              type="text"
              defaultValue={data.description}
              placeholder="Quize Description Here..."
              className="mt-1"
              required
              name="description"
              rows="4"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Quize
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuize;
