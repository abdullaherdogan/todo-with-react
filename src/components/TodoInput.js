import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
function TodoInput({ todoList, setTodoList }) {
    const todoInputDom = document.querySelector("#Input");
    const [open, setOpen] = React.useState(false); // for blank alert
    const [todo, setTodo] = useState({
        // todo's default values
        value: "",
        selected: false,
        statu: "todo",
        date: new Date(),
    });
    const addBtnHandler = () => {
        if (todo.value === "") {
            setOpen(true);
        } else {
            setTodo((prevState) => ({ ...prevState, date: new Date() }));
            setTodoList([...todoList, todo]);
            todoInputDom.value = "";
            localStorage.setItem("todos", JSON.stringify([...todoList]));
        }
    };
    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    width: "30%",
                    justifyContent: "space-between",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 2 }}
                    placeholder="Add a Todo"
                    id="Input"
                    onChange={(e) =>
                        setTodo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                        }))
                    }
                />
                <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="Add a Todo"
                    onClick={addBtnHandler}
                >
                    <AddIcon />
                </IconButton>
            </Paper>
            <Box sx={{ width: "30%" }}>
                <Collapse in={open}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="error"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Please enter a todo text
                    </Alert>
                </Collapse>
            </Box>
        </>
    );
}

export default TodoInput;
