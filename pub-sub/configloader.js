const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
console.log('BROKER_HOST_NAME', process.env.BROKER_HOST_NAME);
if(!process.env.BROKER_HOST_NAME) {
    console.log('BROKER_HOST_NAME not defined')
    process.exit(1);
}
