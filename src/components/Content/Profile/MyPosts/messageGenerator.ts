
const messageParts = {
    beginnings: ['Hi! ', 'Hello! ', 'What a good day... ', 'What\'s up everybody? ', 'Hello once again! '],
    bodies: ['It\'s time for a new post! ', 'I wish you all productive day! ', 'How are you today? '],
    endings: ['React', 'Redux', 'TypeScript']
}

export function generateMessage(name?: string) {
    const beginning = messageParts.beginnings[Math.floor(messageParts.beginnings.length * Math.random())]
    const body = messageParts.bodies[Math.floor(messageParts.bodies.length * Math.random())]
    const ending = messageParts.endings[Math.floor(messageParts.endings.length * Math.random())]
    if (name) {
        name = (name[0].toUpperCase() + name.slice(1)).split(' ')[0]
    }
    return (beginning
        + (Math.round(Math.random()) && name ? name + ' here! ' : '')
        + body
        + (Math.round(Math.random()) ? 'Today, i am going to learn ' + ending + '!' : ''))
}