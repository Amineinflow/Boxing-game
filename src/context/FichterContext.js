import { createContext, useState } from "react";

const FighterContext = createContext({});

//10.0.2.2 instead  of localhost for react native
const API_URL = "http://10.0.2.2:8000";
const PATH = API_URL + "/fighter";

export const FighterProvider = ({ children }) => {
  const [Fighters, setFighters] = useState([]);
  const [Fighter, setFighter] = useState({});

  /********* get single one by id ********* */
  const getFighter = async (id) => {
    const response = await fetch(`${PATH}/${id.toString()}`);

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const data = await response.json();
    if (!data) {
      console.log(`Fighter with id ${id} not found!!!`);
      return;
    }

    setFighter(data);
  };

  /****** get all ******* */
  const getFighters = async () => {
    const response = await fetch(`${PATH}`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const data = await response.json();
    console.log("getfighters called");
    setFighters(data);
  };

  /****** add ******* */
  const addNewFighter = async (newFighter) => {
    await fetch(`${PATH}/fighter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFighter),
    }).catch((error) => {
      console.log(error);
      return;
    });
  };

  /****** Edir ******* */
  const editFighter = async (editedFighter) => {
    await fetch(`${PATH}/${editedFighter._id}`, {
      method: "PATCH",
      body: JSON.stringify(editedFighter),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /****** Delete ******* */
  const deleteFighter = async (id) => {
    await fetch(`${PATH}/${id}`, {
      method: "DELETE",
    });

    const newFighters = Fighters.filter((el) => el._id !== id);
    setFighters(newFighters);
  };

  /****** sreach by name ******* */
  const searchFighterByName = async (name) => {
    const response = await fetch(`${PATH}/search/${name}`);

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.log(message);
      return;
    }

    const data = await response.json();
    if (!data) {
      console.log(`no results!!!`);
      return;
    }

    setFighters(data);
  };

  return (
    <FighterContext.Provider
      value={{
        addNewFighter,
        getFighters,
        getFighter,
        editFighter,
        searchFighterByName,
        Fighters,
        Fighter,
      }}
    >
      {children}
    </FighterContext.Provider>
  );
};
export default FighterContext;
