import React, { useEffect, useState } from "react";
import { addPerson } from "../features/people";
import { useSelector, useDispatch } from "react-redux";

export default function Popup({ person, onSave, onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState();

  useEffect(() => {
    if (person) {
      setName(person.name);
      setDepartment(person.department.toString());
    }
  }, [person]);

  const handleSave = () => {
    onSave({ id: person ? person.id : Math.random(), name, department });
  };
  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <h2></h2>
          <form onSubmit={handleSave}>
            <label>
              Name:
              <input
                required
                className="popup-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label className="dept-label">
              Department:
              <select
                required
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value={1}>IT</option>
                <option value={2}>Marketing</option>
              </select>
            </label>
            <div className="button-container">
              <button className="submit-btn" type="submit">
                {person ? "Save Changes" : "Add"}
              </button>
              <button className="close-btn" type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
