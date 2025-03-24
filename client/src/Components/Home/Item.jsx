

 import {useLocation} from 'react-router-dom';
import React, { useState } from 'react';
// import { Checkbox } from "primereact/checkbox";
import './Item.css'; // נוכל להוסיף את העיצוב כאן
import { Checkbox } from 'primereact/checkbox';

const Item = () => {
    const [ingredients, setIngredients] = useState([]);

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }
  // שמירה על הצבעים שנבחרו
  const [selectedColors, setSelectedColors] = useState([]);
  const location = useLocation();
  // רשימת הצבעים
//   const colors = ['#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080'];
const colors = [
    '#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080',
    '#DC143C', '#00FFFF', '#FF00FF', '#8A2BE2', '#A52A2A',
    '#7FFF00', '#D2691E', '#FF1493', '#00BFFF', '#696969',
    '#228B22', '#FF4500', '#2E8B57', '#FFD700', '#808080',
    '#6A5ACD', '#B8860B'
  ];
  // פונקציה שמבצע/ת את השינוי בעת לחיצה על צבע
  const toggleColorSelection = (color) => {
    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter(c => c !== color); // אם הצבע כבר נבחר, מסירים אותו
      } else {
        return [...prevColors, color]; // אם הצבע לא נבחר, מוסיפים אותו
      }
    });
  };

  return (
<>
<div className="container">
      <div className="column-1">
        <h2>עמודה ראשית</h2>
        <p><img className="balloon-image"alt="Card" src={location.state.product.image_url}/></p>
      </div>
      <div className="column-2">
      <div>
        <h1>{location.state.product.name}</h1>
        <h2>{location.state.product.price} ש"ח</h2>

      </div>
        <div>  <div className="color-picker">
      <h3>בחר צבעים:</h3>
      <div className="color-circles">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => toggleColorSelection(color)}
          >
            {selectedColors.includes(color) && (
              <span className="checkmark">✔</span>
            )}
          </div>
        ))}
      </div>
      {selectedColors.length > 0 && (
        <></>
      )}
      <br/>
      <div className="flex align-items-center" >
                <Checkbox  style={{textAlign:"center"}} inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
                <label htmlFor="ingredient1" className="ml-2" >אני רוצה צבעים כמו בתמונה </label>
            </div>
    </div></div>
        <div>תא 3</div>
        <div>תא 4</div>
      </div>
    </div>
    <div className="column-3">עמודה שלישית</div>



    </>
  );
};

export default Item;