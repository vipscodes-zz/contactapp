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

const saveContact = (name, email) => {
    const contact = {name, email}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    
    
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

module.exports = {
    saveContact
}