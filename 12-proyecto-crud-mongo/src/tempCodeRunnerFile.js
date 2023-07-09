const { generateID, disconnect, connectToDB } = require('../mongodb')
async function test(){
        await connectToDB('productos')
        await disconnect()
}
    
    test();