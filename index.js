const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize WhatsApp client with persistent login
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true }); // Display QR code in the terminal
});

client.on('ready', () => {
  console.log('WhatsApp bot is ready!');
});

// Listen for messages and send auto-responses based on message content
client.on('message', message => {
  const text = message.body.toLowerCase(); // Convert message to lowercase for easy comparison

  if (text.includes('سلام')) {
    message.reply(' سلام من هارون هدفمند غوریانی هستم  بزودی به پیام شما پاسخ خواهد داد سپاس 🙏!');
  } else if (text.includes('چخبر')) {
    message.reply(" شکر ممنون شما چطور!");
  } else {
    // Default response for unrecognized messages
    message.reply("Sorry, I didn't understand that. Try saying 'hello' or 'how are you'.");
  }
});

// Start the WhatsApp client
client.initialize();

// Optional: Set up an express server to keep it running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
