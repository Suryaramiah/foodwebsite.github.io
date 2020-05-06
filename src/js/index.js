// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import{elements} from './views/base';

//  Global state
// search object
// current recipe object
// shopping list Object
// liked recipe


const state = {};
const controlSearch = async () =>{
//1. get thre query from the view
    const query = searchView.getInput();

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results 
        searchView.clearInput();
        searchView.clearResults();

        // 4. search for recipe
         await state.search.getResults();        

            // 5. surrender results on UI
            searchView.renderResults(state.search.result);
    }

}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
})

