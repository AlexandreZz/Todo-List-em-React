import React from "react";
import Input from "./components/Input";
import "./App.css";
import trash from "./image/trash.png";

const AppTodoList = () => {
  const [tarefa, setTarefa] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [norepeat, setNorepeat] = React.useState(false);
  const [important, setImportant] = React.useState([]);

  const refec = React.useRef("");
  const refButton = React.useRef("");

  React.useEffect(
    () => {
      onkeypress = function(event) {
        if (event.key === "Enter") {
          refButton.current.focus();
        }
      };
    },
    [refButton]
  );

  const handleChange = ({ target }) => {
    if (target.value !== "") setError(null);
    setTarefa(target.value);
  };

  const handleClick = () => {
    setError(null);
    if (tarefa === "") setError("Tarefa vazia não pode ser adicionado!");

    if (tarefa !== "" && norepeat === false) {
      setItems([...items, tarefa]);
      setNorepeat(false);
    }

    items &&
      items.filter(item => {
        if (item === tarefa) {
          setError("Não é permitido item repetido!");
          setNorepeat(true);
          setItems([...items, items.splice(items.length, 1)]);
        }
        setNorepeat(false);
      });
    document.getElementById("tarefa").focus();
  };

  const handleDelete = ({ target }) => {
    const targetID = target.getAttribute("id");
    const parentComplet = target.parentElement.parentElement;

    // Remove o item clickado
    items.splice(items.indexOf(targetID), 1);
    for (const itemLenght of items) if (itemLenght === 0) items.splice("", 1);

    parentComplet.innerHTML = "";
    parentComplet.removeAttribute("class");
    parentComplet.removeAttribute("style");
  };

  const handleClickImportant = ({ target }) => {
    const targetID = target.getAttribute("id");
    const parentComplet = target.parentElement.parentElement;
    const storage = JSON.parse(localStorage.getItem("importantList"));

    if (storage === null) {
      localStorage.setItem(
        "importantList",
        JSON.stringify([...important, targetID])
      );
    } else {
      localStorage.setItem(
        "importantList",
        JSON.stringify([...storage, targetID])
      );
    }
    setImportant([...important, targetID]);
    parentComplet.innerHTML = "";
    parentComplet.removeAttribute("class");
    parentComplet.removeAttribute("style");
  };

  const handleDeleteImportant = ({ target }) => {
    const targetID = target.getAttribute("id");
    const storage = JSON.parse(localStorage.getItem("importantList"));
    const newList = [];

    storage.forEach(element => {
      if (element !== targetID) {
        newList.push(element);
      }
      localStorage.setItem("importantList", JSON.stringify(newList));
    });

    document.getElementById("tarefa").focus();
    document.getElementById("tarefa").value = "";
  };

  const renderImportant = () => {
    return (
      JSON.parse(localStorage.getItem("importantList")) &&
      JSON.parse(localStorage.getItem("importantList")).map((item, index) => {
        return (
          <div
            key={index}
            className="listTd listImport"
            style={{ padding: "10px 0", textAlign: "left" }}
          >
            <li>
              <p>
                {item}
                {console.log(item)}
              </p>
              <img className="trash" width={30} src={trash} alt={trash} />
              <button
                className="delet"
                id={item}
                onClick={handleDeleteImportant}
              />
            </li>
          </div>
        );
      })
    );
  };

  return (
    <section>
      <div className="container">
        <h1 className="titulo">Adicionar tarefas</h1>
        <Input
          type="text"
          name="tarefa"
          id="tarefa"
          label="Tarefa:"
          value={tarefa}
          onChange={handleChange}
          error={error}
        />
        <button className="AddItem" onClick={handleClick} ref={refButton}>
          Adicionar
        </button>
      </div>

      <div className="flex">
        {(JSON.parse(localStorage.getItem("importantList")) &&
          JSON.parse(localStorage.getItem("importantList")).length === 0) ||
        JSON.parse(localStorage.getItem("importantList")) === null
          ? ""
          : <div className="important">
              <h1
                style={{
                  padding: "15px 0 0 0",
                  borderBottom: "1px solid #82996e",
                  marginBottom: "20px"
                }}
              >
                Lista Importantes
              </h1>
              <ul>
                {renderImportant()}
              </ul>
            </div>}

        <div className="listItem">
          <h2
            style={{
              padding: "15px 0 0 0",
              borderBottom: "1px solid #fb1",
              marginBottom: "20px"
            }}
          >
            Listas
          </h2>
          <ul>
            {items &&
              items.map((item, index) => {
                if (item.length > 0) {
                  return (
                    <div
                      key={index}
                      style={{ padding: "10px 0", textAlign: "left" }}
                      ref={refec}
                      className="listTd"
                    >
                      <li>
                        <p>
                          {item}
                        </p>
                        <img
                          className="trash"
                          width={30}
                          src={trash}
                          alt={trash}
                        />
                        <button
                          className="delet"
                          id={item}
                          onClick={handleDelete}
                        />
                        <button
                          className="importantItem"
                          id={item}
                          onClick={handleClickImportant}
                        />
                      </li>
                    </div>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AppTodoList;
