import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  const getCocktail = React.useCallback(async () => {
    try {
      const res = await fetch(`${url}${id}`);
      const data = await res.json();
      if (data.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        } = data.drinks[0];
        const ingredients = [strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        ];
        const newCocktail = {
          name, image, info, category, glass, instructions, ingredients
        }
        setCocktail(newCocktail);
      } else {
        setCocktail(null)
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [id])

  React.useEffect(() => {
    setIsLoading(true);
    getCocktail();
  }, [id, getCocktail])

  if (isLoading) {
    return <Loading />
  }

  if (!cocktail) {
    return <h2 className="section-title">No Cocktail to display!</h2>
  }

  const { name, image, category, info, glass, instructions, ingredients } = cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">Back Home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
