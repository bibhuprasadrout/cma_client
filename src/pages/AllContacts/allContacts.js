import { useContext, useEffect, useState } from "react";
import useToast from "../../customHooks/useToast";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AllContacts = () => {
  const nav = useNavigate();
  const { updateContact, setUpdateContact } = useContext(AuthContext);
  const [openAccordian, setOpenAccordian] = useState(null);
  const [toastProps, setToastProps] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const toggleAccordian = (id) => {
    setOpenAccordian((prevId) => {
      return prevId === id ? null : id;
    });
  };
  const fetchContactList = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/mycontacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setAllContacts(result.contacts);
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } catch (err) {
      setToastProps(["error", err, 2000]);
    }
  };
  const fetchSingleContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        console.log(result, "contact single");
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } catch (err) {
      setToastProps(["error", err, 2000]);
    }
  };
  useEffect(() => {
    fetchContactList();
  }, []);
  const fetchDeleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        fetchContactList();
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } catch (err) {
      setToastProps(["error", err, 2000]);
    }
  };
  const Toast = useToast(() => toastProps);
  return (
    <>
      <div>
        {Toast}
        {allContacts.map((contact) => {
          return (
            <>
              <div
                className="accordion"
                id="accordionExample"
                onClick={() => {
                  toggleAccordian(contact._id);
                  fetchSingleContact(contact._id.toString());
                }}
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${contact._id}`}
                      // aria-expanded="true"
                      // aria-controls={contact._id}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5 className="card-title mx-3">
                        {contact?.name.charAt(0).toUpperCase() +
                          contact?.name.slice(1).toLowerCase()}
                      </h5>
                      <p className="mb-0" style={{ fontSize: "1.1rem" }}>
                        {contact?.phone}
                      </p>
                    </button>
                  </h2>
                  <div
                    id={contact._id}
                    className={`accordion-collapse collapse ${
                      openAccordian === contact._id ? "show" : ""
                    }`}
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                    style={{}}
                  >
                    <div class="accordion-body">
                      <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                          <div className="d-flex gap-3">
                            <h4 className="card-title">
                              {/* {contact?.name.charAt(0).toUpperCase() +
                                contact?.name.slice(1).toLowerCase()} */}
                            </h4>
                            <div className="ms-auto"></div>
                            <div className="ms-1">
                              <Link
                                to={"/create-contact"}
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                onClick={() => {
                                  if (openAccordian === contact._id)
                                    setUpdateContact(contact);
                                }}
                              >
                                Edit
                              </Link>
                            </div>
                            <div className="">
                              <Link
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                onClick={() => {
                                  if (openAccordian === contact._id)
                                    fetchDeleteContact(contact._id.toString());
                                }}
                              >
                                Delete
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex gap-3">
                            {/* <p className="mb-1">
                              <span style={{ opacity: 0.7, fontWeight: "500" }}>
                                Phone:
                              </span>{" "}
                              {contact?.phone}
                            </p> */}
                            <p className="mb-1">
                              <span style={{ opacity: 0.7, fontWeight: "500" }}>
                                Email:
                              </span>{" "}
                              {contact?.email}
                            </p>
                          </div>
                          <p className="card-text">
                            <span style={{ opacity: 0.7, fontWeight: "500" }}>
                              Address:
                            </span>{" "}
                            {contact?.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllContacts;
