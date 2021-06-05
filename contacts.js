const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')
// Menulis string ke file secara synchronous
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World Synchronous')
// } catch (error) {
//     console.log(error)
// }

// Menulis String ke File secara Asynchronous


//Membaca isi file secara synchronous
// const data = fs.readFileSync('data/test.txt', 'utf8');
// console.log(data)

//Membaca isi file secara Asynchronous
// fs.readFile('data/test.txt', 'utf8', (err, data) => {
//     if(err) throw err
//     console.log(data)
// })

//Readline
// const readline = require('readline')
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// Membuat Folder Data
const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

//Membuat file contacts.json
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}



// const question = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (value) => {
//             resolve(value)
//         })
//     })
// }

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const saveContact = (name, email) => {
    const contact = {name, email}
    const contacts = loadContact()
    
    
    // check existing contacts
    const existing = contacts.find((contact) => contact.name === name)
    if(existing) {
        console.log(existing)
        console.log(chalk.red.inverse.bold("Contact already exist"))
        return false
    }

    // check email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold("Email is invalid"))
        return false
        }
    }
    

    contacts.push(contact)
    fs.writeFile('data/contacts.json', JSON.stringify(contacts), (err) => {
        if(err) throw err
            console.log(chalk.green.inverse.bold('Add Contact Success'))
        })
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Contact List'))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name}`)
    })
}

const detailContact = (name) => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Detail'))
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
    if(!contact) {
        console.log(chalk.red.inverse.bold("Contact Not Found"))
        return false
    }
    console.log(chalk.cyan.inverse.bold(contact.name))
    if(contact.email) {
        console.log(chalk.cyan.inverse.bold(contact.email))
    }

}

const deleteContact = (name) => {
    const contacts = loadContact()
    const newContacts = contacts.filter(contact => contact.name.toLowerCase() !== name.toLowerCase())

    if(contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold("Contact Not Found"))
        return false
    }

    fs.writeFile('data/contacts.json', JSON.stringify(newContacts), (err) => {
        if(err) throw err
        console.log(chalk.green.inverse.bold('Delete Contact Success'))
    })

}

module.exports = {
    saveContact, listContact, detailContact, deleteContact
}