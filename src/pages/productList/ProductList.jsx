import "./productList.css";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
// import axios from "axios"
import { DeleteOutlined, Edit } from "@mui/icons-material";
import supabase from "../../config/supabase";


export default function ProductList() {

  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null)
  
useEffect(()=>{
  const fetchUsers = async () => {
    const {data, error} = await supabase
    .from("products")
    .select()

    if(error) {
      setFetchError("could not fetch the Products")
      console.log(error);
    }if(data){
      setProducts(data)
      }
      }
      
      fetchUsers();
      },[])

      const deleteHandler = async (id) => {
        const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
      if(error){
        console.log(error)
      }else{
        setProducts(products.filter((item) => item.id !== id));
      }
      };
      
    


  return (
    <div className="productList">
      <tr className="productListUser">
      <input type="checkbox" id="checkbox"/>

      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="productId">ID</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td  className="products">Product</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="instock">Stock</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="productPrice">Price</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="productAction">Action</td>
    </tr> 
   {
    products ? ( products.map((product) => (
      <tr className="userListUserData">
      <input type="checkbox" />
      <span style={{marginRight: "10px"}}></span>
      <td className="productId">{product.id}</td>
      <img className="productListImg" src={product.productImg || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}/>
      <td  className="products">{product.title}</td>
       <span style={{marginRight: "-20px"}}></span>
      <td className="instock">{product.stock == "true" ? "inStock" : "out of stock"}</td>
       <span style={{marginRight: "10px"}}></span>
      <td className="productPrice">{product.price}</td>
       <span style={{marginRight: "10px"}}></span>
      <td className="productAction">
        <Link to={"/product/" + product.id}>
    <Edit style={{color: "blue", cursor: "pointer"}} />  
        </Link>
    <DeleteOutlined style={{color: "red", cursor: "pointer"}} onClick={() => deleteHandler(product.id)} />
      </td>
      </tr>  
    )) ) : <h1 className="error" >{fetchError}</h1>
   } 
     
    </div>
  );
}
