
const messageParts = {
    beginnings: ['Hi! ', 'Hello! ', 'What a good day... ', 'What\'s up everybody? ', 'Hello once again! ', 'Greetings! ', 'Well hello there! ', 'Hi there guys! ', 'Hi everyone! ' ],
    bodies: ['Let\'s see... ', 'It\'s time for a new post! ', 'I wish you all productive day! ', 'How are you today? '],
    endings: ['Today, i am going to learn ', 'It\'s time for some ', 'So today it\'s time to talk about '],
    techs: ['React', 'Redux', 'TypeScript', 'native JS'],
    puncts: ['.', '!', '...', ' ;)', ' :)']
}

export function generateMessage(name?: string) {
    const beginning = messageParts.beginnings[Math.floor(messageParts.beginnings.length * Math.random())]
    const body = messageParts.bodies[Math.floor(messageParts.bodies.length * Math.random())]
    const ending = messageParts.endings[Math.floor(messageParts.endings.length * Math.random())]
    const tech = messageParts.techs[Math.floor(messageParts.techs.length * Math.random())]
    const punct = messageParts.puncts[Math.floor(messageParts.puncts.length * Math.random())]
    if (name) {
        name = (name[0].toUpperCase() + name.slice(1)).split(' ')[0]
    }
    return (beginning
        + (Math.round(Math.random()) && name ? name + ' here! ' : '')
        + body
        + (Math.round(Math.random()) ? ending + tech + punct : ''))
}