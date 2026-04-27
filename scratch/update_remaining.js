const fs = require('fs');

const file = '/Users/tinochan06/gowildtours/lib/packages-data.ts';
let content = fs.readFileSync(file, 'utf8');

const priceMap = [
    { match: /9 Days Namibia-Etosha-Damaraland, Ocean and Desert/i, newPrice: 4400 },
    { match: /7 Days Victoria Falls to Okavango Delta/i, newPrice: 4400 }, // Assume this corresponds to the 9days one or just needs price update
    { match: /8 Days Namibia-Etosha, Ocean and Desert/i, newPrice: 3910 },
    { match: /The Best of Zambia, Zimbabwe (and|&) Botswana Luxury Safari/i, newPrice: 9750 },
];

let lines = content.split('\n');
let currentTitle = '';
let matchedIndex = -1;

for (let i = 0; i < lines.length; i++) {
    let titleMatch = lines[i].match(/^ {8}title:\s*"(.*?)"/);
    if (titleMatch) {
        currentTitle = titleMatch[1];
        matchedIndex = -1;
        for (let j = 0; j < priceMap.length; j++) {
            if (priceMap[j].match.test(currentTitle)) {
                matchedIndex = j;
                break;
            }
        }
    }

    if (matchedIndex !== -1 && lines[i].match(/^ {8}price:\s*\d+/)) {
        const oldLine = lines[i];
        lines[i] = lines[i].replace(/price:\s*\d+/, `price: ${priceMap[matchedIndex].newPrice}`);
        console.log(`Updated "${currentTitle}": ${oldLine.trim()} -> ${lines[i].trim()}`);
        matchedIndex = -1; 
    }
}

fs.writeFileSync(file, lines.join('\n'));
