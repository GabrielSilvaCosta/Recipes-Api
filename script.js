let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let userInp = document.getElementById("user-inp").value.trim();

  fetch(url + userInp)
    .then((res) => res.json())
    .then((data) => {
      if (!data.meals) {
        result.innerHTML = `<h3 class="no-result">No meals found</h3>`;
        return;
      }

      let myMeal = data.meals[0];
      let count = 1;
      let ingredients = "";

      for (let i = 1; i <= 20; i++) {
        let ingredient = myMeal[`strIngredient${i}`];
        let measure = myMeal[`strMeasure${i}`];

        if (!ingredient) break;

        ingredients += `<li>${measure} ${ingredient}</li>`;
      }

      result.innerHTML = `
        <div class="image">
          <img src="${myMeal.strMealThumb}" alt="">
        </div>
        <div class="details">
          <h1>${myMeal.strMeal}</h1>
          <h3>${myMeal.strArea}</h3>
          <div class="ingredient-con">
            <ul>${ingredients}</ul>
          </div>
          <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
          </div>
          <button id="show-recipe">View Recipe</button>
        </div>`;

      let showRecipe = document.getElementById("show-recipe");
      let hideRecipe = document.getElementById("hide-recipe");
      let recipe = document.getElementById("recipe");

      showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
        showRecipe.style.display = "none";
      });

      hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
        showRecipe.style.display = "block";
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      result.innerHTML = `<h3 class="no-result">An error occurred while fetching data. Please try again later.</h3>`;
    });
});
