import '../App.css';
import db from "../services/firebase";
import React, {useState, useEffect} from "react";
import Navbar from './Navbar';
import AllRecipes from './AllRecipes'
import SelectedRecipes from './SelectedRecipes';
import SingleRecipe from './SingleRecipe';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState("AllRecipes");
  const [singleRecipeView, setSingleRecipeView] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  //functions



  useEffect(() => {
    const data = [];
  db.ref("recipes").once('value',function(snapshot){
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      data.push({[childKey]: childData})
    })
    setRecipes(data);
    // console.log(data);
  }) 
  },[])



  return (
    <div className="App">
      <Navbar setCurrentView={setCurrentView}/>
      {currentView === "AllRecipes" ?
       <AllRecipes 
          recipes={recipes} 
          setCurrentView={setCurrentView} 
          setSingleRecipeView={setSingleRecipeView}/> 
      : currentView === "SingleRecipe" ?
       <SingleRecipe 
          singleRecipeView={singleRecipeView}
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}/> 
      : <SelectedRecipes 
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}/>}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
