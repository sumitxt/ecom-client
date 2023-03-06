import {useState} from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../context/auth";
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {
    // state
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("Abcd1234");
    // hook
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`/login`, {
                email,
                password,
            });
            console.log(data);
            if (data?.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("auth", JSON.stringify(data));
                setAuth({...auth, token: data.token, user: data.user});
                toast.success("Login successful");
                navigate(
                    location.state ||
                    `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
                );
            }
        } catch (err) {
            console.log(err);
            toast.error("Login failed. Try again.");
        }
    };

    return (
        <div>
            <Jumbotron title="Login"/>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        className="form-control mb-4 p-2"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        className="form-control mb-4 p-2"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </form>
                                <p>You don't have a account? <a href="/register">register here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;