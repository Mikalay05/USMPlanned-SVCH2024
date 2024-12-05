const informationAboutControllerForError = 'BASE_CONTROLLER'

class BaseController {
    constructor() {
        this.initializer();
    }
    logMessage(message) {
        const debuging = process.env.TESTING === 'true';
        if (debuging) {
            console.log(`${message}`);
        }
    }
    initializer(){
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        methods.forEach(methodName => {
            const thisMethod = this[methodName]
            if(typeof thisMethod === "function" && methodName !== "constructor"){
                this.executeWithHandling(thisMethod)
            }
        })
    }
    executeWithHandling(executeMethod) {
        try {
            executeMethod.call(this);
        }
        catch(error) {
            console.error(`${informationAboutControllerForError} ==> Перехвачено ошибка\n
                Error: ${error}`)
        }
    }
} 
module.exports = new BaseController();