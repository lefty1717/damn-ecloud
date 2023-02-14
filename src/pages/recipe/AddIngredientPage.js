import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Button from "@mui/material/Button";
import { db } from "../../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { doc, deleteDoc } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CATEGORIES = [
  { id: 1, name: "肉類" },
  { id: 2, name: "豆類" },
  { id: 3, name: "魚類" },
  { id: 4, name: "蔬菜類" },
  { id: 5, name: "穀物類" },
  { id: 6, name: "水果類" },
  { id: 7, name: "奶類" },
];
const AddIngredientPage = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [recordId, setRecordId] = React.useState("");
  const [deleted, setDeleted] = useState(0);
  const [add, setAdd] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setRecordId(id);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "ingredients"), {
      name: name,
      category: category,
    });
    setAdd(add + 1);
    console.log("new ingredient:", docRef.id);
  };

  console.log(name);
  console.log(category);
  console.log(recordId);

  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);

  useEffect(() => {
    async function readData() {
      const querySnapshot = await getDocs(collection(db, "ingredients"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(temp);
      setIngredients([...temp]);
    }
    console.log(ingredients);
    readData();
  }, [db, deleted, add]);

  const deleteData = async function (id) {
    try {
      await deleteDoc(doc(db, "ingredients", id));
      setOpen(false);
      setDeleted(deleted + 1);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={handleChangeName}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
          >
            {CATEGORIES.map(({ id, name }) => (
              <MenuItem value={name} key={id} sx={{display:'block'}}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
        >
          新增食材
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>名稱</TableCell>
              <TableCell align="left">類型</TableCell>
              <TableCell align="left">刪除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow
                key={ingredient.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ingredient.name}
                </TableCell>
                <TableCell align="left">{ingredient.category}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleClickOpen(ingredient?.id)}>
                    <CloseIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"確定刪除？"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                一經刪除將無法復原!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>否</Button>
              <Button onClick={() => deleteData(recordId)} autoFocus>
                是
              </Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddIngredientPage;
