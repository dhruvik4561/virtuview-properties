import List from "../../components/list/List";
import Bookings from "../../components/bookings/Bookings";
import PropertyBookings from "../../components/propertyBookings/PropertyBookings";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="profileHeader">
        <div className="headerContent">
          <div className="userInfo">
            <div className="avatarContainer">
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="Profile" />
              <Link to="/profile/update" className="editAvatar">
                <img src="/edit.png" alt="Edit" />
              </Link>
            </div>
            <div className="userDetails">
              <h1>{currentUser.username}</h1>
              <p>{currentUser.email}</p>
              <p className="userType">Account Type: {currentUser.userType}</p>
            </div>
          </div>
          <div className="headerActions">
            <Link to="/profile/update" className="updateBtn">
              Edit Profile
            </Link>
            <button onClick={handleLogout} className="logoutBtn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="profileContent">
        <div className="mainContent">
          {currentUser.userType === "seller" && (
            <>
              <div className="section">
                <div className="sectionHeader">
                  <h2>My Properties</h2>
                  <Link to="/add" className="addBtn">
                    Create New Post
                  </Link>
                </div>
                <div className="sectionContent">
                  <Suspense fallback={<div className="loading">Loading properties...</div>}>
                    <Await
                      resolve={data.postResponse}
                      errorElement={<div className="error">Error loading properties!</div>}
                    >
                      {(postResponse) => {
                        const { userPosts } = postResponse.data;
                        return (
                          <>
                            {userPosts.length === 0 ? (
                              <div className="emptyState">
                                <p>You haven't created any properties yet.</p>
                                <Link to="/add" className="createBtn">
                                  Create Your First Property
                                </Link>
                              </div>
                            ) : (
                              <List posts={userPosts} />
                            )}
                          </>
                        );
                      }}
                    </Await>
                  </Suspense>
                </div>
              </div>

              <div className="section">
                <div className="sectionHeader">
                  <h2>Property Booking Requests</h2>
                </div>
                <div className="sectionContent">
                  <PropertyBookings />
                </div>
              </div>
            </>
          )}

          <div className="sideBySideSections">
            <div className="section">
              <div className="sectionHeader">
                <h2>Saved Properties</h2>
              </div>
              <div className="sectionContent">
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  <Await
                    resolve={data.postResponse}
                    errorElement={<div className="error">Error loading posts!</div>}
                  >
                    {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                  </Await>
                </Suspense>
              </div>
            </div>

            {currentUser.userType === "buyer" && (
              <div className="section">
                <div className="sectionHeader">
                  <h2>My Bookings</h2>
                </div>
                <div className="sectionContent">
                  <Bookings />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
