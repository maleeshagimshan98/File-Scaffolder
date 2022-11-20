/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */

const fs = require("@supercharge/filesystem")
const Folder = require("./Folder.js")
const File = require("./File")
const ContentProvider = require("./ContentProvider.js")

class Scaffolder {
  /**
   *
   * @param {object} contentProviders
   */
  constructor(contentProviders) {
    this._contentProviders = contentProviders ?? null
    this._folderTree = []
    this._errors = []
  }

  /**
   * check if given content provider class is defined
   * 
   * @param {String} name content provider class name
   * @returns Boolean
   */
  _isContentProviderDefined (name)
  {
    return this._contentProviders.hasOwnProperty(name)
  }

  /**
   * parse file data
   *
   * @param {Object} data
   * @param {String} path
   * @returns {File}
   * @throws Error
   */
  _parseFile(data, path) {
    if (Object.keys(data).length == 0) {
      throw new Error(`File data is missing at following path - ${path}`)
    }

    if (Object.keys(data).length == 1) {
      for (let prop in data) {
        //... type 1        
        return new File(prop, `${path}`, new ContentProvider(data[prop]))
      }
    }    
    
    if (!data.hasOwnProperty("name") || !data.hasOwnProperty("contentProvider")) {
      //... invalid file configuration
      throw new Error (`Invalid configuration data at ${path}. \n following properties must exist - name, contentProvider`)
    }
    if (!this._contentProviders || Object.keys(this._contentProviders).length == 0) {
      throw new Error(`ContentProvider classes are not defined in Scaffolder.js `)
    }

    //... type 2
    if (typeof data.contentProvider == "string") {

      if (!this._isContentProviderDefined(data.contentProvider)) {
        throw new Error(`ContentProvider "${data.contentProvider}" is not defined at '${path}/${data.name}' `)
      }

      let fileData = data.data && Object.keys(data.data).length > 0 ? data.data : null

      return new File(data.name,`${path}`,this._contentProviders[data.contentProvider],fileData)
    }
      
  }

  /**
   * parse folder config
   *
   * @param {String} name
   * @param {Array} data
   * @returns {Folder}
   */
  _parseFolder(name, data, path) {
    let folder = new Folder(name, `${path}${name}/`)
    //... parse children
    data.forEach((child) => {
      folder.addChild(this._parseNode(child, `${path}${name}/`)) //... check path
    })
    return folder
  }

  /**
   * parse config node and return respective object
   *
   * @param {*} data
   * @returns {iNode} Folder/File
   */
  _parseNode(data, path) {
    //... empty folder
    if (typeof data === "string") {
      return new Folder(data, `${path}${data}/`)
    }

    if (typeof data === "object") {
      let node
      for (let prop in data) {
        if (Array.isArray(data[prop])) {
          //... parse as a folder
          node = this._parseFolder(prop, data[prop], path)
        } else {
          //... parse as a file
          node = this._parseFile(data, path)
        }
        break
      }
      return node
    }
  }

  /**
   * add folder tree array to all content provider instances
   * 
   * @return void
   */
   _provideContext ()
   {
      if (this._contentProviders) {
        for (let cp in this._contentProviders) {
          this._contentProviders[cp].addContext(this._folderTree)
        }
      }
   }

  /**
   * parse the configuration file and create the virtual folder tree
   *
   * @param {object} config
   * @return {void}
   */
  init(config, targetPath) {
    this._targetPath = targetPath
    config.forEach((prop) => {
      try {
        let node = this._parseNode(prop, `${targetPath}/`)
        this._folderTree.push(node)
      } catch (e) {
        //this.hasErrors = true
        this._errors.push({ message: e.message })
      }
    })
    this._provideContext()  //... passing the folder tree object to every content provider
  }

  /**
   * get the created folder tree
   *
   * @returns {Array}
   */
  getFolderTree() {
    return this._folderTree
  }

  /**
   * check if there are any errors
   * @returns {Boolean}
   */
  hasErrors() {
    return this._errors.length > 0
  }

  /**
   * get the array of errors
   *
   * @returns {Array}
   */
  getErrors() {
    return this._errors
  }

  /**
   * write a file onto disk
   *
   * @param {File} file
   * @return void
   */
  _saveFile(file) {
    fs.writeFile(file.getCompleteAddress(), file.getContent())
  }

  /**
   * write a folder onto the disk
   *
   * @param {Folder} folder
   * @return void
   */
  _saveFolder(folder) {
    if (!folder.hasChildren()) {
      fs.ensureDir(folder.getPath()) //... give directory path
    } else {
      folder.getChildren().forEach((child) => {
        if (child.getType() == "File") {
          this._saveFile(child)
        }
        if (child.getType() == "Folder") {
          this._saveFolder(child)
        }
      })
    }
  }

  /**
   * Start creating the folder structure
   * 
   * @return void
   */
  async scaffold() {
    if (this.hasErrors()) {
      throw new Error("FileScaffolder:ERROR - ") //... throw errors it tried to save files while having errors
    }
    try {      
      this._folderTree.forEach((node) => {
        switch (node.getType()) {
          case "File":
            this._saveFile(node)
            break

          case "Folder":
            this._saveFolder(node)
            break
        }
      })
    } catch (e) {
      //... console.log the erros occured while saving the files
      //... delete the created file tree

      console.log(e.message)
      console.log(`\n`)
      console.log("Error - Cannot save the files, rolling back the changes...")
      await fs.emptyDir(this._targetPath)
    }
  }
}

module.exports = Scaffolder
