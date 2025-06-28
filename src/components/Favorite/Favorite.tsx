import { useContext, useEffect, useState } from 'react';
import { HeartIcon as HeartFilledIcon } from '@heroicons/react/24/solid';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function Favorite({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe>();
  const { removeFavorite } = useContext(FavoritesContext);

  const { error, data, loading } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  useEffect(() => {
    if (data && data.meals && data.meals.length) {
      const newRecipe = data.meals[0];
      setRecipe(newRecipe);
    }
  }, [data]);

  if (loading) return <LoadingSpinner text="Loading favorites..." />;

  return (
    <div className="">
      {recipe && (
        <>
          <div className="grid grid-cols-3 grid-cols-[1fr_4fr_2fr_2fr] gap-5 w-full items-center mb-5">
            <Link
              to={`/recipe/${id}`}
              key={id}
              className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-10 sm:w-16 h-10 sm:h-16"
              />
            </Link>
            <h2 className="flex text-2xl font-bold items-center justify-between">
              <Link
                to={`/recipe/${id}`}
                key={id}
                className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
              >
                {recipe.strMeal}
              </Link>
              <button
                title="Remove this favorite"
                onClick={() => {
                  removeFavorite(id);
                }}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-200 ml-1 p-1 rounded-md w-fit"
              >
                <HeartFilledIcon className="size-6 text-red-600" />
              </button>
            </h2>
            <Link
              to={`/recipe/${id}`}
              key={id}
              className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
            >
              <h3>
                Category: <strong>{recipe.strCategory}</strong>
              </h3>
            </Link>
            <Link
              to={`/recipe/${id}`}
              key={id}
              className="text-xl no-underline font-bold text-gray-500 cursor-pointer"
            >
              <h3>
                Cuisine: <strong>{recipe.strArea}</strong>
              </h3>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};
