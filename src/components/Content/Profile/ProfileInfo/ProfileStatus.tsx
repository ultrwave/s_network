import React from 'react';
import Style from '../Profile.module.css';

type ProfileStatusType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = { // todo - ?
        editMode: false
    }

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.toggleEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true}
                               onBlur={this.toggleEditMode}
                               value={this.props.status}
                        />
                    </div>
                }
            </div>
        )
    }
}


