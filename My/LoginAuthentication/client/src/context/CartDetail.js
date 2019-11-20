import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import imageSrc from './../images/thumbnail/carDefaulThumb.png'
class CartDetail extends Component {
    render() {
        return (
            <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={this.props.Products.name} src={imageSrc} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.Products.name}
                        secondary={
                        <React.Fragment>
                            {this.props.Products.model}
                            <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{float:"right"}}
                            >
                                    ${this.props.Products.price}
                            </Typography>
                            </React.Fragment>
                        }
                            />
                    </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        );
    }
}


export default CartDetail;