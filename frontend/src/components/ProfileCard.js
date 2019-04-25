import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

export default class ProfileCard extends React.Component {

    render() {
        return (
            <Card className="cardItem">
                <CardActionArea>
                    <CardContent onClick={this.props.openInfo}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {this.props.first}
                        </Typography>
                        <Typography component="p">
                        {this.props.second}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
    
}