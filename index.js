// Set up discord bot settings:
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = ''; // EDIT THIS
const version = '1.0.0'

// Global varibles that are settings for the bot
// Loads random qoute dictionary
var fs = require("fs");
var text = fs.readFileSync("./quotes.txt", "utf-8");
var textByLine = text.split("\n")

const PREFIX = '/';
var channel_ID = '' // EDIT THIS

// Set the schedule for daily annoucement
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = 10;
rule.minute = 0;

// What it does on the daily announcement
var j = schedule.scheduleJob(rule, function () {
    var randomItem = textByLine[Math.floor(Math.random() * textByLine.length)]; // Randomly selects a word
    const channel = bot.channels.cache.get(channel_ID); // selects channel
    channel.send('Tip of the day: ' + randomItem); // sends message
    });

// When the bot turns on
bot.on('ready', () => {

    console.log('HUFS bot ready!');

})

//For responding to messages: 
bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'help':
            message.channel.send(' COMMANDS:')
            message.channel.send('Prefix = /')
            message.channel.send('Ping: Tests if I am responding')
            message.channel.send('shutdown: Takes me to...the farm...T_T')
            message.channel.send('select channel: Changes channel I announce on')
            message.channel.send('clear: deletes a number of messages specified by the user')
            message.channel.send('help: Sends this message')
            break;
        case 'ping':
            message.channel.send('pong')
            break;
        case 'shutdown':
            message.channel.send('Shutting down...')
            client.destroy(); // I know this says client but it crashes the bot which effectivly does the same as shutting it down.
            break;
        case 'select':
            if (args[1] === 'channel') {
                channel_ID = args[2]
                message.channel.send('Channel ID has changed')
            } else {
                message.channel.send('Invalid args')
            }
            break;
        case 'clear':
            if (!args[1]) return message.reply('Error please define second arg')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

bot.login(token);

// documents\discord bot


