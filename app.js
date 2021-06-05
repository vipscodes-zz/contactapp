const {question, saveContact} = require('./contacts')



// const main = async () => {
//     const name = await question('Name : ' )
//     const email = await question('Email : ' )

//     saveContact(name, email)
// }

// main()


//ambil argumen command line
// const command = process.argv[2]
// if(command === 'add') {

// } else if(command === 'remove') {

// } else if(command === 'list') {
    
// }
const yargs = require("yargs");

yargs.command({
    command: 'add',
    describe: 'Add New Contact',
    builder: {
        name: {
            describe: 'fullname',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'email',
            demandOption: false,
            type: 'string',
        }
    },
    handler(argv) {
        saveContact(argv.name, argv.email)
    }
})

yargs.parse()