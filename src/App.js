import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import Home from './pages/Home';
import { Route } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        'https://642a18d5b11efeb759931224.mockapi.io/cart '
      );
      const favoritesResponse = await axios.get(
        'https://642e15142b883abc6406adf3.mockapi.io/favorites'
      );
      const itemsResponse = await axios.get(
        'https://642a18d5b11efeb759931224.mockapi.io/Sneakers '
      );

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))) {
        axios.delete(
          `https://642a18d5b11efeb759931224.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((el) => Number(el.id) !== Number(obj.id))
        );
      } else {
        axios.post('https://642a18d5b11efeb759931224.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`https://642a18d5b11efeb759931224.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((el) => el.id !== id));
    console.log(id);
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://642e15142b883abc6406adf3.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://642e15142b883abc6406adf3.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChangeSearchInput = (evt) => {
    setSearchValue(evt.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveFromCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          cartItems={cartItems}
          items={items}
          favorites={favorites}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddFavorite={onAddFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddFavorite={onAddFavorite} />
      </Route>
    </div>
  );
}

export default App;
