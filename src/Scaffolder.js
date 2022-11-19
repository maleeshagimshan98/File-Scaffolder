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
        return new File(prop, `${path}`, data[prop]) //... check
      }
    }    
    
    if (!data.hasOwnProperty("name") || !data.hasOwnProperty("contentProvider")) {
      //... invalid file configuration
      throw new Error (`Invalid configuration data at ${path}`)
    }

    if (!this._contentProviders || Object.keys(this._contentProviders).length == 0) {
      throw new Error(`ContentProvider classes are not defined in Scaffolder.js `)
    }

    //... type 2
    if (typeof data.contentProvider == "string") {

      if (!this._isContentProviderDefined(data.contentProvider)) {
        throw new Error(`ContentProvider "${data.contentProvider}" at '${path}' is not defined`)
      }

      return new File(data.name,`${path}`,this._contentProviders[data.contentProvider].getContent())
    }

      //... type 3
      if (typeof data.contentProvider === "object") {
        if (!data.contentProvider.hasOwnProperty("name")) {
          throw new Error(`contentProvider.name is not defined at following file ${path}/${data.name}`)
        }

        if (!this._isContentProviderDefined(data.contentProvider.name)) {
          throw new Error(`ContentProvider "${data.contentProvider.name}" is not defined at ${path}/${data.name}`)
        }

        return new File(data.name,`${path}`,this._contentProviders[data.contentProvider.name].getContent())
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
   * handle the scaffolding of the project
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
      fs.ensureDir() //... give directory path
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
   * Start parsing the configuration and creating the folder structure
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
