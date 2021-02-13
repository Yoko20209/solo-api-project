import '../App.css';
import db from "../services/firebase";
import React, {useState, useEffect} from "react";
// import Navbar from './Navbar';
import AllRecipes from './AllRecipes'
import SelectedRecipes from './SelectedRecipes';
import SingleRecipe from './SingleRecipe';
import NewRecipe from './NewRecipe'

import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown"

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState("AllRecipes");
  const [singleRecipeView, setSingleRecipeView] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [addedRecipe, setAddedRecipe] = useState(false);

  //functions

  function handleSelectedRecipesButton(){
    setCurrentView("SelectedRecipes")
  }

  useEffect(() => {
    const data = [];
  db.ref("recipes").once('value',function(snapshot){
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      data.push({[childKey]: childData})
    })
    setRecipes(data);
  }) 
  },[])

  useEffect(() => {
    if(!addedRecipe) return;
    const data = [];
  db.ref("recipes").once('value',function(snapshot){
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      data.push({[childKey]: childData})
    })
    setRecipes(data);
  }) 
  setAddedRecipe(false);
  },[addedRecipe])


function menuClicked(){
  console.log("clicked")
}

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" id="navbar">

        <Navbar.Brand href="#home">Menu Planner</Navbar.Brand>

        <Nav className="mr-auto"  onSelect={(key)=>{setCurrentView(key)}}>
          <Nav.Link eventKey="AllRecipes" id="all_recipes">All recipes</Nav.Link>
          <Nav.Link eventKey="NewRecipes" id="make_new_recipe">Make new recipe</Nav.Link>
        </Nav>  

        <Form inline="true" className="search_bar">
          <FormControl type="text" placeholder="Search" />
          <Button variant="outline-info">Search</Button>
        </Form> 

        <Button 
          variant="outline-info" 
          onClick={handleSelectedRecipesButton} 
          id="selected_recipes_button">Selected Recipes
          <Badge variant="light" id="selected_recipes_badge">{selectedRecipes.length}</Badge>
          {/* <span className="sr-only">selected recipes</span> */}
        </Button>

        <NavDropdown title="" id="basic-nav-dropdown" className="icon" alignRight="true">
          <NavDropdown.ItemText id="dropdown_search">
            <Form >
              <FormControl type="text" placeholder="Search" id="drop_search_bar"/>
              <Button variant="outline-info">Search</Button>
            </Form> 
          </NavDropdown.ItemText>
            
          <NavDropdown.Item  eventKey="NewRecipes"
              id="dropdown_make_new_recipe" 
              onSelect={(key)=>{setCurrentView(key)}} >Make new recipe
            {/* <Nav.Link 
              eventKey="NewRecipes"
              id="dropdown_make_new_recipe" 
              onSelect={(key)=>{setCurrentView(key)}} 
              >Make new recipe
            </Nav.Link> */}
            </NavDropdown.Item>

          <NavDropdown.Item href="#action/3.3" 
            onClick={handleSelectedRecipesButton}
            id="dropdown_selected_recipes">Selected Recipes
            <Badge variant="light">{selectedRecipes.length}</Badge>
          </NavDropdown.Item>

          <NavDropdown.Item href="#action/3.3" 
            eventKey="AllRecipes"
            onSelect={(key)=>{setCurrentView(key)}}
            id="dropdown_all_recipes">
              All recipes
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>

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
      : currentView === "SelectedRecipes" ?
      <SelectedRecipes 
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
          setSingleRecipeView={setSingleRecipeView}
          setCurrentView={setCurrentView}/>
      : <NewRecipe setAddedRecipe={setAddedRecipe}/>}
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
