import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import imageSrc from './../images/thumbnail/carDefaulThumb.png'
class Products extends React.Component {
    render() {
        return (
            <Grid item xs={12} sm={3}>
              <Card>
                <CardActionArea style={{alignItems:"center"}}>
                  <div style={{marginLeft: 50}}><img
                    src= {imageSrc}
                    alt={this.props.Products.name}
                  /></div>
                  <CardContent>
                  <Typography gutterBottom variant="h6">
                      {this.props.Products.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    {this.props.Products.model}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" color="primary" onClick={this.props.handleClick}>
                  {this.props.Products.status}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
    }
}

export default Products;