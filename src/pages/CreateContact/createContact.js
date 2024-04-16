import { useContext, useEffect, useState } from "react";
import useToast from "../../customHooks/useToast";
import AuthContext from "../../context/AuthContext";
import { SERVER_URL } from "../../config/constants";

const CreateContact = () => {
  const { updateContact, setUpdateContact } = useContext(AuthContext);
  const [toastProps, setToastProps] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    setContactDetails({
      name: updateContact.name,
      address: updateContact.address,
      email: updateContact.email,
      phone: updateContact.phone,
    });
  }, []);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setContactDetails({
      ...contactDetails,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!updateContact._id) {
      const res = await fetch(`${SERVER_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(contactDetails),
      });
      const result = await res.json();
      if (!result.error) {
        setToastProps(["success", "Contact added successfully", 2000]);
        setContactDetails({ name: "", address: "", email: "", phone: "" });
      } else {
        setToastProps(["error", result.error, 2000]);
      }
    } else {
      fetchUpdatedContact(updateContact._id);
    }
  };
  const fetchUpdatedContact = async (id) => {
    try {
      const updatedCotactDetails = { id, ...contactDetails };
      const res = await fetch(`${SERVER_URL}/api/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedCotactDetails),
      });
      const result = await res.json();
      if (!result.error) {
        setToastProps(["success", "Contact added successfully", 2000]);
        setUpdateContact({});
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Create new contact</legend>
            <div className="form-group">
              <label htmlFor="createContactName" className="form-label mt-4">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="createContactName"
                autoComplete="off"
                value={contactDetails.name}
                onChange={handleInput}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="createContactAddress" className="form-label mt-4">
                Address
              </label>
              <textarea
                name="address"
                className="form-control"
                id="createContactAddress"
                rows="3"
                autoComplete="off"
                value={contactDetails.address}
                onChange={handleInput}
                placeholder="Enter address here"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="createContactEmail" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="createContactEmail"
                autoComplete="off"
                value={contactDetails.email}
                onChange={handleInput}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="createContactPhone" className="form-label mt-4">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                className="form-control"
                autoComplete="off"
                id="createContactPhone"
                value={contactDetails.phone}
                onChange={handleInput}
                placeholder="Enter phone"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "fit-content",
                  margin: "1rem auto",
                }}
              >
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
export default CreateContact;
