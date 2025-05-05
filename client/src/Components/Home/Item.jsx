


// import { useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
// import axios from 'axios'
// import { useSelector } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import './Item.css';

// const Item = () => {
//   const location = useLocation();
//   const token = useSelector(state => state.Token.tokenstr);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
//   const [quantity, setQuantity] = useState("1");
//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     if (newValue === "" || (!isNaN(newValue) && Number(newValue) >= 1)) {
//       setQuantity(newValue);
//     }
//   };

//   const [fontOptions, setFontOptions] = useState([]);
//   const [selectedFont, setSelectedFont] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3600/api/fonts')
//       .then(res => setFontOptions(res.data))
//       .catch(err => console.error(err));
//   }, []);


//   const [value, setValue] = useState('');
//   const [date, setDate] = useState("");
//   const handleChange1 = (event) => {
//     setDate(event.target.value);
//   };

//   const user = useSelector(state => state.User.user);

//   const itemInCart = {
//     user_id: user ? user._id : null,
//     readyDesign_id: location.state.product._id,
//     cnt: quantity,
//     isDefaultColors: isCheckboxChecked,
//     colorsIfNotDefault: selectedColors,
//     CaptionContent: value,
//    ...(selectedFont ? { captionType: selectedFont } : {}) 
//   }

//   const AddToCart = async () => {
//     if (!user) {
//       alert("התחבר לאתר")
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:3600/api/itemInCart/createItemInCart', itemInCart, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       })
//       if (res.status == 200) {
//         alert("נוסף בהצלחה!")
//       }
//     }
//     catch (e) {
//       console.log(e)
//     }
//   }

//   const [ingredients, setIngredients] = useState([]);

//   const onIngredientsChange = (e) => {
//     let _ingredients = [...ingredients];

//     if (e.checked)
//       _ingredients.push(e.value);
//     else
//       _ingredients.splice(_ingredients.indexOf(e.value), 1);

//     setIngredients(_ingredients);
//   }



//   const colors = [
//     '#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080',
//     '#DC143C', '#00FFFF', '#FF00FF', '#8A2BE2', '#A52A2A',
//     '#7FFF00', '#D2691E', '#FF1493', '#00BFFF', '#696969',
//     '#228B22', '#FF4500', '#2E8B57', '#FFD700', '#808080',
//     '#6A5ACD', '#B8860B'
//   ];

//   const toggleColorSelection = (color) => {
//     if (isCheckboxChecked) {
//       return;
//     }

//     setSelectedColors((prevColors) => {
//       if (prevColors.includes(color)) {
//         return prevColors.filter(c => c !== color);
//       } else {
//         return [...prevColors, color];
//       }
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const checked = e.target.checked;
//     setIsCheckboxChecked(checked);

//     if (checked) {
//       setSelectedColors([]);
//     }
//   };

