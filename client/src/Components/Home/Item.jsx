
// import React, { useEffect } from 'react'; 
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
 import {useLocation} from 'react-router-dom';


// export default function Item(props) {
//     const location = useLocation();

//     debugger
//     //alert(props)
//     console.log(location.state);
//     const header = (
//         <img alt="Card" src={location.state.product.image_url}/>
//     );
//     const footer = (
//         <>
//             <Button label="Save" icon="pi pi-check" />
//             <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
//         </>
//     );
// useEffect(()=>{
// console.log("aaaaaaaaaaa",location.state.product);
// },[])

//     return (
//         <div className="card flex justify-content-center">
        
//             <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-25rem" >
             
           
//                 <p className="m-0">
                    
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
//                     numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
//                 </p>
//             </Card>
//         </div>
//     )
// }
        

// import { Splitter, SplitterPanel } from 'primereact/splitter';

// export default function Item() {
//     const location = useLocation();
//     return (
//         // <Splitter style={{ height: '100%',width:'100%' }}>
//         //     <SplitterPanel className="flex align-items-center justify-content-center"> <img alt="Card" src={location.state.product.image_url}/></SplitterPanel>
//         //     <SplitterPanel className="flex align-items-center justify-content-center">{location.state.product.name}</SplitterPanel>
//         // </Splitter>
//         <>
//         <img  src={location.state.product.image_url}/>
//         <div>
           
//         </div>nj   \xws
//         </>
//     )
// }

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
        // <div>
        //   <h4>הצבעים שנבחרו:</h4>
        //   <div className="selected-colors">
        //     {selectedColors.map((color, index) => (
        //       <div
        //         key={index}
        //         className="selected-color"
        //         style={{ backgroundColor: color }}
        //       >
        //         {color}
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )}
      <div className="flex align-items-center" >
                <Checkbox  style={{textAlign:"center"}} inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
                <label htmlFor="ingredient1" className="ml-2" >אני רוצה צבעים כמו בתמונה    </label>
            </div>
    </div></div>
        <div>תא 2</div>
        <div>תא 3</div>
      </div>
    </div>



    {/* <div className="grid-container">
    <div className="grid-item"><img className="balloon-image"alt="Card" src={location.state.product.image_url}/></div>
    <div className="grid-item">     <div className="color-picker">
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
        // <div>
        //   <h4>הצבעים שנבחרו:</h4>
        //   <div className="selected-colors">
        //     {selectedColors.map((color, index) => (
        //       <div
        //         key={index}
        //         className="selected-color"
        //         style={{ backgroundColor: color }}
        //       >
        //         {color}
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )}
    </div></div>
    <div className="grid-item">חלק 3</div>
    <div className="grid-item">חלק 4</div>
  </div> */}



    </>
  );
};

export default Item;



// import { useState } from "react";
// import "./Item.css";

// export default function BalloonProductPage() {
//   const [color, setColor] = useState("red");
//   const [customText, setCustomText] = useState("");
//   const location = useLocation();
//   return (
//     <div className="container">
//       <div className="card">
//         <img
//           src={location.state.product.image_url}
//           alt="Balloon"
//           className="balloon-image"
//         />
//         <select value={color} onChange={(e) => setColor(e.target.value)} className="select-box">
//           <option value="red">אדום</option>
//           <option value="blue">כחול</option>
//           <option value="green">ירוק</option>
//           <option value="pink">ורוד</option>
//         </select>
//         <input
//           type="text"
//           placeholder="הוסף כיתוב אישי..."
//           value={customText}
//           onChange={(e) => setCustomText(e.target.value)}
//           className="input-box"
//         />
//         <button className="order-button">הוסף להזמנה</button>
//       </div>
//     </div>
//   );
// }