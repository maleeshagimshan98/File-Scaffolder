/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */
const fs = require('@supercharge/filesystem')
const path = require('path')

class Folder {

    /**
     * 
     * @param {*} name 
     * @param {*} path 
     */
    constructor (name, path = "./")
    {
        this.name = name
        this.type = "Folder"
        this.path = path
        this._children = []
    }

    /**
     * 
     * @param {string} name 
     * @param {string} path 
     * @param {Array} children 
     * @returns 
     */
    static NewFolder (name,path, children)
    {
        return new Folder(name,path,children)
    }

    /**
     * get the folder's path 
     * 
     * @returns {String}
     */
    getPath ()
    {
        return this.path
    }

    /**
      * get the folder name
      * 
      * @returns {String}
      */
    getName ()
    {
        return this.name
    }

    /**
      * get the type of <iNode> = "Folder"
      * 
      * @returns {String}
      */
    getType ()
    {
        return this.type
    }

    /**
     * add child to folder
     * 
     * @param {INode} child 
     * @return void
     */
    addChild (child)
    {
        this._children.push(child)
    }

    /**
     * check if this folder has any children
     * 
     * @returns {Boolean}
     */
    hasChildren ()
    {
        return this._children.length > 0
    }

    /**
     * get the children of folder
     * 
     * @returns {Array}
     */
    getChildren ()
    {
        return this._children
    }       
        
}

module.exports = Folder