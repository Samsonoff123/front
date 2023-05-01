import React, { useEffect, useState } from "react";
import Header from "../../Header";
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
import Demo from "./Demo";
import RaitingDoughnut from "./RaitingDoughnut";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFlip } from "swiper";
import Product from "../../Product";
import "swiper/css/effect-flip";
import { NoData } from "../../NoData";

export default function Profile({isAdmin}) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState();
  const [ratedCourse, setRatedCourse] = useState();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
          "https://umka-diplom-samsonoff123.vercel.app/api/product/",
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
    axios.get('https://umka-diplom-samsonoff123.vercel.app/api/user', {
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
    axios.get(`https://umka-diplom-samsonoff123.vercel.app/api/product`)
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

  useEffect(() => {
    axios.get('https://umka-diplom-samsonoff123.vercel.app/api/order', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setOrders(res.data)
    })
    .catch((e) => {
      console.log(e);
    })
  }, [])

  const handleRemoveOrder = (id) => {
    axios.delete(`https://umka-diplom-samsonoff123.vercel.app/api/order/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })        
      .then((res) => {
        toast.success("Заказ удален!", {
          position: "top-center",
          autoClose: 1000,
        });  
        setOrders(res.data)
      })
  }

  const handleSubmitOrder = (id) => {
    handleRemoveOrder(id)
  }

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="profile">
        <TabContext value={value}>
          <Box sx={{".MuiTabs-indicator": {backgroundColor: '#483F98'}}}>
            <TabList variant="scrollable" style={{color: '#483F98', backgroundColor: '#fff', borderRadius: 25}} onChange={(e, value)=>setValue(value)}>
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
            <Box className="profile__users" borderBottom={1} paddingBottom={1}>
              <h4>Orders</h4>
              {
                !!orders.length && orders?.map((order) =>
                  <>
                    <Box display='flex' mt={2} mb={1} gap='10px'>
                      <TextField 
                        type='text' 
                        label="first_name"
                        defaultValue={order.user.first_name}
                        variant='outlined'
                        inputProps={
                          { readOnly: true }
                        }
                      />
                      <TextField 
                        type='text' 
                        label="last_name"
                        defaultValue={order.user.last_name}
                        variant='outlined'
                        inputProps={
                          { readOnly: true }
                        }
                      />
                    </Box>
                    <Box display='flex' mb={1} gap='10px'>
                      <TextField 
                        type='text' 
                        label="email"
                        defaultValue={order.user.email}
                        variant='outlined'
                        inputProps={
                          { readOnly: true }
                        }
                      />
                      <TextField 
                        type='text' 
                        label="birthday"
                        defaultValue={order.user.birthday}
                        variant='outlined'
                        inputProps={
                          { readOnly: true }
                        }
                      />
                    </Box>
                    <Box display='flex' flexWrap='wrap' gap='10px' borderBottom='1px solid white' pb={1}>
                      {
                        order.products.map(product => 
                          <Product product={product} />
                        )
                      }
                      <Box display='flex' width='100%' justifyContent='space-between' sx={{'button': {minWidth: 'auto', width: '48%'}, 'a': {color: '#fff'}}}>
                        <Button white onClick={()=>handleRemoveOrder(order.id)}>Reject</Button>
                        <Button onClick={()=>handleSubmitOrder(order.id)}><a href={`mailto:${order.user.email}`}>Accept</a></Button>
                      </Box>
                    </Box>
 
                  </>
                )
              }
              {
                !orders.length && <NoData />
              }   
              <h4 style={{marginTop: 20}}>Users</h4>
              {
                !!users.length && users?.map(user =>
                  <Grid marginBottom={4} justifyContent="space-between" rowGap={1} container bgcolor='#5350d58f' borderRadius='25px' p="10px">
                  <Grid item xs={2}>
                    <TextField 
                      type='text' 
                      label="id"
                      defaultValue={user.id}
                      variant='outlined'
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
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                  <Grid item xs={5.9}>
                    <TextField 
                      type='text' 
                      label="first_name"
                      defaultValue={user.first_name}
                      variant='outlined'
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>  
                  <Grid item xs={5.9}>
                    <TextField 
                      type='text' 
                      label="last_name"
                      defaultValue={user.last_name}
                      variant='outlined'
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                  <Grid item xs={5.9}>
                    <TextField 
                      type='text' 
                      label="first_name"
                      defaultValue={user.birthday}
                      variant='outlined'
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
                      defaultValue={user.sex}
                      variant='outlined'
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                  <Grid item xs={12}>
                    <TextField 
                      type='text' 
                      label="role"
                      defaultValue={user.role}
                      variant='outlined'
                      inputProps={
                        { readOnly: true }
                      }
                      sx={{width: "100%"}}
                    />
                  </Grid>   
                </Grid>
                )
              }            
              {
                !users.length && <NoData />
              }   
            </Box>
            {/* <Box borderBottom={1} paddingBottom={1}>
            <h4>Products</h4>
            <ProductTable products={products} />
            </Box> */}
          </TabPanel>
          <TabPanel value={2}>
            {
              isLoading ? 
                <CircularProgress />
              :
              <>
              <h4 style={{color: '#fff', marginTop: 0, fontWeight: 100}}>
                Statistics for the week
              </h4>
              <div className="profile__statistic_cards">
                <Box className="profile__statistic_element" bgcolor='#FFB258' style={{maxWidth: 'calc(50% - 5px)'}}>
                  <span>Completed Orders</span>
                  <div className="count">{Math.floor(Math.random() * 6)}</div>
                </Box>
                <Box className="profile__statistic_element" bgcolor='#FF5959' style={{maxWidth: 'calc(50% - 5px)'}}>
                  <span>In processing</span>
                  <div className="count">{Math.floor(Math.random() * 6)}</div>
                </Box>
                <Box className="profile__statistic_element" bgcolor='#4CD979' style={{maxWidth: 'calc(65% - 5px)'}}>
                  <span>Number of new users</span>
                  <div className="count">{Math.floor(Math.random() * 4)}</div>
                </Box>
                <Box className="profile__statistic_element" bgcolor='#4DB4FF' style={{maxWidth: 'calc(35% - 5px)'}}>
                  <span>Users online</span>
                  <div className="count">{Math.floor(Math.random() * 12)}</div>
                </Box>
              </div>
              {
                (ratedCourse && course) && (
                  <div className="profile__most_products">
                  <div className="profile__most_element">
                    <Swiper effect={"flip"} modules={[EffectFlip]}>
                      <SwiperSlide>
                        <div className="profile__most_cart" style={{backgroundColor: '#4D77F7'}}>
                          <RemoveRedEyeOutlinedIcon />
                          <h4>Most viewed</h4>
                          <span>This item has been viewed {course?.views} times</span>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Product product={course} />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                  <div className="profile__most_element">
                    <Swiper effect={"flip"} modules={[EffectFlip]}>
                      <SwiperSlide>
                        <div className="profile__most_cart" style={{backgroundColor: '#9059FD'}}>
                          <StarBorderPurple500OutlinedIcon />
                          <h4>Most rated</h4>
                          <span>This product was rated with an average of {ratedCourse?.rating} points</span>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Product product={ratedCourse} />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                )
              }
              <div style={{borderRadius: 25, overflow: 'hidden'}}>
                <Demo />
              </div>
                <div className="RaitingDoughnut" style={{borderRadius: 25, overflow: 'hidden'}}>
                  <div className="rating">{course?.rating || 5}</div>
                  <RaitingDoughnut />
                </div>
              </>
            }
          </TabPanel>
        </TabContext>
        <div className="exit" onClick={handleLogout}>
          <span>Exit</span>
          <LogoutOutlinedIcon
            style={{ cursor: "pointer", width: 40, height: 40, fill: "black" }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
