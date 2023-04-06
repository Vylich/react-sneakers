import Card from '../components/Card';

function Favorites({ items, onAddFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
        <div className="search-block d-flex"></div>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          url={item.url}
          favorited={true}
          onFavorite={onAddFavorite}
        />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
