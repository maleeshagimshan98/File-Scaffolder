#! /usr/bin/env node

/**
 * Copyright - Maleesha Gimshan - 2022 - www.github.com/maleeshagimshan98
 */

const fs = require('@supercharge/filesystem')
const yargs = require('yargs')
const Scaffolder = require("./Scaffolder")

const options = yargs.usage('Usage: -path <path>').option("p", {
    alias: "path",
    describe: "path/to/configuration_file - path to JSON file containing structure for the project",
    demandOption: true
})
.option(
    "t",
    {
        alias: "target",
        describe: "target folder path - the folder path where generated files created",
        demandOption: true
    })
.argv

/**
 * handle the scaffolding of the project
 * 
 * @return {void}
 */
async function scaffold() {
    try {
        if (!options.path) {
            throw new Error('Please enter the path/to/configuration')
        }

        let config = JSON.parse(await fs.readFile(options.path))
        let scaffolder = new Scaffolder()
        scaffolder.init(config,options.target)

        /**
         * testing
         */

        //console.log(scaffolder.getErrors())

        //...........................

        if (scaffolder.hasErrors()) {
            console.log(`\n`)
            scaffolder.getErrors().forEach(error => {                 
                 console.log(`${error.message}`)                 
            })
            console.log(`\n`)
            return
        }
        await scaffolder.scaffold()
    }  
      
    catch (e) {
        console.error(`Errors found - ${e.message}`)
        fs.emptyDir(options.target)        
    }

}

scaffold()