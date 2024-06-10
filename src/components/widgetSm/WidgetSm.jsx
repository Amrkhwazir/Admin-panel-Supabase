import { Visibility } from "@mui/icons-material";
import "./widgetSm.css";
import { useEffect, useState } from "react";
import supabase from "../../config/supabase";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
     
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
    getUsers();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user.id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
             
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
             
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
      {fetchError && "Something went wrong data not showed"}
    </div>
  );
}
