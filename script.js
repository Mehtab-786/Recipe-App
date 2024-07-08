    // Selecting the important tags 

    let searchBox = document.querySelector("#searchbox");
    let searchBtn = document.querySelector(".btn");
    let recipeBox = document.querySelector(".container")
    let recipeDetailContent = document.querySelector(".recipeDetailsContent")
    let recipeCloseBtn = document.querySelector(".recipeCloseBtn")


    // starting function 
    const fetchRecipes = async (name) => {
        recipeBox.innerHTML = "<div class='fetching'><h2> Fetching Data ... </h2></div>"

        // Used try and catch to catch and error 
        try {        
            let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            let data = await url.json() ;

            recipeBox.innerHTML = ""; // Clear fetching message

            // Adding the recipe's items one by one 
            data.meals.forEach(item => {
                let recipeDiv = document.createElement("div")
                recipeBox.classList.add("recipeDiv")
                recipeDiv.innerHTML = `
                <img src="${item.strMealThumb}" >
                <h2>${item.strMeal}</h2>        
                <h2>${item.strArea}</h2>   `

            // button created for viewing the whole detailed recipe
                let btn = document.createElement("button")
                btn.textContent = "View Recipe"

                recipeDiv.appendChild(btn)


                btn.addEventListener("click", () => {
                    openRecipePopup(item)
                })
            

                recipeBox.appendChild(recipeDiv)
            } 
        )}
        catch (error) {

        // results if api failed to connect 
            recipeBox.innerHTML = `
            <div class="no-results">
                <img src="https://img.freepik.com/premium-vector/error-404-with-funny-mouses-banner_18591-536.jpg">
                <h2>No recipes found. Please try another search.</h2>
            </div>
        `;
        return;
        }};

    // function to add the ingredients one on one which returns a list
    let fetchIngediants = (meal) => {
        let ingreList = "";
        for (let index = 1; index <= 20 ; index++) {
            const ingrediants = meal[`strIngredient${index}`]
            if (ingrediants) {
                let measure = meal[`strMeasure${index}`]
                console.log(meal);
                ingreList += `<li class="recipeListItems">${measure} ${ingrediants}</li>`
            } else {
                break;
            }
            
        }
        return ingreList;
    }

    // the popup funtion after clicking the recipe view button
    const openRecipePopup = (meal) => {
        
        recipeDetailContent.innerHTML =   `
        <h2 class="recipeMeal">${meal.strMeal}</h2>
        <h3 class="recipeIngredients">Ingrediants</h3>
        <ul class="recipeList">${fetchIngediants(meal)}</ul>    
        <div class="instructionPanel">
            <h3 class="recipeHead">Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>   `
        recipeDetailContent.parentElement.style.display = "block"
    }


    // closing the popup function 
    function closing(){
        recipeCloseBtn.addEventListener("click", () => {
            recipeDetailContent.parentElement.style.display = "none";
        })
    }
    closing()

    // taking the input and executing the functions 
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault()

        let recipe = searchBox.value.trim()

        if (!recipe) {
            recipeBox.innerHTML = "<h2>Please type your meal</h2"        
            return
        }

        fetchRecipes(recipe)
    })

