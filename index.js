const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code generated. Scan it with WhatsApp to log in.');
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

client.on('message', async (message) => {
    const body = message.body.toLowerCase();

    if (body === '!ping') {
        message.reply('pong');
    } else if (body === '!hello') {
        message.reply('Hello! How can I help you?');
    } else if (body === '!help') {
        message.reply(
            'Available commands:\n' +
            '!ping - Check if bot is alive\n' +
            '!hello - Get a greeting\n' +
            '!help - Show this help message'
        );
    }
});

client.initialize();
