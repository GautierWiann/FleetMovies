

import Cat from "./CategoryMovies";
import "antd/dist/antd.css";

function MoviesCat() {
  const categoriesData = [
    { name: "Dernières sorties",link: "sort_by=popularity.desc&primary_release_date.gte=2022-10-31&primary_release_date.lte=2022-12-01&include_adult=false&include_video=false&page=1",},
    { name: "Aventure", link: "with_genres=12&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Comédies", link: "with_genres=35&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Drames", link: "with_genres=18&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Romances", link: "with_genres=10749&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Horreur", link: "with_genres=27&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Univers musical", link: "with_genres=10402&vote_count.gte=10&primary_release_date.gte=2020-01-01" },
    { name: "Les meilleurs films de 2022", link: "primary_release_year=2022" },
  ];

  const categories = categoriesData.map((data, i) => {
    return <Cat key={i}  name={data.name} link={data.link}/>;
  });
  return (
    <div>
      {categories}
    </div>
  );
}

export default MoviesCat;
