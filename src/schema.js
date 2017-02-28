/**
 * Created by cesar on 28/2/17.
 */
/**
 * Created by cesar on 28/2/17.
 */
import SimpleSchema from 'simpl-schema'

const schema = new SimpleSchema({
    description: {type: String},
    address: {type: Object},
    "address.address": {type: String},
    "address.position": {type: Object},
    "address.position.lat": {type: Number},
    "address.position.lng": {type: Number},
})

export default schema