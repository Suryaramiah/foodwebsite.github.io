import{elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {elements.searchInput.value = ''};

export const clearResults = () => {
   elements.searchReslist.innerHTML = '';     
};

        const limitRecipeTitle = (title, limit = 17) =>{
        const newTitle = [];
        if (title.lenght > limit){
            title.split(' ').reduce((acc, cur) => {
                if (acc + cur.lenght <= limit) {
                    newTitle.push(cur);
                }
                    return acc + cur.lenght;
            }, 0);

            return `${newTitle.join(' ')}...`;
        }
         return title; 
    };


const renderRecipe = recipe => {
    const markup =`
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;

    elements.searchReslist.insertAdjacentHTML('beforeend', markup); 
};

export const renderResults = recipes =>{
    console.log(recipes);
    recipes.forEach(renderRecipe);
};