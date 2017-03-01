/* global google */
import React, {Component} from "react";
import connectField from 'uniforms/connectField';
import wrapField from 'uniforms-bootstrap4/wrapField'


class ComplexField extends Component {
    constructor(props) {
        super(props)
        console.log('constructor', props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {a: '', b: ''}
    }

    componentDidMount(){
        //this.props.onChange(undefined)
    }
    handleChange() {
        const value={a: this.refs.a.value, b: this.refs.b.value}
        this.props.onChange(value)
        this.setState(value)
    }

    render() {
        return (
            <div><label className="form-control-label">A:</label>
                <input className="form-control" type="text" name="a" value={this.state.a} ref="a"
                       onChange={this.handleChange}/>
                <label className="form-control-label">B:</label>

                <input className="form-control" type="text" name="b" value={this.state.b} ref="b"
                       onChange={this.handleChange}/>
            </div>
        )
    }
}


const ComplexField_ = props => {
    console.log('ComplexField_ props',props)
    return wrapField(props, (<ComplexField {...props} />))
}

ComplexField_.displayName = 'ComplexField';

export default connectField(ComplexField_);



