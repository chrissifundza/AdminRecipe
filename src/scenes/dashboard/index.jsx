import { useContext, useEffect, useState } from "react";
import { Box, Button,  IconButton,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { getAuth, signOut } from "firebase/auth";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

import Axios from 'axios';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { saveAs } from 'file-saver';
import { generatePdf, generatePdf2, generatePdf3, generatePdf4 } from "./pdf";
import { useUIContext } from "../../context/ui";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate= useNavigate();
  const [TotalUsers, setTotalUsers] = useState(0)
  const [TotalRecipes, setTotalRecipes] = useState(0)
  const [RecipeTrending, setRecipeTrending] = useState([])
  const [ActiveUser, setActiveUser] = useState([])
  const [Orders, setOrders] = useState([])
  const [AllRecipes, setAllRecipes] = useState([])
  const [AllUsers, setAllusers] = useState([])
  const [AllProducts, setAllProducts] = useState([])
  const [Shop, setShop] = useState([])
  const {logout}=useUIContext()
function signout(){
  logout()
}

useEffect(()=>{
  Axios.post("https://recipeapp154.herokuapp.com/api/auth/allusers").then((res)=>{
   console.log(res.data) 
  setTotalUsers(res.data.length)
  setAllusers(res.data)
  })
},[]) 
useEffect(()=>{
  if(AllUsers){
    let active = AllUsers.filter((user)=>user.status=="online")
    setActiveUser(active)
  }
},[AllUsers])
useEffect(()=>{
  
    //const querySnapshot = await getDocs(collection(db, "Shops"));
    Axios.post("https://recipeapp154.herokuapp.com/api/recipe/allrecipes").then((response)=>{
     let querySnapshot= response.data
     console.log(querySnapshot)
     setTotalRecipes(querySnapshot.length)
     setAllRecipes(response.data)
   //  getAllShops()
  })
  
  
},[])
useEffect(()=>{
if(AllRecipes){

let recipeName = AllRecipes.map((recipe)=>recipe.recipe_name)

  const set = new Set(recipeName);
  
  const duplicates = AllRecipes.filter(item => {
      if (set.has(item.recipe_name)) {
          set.delete(item.recipe_name);
      } else {
          return item;
      }
  });
 setRecipeTrending(duplicates)
  console.log(duplicates);
}
},[AllRecipes])
  // get data
  
  async function getData(shopTemplate){
    
   //console.log(shopTemplate);

    for (let i = 0; i <shopTemplate.length; i++) {
        const element = shopTemplate[i].Address;
        
        
        let distance = await calculateRoute(element);
        let s1=distance.split(" ");
        let element1='';
        if (s1.length==4) {
          element1=(parseInt(s1[0])*60)+parseInt(s1[2]); 
        } else if(s1.length==2){
          element1=(parseInt(s1[0])); 
        }
     
        let NewOBject ={ShopName:shopTemplate[i].name,ShopDstance:element1,ShopCover: shopTemplate[i].Cover, Icon:shopTemplate[i].Icon,ShortAddress:shopTemplate[i].ShortAddress, Discription:shopTemplate[i].Discription, Brand:shopTemplate[i].Brand}
        

        ReadytoOutput(NewOBject)
    }
  

  }
  let Ready1=[]
  function  ReadytoOutput(shop){
    Ready1.push(shop)
   let sorted= Ready1.sort(function(a, b){
     
     
  
      return (a.ShopDstance - b.ShopDstance)
    
    });
    console.log(sorted)
    setShop(sorted)
   }

async function calculateRoute(dist) {
  
  let cont =0;
  /* eslint-disable no-undef */
  if (cont==0){
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: "Pretoria",
      destination: dist,
      /* eslint-disable no-undef */
      travelMode: google.maps.TravelMode.DRIVING,
    });
   /* setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    */
    return  results.routes[0].legs[0].duration.text;
    cont++
  }
  
  
}
let Closer=[]
function CLN(){
  //console.log("Running")
  const getTo = ()=>{
    for (let i = 0; i < 5; i++) {
      const element = Shop[i];
      Closer.push(Shop[i])
    }
    return Closer
}
let C=getTo();
console.log(C)
  Axios.post('http://localhost:3001/create-pdf', C)
  .then(()=> Axios.get('http://localhost:3001/fetch-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllShopsReport.pdf');
  })
}
function generatePdfdata(){
  
}
function getAllUsers(){
  Axios.post('http://localhost:3001/user-pdf', AllUsers)
  .then(() => Axios.get('http://localhost:3001/user-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllUsersReport.pdf');
  })
}
function getAllProducts(){
  Axios.post('http://localhost:3001/product-pdf', AllProducts)
  .then(() => Axios.get('http://localhost:3001/product-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllProductsReport.pdf');
  })
}

function getAllOrders(){
  
var mf = 1;
var m = 0;
var item;
for (var i=0; i<Orders.length; i++)
{
        for (var j=i; j<Orders.length; j++)
        {
                if (Orders[i].Products == Orders[j].Products)
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = Orders[i].Products;
                }
        }
        m=0;
}


console.log(item+" ( " +mf +" times ) ") 
let popularproduct = item+" ( " +mf +" times purchases) "
  Axios.post('http://localhost:3001/order-pdf', {AllOrders:Orders,PopularPro:popularproduct} )
  .then(() => Axios.get('http://localhost:3001/order-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllOrdersReport.pdf');
  })
}
let count =0
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={signout}
          >
            
            Logout
          </Button>
          
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={()=>generatePdf(AllUsers)}
        >
          <StatBox
            title={TotalUsers}
            subtitle="Total Users"
           
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={()=>generatePdf2(ActiveUser)}
        >
          <StatBox
            title={ActiveUser.length}
            subtitle="Active Users"
           
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={(()=>generatePdf3(AllRecipes))}
        >
          <StatBox
  
            title={TotalRecipes}
            subtitle="Saved Recipes"
           
            icon={
              <ContactsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
       
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={(()=>generatePdf4(RecipeTrending))}
        >
          <StatBox
            title={RecipeTrending.length}
            subtitle="Trending Recipes"
            
            icon={
              <ReceiptOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                All Users
              </Typography>
             
            </Box>
            <Box>

              <IconButton onClick={CLN}>
                
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Paper>
        
      
        <TableContainer sx={{maxheight:50,}} color={colors.primary[400]}  backgroundColor={colors.primary[400]}>
          <Table sx={{minWidth:650}}  color={colors.primary[400]} aria-label="simple table"  >
            <TableHead>
              <TableRow >
              <TableCell sx={{fontWeight:"Bold"}} >User No.</TableCell>
              <TableCell sx={{fontWeight:"Bold"}} >Username</TableCell>
                <TableCell sx={{fontWeight:"Bold"}}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AllUsers.map((row, index) => (
                <TableRow key={row.idstudent}>
                  <TableCell >{count=count+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.email}</TableCell>
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Trending Recipes
            </Typography>
          </Box>
          {RecipeTrending.map((transaction, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
           
              <Box color={colors.grey[100]}  display="flex"
              justifyContent="left"
              alignItems="center"><Box sx={{mr:"5px"}}><RestaurantIcon/> </Box>{transaction.recipe_name}</Box>
             
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
      
      
      </Box>
    </Box>
  );
};

export default Dashboard;
