import { useEffect, useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
 function Books() {
  const [products,setProducts]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const  chunk= (array, size) =>{
    return array.reduce((acc, _, index) => {
      if (index % size === 0) {
        acc.push(array.slice(index, index + size));
      }
      return acc;
    }, []);
  }
  return (
    <>
      <div className="container mt-20">
        <Link to={'/commande'}>Make command</Link>
    {chunk(products, 4).map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center space-x-8">
        {row.map((product, index) => (
          <Card
            key={index}
            product={product}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    ))}
  </div>
    </>
  )
}

export default Books