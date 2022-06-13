import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";
import React,{useState} from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("")
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password);
    writeUserData(email, password,username);
    navigate("/login")
  };
  const randId = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  function writeUserData(email, password,username) {
    const userId = randId();
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      email: email,
      password: password,
      username: username,
    });
  }
  return (
    <>
      <Navigation />
      <div>
        <div class="row">
          <div class="col-lg-12 col-sm-12 topText">
            <a href="/">
              <img src="./assets/logorockpaper.png" alt="" />
            </a>
            <br />
            <br />
            <h4 class="ml-2">ROCK PAPER SCISSORS</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-sm-12 m-auto">
            <div class="card p-5">
              <h1 class="mb-5">Sign Up</h1>

              <form onSubmit={handleSubmit} class="row g-3">
                <div class="alert <%= messageClass %>" role="alert"></div>

                <div class="mb-3 row">
                  <label class="col-sm-4 col-form-label">Username</label>

                  <div class="col-sm-8">
                    <input
                      type="username"
                      name="username"
                      class="form-control"
                      placeholder="username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div class="mb-3 row">
                  <label class="col-sm-4 col-form-label"> Email </label>

                  <div class="col-sm-8">
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div class="mb-3 row">
                  <label class="col-sm-4 col-form-label"> Password </label>

                  <div class="col-sm-8">
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div class="row">
                  <button
                    type="submit"
                    class="btn btn-primary text-right float-end mb-3"
                  >
                    Submit
                  </button>
                </div>
                <div class="row m-auto">
                  <h6>
                    Sudah Punya Akun? <a href="/login">Login Here</a>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
