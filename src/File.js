/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */ 
 
 class File {
 
   /**
    * constructor 
    * 
    * @param {String} name 
    * @param {String} path 
    * @param {ContentProvider} contentProvider 
    */
     constructor (name, path, contentProvider, data = null)
     {
         this.name = name
         this.path = path
         this.type = "File"
         this._contentProvider = contentProvider
         this._content = ``
         this._data = data
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
         try {
            this._content = this._contentProvider.getContent(this._data)
            return this._content
         }
         catch (error) {
            throw new Error(`\n An error occured while creating content for the file at ${this.path}/${this.name} \n \n ${error.message}`)
         }
     }

     /**
      * get the variable data parameters of file content
      * 
      * @returns {object| null}
      */
     getData()
     {
      return this._data
     }

     /**
      * set variable data of the file content
      * 
      * @param {object} data 
      */
     setData(data)
     {
      this._data = data
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