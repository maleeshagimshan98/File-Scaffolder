# file-scaffolder
A tool to quickly generate files and folder structures for your project using a JSON config file.

## About

This tool can be used to generate any kind of directory structures and files. In fact it is framework agnostic.
Define your desired folder structure, and files residing in those folders in .json file, and thats all. 

You may also add content to your files simply via the configuration or you can extend `ContentProvider` class to gain more controll over the file's content.


## Installation

Install the package with npm

- `npm install @maleeshagimshan98/file-scaffolder `

## Getting Started

After installing the package, simply use cli command ```` file-scaffolder ````

```` 
  file-scaffolder  -p <path/to/config/file> -t <destination/path/of/directory/structure> -c <path/to/content-provider/classes> (optional)
  
  Options:
  
  --help         Show help                                             
  --version      Show version number                                   
  
  -p, --path     path/to/configuration_file - path to JSON file containing
                 structure for the project                            [required]
                 
  -t, --target   target folder path - the folder path where generated files
                 created                                              [required]
                 
  -c, --content  (optional) path/to/content_proviers - an index.js file exporting
                 an object of ContentProvider classes - provide this parameter if you use your own ContentProvider classes to generate content for files

````

**Example**

Below is a example ```` config.json ```` file.
Example config.json file is also available on test folder

````
[
  {
    "app": [{ "home.vue": "" }, { "sidebar.vue": "" }]
  },
  {
    "components": [
      {
        "comp1.vue": "test_component1"
      },
      {
        "component_subfolder": [
          {
            "name": "child_folder_file_1.vue",
            "contentProvider": "subfoldertestcontent1"
          },
        ]
      }
    ]
  }
]          
````

## Config.json

This file contains all the directory and files structure configuration. You can create this file anywhere you want. Only you need to do is pass the file path of this file in cli.

- **Note** - Config file must start with an array

## How to define Folders?

Use following formats to define a folder

#### String only - creates an empty folder
    
    ````  
    config.json
    
    [
      "test-folder"      
    ]    
    ````
#### Object   - [.... { "folder_name" : [ .... child folders and files] } ]
 
 ````
 *config.json*
 
 [
   {
      "folder_name" : [
        {
          "child_folder" : []
        }
      ]
   }
 ]
 
 ````

## How to define Files?

Use following formats to define a file

**Note - Always add file extension after file name in every format**

#### Object -  { "file_name.extension" : "content"}
````
*config.json*
[
  {
    "file_name.extension" : "file content"
  }
]
````

#### Object - { "name" : "file_name.extension", "contentProvider" : "content_provider_class_name", "data" : {} (optional) }
````
*config.json*
[
  {
    "name" : "file_name.extension",
    "contentProvider" : "content_provider_class_name",
    "data" : {} //... optional, provide values for variable data defined in content provider
  }
]

````






## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request


## Licence
Distributed under the MIT License

## Contact

- email - (maleeshagimshan74@gmail.com)











