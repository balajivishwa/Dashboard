import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    const response = await axios.get('http://localhost:5000/dishes');
    setDishes(response.data);
  };

  const togglePublishedStatus = async (id) => {
    const response = await axios.patch(`http://localhost:5000/dishes/${id}/publish`);
    setDishes(dishes.map(dish => (dish.id === id ? response.data : dish)));
  };

  return (
    <div>
      <h1>Dish Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Published Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.description}</td>
              <td>{dish.price}</td>
              <td>{dish.published_status ? 'Published' : 'Unpublished'}</td>
              <td>
                <button onClick={() => togglePublishedStatus(dish.id)}>
                  {dish.published_status ? 'Unpublish' : 'Publish'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
