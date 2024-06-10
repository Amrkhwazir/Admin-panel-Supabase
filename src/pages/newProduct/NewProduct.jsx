// import { useState } from "react";
import { useState } from "react";
import "./newProduct.css";
import supabase from "../../config/supabase";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  
  const [title, setTitle] = useState("")
  const [disc, setDisc] = useState("")
  const [cat, setCat] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState(null)
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()

    if(!title || !disc || !cat || !price || !stock){
      setFormError("All Feild required to be fill")
      return
  }

  const {data, error} = await supabase
  .from("products").
  insert([{title,disc,cat,price,stock}])
  .select()

  if(error){
    console.log(error)
    setFormError(error)

  }if(data){
    console.log(data);
    navigate("/")
    
  }
   

}

  return (
    <div className="newProduct">
      
      <form className="addProductForm" onSubmit={handleClick}>
      <h1 className="addProductTitle">Add  New   Product</h1>
       
        <div className="inputContainer">

        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={(e) => setDisc(e.target.value)}
          />
        </div>
        </div>
        <div className="inputContainer">
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={(e) => setCat(e.target.value)} />
        </div>
        </div>
        <div className="inputContainer">
        </div>
        <div className="inputContainer"> 
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={(e) => setStock(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
          />
        </div>
        </div>
        <button className="addProductButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