//   return (
//     <>
//       {/* <div className="container">
//         <div className="column-1">
//           <div className="balloon-image-container">
//             <img className="balloon-image" alt="Card" src={`http://localhost:3600${location.state.product.image_url}`} />
//           </div>
//         </div>
//         <div className="column-2">
//           <div>
//             <h1>{location.state.product.name}</h1>
//             <h2>{location.state.product.price} ש"ח</h2>
//             <div>{location.state.product.description}</div>
//           </div>
//           <div>
//             <div className="color-picker">
//               <p>בחר צבעים:</p>
//               <div className="color-circles">
//                 {colors.map((color, index) => (
//                   <div
//                     key={index}
//                     className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
//                     style={{ backgroundColor: color }}
//                     onClick={() => toggleColorSelection(color)}
//                   >
//                     {selectedColors.includes(color) && (
//                       <span className="checkmark">✔</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <br />
//             <div className="flex align-items-center">
//               <input
//                 type="checkbox"
//                 id="chooseColors"
//                 onChange={handleCheckboxChange}
//                 checked={isCheckboxChecked}
//               />
//               <label htmlFor="chooseColors" className="ml-2">
//                 אני רוצה צבעים כמו בתמונה
//               </label>
//             </div>
//           </div>
//           <div>
//             <div>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={handleChange}
//                 min="1"
//                 placeholder="הכנס כמות"
//               />
//               <p>הכמות שנבחרה: {quantity || 0}</p>
//             </div>
//             <div className="card flex justify-content-center">
//               טקסט להדפסה על הבלונים:
//               <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
//             </div>
//           </div>
//           <div>
//             <div className="card flex justify-content-center">
//               <Button label="הוסף לסל" onClick={AddToCart} />
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className="item-page">
//         <div className="container">
//           <div className="column-1">
//             <div className="balloon-image-container">
//               <img
//                 className="balloon-image"
//                 alt="Product"
//                 src={`http://localhost:3600${location.state.product.image_url}`}
//               />
//             </div>
//           </div>
//           <div className="column-2">
//             <div className="content-container">
//               <div>
//                 <h1>{location.state.product.name}</h1>
//                 <h2>{location.state.product.price} ש"ח</h2>
//                 <p>{location.state.product.description}</p>
//               </div>
//               <div className="color-picker">
//                 <p>בחר צבעים:</p>
//                 <div className="color-circles">
//                   {colors.map((color, index) => (
//                     <div
//                       key={index}
//                       className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
//                       style={{ backgroundColor: color }}
//                       onClick={() => toggleColorSelection(color)}
//                     >
//                       {selectedColors.includes(color) && <span className="checkmark">✔</span>}
//                     </div>
//                   ))}
//                 </div>
//                 {selectedColors.length > 0 && <></>}
//                 <div className="flex align-items-center">
//                   <input
//                     type="checkbox"
//                     id="chooseColors"
//                     onChange={handleCheckboxChange}
//                     checked={isCheckboxChecked}
//                   />
//                   <label htmlFor="chooseColors" className="ml-2">
//                     אני רוצה צבעים כמו בתמונה
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={handleChange}
//                   min="1"
//                   placeholder="הכנס כמות"
//                 />
//                 <p>הכמות שנבחרה: {quantity || 0}</p>
//               </div>
//               <div className="card flex justify-content-center">
//                 <p>טקסט להדפסה על הבלונים:</p>
//                 <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} style={{ fontFamily: selectedFont }}/>
//               </div>
//               <div className="font-selector">
//                 <label>בחר סגנון כתב:</label>
//                 <select
//                   value={selectedFont}
//                   onChange={(e) => setSelectedFont(e.target.value)}
//                   className="p-inputtext"
//                 >
//                   <option value="">ברירת מחדל</option>
//                   {fontOptions.map((font, idx) => (
//                     <option key={idx} value={font} style={{ fontFamily: font }}>
//                       {font}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="card flex justify-content-center">
//                 <Button label="הוסף לסל" onClick={AddToCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Item;

// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
// // import Dialog from 'primereact/dialog';

// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import './Item.css';

// const Item = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = useSelector(state => state.Token.tokenstr);
//   const user = useSelector(state => state.User.user);

//   const [selectedColors, setSelectedColors] = useState([]);
//   const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
//   const [quantity, setQuantity] = useState("1");
//   const [value, setValue] = useState('');
//   const [selectedFont, setSelectedFont] = useState('');
//   const [fontOptions, setFontOptions] = useState([]);
//   const [showLoginMessage, setShowLoginMessage] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:3600/api/fonts')
//       .then(res => setFontOptions(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     if (newValue === "" || (!isNaN(newValue) && Number(newValue) >= 1)) {
//       setQuantity(newValue);
//     }
//   };

