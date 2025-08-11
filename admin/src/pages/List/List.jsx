import React, { useContext, useState,useEffect } from 'react'
import './List.css'
import { StoreContext } from '../../../../../frontend/src/Context/StoreContext';
// export { url,currency } from '../../assets/assets';
import axios  from 'axios'; 

const List = () => {

   useEffect(() => {
      document.title = "See recipes "; // এখানে টাইটেল দিন
    }, []);

  const [list, setList] = useState([]);
  const { url, currency } = useContext(StoreContext); // ✅ Destructure from context

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p className="cursor" title='Remove product' onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List