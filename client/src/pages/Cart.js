import React,{useState} from 'react';
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import AbcIcon from "@mui/icons-material/Abc";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import NavBar from '../components/organism/NavBar';
import { TryOutlined } from '@mui/icons-material';


let Cart = () =>{

    const cartFromLocal = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [product, setProduct] = useState();
  const [itemNo, setItemNo] = useState(1);
    let [array, setArray] = useState(cartFromLocal);
    let [cartItem, setCartItem] = useState(cartItems);  
  let token = localStorage.getItem("token");
  let userId = jwtDecode(token);
  const { enqueueSnackbar } = useSnackbar();
  

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(array));
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    getLocation();
  }, [array, cartItem]);

    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");

    console.log('this is array',array);

    let removeItem = (r,i) =>{
        let id = i;
        let arr = [...array];
       setArray(arr.filter(t=> t._id != r._id))
   
    }
    let plusItem = (r) => {
        const exist = cartItem.find( x=> x.productId == r._id)
        console.log(exist)
        if(exist)
        {
            if(r.stock <= exist.quantity)
            {
                console.log('na kr')
            }
            else
            {
                setCartItem(cartItem.map(x=> x.productId === r._id ? {...exist, quantity: exist.quantity+1 } : x ))
            }
            
        }
        else{
            setCartItem([...cartItem, {...r, quantity:0}])
        }
      };
    

      const minusItem = (r) => {
        const exist = cartItem.find( x=> x.productId == r._id)
        console.log(exist)
        if(exist)
        {
            if(exist.quantity == 0)
            {
                console.log('na kr')
            }
            else
            {
                setCartItem(cartItem.map(x=> x.productId === r._id ? {...exist, quantity: exist.quantity-1 } : x ))
            }
            
        }
        else{
            setCartItem([...cartItem, {...r, quantity:0}])
        }
      };

    let handleShipping = () => {
        let arr = {
          houseNumber: address,
          city: city,
          country: province,
        };
        axios
          .patch(`http://localhost:5000/api/users/${userId._id}`, arr, {
            headers: { Authorization: token },
          })
          .then(function (response) {
            console.log("shipping success");
          })
          .catch(function (error) {
            console.log(error);
          });

      };

      console.log(cartItem);

      let proceedPayment = () => {
        handleShipping();
        axios
          .post(
            `http://localhost:5000/api/orders`,
            { items: cartItem },
            { headers: { Authorization: token } }
          )
          .then(function (response) {
            enqueueSnackbar("Order placed!", {
              variant: "success",
              autoHideDuration: 2000,
            });
            setTimeout(function () {
              window.location.href = "/user";
            }, 2000);
          })
          .catch(function (error) {
            console.log(error);
          });
 
      };
     

    let handleAddress = (e) => {
        setAddress(e.target.value);
      };
      let handleCity = (e) => {
        setCity(e.target.value);
      };
      let handleProvince = (e) => {
        setProvince(e.target.value);
      };

      let removeAll = () =>{
          setArray([]);
          setCartItem([])
          enqueueSnackbar("Cart is empty!", {
            variant: "error",
            autoHideDuration: 2000,
          });
      }

      let proceedCard = () => {
        handleShipping();
        axios
          .post(
            `http://localhost:5000/api/orders`,
            { items: cartItem },
            { headers: { Authorization: token } }
          )
          .then(function (response) {
            window.location.href = "/zapp";
          })
          .catch(function (error) {
            console.log(error);
          });

      };
      
      let getLocation = () => {
  
        axios
          .get(
            `http://localhost:5000/api/users/${userId._id}`,
            { headers: { Authorization: token } }
          )
          .then(function (response) {
            setCity(response.data.data.city)
            setProvince(response.data.data.country)
            setAddress(response.data.data.houseNumber)
          })
          .catch(function (error) {
            console.log(error);
          });

      };

    return(
      <Grid container spacing={3}>
          <Grid item md={12}>
              <NavBar/>
          </Grid>
          <div style={{marginTop:100}}></div>
          <br/>
          <Grid item md={1}>
              
              </Grid>
              <Grid item md={10}>
                <Grid container>
                    <Grid item md={7}>
                { array.length == 0 ?   ( <Typography style={{marginTop:20}} variant="h6">Cart is Empty!</Typography>): (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price (PKR) </TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="center">Size</TableCell>
                            <TableCell align="left">Total (PKR)</TableCell>
                            <TableCell align="center">Remove</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {array.map((row,i) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">{row.stock}</TableCell>
                              <TableCell align="center">
                                <Button onClick={() => plusItem(row)}>
                                  +
                                </Button>{" "}
                                &nbsp;
                                 {
                                 cartItem.map((item)=>{
                                     return(
                                         <>
                                         {item.productId == row._id ? item.quantity: ''}
                                         </>
                                     )
                                 })
                                }
                                 &nbsp;{" "}
                                <Button onClick={() => minusItem(row)}>
                                {
                             
                                }
                                  {" "}
                                  -{" "}
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                              {
                                 cartItem.map((item)=>{
                                     return(
                                         <>
                                         {item.productId == row._id ? item.quantity*row.price : ''}
                                         </>
                                     )
                                 })
                                }
                              </TableCell>
                              <TableCell align="right">
                                  <Button onClick={()=>removeItem(row,i)}>
                                      X
                                      </Button> </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div style={{display:'flex',justifyContent:'end',marginRight:'20px'}}>
                          <Button onClick={removeAll}>Remove all</Button>
                      </div>
                    </TableContainer> )
                  
                    }
                 
                    <div style={{marginTop:50}}>
                    <Button variant="outlined" onClick={()=>{
                        window.location.href="/"
                    }}>
                        Continue Shopping
                    </Button>
                    </div>
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={4}>
                    
                    <TextField
                      fullWidth
                      required={true}
                      label="Address"
                      value={address}
                      onChange={handleAddress}
                    />
      {address !== "" ? <div></div>: <div style={{color:'red'}}>Please enter the address</div> }
                    <TextField
                      style={{ marginTop: 20 }}
                      required={TryOutlined}
                      fullWidth
                      label="City"
                      value={city}
                      onChange={handleCity}
                    />
      {city !== "" ? <div></div>: <div style={{color:'red'}}>Please enter the city</div> }
                    <TextField
                      style={{ marginTop: 20}}
                      required={true}
                      fullWidth
                      label="Province"
                      value={province}
                      onChange={handleProvince}
                    />
                    {province !== "" ? <div></div>: <div style={{color:'red'}}>Please enter the province</div> }
                    <br/>
                    <br/>
                    <Divider />
                    <div style={{marginTop:40}}>
{console.log(address,'address')}
                    </div>
                    <Paper elevation={3}>
                        <br/>
                    <Typography variant='h6' style={{marginBottom:20,textAlign:'center'}}>
                        Select Payment Method
                    </Typography>
                    <Divider />
                    <br/>
                    <div style={{width:'100%',}}>
                    <Button disabled={address === "" || city === "" || province === "" || array.length == 0 ? true: false} variant="outlined" style={{margin:'0px auto',display:'flex'}} onClick={proceedPayment}>CASH ON DELIVERY</Button>
                    <br />
                    <Button disabled={address === "" || city === "" || province === "" ||  array.length == 0 ? true: false} variant="outlined" style={{margin:'0px auto',display:'flex'}} onClick={proceedCard}>PAYMENT THROUGH CARD</Button>
                    </div>
                    <br/>
                    <br/>
                    </Paper>
                    </Grid>
                </Grid>
              </Grid>

              <Grid item md={1}>
              
              </Grid>
      </Grid>
    )
}

export default Cart;