//   const itemInCart = {
//     user_id: user ? user._id : null,
//     readyDesign_id: location.state.product._id,
//     cnt: quantity,
//     isDefaultColors: isCheckboxChecked,
//     colorsIfNotDefault: selectedColors,
//     CaptionContent: value,
//     ...(selectedFont ? { captionType: selectedFont } : {})
//   };

//   const AddToCart = async () => {
//     if (!user) {
//       setShowLoginMessage(true);
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:3600/api/itemInCart/createItemInCart', itemInCart, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       });
//       if (res.status === 200) {
//         alert("נוסף בהצלחה!");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const colors = [
//     '#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080',
//     '#DC143C', '#00FFFF', '#FF00FF', '#8A2BE2', '#A52A2A',
//     '#7FFF00', '#D2691E', '#FF1493', '#00BFFF', '#696969',
//     '#228B22', '#FF4500', '#2E8B57', '#FFD700', '#808080',
//     '#6A5ACD', '#B8860B'
//   ];

//   const toggleColorSelection = (color) => {
//     if (isCheckboxChecked) return;
//     setSelectedColors((prevColors) =>
//       prevColors.includes(color)
//         ? prevColors.filter(c => c !== color)
//         : [...prevColors, color]
//     );
//   };

//   const handleCheckboxChange = (e) => {
//     const checked = e.target.checked;
//     setIsCheckboxChecked(checked);
//     if (checked) setSelectedColors([]);
//   };

//   return (
//     <>
//       <Dialog
//         header="דרוש התחברות"
//         visible={showLoginMessage}
//         style={{ width: '350px' }}
//         onHide={() => setShowLoginMessage(false)}
//         footer={
//           <div className="flex justify-content-center gap-2">
//             <Button label="התחבר" onClick={() => navigate('/Login', { state: { returnTo: location.pathname } })} />
//             <Button label="הירשם" severity="secondary" onClick={() => navigate('/Register', { state: { returnTo: location.pathname } })} />
//           </div>
//         }
//       >
//         <p>עליך להתחבר או להירשם כדי להוסיף מוצרים לסל.</p>
//       </Dialog>

//       <div className="item-page">
//         <div className="container">
//           <div className="column-1">
//             <div className="balloon-image-container">
//               <img
//                 className="balloon-image"
//                 alt="Product"
//                 src={`http://localhost:3600${location.state.product.image_url}`}
//               />
//             </div>
//           </div>
//           <div className="column-2">
//             <div className="content-container">
//               <div>
//                 <h1>{location.state.product.name}</h1>
//                 <h2>{location.state.product.price} ש"ח</h2>
//                 <p>{location.state.product.description}</p>
//               </div>
//               <div className="color-picker">
//                 <p>בחר צבעים:</p>
//                 <div className="color-circles">
//                   {colors.map((color, index) => (
//                     <div
//                       key={index}
//                       className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
//                       style={{ backgroundColor: color }}
//                       onClick={() => toggleColorSelection(color)}
//                     >
//                       {selectedColors.includes(color) && <span className="checkmark">✔</span>}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex align-items-center">
//                   <input
//                     type="checkbox"
//                     id="chooseColors"
//                     onChange={handleCheckboxChange}
//                     checked={isCheckboxChecked}
//                   />
//                   <label htmlFor="chooseColors" className="ml-2">
//                     אני רוצה צבעים כמו בתמונה
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={handleChange}
//                   min="1"
//                   placeholder="הכנס כמות"
//                 />
//                 <p>הכמות שנבחרה: {quantity || 0}</p>
//               </div>
//               <div className="card flex justify-content-center">
//                 <p>טקסט להדפסה על הבלונים:</p>
//                 <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} style={{ fontFamily: selectedFont }} />
//               </div>
//               <div className="font-selector">
//                 <label>בחר סגנון כתב:</label>
//                 <select
//                   value={selectedFont}
//                   onChange={(e) => setSelectedFont(e.target.value)}
//                   className="p-inputtext"
//                 >
//                   <option value="">ברירת מחדל</option>
//                   {fontOptions.map((font, idx) => (
//                     <option key={idx} value={font} style={{ fontFamily: font }}>
//                       {font}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="card flex justify-content-center">
//                 <Button label="הוסף לסל" onClick={AddToCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Item;


