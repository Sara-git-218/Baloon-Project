
import React, { useEffect } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
        

import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function Item() {
    const location = useLocation();
    return (
        <Splitter style={{ height: '800px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center"> <img alt="Card" src={location.state.product.image_url}/></SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">{location.state.product.name}</SplitterPanel>
        </Splitter>
    )
}