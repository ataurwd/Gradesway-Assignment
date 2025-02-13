import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // get user data from the database
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/user");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const foundUser = users.find(
      (user) => user.user === username && user.password === password
    );

    // navigate to the dashboard if login is successful, otherwise show error message
    if (foundUser) {
      Swal.fire({
        title: "Login successful!",
        icon: "success",
      });
      navigate("/dashboard/all-quize");
    } else {
      Swal.fire({
        title: "Invalid username or password!",
        icon: "error",
      });
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
