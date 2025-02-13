import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateQuize = () => {
  const navigate = useNavigate()

  // 
  const handelFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const date = new Date().toISOString().split('T')[0]
    const formData = { title, description, date};
    axios.post("http://localhost:5000/quiz", formData)
      .then(res => {
        if (res.data.result.insertedId) {
          Swal.fire({
            title: "Create Quize success!",
            icon: "success"
          })
        }
        // reset the form
        form.reset();
        navigate("/dashboard/all-quize")
    })
  };

  return (
    <div className="flex overflow-x-hidden items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md md:w-[500px] w-full">
        <h1 className="text-center font-bold mb-5">Create Quize For Student</h1>
        <form onSubmit={handelFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Quize Title</label>
            <Input
              type="text"
              placeholder="Quize Title here..."
              className="mt-1"
              required
              name="title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea 
              type="text"
              placeholder="Quize Description Here..."
              className="mt-1"
              required
              name="description"
               rows="5"
            />
          </div>
          <Button type="submit" className="w-full">
            Create 
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuize;
