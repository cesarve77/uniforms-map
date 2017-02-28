/**
 * Created by cesar on 28/2/17.
 */
/**
 * Created by cesar on 28/2/17.
 */
import AutoForm, {} from 'uniforms-bootstrap4/AutoForm';
import {AutoField,  SubmitField} from 'uniforms-bootstrap4';
import React from 'react';
import {Component} from 'react'
import AddressField from './AddressField'
import schema from './schema'
import {Row, Col} from 'reactstrap'
console.log('schema',schema)
class Form extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(doc) {
        console.log('submited',doc)

    }

    render() {
        const model = this.props.model || {status: 'Suggested'}
        return (
            <AutoForm onSubmit={this.onSubmit} schema={schema}  >
                <Row>
                    <Col xs="12">
                        <AutoField showInlineError={true} name="description"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <AddressField showInlineError={true} name="address"/>
                    </Col>

                </Row>
                <Row>
                    <Col> <SubmitField value="Save" inputClassName="btn btn-block btn-primary btn-lg"/></Col>
                </Row>
            </AutoForm>


        );
    }
}

export default Form;
