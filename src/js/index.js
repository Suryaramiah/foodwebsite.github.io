// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import{elements} from './views/base';
import{renderLoader} from './views/base';
import{clearLoader} from './views/base';

 

//  Global state
// search object
// current recipe object
// shopping list Object
// liked recipe


const state = {};

// Search controller 

const controlSearch = async () => {
//1. get the query from the view
    const query = searchView.getInput();
    // const query = 'pizza';

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

            try {
        // 4. search for recipe
         await state.search.getResults();        

         // 5. surrender results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
    }   catch (err){
        alert ('something wrong with the search...');
        clearLoader();
    }
}
};

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

// Testing
// window.addEventListener('load', e=>{
//     e.preventDefault();
//     controlSearch();
// });


elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');

    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        
    }
});


// Recipe controller 
// const r = new Recipe(47746);
// r.getRecipe ();
// console.log(r);

const controlRecipe = async () => {
    // get the id from url
    const id = window.location.hash.replace('#', " ");
    console.log(id);

    if(id){
        // prepare UI for change
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        // Highlight selected search 
        // if (state.search) searchView.highlightSelected(id);
        

    try {
        // get recipe data
        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);

        state.recipe.parseIngredients();
        // calculate servings and time

        state.recipe.calcTime();
        state.recipe.calcServing();

        // render recipe
        // console.log(state.recipe) ; 
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    } 
    catch (err) {
        alert('Error processing recipe');
    }
}
};

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

//  Handling recipe control

elements.recipe.addEventListener('click', e =>{

    if(e.target.matches('.btn-decrease, .btn-decrease*')) {
        //  Decrease button is clicked
        if (state.recipe.servings > 3){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase*')) {
        //  Increase button is clicked
        state.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);
});


