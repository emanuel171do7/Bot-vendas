const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Cria um mini servidor web para o Render não fechar o bot
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot está online!\n');
}).listen(process.env.PORT || 3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);
});

// O token pega automaticamente da variável de ambiente que configuramos
client.login(process.env.TOKEN);
