import { useSelector, useDispatch } from "react-redux";
import { addPerson, deletePerson, editPerson } from "./features/people";
import React, { useState } from "react";
import Table from "./components/Table";
import Filter from "./components/Filter";
import Popup from "./components/Popup";

export default function App() {
  const dispatch = useDispatch();
  const peopleList = useSelector((state) => state.people.value);

  const [filter, setFilter] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleFilterChange = (name, department) => {
    setFilter({
      name: name.toLowerCase(),
      department: department !== "" ? parseInt(department) : "",
    });
  };

  const applyFilter = (peopleList, filter) => {
    return peopleList.filter((person) => {
      const matchesName = filter.name
        ? person.name.toLowerCase().includes(filter.name)
        : true;
      const matchesDepartment =
        filter.department !== ""
          ? person.department === filter.department
          : true;
      return matchesName && matchesDepartment;
    });
  };

  const handleSearch = () => {};

  const handleAddPerson = () => {
    setSelectedPerson(null);
    setShowPopup(true);
  };

  const handleEditPerson = (person) => {
    setSelectedPerson(person);
    setShowPopup(true);
  };

  const handleDeletePerson = (person) => {
    dispatch(deletePerson({ id: person.id }));
    console.log(peopleList);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPerson(null);
  };

  const savePerson = (person) => {
    const { id, name, department } = person;

    if (selectedPerson) {
      dispatch(editPerson({ id, name, department }));
    } else {
      dispatch(
        addPerson({
          id: crypto.randomUUID(), // or id: peopleList[peopleList.length - 1].id + 1,
          name,
          department: parseInt(department),
        })
      );
    }

    setShowPopup(false);
    setSelectedPerson(null);
    console.log(peopleList);
  };

  return (
    <>
      <div className="people-app">
        <div className="app-container">
          <div className="title">
            <h1>People App</h1>
          </div>
          <div className="divider"></div>
          <div className="main-container">
            <Filter
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
            <Table
              people={applyFilter(peopleList, filter)}
              onEditPerson={handleEditPerson}
              onDeletePerson={handleDeletePerson}
            />
            <button onClick={handleAddPerson}>Add Person</button>
            {showPopup && (
              <Popup
                person={selectedPerson}
                onSave={savePerson}
                onClose={closePopup}
              />
            )}
            <footer className="footer"></footer>
          </div>
        </div>
      </div>
    </>
  );
}
