import React, { useState } from 'react'
import Productpopup from './Productpopup';

const Card = (props) => {
    const [product , setProduct]=useState(props.product)
    const [isOpen,setIsOpen] = useState(false)
    const handlepopup = ()=>{
        setIsOpen(!isOpen);
    }
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mb-7">
        <img src="images.jpg" alt={product.title} className="w-full" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className="text-gray-700 text-base">{product.price}$</p>
        </div>
        <div className="px-6 py-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={handlepopup}>
            View details
          </button>
        </div>
        {isOpen && <Productpopup product={product} onClose={handlepopup}/>}
      </div>
    );
  };

export default Card