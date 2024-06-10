import "./userList.css";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
// import axios from "axios"
import { DeleteOutlined, Edit } from "@mui/icons-material";
import supabase from "../../config/supabase";

export default function UserList() {

  const [fetchError, setFetchError] = useState(null);
  const [users, setUsers] = useState(null)
  
useEffect(()=>{
  const fetchUsers = async () => {
    const {data, error} = await supabase
    .from("clients")
    .select()

    if(error) {
      setFetchError("could not fetch the users")
      console.log(error);
    }if(data){
      setUsers(data)
      }
      }
      
      fetchUsers();
      },[])

  const deleteHandler = async (id) => {
    const { error } = await supabase
  .from('clients')
  .delete()
  .eq('id', id)

  if(error){
    console.log(error)
  }else{
    setUsers(users.filter((item) => item.id !== id));
  }
  };
  

  return (
    <div className="userList">
      <tr className="userListUser">
      <input type="checkbox" id="checkbox"/>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="userId">ID</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td  className="userName">User</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>

      <td className="userEmail">Email</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>

      <td className="userStatus">Status</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>

      <td className="userTransiction">Transiction</td>
      <span style={{height: "15px", border: "1px solid gray", marginRight: "10px", opacity: 0.5}}></span>
      <td className="userAction">Action</td>
    </tr> 
   {
    users ? ( users.map((user) => (
      <tr className="userListUserData" key={user.id}>
      <input type="checkbox" />
      <span style={{marginRight: "10px"}}></span>
      <td className="userId">{user.id}</td>
      <img className="userListImg" src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} />
      <td  className="userName">{user.username}</td>
       <span style={{marginRight: "-20px"}}></span>
      <td className="userEmail">{user.email}</td>
       <span style={{marginRight: "10px"}}></span>
      <td className="userStatus">{user.status == "yes" ? ("Active") : ("No Active")}</td>
       <span style={{marginRight: "10px"}}></span>
      <td className="userTransiction">${user.transiction}</td>
       <span style={{marginRight: "10px"}}></span>
      <td className="userAction">
        <Link to={"/user/" + user.id}>
    <Edit style={{color: "blue", cursor: "pointer"}} />  
        </Link>
    <DeleteOutlined style={{color: "red", cursor: "pointer"}} onClick={() => deleteHandler(user.id)} />
      </td>
      </tr>  
    )) ) : <h1 className="error" >{fetchError}</h1>
   } 
    </div>
  );
}
