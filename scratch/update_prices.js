const fs = require('fs');

const file = '/Users/tinochan06/gowildtours/lib/packages-data.ts';
let content = fs.readFileSync(file, 'utf8');

const priceMap = [
    { match: /3 Days Victoria Falls/i, newPrice: 1870 },
    { match: /3(\s|-)?Days Hwange/i, newPrice: 1470 },
    { match: /4(\s|-)?Days Victoria Falls and Livingstone/i, newPrice: 1960 },
    { match: /4(\s|-)?Days Victoria Falls and Chobe/i, newPrice: 1960 },
    { match: /5(\s|-)?Days Victoria Falls and Chobe/i, newPrice: 2445 },
    { match: /5(\s|-)?Days Victoria Falls and Hwange/i, newPrice: 2445 },
    { match: /5(\s|-)?Days Victoria Falls, Livingstone and Chobe/i, newPrice: 2445 },
    { match: /5(\s|-)?Days Chobe and Okavango Delta/i, newPrice: 2445 },
    { match: /6(\s|-)?Days Victoria Falls, Livingstone and Chobe/i, newPrice: 3950 },
    { match: /Botswana Waterways and Wildlife/i, newPrice: 2930 },
    { match: /7(\s|-)?Days Across Zimbabwe/i, newPrice: 3420 },
    { match: /7(\s|-)?Days Victoria Falls, Chobe and Hwange/i, newPrice: 3420 },
    { match: /7(\s|-)?Days Victoria Falls, Chobe (and|&) Okavango Delta/i, newPrice: 6780 },
    { match: /7(\s|-)?Days Vic Falls, Chobe, Makgadikgadi/i, newPrice: 3420 },
    { match: /Great Botswana Highlights Tour/i, newPrice: 3420 },
    { match: /7(\s|-)?Days Etosha and Desert/i, newPrice: 3420 },
    { match: /8(\s|-)?Days Etosha, Ocean and Desert/i, newPrice: 3910 },
    { match: /9(\s|-)?Days Etosha, Damaraland/i, newPrice: 4400 },
    { match: /9(\s|-)?Days Victoria Falls to Okavango Delta/i, newPrice: 4400 },
    { match: /Hwange and Botswana/i, newPrice: 4890 },
    { match: /13(\s|-)?Days Southern Zambia/i, newPrice: 6580 },
    { match: /best of Zambia, Zimbabwe and Botswana flying/i, newPrice: 9750 },
    { match: /best of Zambia, Zimbabwe, Botswana and Namibia flying/i, newPrice: 15700 },
];

let updatedCount = 0;

// Since parsing typescript objects perfectly with regex is hard, let's regex replace based on the title block.
// We can match the object block roughly:
// title: "...",\n...price: XXX,

// Or better, let's parse the file by looking for `title: "..."` and the nearest `price: ...`
let lines = content.split('\n');
let currentTitle = '';
let matchedIndex = -1;

for (let i = 0; i < lines.length; i++) {
    let titleMatch = lines[i].match(/title:\s*"(.*?)"/);
    if (titleMatch) {
        currentTitle = titleMatch[1];
        matchedIndex = -1;
        // See if it matches our priceMap
        for (let j = 0; j < priceMap.length; j++) {
            if (priceMap[j].match.test(currentTitle)) {
                matchedIndex = j;
                break;
            }
        }
    }

    if (matchedIndex !== -1 && lines[i].includes('price:')) {
        const oldLine = lines[i];
        lines[i] = lines[i].replace(/price:\s*\d+/, `price: ${priceMap[matchedIndex].newPrice}`);
        console.log(`Updated "${currentTitle}": ${oldLine.trim()} -> ${lines[i].trim()}`);
        matchedIndex = -1; // Done for this package
        updatedCount++;
    }
}

fs.writeFileSync(file, lines.join('\n'));
console.log(`Updated ${updatedCount} prices.`);
