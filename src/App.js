import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddYummyMenu from "./components/AddYummyMenu";
import Donuts from "./components/Donuts";
import EditDonut from "./components/EditDonut";
import YummyMenu from "./components/YummyMenu";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={YummyMenu} exact />
        <Route path="/add-menu" component={AddYummyMenu} exact />
        <Route path="/donuts" component={Donuts} />
        <Route path="/donut/:donutId" component={EditDonut} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
