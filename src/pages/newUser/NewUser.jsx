import { useState } from "react";
import "./newUser.css";
import supabase from "../../config/supabase"
import { useNavigate } from "react-router-dom";

export default function NewUser() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState(null)
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState("")
  const [transiction, setTransiction] = useState(null)
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()


  const handleClick = async (e) => {
    e.preventDefault()


    if(!username || !email || !password || !phone || !address || !status || !transiction){
return setFormError("Kindly fill all the fields")

    }
    
    const {data, error} = await supabase
    .from("clients")
    .insert([{username, email, password, phone, address, status, transiction}])
    .select()

    if(error){
      console.log(error)
      setFormError(error)

    }if(data){
      console.log(data);
      navigate("/users")
    }
     
console.log(formError);
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleClick}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="number" placeholder="+1 123 456 78" onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Transiction</label>
          <input type="number" placeholder="$1200" onChange={(e) => setTransiction(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" onChange={(e) => setStatus(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            accept="png,jpeg,jpg"
          />
        </div>
        <button className="newUserButton" type="submit">Create</button>
      </form>
    </div>
  );
}
