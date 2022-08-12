import "./App.css";
import { About } from "./components/About/About.js";
import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";
import { Home } from "./components/Home/Home.js";
import { Login } from "./components/Login/Login.js";
import { Register } from "./components/Register/Register.js";
import { Details } from "./components/Details/Details.js";
import { Cats } from "./components/Cats/CatList.js";
import { Post } from "./components/Post/Post.js";
import { Profile } from "./components/Profile/Profile.js";
import { NotFound } from "./components/NotFound.js";
import { Edit } from "./components/Edit/Edit";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "nEPle5wmvs4y84gG13Um53XwDshXhFee7neh8sT5";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "GE2kyAiPCIyOmvtecoIwgyuO5oC0ilK1pwc08Xzf";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// -------------------------------------------------------------------------

function App() {
  let catQuery = new Parse.Query("Cat");
  const [cats, setCats] = useState([]);

  const queryFunc = async () => {
    setCats(await catQuery.find());
  };

  useEffect(() => {
    queryFunc();
  }, []);


  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cats" element={<Cats cats={cats}/>}/>
          <Route path="/cats/:catId" element={<Details cats={cats} />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:catId" element={<Edit cats={cats} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
