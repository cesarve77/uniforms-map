import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Form from './Form'
class App extends Component {
    render() {
        return (
            <Container>
                <h1>Form</h1>
                <div className="App">
                    <Form/>
                </div>
            </Container>
        );
    }
}

export default App;
