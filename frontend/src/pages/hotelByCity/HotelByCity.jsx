import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

function HotelByCity() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels?city=${city}`
  );
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {loading ? (
              "Loading please wait "
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelByCity;
