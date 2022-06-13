import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";
import React,{useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <>
    <Navigation />
    <div>
      <div class="row">
        <div class="col-lg-12 col-sm-12 topText">
          <a href="/"><img src="./assets/logorockpaper.png" alt="" /></a>
          <br /><br />
          <h4 class="ml-2">ROCK PAPER SCISSORS</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12 m-auto">
          <div class="card p-5">
            <h1 class="mb-5">Login</h1>

            <form onSubmit={handleSubmit} class="row g-3">          

              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-4 col-form-label"> Email </label>

                <div class="col-sm-8">
                  <input type="email" name="uEmail" class="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>

              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-4 col-form-label"> Password </label>

                <div class="col-sm-8">
                  <input type="password" name="uPassword" class="form-control" placeholder="12345678" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>

              <div class="row m-auto">
                <button type="submit" class="btn btn-primary text-right float-end mb-3" >Login</button>
              </div>
              <div class="row m-auto">
                <h6>Belum Punya Akun? <a href="/signup">Daftar Sekarang</a></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
