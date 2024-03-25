import React,{useState, useEffect} from 'react'
import ProductCard from '../components/ProductCard'


const Men = () => {
  const [loading,setLoading] = useState(false)
  const [products,setProducts] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllMenProducts();
      setProducts(data);
      console.log({'data': data});
      console.log(products)
       setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

const getAllMenProducts = async () => {
  try {
    const response = await fetch('http://localhost:6300/api/products/men');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Propagate the error to the caller
  }
};

 
  return (
    <>
    <p className='font-bold text-center mt-6 mb-3 text-xl'>Check Out Our Men's Product </p>
    {
      loading ? <h1>Loading...</h1> : 
      (
        <div className="w-full grid grid-cols-3 px-12 py-6 gap-6 space-y-3  ">
        { !loading && products.length > 0  ? 
        (products.map(product =>(
          <ProductCard product={product} key={product.id} id={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl}/>
        ))) : 'No product found'}
        </div>
      )
    }
    </>
  )
    
}

export default Men