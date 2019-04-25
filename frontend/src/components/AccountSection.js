import React from "react";
import { Paper, Typography, IconButton, Icon, TextField } from "@material-ui/core";

export default class AccountSection extends React.Component {

    render () {
        return (
            <Paper className="ProfilePaper ComponentPaper">
                <div className="component">
                    <Typography variant="h4">My Account</Typography>
                    {              
                    this.props.changes &&
                        <div className="buttonContainer">
                            <IconButton component="span" size="small" aria-label="Edit" onClick={this.props.handleSave}>
                                <Icon>save</Icon>
                            </IconButton>
                        </div>                                         
                    }
                </div> 
                    <AccountList 
                        fieldStates={this.props.fieldStates} 
                        user={this.props.user}
                        handleChange={this.props.handleChange}
                        handleTextFieldChange={this.props.handleTextFieldChange}
                        handleUndo={this.props.handleUndo}
                        />
                
            </Paper>
        )
    }
}

export class AccountList extends React.Component {

    render () {
        return (            
            <div className="accountList">
                <div className="component">
                    <TextField
                    disabled={this.props.fieldStates[0]}
                    id="name"
                    label="Name"
                    defaultValue={this.props.user.name}
                    margin="normal"
                    variant="outlined"
                    onChange={() => this.props.handleTextFieldChange(0)}              
                    />
                    {this.props.fieldStates[0] && 
                        <div className="buttonContainer">
                        <IconButton component="span"size="small" aria-label="Edit" onClick={() => this.props.handleChange(0)}>
                            <Icon>edit_icon</Icon>
                        </IconButton>
                        </div>
                    }                      
                    {this.props.fieldStates[0] === false && 
                        <div className="buttonContainer">
                            <IconButton component="span"size="small" aria-label="Undo" onClick={() => this.props.handleUndo(0)}>
                                <Icon>undo_icon</Icon>
                            </IconButton>
                        </div>
                    }                               
                </div>
                <div className="component">
                    <TextField
                    disabled={this.props.fieldStates[1]}
                    id="surname"
                    label="Surname"
                    defaultValue={this.props.user.surname}
                    margin="normal"
                    variant="outlined"
                    onChange={() => this.props.handleTextFieldChange(1)}
                    />
                    {this.props.fieldStates[1] && 
                        <div className="buttonContainer">
                            <IconButton component="span"size="small" aria-label="Edit" onClick={() => this.props.handleChange(1)}>
                                <Icon>edit_icon</Icon>
                            </IconButton>
                        </div>
                    }                      
                    {this.props.fieldStates[1] === false && 
                        <div className="buttonContainer">
                            <IconButton component="span"size="small" aria-label="Undo" onClick={() => this.props.handleUndo(1)}>
                                <Icon>undo_icon</Icon>
                            </IconButton>
                        </div>
                    }                  
                </div>
                <div className="component">
                    <TextField
                    disabled={this.props.fieldStates[2]}
                    id="birthday"
                    type="date"
                    label="Birthday"
                    defaultValue={this.props.user.birthday}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        maxlength: 8,
                        inputProps: { max: '2020-01-01' } 
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={() => this.props.handleTextFieldChange(2)}
                    />
                    {this.props.fieldStates[2] && 
                        <div className="buttonContainer">
                            <IconButton component="span"size="small" aria-label="Edit" onClick={() => this.props.handleChange(2)}>
                                <Icon>edit_icon</Icon>
                            </IconButton>
                        </div>
                    }                      
                    {this.props.fieldStates[2] === false && 
                        <div className="buttonContainer">
                            <IconButton component="span"size="small" aria-label="Undo" onClick={() => this.props.handleUndo(2)}>
                                <Icon>undo_icon</Icon>
                            </IconButton>
                        </div>
                    }           
                </div>                    
                <div className="component">
                <TextField
                disabled={this.props.fieldStates[4]}
                id="password"
                label="Password"                    
                defaultValue="hiddenpassword"
                margin="normal"
                type="password"
                variant="outlined"
                //onChange={() => this.props.handleTextFieldChange(4)}
                />
                {this.props.fieldStates[4] && 
                    <div className="buttonContainer">
                        <IconButton component="span"size="small" aria-label="Edit" onClick={() => this.props.handleChange(4)}>
                            <Icon>edit_icon</Icon>
                        </IconButton>
                    </div>
                }                      
                {this.props.fieldStates[4] === false && 
                    <div className="buttonContainer">
                        <IconButton component="span"size="small" aria-label="Undo" onClick={() => this.props.handleUndo(4)}>
                            <Icon>undo_icon</Icon>
                        </IconButton>
                    </div>
                } 
                        
                </div>
            
            </div>
        )
    }
}