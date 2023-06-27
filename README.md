# File Scaffolder

File Scaffolder is a powerful tool for quickly generating files and folder structures for your project using a JSON config file.

## About

File Scaffolder is a framework-agnostic tool that allows you to define your desired folder structure and files in a JSON configuration file. It provides an easy way to generate directory structures and populate files with content.

You can either specify the content directly in the configuration file or extend the `ContentProvider` class to have more control over the file's content generation.

## Installation

Install the package via npm:

```
npm install @maleeshagimshan98/file-scaffolder
```

## Getting Started

After installing the package, you can use the CLI command `file-scaffolder` to generate files and folders.

```
file-scaffolder -p <path/to/config/file> -t <destination/path/of/directory/structure> -c <path/to/content-provider/classes> (optional)

Options:
  
  --help         Show help                                             
  --version      Show version number                                   
  
  -p, --path     path/to/configuration_file - path to JSON file containing
                 structure for the project                            [required]
                 
  -t, --target   target folder path - the folder path where generated files
                 will be created                                      [required]
                 
  -c, --content  (optional) path/to/content_providers - an index.js file exporting
                 an object of ContentProvider classes - provide this parameter if you use your own ContentProvider classes to generate content for files
```

**Example**

Here is an example of a `config.json` file:

```json
[
  {
    "app": [
      { "home.vue": "" },
      { "sidebar.vue": "" }
    ]
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
          }
        ]
      }
    ]
  }
]
```

## Config.json

The `config.json` file contains all the directory and file structure configurations. You can create this file anywhere you want and pass its file path in the CLI command.

- **Note**: The config file must start with an array.

## How to Define Folders?

Use the following formats to define a folder:

#### String Only - Creates an Empty Folder
    
```json  
[
  "test-folder"
]
```

#### Object - {"folder_name": [...child folders and files...]}

```json
[
  {
    "folder_name": [
      {
        "child_folder": []
      }
    ]
  }
]
```

## How to Define Files?

Use the following formats to define a file:

**Note: Always add the file extension after the file name in every format.**

#### Object - {"file_name.extension": "content"}

```json
[
  {
    "file_name.extension": "file content"
  }
]
```

#### Object - {"name": "file_name.extension", "contentProvider": "content_provider_class_name", "data": {} (optional)}

```json
[
  {
    "name": "file_name.extension",
    "contentProvider": "content_provider_class_name",
    "data": {}
  }
]
```

## Contributing

Contributions are greatly appreciated and help make the open-source community a better place to learn, inspire, and create. If you have a suggestion to improve this project, please fork the repository and create a pull request. You can also open an issue with the "enhancement" tag. Don't forget to give the project a star! Thank you

!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

## Contact

- Email: maleeshagimshan74@gmail.com