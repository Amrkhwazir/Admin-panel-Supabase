import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect, useMemo, useState } from "react";
import supabase from "../../config/supabase";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const [fetchError, setFetchError] = useState(null);


  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
     
      const {data, error} = await supabase
    .from("clients")
    .select()

    if(error) {
      setFetchError("could not fetch the users")
      console.log(error);
    }if(data){

      data.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { months: MONTHS[item.id - 1], "Active_User": data.length },
        ])
      );
      }
       
        
    
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">  
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active_User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
