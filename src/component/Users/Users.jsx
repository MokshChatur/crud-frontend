import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  Edit,
  Delete,
  CreateNewUser,
  Image,
} from "../../store/userSlice";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ModalHeader, Modal } from "reactstrap";

function UsersData() {
  const [modal, setmodel] = useState(false);
  const [id, setId] = useState();
  const [allUser, setAllUser] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [catDesc, setcatDesc] = useState("");

  const [newmodal, setNewmodel] = useState(false);
  const [editTitle, seteditTitle] = useState("");
  const [editDesc, seteditDesc] = useState("");
  const [editCatDesc, seteditCatDesc] = useState("");
  const [currentPage, setCurrentPage] = useState();

  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.user);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const users = userlist?.userlistApiStatus?.body;
  const [userArray, setuserArray] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  const pages = currentPage / 5;

  // get user list
  useEffect(() => {
    dispatch(Users());
    setCurrentPage(0);
    setAllUser(users);
  }, []);


  useEffect(() => {
    if (sortedUsers.length > 0) {
      setuserArray(sortedUsers);
    }
  }, [sortedUsers]);

  const nextData = () => {
    setCurrentPage(currentPage + 5);

    console.log("nextData", JSON.stringify(currentPage));
    dispatch(
      Users({
        limit: 5,
        skip: currentPage,
      }),
      console.log("next", currentPage)
    );
  };

  const prevData = () => {
    setCurrentPage(currentPage - 5);
    dispatch(
      Users({
        limit: 5,
        skip: currentPage - 5,
      }),
      console.log("previous", currentPage)
    );
  };

  useEffect(() => {
    setuserArray(users);
  }, [users]);

  // search key
  const handleSearch = (text) => {
    let filterArr = users?.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    console.log("filterArr", filterArr[0]?.title);
    setuserArray(filterArr);
  };

  // create new users
  const CreateNew = () => {
    if (
      editTitle.length === 0 ||
      editDesc.length === 0 ||
      editCatDesc.length === 0
    ) {
      alert("Fill All Fields");
    } else {
      dispatch(
        CreateNewUser({
          id: id,
          title: editTitle,
          desc: editDesc,
          catDesc: editCatDesc,
          isLoggedin: true,
        })
      );
      // dispatch(Users());
      console.log("isLoggedin", isLoggedin);
      setNewmodel(false);
      setIsLoggedin(true);
    }
  };

  // update users
  const updateEntry = (id) => {
    setmodel(true);
    const tempData = users.filter((item) => {
      return item._id == id;
    });
    setAllUser(tempData);
  };

  // set users in edit tables
  useEffect(() => {
    if (modal == true && allUser !== undefined) {
      setTitle(allUser[0]?.title || title);
      setDesc(allUser[0]?.desc || desc);
      setcatDesc(allUser[0]?.catDesc || catDesc);
      setId(allUser[0]?._id);
    } else {
      console.log("Model is not open");
    }
  }, [modal]);

  //delete entry in table
  const deleteEntry = (id) => {
    dispatch(Delete({ id: id }));
    console.log("id", id);
    console.log("api deleated");
    dispatch(Users());
  };

  // update data Api
  const updateData = () => {
    dispatch(
      Edit({
        id: id,
        title: title,
        desc: desc,
        catDesc: catDesc,
      }),

      dispatch(Users()),
      console.log("first", updateData),
      console.log("Edit API is calling")
    );
  };

  return (
    <React.Fragment>
      <div className="background">

      <h2 className="app">CRUD APP</h2>
      <h3 className="users">Blog List is showing below:</h3>
      <div className="Container">
        <Modal isOpen={newmodal} toggle={() => setNewmodel(!newmodal)}>
          <ModalHeader>
            <div className="login-class">
              <h4 className="registration">Create a new Article</h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setNewmodel(false)}
              ></button>
            </div>
            <form className="create-form" onSubmit={CreateNew}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  className="form-control"
                  required={true}
                  placeholder="Enter Title"
                  onChange={(e) => seteditTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputfirstname">Description</label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  value={editDesc}
                  id="exampleInputfirstname"
                  placeholder="Enter Description"
                  onChange={(e) => seteditDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputfirstname">Category Description</label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  value={editCatDesc}
                  id="exampleInputfirstname"
                  placeholder="Enter Category Description"
                  onChange={(e) => seteditCatDesc(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-submit">
                save
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => setNewmodel(false)}
              >
                Cancel
              </button>
            </form>

          </ModalHeader>
        </Modal>
      </div>
      <div className="Container">
        <Modal isOpen={modal} toggle={() => setmodel(!modal)}>
          <ModalHeader>
            <div className="login-class">
              <h4 className="registration">Edit Article</h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setmodel(false)}
              ></button>
            </div>
            <form className="create-form">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  value={title}
                  className="form-control"
                  required={true}
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputfirstname">Description</label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  value={desc}
                  id="exampleInputfirstname"
                  placeholder="Enter Description"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputfirstname">Category Description</label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  value={catDesc}
                  id="exampleInputfirstname"
                  placeholder="Enter Category Description"
                  onChange={(e) => setcatDesc(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-submit"
                onClick={() => updateData()}
              >
                save
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => setmodel(false)}
              >
                Cancel
              </button>
            </form>
          </ModalHeader>
        </Modal>
      </div>
      <br />
      <div className="userlistt">
        <div>
          <input
            className="search"
            placeholder="Search..."
            onChange={(event) => handleSearch(event.target.value)}
          ></input>
          &nbsp; &nbsp; &nbsp; &nbsp;
          
          <button type="button" class="btn btn-primary" onClick={() => setNewmodel(true)}>Create new Article</button>

        </div>
        <br />
       
          
             <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  userArray?.map((user) => {
                    return (
                      <tr>
                        <td> {user.title}</td>
                        <td>{user.desc}</td>
                        <td>{user.catDesc}</td>

                        <td>
                          <Link to={``}>
                            <Button
                              onClick={() => {
                                updateEntry(user._id);
                              }}
                              variant="info"
                            >
                              Edit
                            </Button>
                          </Link>
                          &nbsp; &nbsp; &nbsp;
                          <Link to={``}>
                            <Button
                              onClick={() => deleteEntry(user._id)}
                              variant="info"
                            >
                              Delete
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              </Table>

        <div className="buttons">
          {currentPage == 0 ? (
            ""
          ) : (
            <Link to={``} className="previous">
              <Button
                onClick={() => {
                  console.log("currentpage", currentPage);
                  prevData();
                }}
                variant="info"
              >
                Previous
              </Button>
            </Link>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {
            pages ? <p className="pages">{pages}</p> : null
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          {users?.length == [] || users?.length != 5 ? (
            ""
          ) : (
            <div className="next-btn">
              <Link to={``}>
                <Button
                  variant="info"
                  className=""
                  onClick={() => {
                    console.log("nextpage", currentPage);
                    nextData();
                  }}
                >
                  Next
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      </div>
    </React.Fragment>
  );
}

export default UsersData;
