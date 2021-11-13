import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Moment from "moment";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
function App() {
    Moment.locale("tr");
    //create todo list
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem("todos"))
            ? JSON.parse(localStorage.getItem("todos"))
            : []
    );
    // array for todo status
    const status = ["todo", "inProgress", "completed"];
    // change next statu func
    const changeStatuNextHandler = (toWhat) => {
        const index = status.indexOf(toWhat); // statu index from array
        // a list for checked items
        const checkedItems = todoList.filter(
            (item) => item.statu === status[index - 1] && item.selected === true
        );
        // list for unchecked items
        const unCheckedItems = todoList.filter(
            (item) => item.selected === false
        );
        const changeLocalStorage = () => {
            // change statu checked items
            checkedItems.forEach((item) => {
                item.selected = false;
                item.statu = toWhat;
                unCheckedItems.push(item);
            });
            setTodoList(unCheckedItems);
            localStorage.setItem("todos", JSON.stringify(unCheckedItems));
        };
        if (checkedItems.length > 0 && toWhat === "inProgress") {
            changeLocalStorage();
        } else if (checkedItems.length > 0 && toWhat === "completed") {
            changeLocalStorage();
        }
    };
    // change to prev statu func
    const changeStatuPrevHandler = (toWhat) => {
        const index = status.indexOf(toWhat);
        const changeLocalStorage = () => {
            checkedItems.forEach((item) => {
                item.selected = false;
                item.statu = toWhat;
                unCheckedItems.push(item);
            });
            setTodoList(unCheckedItems);
            localStorage.setItem("todos", JSON.stringify(unCheckedItems));
        };
        // eslint-disable-next-line array-callback-return
        const checkedItems = todoList.filter((item) => {
            if (item.statu === status[index + 1] && item.selected === true) {
                return item;
            }
        });
        const unCheckedItems = todoList.filter(
            (item) => item.selected === false
        );
        if (checkedItems.length > 0 && toWhat === "todo") {
            changeLocalStorage();
        } else if (checkedItems.length > 0 && toWhat === "inProgress") {
            changeLocalStorage();
        }
    };
    return (
        <Box className="container">
            <Typography variant="h2" mb={4}>
                Todos
            </Typography>
            <TodoInput todoList={todoList} setTodoList={setTodoList} />
            <Box
                sx={{ flexGrow: 1 }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                sx={{
                    width: 1000,
                    height: 400,
                    display: "flex",
                }}
            >
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                    }}
                    columns={{ xs: 4, sm: 16, md: 16 }}
                >
                    <Grid item xs={4} sm={4} md={4}>
                        <TodoList
                            todoList={todoList}
                            setTodoList={setTodoList}
                            statu="todo"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => changeStatuNextHandler("inProgress")}
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => changeStatuPrevHandler("todo")}
                        >
                            &lt;
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <TodoList
                            todoList={todoList}
                            setTodoList={setTodoList}
                            statu="inProgress"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => changeStatuNextHandler("completed")}
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => changeStatuPrevHandler("inProgress")}
                        >
                            &lt;
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <TodoList
                            todoList={todoList}
                            setTodoList={setTodoList}
                            statu="completed"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default App;
