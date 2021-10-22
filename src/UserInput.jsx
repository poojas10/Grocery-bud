import React,{useContext} from "react";
import "./App.css";
import { AppContext } from "./App";


export default function UserInput() {
    const context = useContext(AppContext)
  return (
  <Items context={context} />
  );
}

function Items({context}){
 return (
    <section className="section">
    <h2 className="title">Grocery Bud</h2>
    <h2 className={`alert ${alert.class}`}>{alert.message}</h2>
    <form action="" onSubmit={context.isEdit ? context.changeIngridients : context.displayList}>
      <input
        onChange={(e) => {
          context.setInput(e.target.value);
        }}
        name="input"
        value={context.userInput}
        placeholder="eg. eggs"
        id="user-input"
      ></input>
      <button className="submit-btn">{context.isEdit ? "Edit" : "Submit"}</button>
    </form>
    <div className="item-list">
      {context.list.length >= 0 &&
        context.list.map((e, i) => {
          return (
            <div className="grocery-item" key={Math.random()}>
              <p className="item-name">{e}</p>
              <div className="btn-list">
                <button
                  className="edit"
                  onClick={() => {
                    context.edit(i);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    context.deleteItem(i);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
    {context.list.length >= 1 && (
      <button
        className="clear-all"
        onClick={() => {
          context.setList([]);
          localStorage.clear();
        }}
      >
        clear all
      </button>
    )}
  </section>
 )   
}
