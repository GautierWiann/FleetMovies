
import Cat from "./CategorySeries";

function SeriesCategorie() {
  const categoriesData = [
    { name: "Action et Aventure",link: "with_genres=10759",},
    { name: "Animation", link: "with_genres=16" },
    { name: "Comédies", link: "with_genres=35" },
    { name: "Drames", link: "with_genres=18" },
    { name: "Science-Fiction et Fantastique<", link: "with_genres=10765" },
    { name: "Familal", link: "with_genres=10751" },
    { name: "Mystères", link: "with_genres=9648" },
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

export default SeriesCategorie;
