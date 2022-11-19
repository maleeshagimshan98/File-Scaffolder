/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */

class ContentProvider {

    constructor (content) 
    {
        this._content = content ?? ''        
    } 

    /**
     * get content
     * 
     * @returns {object}
     */
    getContent ()
    {
        return this._content
    }
}

module.exports = ContentProvider