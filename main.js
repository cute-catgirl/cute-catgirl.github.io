const version = "0.1.0";

const domain = window.location.hostname;
const output = document.getElementById("output");
const input = document.getElementById("input");
const allowedChars = /^[0-9a-zA-Z !@#$%^&*()_+-=,.<>?;:'"\/\\|[\]{}~]$/;
const themes = ["dark", "light", "black"];

const commands = {
    "help": (args) => {
        outputContents.push("-- COMMANDS --");
        outputContents.push("help - display this help message");
        outputContents.push("clear - clear the terminal");
        outputContents.push("info - display information about me");
        outputContents.push("projects - display my projects");
        outputContents.push("contact - display my contact information");
        outputContents.push("theme [theme] - change the terminal theme (use without arguments to list themes)");
    },
    "clear": (args) => {
        outputContents = [`${domain} v${version}`, "Type 'help' for a list of commands"];
    },
    "info": (args) => {
        outputContents.push("-- INFO --");
        outputContents.push("Age ~ 16");
        outputContents.push("Pronouns ~ She/Her");
        outputContents.push("Location ~ Canada");
    },
    "projects": (args) => {
        outputContents.push("-- PROJECTS --");
        outputContents.push("Website ~ Amazingly, you are already there.");
    },
    "contact": (args) => {
        outputContents.push("-- CONTACT --");
        outputContents.push("Email ~ benmoon372@gmail.com");
        outputContents.push("Github ~ boxit379");
        outputContents.push("Discord ~ cute_catgirl");
        outputContents.push("Mastodon ~ @catgirl@tech.lgbt");
    },
    "theme": (args) => {
        if (args.length === 0) {
            outputContents.push("THEMES:");
            // Set the current theme to [theme] - Current!
            const themesTxt = themes.map((theme) => {
                if (theme === document.getElementById("theme").href.split("/").pop().split(".")[0]) {
                    return `${theme} - Current!`;
                }
                return `${theme}`;
            });
            // join w/ newline
            outputContents.push(themesTxt.join("<br>"));
            return;
        }

        const theme = args[0].toLowerCase();
        if (themes.includes(theme)) {
            document.getElementById("theme").href = `themes/${theme}.css`;
            outputContents.push(`Theme set to ${theme}`);
        } else {
            outputContents.push(`${theme}: theme not found`);
        }
    }
}

let outputContents = [`${domain} v${version}`, "Type 'help' for a list of commands"];
let inputContents = "";

function updateTerminal() {
    input.innerHTML = `[user@${domain}]$ ${inputContents}`;
    output.innerHTML = outputContents.join("<br>");
}

function parseCommand(input) {
    // Split the input into an array of words
    const words = input.trim().split(' ');

    // The first word is the command
    const command = words[0].toLowerCase();

    // The rest of the words are arguments
    const args = words.slice(1);

    // Return an object with the command and arguments
    return {
        command: command,
        arguments: args
    };
}

function runCommand(input) {
    // Parse the input
    const parsedInput = parseCommand(input);

    // Get the command and arguments from the parsed input
    const command = parsedInput.command;
    const args = parsedInput.arguments;

    // Check if the command exists
    if (command in commands) {
        // Run the command
        commands[command](args);
    } else {
        // Command not found
        outputContents.push(`${command}: command not found`);
    }

    // Clear the input
    inputContents = "";
    updateTerminal();
}

window.addEventListener("load", (event) => {
    document.title = `user@${domain}`;
    updateTerminal()
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        inputContents = inputContents.slice(0, -1);
    } else if (event.key === "Enter") {
        runCommand(inputContents);
    } else {
        if (allowedChars.test(event.key)) {
            inputContents += event.key;
        }
    }
    updateTerminal();
});