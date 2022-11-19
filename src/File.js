/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */ 
 
 class File {
 
     constructor (name, path, content)
     {
         this.name = name
         this.path = path
         this.type = "File"
         this._content = content
     }
 
     /**
      * 
      * @param {string} name
      * @param {String} content 
      * @returns 
      */
     static NewFile (name, ext, content)
     {
         return new File(name, ext, content)
     }      
 
     /**
      * get the file name
      * 
      * @returns {String}
      */
     getName ()
     {
         return this.name
     }

     /**
      * get the type of <iNode> = "File"
      * 
      * @returns {String}
      */
     getType ()
     {
        return this.type
     }     

     /**
      *get the file's extension

      * @returns {String}
      */
     getExtension ()
     {
        return //... split name from "." and return the extension
     }

     /**
      * set the content provider for the file
      * 
      * @param {String} content
      * @return void
      */
     setContent ( content)
     {
        this._content = content
     }     
 
     
     /**
      * get the file's content
      * 
      * @returns {String}
      */
     getContent ()
     {
        return this._content
     }

     /**
      * get the file's apth
      * 
      * @returns {String}
      */
     getPath ()
     {
        return this.path
     }

     /**
      * get the file's complete address with file name and extension
      * 
      * @returns {String}
      */
     getCompleteAddress ()
     {
        return `${this.path}/${this.name}`
     }
 }
 
 module.exports = File