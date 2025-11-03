import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function Details() {

    const [product,SetProduct]=useState({})
    const {id}=useParams()

    const GetData=async()=>{
        let res=await fetch(`http://localhost:7070/${id}`)
        let data=await res.json()
        SetProduct(data)
    }
    useEffect(()=>{GetData()},[])
  return (
    <div>Details of {id}

    <div>
        {product.title}
    </div>
    <img src={product.image} alt="" />
    <p>{product.description}</p>
    </div>
  )
}

export default Details