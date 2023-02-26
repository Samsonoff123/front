import React, { useState } from "react";
import Header from "../../Header";
import { ReactComponent as Logout } from "../../../assets/logout.svg";
import { ToastContainer } from 'react-toastify';
import {
  TextField,
} from "@mui/material";
import Button from '../../Button'
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Box from '@mui/material/Box';
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile({isAdmin}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState("");
  const [img, setImg] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.location.reload();
  };

  const handleSubmit = () => {
    if (
      name === "" ||
      price === 0 ||
      tag === "" ||
      img === "" ||
      shortDescription === "" ||
      description === ""
    ) {
      setIsError(true);
    } else {
      axios
        .post(
          "https://asem-backend.vercel.app/api/product/",
          {
            name,
            price,
            tag,
            img,
            shortDescription: { text: shortDescription },
            description: { text: description },
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toast.success("Продукт создан!", {
            position: "top-center",
            autoClose: 1000,
          });
          setName('')
          setPrice(0)
          setTag('')
          setImg('')
          setShortDescription('')
          setDescription('')
          
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ошибка!", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    }
  };

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="profile">
        <TabContext value={value}>
          <Box sx={{".MuiTabs-indicator": {backgroundColor: '#349E5B'}}}>
            <TabList style={{color: '#349E5B'}} onChange={(e, value)=>setValue(value)}>
              <Tab label="Create product" value={0} />
              <Tab label="Order product" value={1} />
              <Tab label="Statistics" value={2} />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <div className="profile__creating">
              <TextField
                error={isError}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsError(false);
                }}
                label="Name"
                variant="standard"
              />
              <TextField
                error={isError}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setIsError(false);
                }}
                type="number"
                label="Price"
                variant="standard"
              />
              <TextField
                error={isError}
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                  setIsError(false);
                }}
                label="Tag"
                variant="standard"
              />
              <TextField
                error={isError}
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                  setIsError(false);
                }}
                label="Image"
                variant="standard"
              />
              <TextField
                error={isError}
                value={shortDescription}
                onChange={(e) => {
                  setShortDescription(e.target.value);
                  setIsError(false);
                }}
                multiline
                rows={3}
                label="Short Description"
                variant="standard"
              />
              <TextField
                error={isError}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsError(false);
                }}
                multiline
                rows={5}
                label="Description"
                variant="standard"
              />
              <Button onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={1}>TabPanel2</TabPanel>
          <TabPanel value={2}>TabPanel3</TabPanel>
        </TabContext>
        <div className="exit">
          <span>Exit</span>
          <Logout
            onClick={handleLogout}
            style={{ cursor: "pointer", width: 50, height: 50, fill: "black" }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
