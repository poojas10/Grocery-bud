import React,{ useState, useEffect } from 'react'
import UserInput from "./UserInput";
export const AppContext = React.createContext()

function App() {
  const [list, setList] = useState([]);
  const [userInput, setInput] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [itemIndex, setIndex] = useState(0);
  const [alert, setAlert] = useState({ message: null, class: "" });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("list"));
    if (data) {
      setList(data);
    } else {
      localStorage.setItem("list", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(() => {
        return { message: null, class: "" };
      });
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);
  function displayAlert(message, stylingClass) {
    setAlert(() => {
      return { message: message, class: stylingClass };
    });
  }
  // localStorage.clear()
  function displayList(e) {
    e.preventDefault();
    if (userInput.trim().length !== 0) {
      setList((prev) => {
        return [...prev, userInput];
      });
      setInput("");
      localStorage.setItem("list", JSON.stringify([...list, userInput]));
    }
    !userInput || userInput.trim().length === 0
      ? displayAlert("please enter a value", "value-discarded")
      : displayAlert("item added", "value-added");
  }
  function edit(i) {
    setEdit(true);
    const itemIndex = list.findIndex((el, j) => j === i);
    setIndex(itemIndex);
    setInput(list[itemIndex]);
  }
  function changeIngridients(e) {
    e.preventDefault();
    const editedItems = list.map((e, i) => (itemIndex === i ? userInput : e));
    setList(editedItems);
    setInput("");
    setEdit(false);
    displayAlert("value changed", "value-added");
    localStorage.setItem("list", JSON.stringify(editedItems));
  }
  function deleteItem(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  }
  return (
   <AppContext.Provider value={{isEdit,setInput,userInput,displayList,edit,changeIngridients,deleteItem,list,setList}}>      <UserInput/>
   </AppContext.Provider>
  );
}

export default App;
