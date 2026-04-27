const fs = require('fs');
const file = '/Users/tinochan06/gowildtours/lib/packages-data.ts';
let content = fs.readFileSync(file, 'utf8');

let lines = content.split('\n');
let currentTitle = '';

for (let i = 0; i < lines.length; i++) {
    // Top-level packages have an id:, slug:, title: structure
    // Let's match `        title: "...",` to avoid inner itinerary titles which are more indented.
    let titleMatch = lines[i].match(/^ {8}title:\s*"(.*?)"/);
    if (titleMatch) {
        currentTitle = titleMatch[1];
    }

    if (currentTitle && lines[i].match(/^ {8}price:\s*\d+/)) {
        console.log(`Title: "${currentTitle}", Price: ${lines[i].trim()}`);
        currentTitle = '';
    }
}
