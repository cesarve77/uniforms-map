## The problem:

Im developing a component which return a object. Then uniform seems to only validate over the main key of the schema for shoe error. 

## this is the schema:

```
const schema = new SimpleSchema({
    simpleField: {type: String},
    complexField: {type: Object},
    "complexField.a": {type: String},
    "complexField.b": {type: String},
})

```

then uniform don't show error for complexField because effectively is a object, but uniform don't submit the form because "complexField.a", "complexField.b" are required (but the error is not shown)

## Small repo for reproduce the issue
[https://github.com/cesarve77/uniforms-map] (https://github.com/cesarve77/uniforms-map)

for run 

```
git clone https://github.com/cesarve77/uniforms-map.git 
cd uniforms-map
npm install
npm start
```



### this is the form:
```
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
```

### And this is the ComplexField:

```
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

```

