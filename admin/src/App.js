import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import NewHotel from "./pages/newHotel/NewHotel";
import List from "./pages/list/List";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import New from "./pages/new/New";
import { userInputs } from "./formSource";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const ProtectedRoute = (props) => {
    const {Component} = props
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return Component;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="login" element={<Login />}></Route>

          <Route
            path="hotels"
            element={<ProtectedRoute Component={<NewHotel />} />}
          ></Route>

          <Route
            path="users"
            element={
              <ProtectedRoute Component={<List columns={userColumns} />} />
            }
          >
          
          </Route>

          <Route
            path="new"
            element={
              <ProtectedRoute
                Component={<New inputs={userInputs} title={"Add New User"} />}
              />
            }
          >
           
          </Route>

          <Route
            path="new"
            element={
              <ProtectedRoute
                Component={<NewHotel />}
              />
            }
          >
           
          </Route> */}

          {/* <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route> */}


            <Route path="/login" element={<Login />}></Route>

            <Route
              path="/users"
              element={
                <ProtectedRoute Component={<List columns={userColumns} />} />
              }
            ></Route>

          <Route
            path="/new"
            element={
              <ProtectedRoute
                Component={<New inputs={userInputs} title={"Add New User"} />}
              />
            }
          >
           
          </Route>








            {/* <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
