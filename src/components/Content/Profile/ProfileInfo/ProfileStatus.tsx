import React, {ChangeEvent, createRef, useRef} from 'react';

type ProfileStatusType = {
    status: string
    updateUserStatus(status: string): void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = { // todo - ? = in class
        editMode: false,
        status: this.props.status
    }

    toggleEditMode = () => {
        const newStatus = this.state.status.trim()
        if (this.state.editMode && (this.props.status !== newStatus)) {
            this.props.updateUserStatus(newStatus)
        }
        this.setState({editMode: !this.state.editMode})
    }

    inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value})
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.toggleEditMode}
                        >{this.props.status || '-----'}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true}
                               onBlur={this.toggleEditMode}
                               value={this.state.status}
                               onChange={this.inputHandler}
                        />
                    </div>}
            </div>
        )
    }
}


