const RenderGenres = ({
  genreIds = [],
  genresList = [],
  limit = 2,
  className = "",
}) => {
  const displayedGenres = genreIds.slice(0, limit);

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {displayedGenres.map((id) => {
        const genre = genresList.find((g) => g.id === id);
        return (
          <div
            key={id}
            className={`text-sm bg-sixth text-fifth font-medium px-4 py-2 h-fit rounded-full ${className}`}
          >
            {genre?.name}
          </div>
        );
      })}
    </div>
  );
};

export default RenderGenres;
