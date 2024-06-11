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
  const [qty, setQty] = useState(null)
  const [stock, setStock] = useState(null)
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()


  const avatarFile = async (e) => {

    const file = e.target.files[0]

    console.log(file);

    
  const { data, error } = await supabase
  .storage
  .from('productImages')
  .upload('avatar.png', file)

  if(error){
    console.log(error)
    setFormError(error)

  }if(data){
    console.log(data);
    setFile(file)
    // navigate("/")
    
  }}



  const handleClick = async (e) => {
    e.preventDefault()

    if(!title || !disc || !cat || !price || !stock || qty){
      setFormError("All Feild required to be fill")
      return
  }

    
  const {data, error} = await supabase
  .from("products")
  .insert([{title,disc,cat,price,stock}])
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
            placeholder="Quantity"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
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
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={(e) => setCat(e.target.value)} />
        </div>
        </div>
        <div className="inputContainer">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={avatarFile}
          />
        </div>
        <button className="addProductButton" type="submit">
          Create
        </button>
        </div>
      </form>
    </div>
  );
}
