import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  
  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const userData = { username, password };
    console.log(userData);
  
    // Send user data for login
    const response = await axios.post("http://localhost:5000/user", userData);
    if (response.data) {
      // Only save the username to localStorage
      localStorage.setItem('username', JSON.stringify(username));
  
      Swal.fire({
        title: "Login successful!",
        icon: "success",
      });
  
      // Redirect to dashboard
      navigate("/dashboard/all-quize");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Enter username"
              className="mt-1"
              required
              defaultValue="teacher"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              className="mt-1"
              defaultValue="123456"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <FaUser />
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
