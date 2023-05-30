import React from "react";
import { deletePerson } from "../features/people";
import { useDispatch } from "react-redux";

export default function Table({ people, onEditPerson, onDeletePerson }) {
  return (
    <>
      <table className="people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.department === 1 ? "IT" : "Marketing"}</td>
              <td>
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "edit") {
                      onEditPerson(person);
                    } else if (action === "delete") {
                      onDeletePerson(person);
                    }
                  }}
                >
                  <option value="">Actions</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
