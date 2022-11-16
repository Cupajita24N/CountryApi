import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { UserCountry } from "./components/UserCountry";
 
function App() {
  return (
    <div>
     <NavBar />
     <br/><br/>
     <Home />
     <UserCountry />
    </div>
  );
}

export default App;
