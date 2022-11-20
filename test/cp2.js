const ContentProvider = require("../src/ContentProvider")

class cp1 extends ContentProvider {
    constructor ()
    {
        super()
    }

    getContent (data = null)
    {
        return `this is content from cp2 class \n meta - ${data && data.hasOwnProperty('data_1') ? data.data_1 : 'No meta data found'}`
    }
}

module.exports = cp1