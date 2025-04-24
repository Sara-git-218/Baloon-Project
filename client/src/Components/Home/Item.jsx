

import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import './Item.css';
const Item = () => {
  const location = useLocation();
  const token = useSelector(state => state.Token.tokenstr);
  //פונקציה לחילוץ ה-userמה-token
  // const getUserFromToken = (token) => {
  //   if (!token || token.split(".").length !== 3) {
  //     console.error("Invalid token format");
  //     return null;
  //   }

  //   try {
  //     const decoded = jwtDecode(token);
  //     return decoded.user || decoded; // תבדקי איך הנתונים שמורים בטוקן שלך
  //   } catch (error) {
  //     console.error("Failed to decode token", error);
  //     return null;
  //   }
  // };
  //משתנה ופונקציה לכמות
  const [quantity, setQuantity] = useState("1");
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "" || (!isNaN(newValue) && Number(newValue) >= 1)) {
      setQuantity(newValue);
    }
  };
  // משתנה לתוכן הכיתוב על הבלון
  const [value, setValue] = useState('');
  //הגדרת משתנה ופונקציה לתאריך 
  const [date, setDate] = useState("");
  const handleChange1 = (event) => {
    setDate(event.target.value);
  };
  //הפעלת הפונקציה לחילוץ ה-user
  const user = useSelector(state=>state.User.user);
  console.log(user);
  //אובייקט להוספה לסל
  const itemInCart = {
    user_id: user ? user._id : null,
    readyDesign_id: location.state.product._id,
    cnt: quantity,
    CaptionContent: value
  }
  //פונקצית ההוספה לסל
  const AddToCart = async () => {
    if (!user) {
      alert("התחבר לאתרררר")
      return;
    }

    try {
      const res = await axios.post('http://localhost:3600/api/itemInCart/createItemInCart', itemInCart, {
        headers: {
          'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
          'Content-Type': 'application/json',  // ציון סוג התוכן
        }
      })
      if (res.status == 200) {
        alert("נוסף בהצלחה!!!!!!")
      }
    }
    catch (e) {
      console.log(e)
    }

  }
  //קשור לצבעים
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
  //מה מצב הצ'קבוקס
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
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
    if (isCheckboxChecked) {
      // אם הצ'קבוקס מסומן, לא מאפשר לבחור צבעים
      return;
    }

    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter(c => c !== color); // אם הצבע כבר נבחר, מסירים אותו
      } else {
        return [...prevColors, color]; // אם הצבע לא נבחר, מוסיפים אותו
      }
    });
  };
  //פונקציה ששלוטת במצב הצ'קבוקס
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckboxChecked(checked);

    // אם הצ'קבוקס מסומן, מנקה את כל הצבעים שנבחרו
    if (checked) {
      setSelectedColors([]); // מנקה את כל הצבעים
    }
  };
  return (
    <>
      <div className="container">
        <div className="column-1">
          {/* <h2>עמודה ראשית</h2> */}
          <p><img className="balloon-image" alt="Card" src={`http://localhost:3600${location.state.product.image_url} `}/></p>
          {/* <img src={`http://localhost:3600${product.image_url}`} alt="תצוגה" style={{ width: 150, marginTop: 10 }} /> */}
        </div>
        <div className="column-2">
          <div>
            <h1>{location.state.product.name}</h1>
            <h2>{location.state.product.price} ש"ח</h2>
        `   <div>{location.state.product.description}</div>

          </div>
          <div>  <div className="color-picker">
            <p>בחר צבעים:</p>
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
            <br />
            <div className="flex align-items-center" >

              <div className="flex align-items-center">
                <input
                  type="checkbox"
                  id="chooseColors"
                  onChange={handleCheckboxChange}
                  checked={isCheckboxChecked}
                />
                <label htmlFor="chooseColors" className="ml-2">
                  אני רוצה צבעים כמו בתמונה
                </label>
              </div>
            </div>
          </div></div>
          <div>
            <div>
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                min="1"
                placeholder="הכנס כמות"
              />
              <p>הכמות שנבחרה: {quantity || 0}</p>
            </div>
            <div className="card flex justify-content-center">
              טקסט להדפסה על הבלונים:
              <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
            </div>
            {/* <div>
              <input
                type="date"
                value={date}
                onChange={handleChange1}
                placeholder="בחר תאריך"
              />
              <p>התאריך שנבחר: {date || "לא נבחר תאריך"}</p>
            </div> */}
          </div>
          {/* תא 4 */}
          <div>
            <div className="card flex justify-content-center">
              <Button label="הוסף לסל" onClick={AddToCart} />
            </div></div>
        </div>
      </div>
      <div className="column-3">עמודה שלישית</div>



    </>
  );
};

export default Item;