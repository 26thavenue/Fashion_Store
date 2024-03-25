import React,{useState, useEffect} from 'react'
import ProductCard from '../components/ProductCard'


const Products = () => {
  const [loading,setLoading] = useState(false)
  const [products,setProducts] = useState([])

  useEffect(() => {
    setLoading(true)
    getAllProducts()
    setLoading(false)

  },[])

  const getAllProducts = async() => {
    const products = await fetch(`http:localhost:6300/api/products`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    if(!products){
      setProducts([])
      return
    }
    setProducts(products)

    return products
  }

  return (
    <>
    {
      loading ? <h1>Loading...</h1> : 
      (
        <div className="w-full grid grid-cols-3 px-12 py-6">
        {products?.map(product =>(
          <ProductCard key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl}/>
        ))}
        </div>
      )
    }
    </>
  )
    
}

export default Products