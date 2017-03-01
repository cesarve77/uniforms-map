/**
 * Created by cesar on 28/2/17.
 */
/**
 * Created by cesar on 28/2/17.
 */
import SimpleSchema from 'simpl-schema'

const schema = new SimpleSchema({
    simpleField: {type: String},
    complexField: {type: Object},
    "complexField.a": {type: String},
    "complexField.b": {type: String},
})

export default schema