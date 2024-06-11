import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
// import { productData } from "../../dummyData";

import { useEffect, useMemo, useState } from "react";
import { Publish } from "@mui/icons-material";
import supabase from "../../config/supabase";


export default function Product() {
  const [pStats, setPStats] = useState([]);
  const [title, setTitle] = useState("")
  const [disc, setDisc] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState(null)
  const [formError, setFormError] = useState(null)
  const [qty, setQty] = useState(null)
  const [productImg, setProductImg] = useState("")
  const {productId} = useParams();
const navigate = useNavigate()

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
     
      setPStats((prev) => [
        ...prev,
        { name: MONTHS[productId], Sales: price*qty },
      ])
     
    };
    getStats();
  }, [productId, MONTHS]);

  useEffect(() => {

    const fetchClient = async () => {
      const {data, error} = await supabase
      .from("products")
      .select()
      .eq('id', productId)
      .single()
      if(error){
        setFormError(error)
        console.log(error);
      }if(data){
        setTitle(data.title)
        setDisc(data.disc)
        setPrice(data.price)
        setStock(data.stock)
        setQty(data.qty)
        setProductImg(data.productImg)
      }
    }
    fetchClient();
  }, [productId, navigate])

  const updateHandler = async (e) => {
    e.preventDefault();
    if(!title || !disc || !stock || !price){
      return setFormError("Kindly fill all the fields")
      
          }
          
          const {data, error} = await supabase
          .from("products")
          .update({title, disc, stock, price})
          .eq('id', productId)
          .select()
      
          if(error){
            console.log(error)
            setFormError(error)
      
          }if(data){
            console.log(data);
            // navigate("/products")
            
          }
  }
  

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={productImg ? productImg : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="productInfoImg" />
            <span className="productName">{title ? title : "Apple 8s"}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{stock == "true" ? "InStock" : "out of Stock"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={updateHandler}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Product Description</label>
            <input type="text" placeholder={disc} onChange={(e) => setDisc(e.target.value)}/>
            <label>Price</label>
            <input type="text" placeholder={price} onChange={(e) => setPrice(e.target.value)}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={(e) => setStock(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={productImg ? productImg : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
        {formError && "Something Wennt Wrong Data not showed"}
      </div>
    </div>
  );
}

