import "./featuredInfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import supabase from "../../config/supabase";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getIncome = async () => {
  
      const {data, error} = await supabase
      .from("products")
      .select()
  
      if(error) {
        setFetchError("could not fetch the users")
        console.log(error);
      }if(data){
        setIncome(data)
    }};
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.price * income[0]?.qty}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(10)}{" "}
            {20 < 10 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
          {income[0]?.price * income[0]?.qty}
          </span>
          <span className="featuredMoneyRate">
          {10 < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
          {0 < 10 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
