/**
 * Created by cesar on 28/2/17.
 */
/**
 * Created by cesar on 28/2/17.
 */
import AutoForm, {} from 'uniforms-bootstrap4/AutoForm';
import {AutoField, SubmitField} from 'uniforms-bootstrap4';
import React from 'react';
import {Component} from 'react'
import ComplexField from './ComplexField'
import schema from './schema'
import {Row, Col} from 'reactstrap'
console.log('schema', schema)
class Form extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {doc: ''}
    }

    onSubmit(doc) {
        this.setState({doc})

    }

    render() {
        return (
            <div>
                <AutoForm onSubmit={this.onSubmit} schema={schema}>
                    <Row>
                        <Col xs="12">
                            <AutoField showInlineError={true} name="simpleField"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <ComplexField showInlineError={true} name="complexField"/>
                        </Col>

                    </Row>
                    <Row>
                        <Col> <SubmitField value="Save" inputClassName="btn btn-block btn-primary btn-lg"/></Col>
                    </Row>
                </AutoForm>
                <div>
                    {JSON.stringify(this.state.doc)}
                </div>

            </div>


        );
    }
}

export default Form;
