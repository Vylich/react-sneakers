import Card from '../components/Card';

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  onAddFavorite,
  onAddToCart,
  cartItems
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Poisk po zaprosu: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.id}
              cartItems
              id={item.id}
              onFavorite={(obj) => onAddFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              title={item.title}
              price={item.price}
              url={item.imageUrl}
              added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
