import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateQuize = () => {
  const handelFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const formData = { title, description };
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
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
            />
          </div>
          <Button type="submit" className="w-full">
            Create Quize
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuize;
