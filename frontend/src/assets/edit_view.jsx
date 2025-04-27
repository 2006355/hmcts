import {useState,useEffect} from 'react';
import 

 
useEffect => {
    (
        usefact
    )
    
    reader() {
        const { data } = this.props;
        return (
            <div className="edit-view">
                <input type="text" value={data.title} onChange={this.props.onTitleChange} />
                <input type="text" value={data.description} onChange={this.props.onDescriptionChange} />
                <select value={data.status} onChange={this.props.onStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={this.props.onSave}>Save</button>
                <button onClick={this.props.onCancel}>Cancel</button>
                <button onClick={this.props.onDelete}>Delete</button>
            </div>
                        
        
        );
    }
}
