import { Divider, Grid, TextField, Typography,Button,Paper } from "@mui/material";


const ShippingItems = () => {
    return ( 
        <Grid container>
            <Grid item md={3}></Grid>

            <Grid item md={6} style={{textAlign:'center'}}>
                <Paper elevation={3}>
                <Typography variant="h5">
                    <br/>
                    Shipping Destination
                </Typography>
                <br/>
                <Divider/>
                <br/>
                <Grid container>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div>
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div>
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div>
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div>
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div>
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                    <Grid item md={6} style={{textAlign:'center'}}>
                        <div>First Name</div> 
                        <br/>
                        <TextField variant="outlined" size="small"/>
                    </Grid>
                </Grid>
                <br/>
                <br/>
            <Divider/>
            <br/>
            <Button>Update</Button>
            <br/>
            <br/>
            </Paper>
            </Grid>

            <Grid item md={3}></Grid>
           
        </Grid>
     );
}
 
export default ShippingItems;