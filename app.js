const {saveContact, listContact, detailContact, deleteContact} = require('./contacts')



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
}).demandCommand()

//show all data
yargs.command({
    command: 'list',
    describe: 'Show all contact',
    handler() {
        listContact()
    }
})

//detail
yargs.command({
    command: 'detail',
    describe: 'Show detail by name',
    builder: {
        name: {
            describe: 'fullname',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.name)
    }
})

//delete
yargs.command({
    command: 'delete',
    describe: 'Delete contact by name',
    builder: {
        name: {
            describe: 'fullname',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.name)
    }
})
yargs.parse()