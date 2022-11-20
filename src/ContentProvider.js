/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */

class ContentProvider {

    constructor (content = '', context = null) 
    {
        this._content = content 
        this._context = context
    }
    
    /**
     * add context object (usually a folder tree)
     * 
     * @param {Array} context
     * @return void 
     */
    addContext (context)
    {
        this._context = context
    }    

    /**
     * get the context of the content provider
     * 
     * @returns Array
     */
    getContext ()
    {
        return this._context
    }

    /**
     * get content
     * 
     * @param {object|null} data optional - variable data in the content
     * @returns {object}
     */
    getContent (data = null)
    {
        return this._content
    }
}

module.exports = ContentProvider