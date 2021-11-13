import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import Moment from "moment";
import TodoDialog from "./TodoDialog";
function TodoList({ todoList, setTodoList, statu }) {
    Moment.locale("tr");
    // styles
    let txtColor;
    let color;
    if (statu === "todo") {
        color = "primary";
        txtColor = { color: `${color}.main` };
    } else if (statu === "inProgress") {
        color = "warning";
        txtColor = { color: `${color}.main` };
    } else if (statu === "completed") {
        color = "success";
        txtColor = { color: `${color}.main` };
    }
    // delete todo
    const deleteBtnHandler = (item) => {
        const newList = todoList.filter((todo) => todo !== item);
        setTodoList(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
    };
    // todo edit dialog things
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = (item, list) => {
        // eslint-disable-next-line no-undef
        const index = list.indexOf(item); // todo item's index
        list[index].value = item.value;
        list[index].date = new Date();
        list[index].selected = item.selected;
        list[index].statu = item.statu;
        console.log(index);
        setTodoList([...list]);
        setDialogOpen(false);
    };
    return (
        <List
            subheader={<ListSubheader sx={txtColor}>{statu}</ListSubheader>}
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                height: 300,
                maxHeight: 300,
            }}
        >
            {todoList
                .filter((todo) => todo.statu === statu) // filter todo list by statu
                .map((item, index) => {
                    return (
                        <ListItem disablePadding key={index}>
                            <ToggleButton
                                value="check"
                                selected={item.selected}
                                color={color}
                                // eslint-disable-next-line no-sequences
                                sx={
                                    (txtColor,
                                    {
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                    })
                                }
                                fullWidth={true}
                                onChange={() => {
                                    const index = todoList.indexOf(item); // todo item's index
                                    todoList[index].selected =
                                        !todoList[index].selected; // change selected prop
                                    setTodoList([...todoList]);
                                }}
                            >
                                <Tooltip title={item.value}>
                                    <Typography
                                        variant="body2"
                                        sx={txtColor}
                                        gutterBottom
                                    >
                                        {item.value}
                                    </Typography>
                                </Tooltip>
                                <Typography
                                    variant="caption"
                                    sx={txtColor}
                                    gutterBottom
                                >
                                    {Moment(item.date).format("LT")}
                                </Typography>
                            </ToggleButton>
                            <IconButton
                                aria-label="edit"
                                color="warning"
                                onClick={handleClickOpen}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => deleteBtnHandler(item)}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                            <TodoDialog
                                dialogOpen={dialogOpen}
                                handleClose={handleClose}
                                todoList={todoList}
                                item={item}
                            />
                        </ListItem>
                    );
                })}
        </List>
    );
}

export default TodoList;
