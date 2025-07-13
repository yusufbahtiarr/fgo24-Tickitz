const RenderGenres = ({ genres = [], limit = 2, className = "" }) => {
  const displayedGenres = genres.slice(0, limit);

  return (
    <div className="flex flex-row gap-2 flex-wrap items-center">
      {displayedGenres.map((genre, index) => (
        <div
          key={`${genre}-${index}`} // Better key with genre name
          className={`text-sm bg-fourth/80 text-secondary font-medium px-4 py-2 h-fit rounded-full ${className}`}
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default RenderGenres;