import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import './Item.css';

const Item = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector(state => state.Token.tokenstr);
  const user = useSelector(state => state.User.user);

  const [selectedColors, setSelectedColors] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [value, setValue] = useState('');
  const [selectedFont, setSelectedFont] = useState('');
  const [fontOptions, setFontOptions] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3600/api/fonts')
      .then(res => setFontOptions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "" || (!isNaN(newValue) && Number(newValue) >= 1)) {
      setQuantity(newValue);
    }
  };

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <h2>לא נמצא מוצר להצגה. חזרי לעמוד הבית.</h2>
        <Button label="חזרה לחנות" onClick={() => navigate('/')} className="mt-3" />
      </div>
    );
  }

  const itemInCart = {
    user_id: user ? user._id : null,
    readyDesign_id: product._id,
    cnt: quantity,
    isDefaultColors: isCheckboxChecked,
    colorsIfNotDefault: selectedColors,
    CaptionContent: value,
    ...(selectedFont ? { captionType: selectedFont } : {})
  };

  const AddToCart = async () => {
    if (!user) {
      setShowLoginMessage(true);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3600/api/itemInCart/createItemInCart', itemInCart, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (res.status === 200) {
        alert("נוסף בהצלחה!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const colors = [
    '#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080',
    '#DC143C', '#00FFFF', '#FF00FF', '#8A2BE2', '#A52A2A',
    '#7FFF00', '#D2691E', '#FF1493', '#00BFFF', '#696969',
    '#228B22', '#FF4500', '#2E8B57', '#FFD700', '#808080',
    '#6A5ACD', '#B8860B'
  ];

  const toggleColorSelection = (color) => {
    if (isCheckboxChecked) return;
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckboxChecked(checked);
    if (checked) setSelectedColors([]);
  };

  return (
    <>
      <Dialog
        header="דרוש התחברות"
        visible={showLoginMessage}
        style={{ width: '350px' }}
        onHide={() => setShowLoginMessage(false)}
        footer={
          <div className="flex justify-content-center gap-2">
            <Button label="התחבר" onClick={() => navigate('/Login', { state: { returnTo: { pathname: '/Item', state: { product } } } })} />
            <Button label="הירשם" severity="secondary" onClick={() => navigate('/Register', { state: { returnTo: { pathname: '/Item', state: { product } } } })} />
          </div>
        }
      >
        <p>עליך להתחבר או להירשם כדי להוסיף מוצרים לסל.</p>
      </Dialog>

      <div className="item-page">
        <div className="container">
          <div className="column-1">
            <div className="balloon-image-container">
              <img
                className="balloon-image"
                alt="Product"
                src={`http://localhost:3600${product.image_url}`}
              />
            </div>
          </div>
          <div className="column-2">
            <div className="content-container">
              <div>
                <h1>{product.name}</h1>
                <h2>{product.price} ש"ח</h2>
                <p>{product.description}</p>
              </div>
              <div className="color-picker">
                <p>בחר צבעים:</p>
                <div className="color-circles">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => toggleColorSelection(color)}
                    >
                      {selectedColors.includes(color) && <span className="checkmark">✔</span>}
                    </div>
                  ))}
                </div>
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
                <p>טקסט להדפסה על הבלונים:</p>
                <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} style={{ fontFamily: selectedFont }} />
              </div>
              <div className="font-selector">
                <label>בחר סגנון כתב:</label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="p-inputtext"
                >
                  <option value="">ברירת מחדל</option>
                  {fontOptions.map((font, idx) => (
                    <option key={idx} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
              <div className="card flex justify-content-center">
                <Button label="הוסף לסל" onClick={AddToCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
