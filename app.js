const {question, saveContact} = require('./contacts')

const main = async () => {
    const name = await question('Name : ' )
    const email = await question('Email : ' )

    saveContact(name, email)
}

main()
