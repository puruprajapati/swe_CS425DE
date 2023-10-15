import React, { useContext } from "react";
import Header from "../components/Header";
import Default from "../assets/img/profile.png";
import { AuthContext } from "context/AuthContext";
import PropertyItem from "components/PropertyItem";
import { useAxios } from "api/useAxios";
import Loading from "../components/Loading";
import moment from "moment";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, execute } = useAxios("get", "/users/rental-history");

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="image-container">
          <img src={Default} alt="default profile" className="default image" />
        </div>
        <div>
          <h3 className="name">
            {user.firstName} {user.lastName}
          </h3>
          <h3 className="email">{user.email}</h3>
        </div>
        <hr />
        <h3 className="title">Rent History</h3>
        {data?.data.length > 0 ? (
          data.data.map((item) => {
            return (
              <div className="rent-list">
                <div className="item">
                  <PropertyItem key={123123} property={item.property} />
                </div>

                <div className="description">
                  <div>
                    Rented period: {moment(item.startDate).format("MM-DD-YYYY")}{" "}
                    to {moment(item.endDate).format("MM-DD-YYYY")}
                  </div>
                  <div> Total price: ${item.transactionAmount}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h3>You haven't rented any property yet!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
