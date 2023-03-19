import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { ReactComponent as Logout } from "../../../assets/logout.svg";
import { ToastContainer } from 'react-toastify';
import {
  CircularProgress,
  Grid,
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
import { ProductCart } from "../ProductDetail";
import Demo from "./Demo";
import RaitingDoughnut from "./RaitingDoughnut";
import ProductTable from "./ProductTable";

export default function Profile({isAdmin}) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState();
  const [ratedCourse, setRatedCourse] = useState();
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const price = formData.get('price')
    const tag = formData.get('tag')
    const img = formData.get('img')
    const shortDescription = formData.get('shortDescription')
    const description = formData.get('description')
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

  useEffect(() => {
    axios.get('https://asem-backend.vercel.app/api/user', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setUsers(res.data)
    })
    .catch((e) => {
      console.log(e);
    })
  }, [])

  useEffect(() => {
    axios.get(`https://asem-backend.vercel.app/api/product`)
      .then((response) => {
        setProducts(response.data.rows)
        const mostViewedProduct = response.data.rows.reduce((prev, current) => {
          return (prev.views > current.views) ? prev : current;
        })
        const mostRatedProduct = response.data.rows.reduce((prev, current) => {
          return (prev.rating * 20 > current.rating * 20) ? prev : current;
        })
        setCourse(mostViewedProduct);
        setRatedCourse(mostRatedProduct)
        localStorage.setItem('views', mostViewedProduct.views || 100)
        localStorage.setItem('rating', mostViewedProduct.rating * 20 || 100)
        setIsLoading(false)
      });
  }, []);

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="profile">
        <TabContext value={value}>
          <Box sx={{".MuiTabs-indicator": {backgroundColor: '#349E5B'}}}>
            <TabList variant="scrollable" style={{color: '#349E5B'}} onChange={(e, value)=>setValue(value)}>
              <Tab label="Create product" value={0} />
              <Tab label="Order product" value={1} />
              <Tab label="Statistics" value={2} />
            </TabList>
          </Box>
          <TabPanel value={0}>
            <form onSubmit={handleSubmit} className="profile__creating">
              <TextField
                error={isError}
                label="Name"
                name="name"
                variant="standard"
              />
              <TextField
                error={isError}
                type="number"
                label="Price"
                name="price"
                variant="standard"
              />
              <TextField
                error={isError}
                name="tag"
                label="Tag"
                variant="standard"
              />
              <TextField
                error={isError}
                name="img"
                label="Image"
                variant="standard"
              />
              <TextField
                error={isError}
                name="shortDescription"
                multiline
                rows={3}
                label="Short Description"
                variant="standard"
              />
              <TextField
                error={isError}
                name="description"
                multiline
                rows={5}
                label="Description"
                variant="standard"
              />
              <Button>
                Create
              </Button>
            </form>
          </TabPanel>
          <TabPanel style={{padding: "24px 0"}} value={1}>
            <Box borderBottom={1} paddingBottom={1}>
              <h4>Users</h4>
              {
                users.length && users?.map(user =>
                  <Grid marginBottom={4} justifyContent="space-between" rowGap={1} container>
                  <Grid item xs={2}>
                    <TextField 
                      type='text' 
                      label="id"
                      defaultValue={user.id}
                      variant='outlined'
                      color="success"
                      focused
                      inputProps={
                        { readOnly: true }
                      }
                    />
                  </Grid>
                  <Grid item xs={9.9}>
                    <TextField 
                      type='text' 
                      label="email"
                      defaultValue={user.email}
                      variant='outlined'
                      color="success"
                      focused
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                  <Grid item xs={5.9}>
                    <TextField 
                      type='text' 
                      label="fullname"
                      defaultValue={user.full_name}
                      variant='outlined'
                      color="success"
                      focused
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>  
                  <Grid item xs={5.9}>
                    <TextField 
                      type='text' 
                      label="role"
                      defaultValue={user.role}
                      variant='outlined'
                      color="success"
                      focused
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                </Grid>
                )
              }               
            </Box>
            <Box borderBottom={1} paddingBottom={1}>
            {/* <h4>Products</h4>
            <ProductTable products={products} /> */}
            </Box>
          </TabPanel>
          <TabPanel value={2}>
            {
              isLoading ? 
                <CircularProgress />
              :
              <>
                <h3>Most viewed</h3>
                <ProductCart {...course} />
                <Demo />
                <h3 style={{marginTop: 20}}>Most rated</h3>
                <ProductCart {...ratedCourse} />
                <div className="RaitingDoughnut">
                  <div className="rating">{course?.rating}</div>
                  <RaitingDoughnut />
                </div>
              </>
            }
          </TabPanel>
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
