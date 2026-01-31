const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data 
const TEST_DATA = {
  positive: [
    {
    tcId: 'Pos_Fun_001',
    name: 'Compound sentence with two actions',
    input: 'mama kaeema kannam saha passee chithrapatayakuth balanavaa',
    expected: 'මම කෑම කන්නම් සහ පස්සේ චිත්‍රපටයකුත් බලනවා',
    category: 'Daily language usage',
    grammar: 'Compound sentence',
    length: 'S'
   },
   {
    tcId: 'Pos_Fun_002',
    name: 'Interrogative question',
    input: 'oyaa kohedha innee',
    expected: 'ඔයා කොහෙද ඉන්නේ',
    category: 'Daily language usage',
    grammar: 'Interrogative (question)',
    length: 'S'
   },
  
   {
      tcId: 'Neg_Fun_003',
      name: 'Incorrect sentence structure',
      input: 'mama paasalata yannee naehae',
      expected: 'මම පාසලට යන්නේ නැහැ',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
     
    {
      tcId: 'Pos_Fun_004',
      name: 'Mixed English + Singlish sentence',
      input: 'mata adha zoom meeting ekata yanna baeri unaane',
      expected: 'මට අද zoom meeting එකට යන්න බැරි උනානෙ',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_005',
      name: 'Currency format in sentence',
      input: 'meeke gaana Rs.2000 yi',
      expected: 'මේකෙ ගාන Rs.2000 යි',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_006',
      name: 'Time format in sentence',
      input: 'adha oyaalage lecture eka patanganne 8.30 AM',
      expected: 'අද ඔයාලගෙ lecture එක පටන්ගන්නෙ 8.30 AM',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    {
    tcId: 'Pos_Fun_007',
    name: 'Numbers in sentence',
    input: 'mata peera gedi 10 k dhenna',
    expected: 'මට පේර ගෙඩි 10 ක් දෙන්න',
    category: 'Punctuation / numbers',
    grammar: 'Simple sentence',
    length: 'S'
   },
   
 {
      tcId: 'Pos_Fun_008',
      name: 'Complex conditional sentence',
      input: 'oyaa kanavanam mQQ eevama hadhannam',
      expected: 'ඔයා කනවනම් මං ඒවම හදන්නම්',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'S'
    },
    {
  tcId: 'Pos_Fun_009',
  name: 'Informal gaming plan with friends',
  input: 'apee squad eka adha raee 10ta game ekata enna hithuvee, rank gahanna try karamu, hariyata practice karanna , aluthen hero kenekuth aevithlu.',
  expected: 'අපේ squad එක අද රෑ 10ට game එකට එන්න හිතුවේ, rank ගහන්න try කරමු, හරියට practice කරන්න , අලුතෙන් hero කෙනෙකුත් ඇවිත්ලු.',
  category: 'Slang / informal language',
  grammar: 'Compound sentence',
  length: 'M'
},

{
  tcId: 'Pos_Fun_010',
  name: 'Past tense - missed the bus',
  input: 'mata iiye bus eka mis unaa',
  expected: 'මට ඊයෙ bus එක මිස් උනා',
  category: 'Daily language usage',
  grammar: 'Past tense',
  length: 'S'
},

{
    tcId: 'Pos_Fun_011',
    name: 'Polite request for help',
    input: 'karuNaakaralaa mata poddak udhavvak karanna puLuvandha',
    expected: 'කරුණාකරලා මට පොඩ්ඩක් උදව්වක් කරන්න පුළුවන්ද',
    category: 'PUsability flow',
    grammar: 'Interrogative (question)',
    length: 'M'
   },

   {
  tcId: 'Pos_Fun_012',
  name: 'Frequently used daily expression - hunger',
  input: 'mata badagini',
  expected: 'මට බඩගිනි',
  category: 'Frequently used day-to-day expressions',
  grammar: 'Simple sentence',
  length: 'S'
},
  {
  tcId: 'Pos_Fun_013',
  name: 'Common response - finishing soon',
  input: 'harii eka mQQ ikmanata ivara karannam',
  expected: 'හරී එක මං ඉක්මනට ඉවර කරන්නම්',
  category: 'Greeting / request / response',
  grammar: 'Simple sentence',
  length: 'S'
},

{
  tcId: 'Pos_Fun_014',
  name: 'Imperative command to come and sit',
  input: 'vahaama aevith methanin idhaganna',
  expected: 'වහාම ඇවිත් මෙතනින් ඉදගන්න',
  category: 'Daily language usage',
  grammar: 'Imperative (command)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_015',
  name: 'Past tense - forgot to bring ID to exam',
  input: 'mata iiye exam ekata ID eka aran yanna amathaka unaane',
  expected: 'මට ඊයෙ exam එකට ID එක අරන් යන්න අමතක උනානෙ',
  category: 'Names / places / common English words',
  grammar: 'Past tense',
  length: 'M'
},

{
  tcId: 'Pos_Fun_016',
  name: 'Interrogative - asking about health condition',
  input: 'oyaage asaniipaya dhaen hodhayidha?',
  expected: 'ඔයාගෙ අසනීපය දැන් හොදයිද?',
  category: 'Daily language usage',
  grammar: 'Interrogative (question)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_017',
  name: 'Past tense - missed the bus',
  input: 'mata iiye bus eka mis unaa',
  expected: 'මට ඊයෙ bus එක මිස් උනා',
  category: 'Daily language usage',
  grammar: 'Past tense',
  length: 'S'
},
{
  tcId: 'Pos_Fun_018',
  name: 'Past tense - sent email',
  input: 'mama iiye teacher ta email ekak yaevvaa',
  expected: 'මම ඊයෙ teacher ට email එකක් යැව්වා',
  category: 'Mixed Singlish + English',
  grammar: 'Past tense',
  length: 'S'
},
{
  tcId: 'Pos_Fun_019',
  name: 'Interrogative - asking why cannot do something',
  input: 'aeyi oyata baeri mama kiyana dhee karanna?',
  expected: 'ඇයි ඔයට බැරි මම කියන දේ කරන්න?',
  category: 'Daily language usage',
  grammar: 'Interrogative (question)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_020',
  name: 'Future tense negative - cannot do project tomorrow',
  input: 'mata heta project eka karanna baee',
  expected: 'මට හෙට project එක කරන්න බෑ',
  category: 'Mixed Singlish + English',
  grammar: 'Negation (negative form)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_021',
  name: 'Immediate future tense - urgent need to go now',
  input: 'mata dhaenma ehe yanna oonee',
  expected: 'මට දැන්ම එහෙ යන්න ඕනේ',
  category: 'Daily language usage',
  grammar: 'Future tense (immediate intention)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_022',
  name: 'Present tense with concern about exam preparation',
  input: 'heta exam eeth mama thaama paadam karala ivara naeene',
  expected: 'හෙට exam ඒත් මම තාම පාඩම් කරල ඉවර නෑනෙ',
  category: 'Frequently used day to day',
  grammar: 'Present perfect / informal spoken',
  length: 'M'
},
{
  tcId: 'Pos_Fun_023',
  name: 'Expressing physical condition',
  input: 'adha mata godak amaaruyi',
  expected: 'අද මට ගොඩක් අමාරුයි',
  category: 'Daily language usage',
  grammar: 'Simple sentence',
  length: 'S'
},




{
  tcId: 'Pos_Fun_024',
  name: 'Future tense negative - cannot join meeting',
  input: 'mata heta meeting ekata join venna baee',
  expected: 'මට හෙට meeting එකට join වෙන්න බෑ',
  category: 'Mixed Singlish + English',
  grammar: 'Negation (negative form)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_025',
  name: 'Imperative command - come quickly',
  input: 'ikmanata enna',
  expected: 'ඉක්මනට එන්න',
  category: 'Daily language usage',
  grammar: 'Imperative (command)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_026',
  name: 'Positive response',
  input: 'hari mama eeka karannam',
  expected: 'හරි මම ඒක කරන්නම්',
  category: 'Greeting / request / response',
  grammar: 'Simple sentence',
  length: 'S'
},
{
  tcId: 'Pos_Fun_027',
  name: 'Future tense suggestion with place mention',
  input: 'heta api kandy yamudha',
  expected: 'හෙට අපි kandy යමුද',
  category: 'Future tense / suggestion',
  grammar: 'Interrogative (question)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_028',
  name: 'Polite request for water',
  input: 'mata vathura tikak dhenna puLuvandha',
  expected: 'මට වතුර ටිකක් දෙන්න පුළුවන්ද',
  category: 'Greeting / request / response',
  grammar: 'Interrogative (question)',
  length: 'S'
},
{
  tcId: 'Pos_Fun_029',
  name: 'Date mention in sentence',
  input: 'adha January 31 dha',
  expected: 'අද January 31 ද',
  category: 'Punctuation / numbers',
  grammar: 'Simple sentence',
  length: 'S'
}


  
   
  ],










  negative: [
    
    
    {
      tcId: 'Neg_Fun_001',
      name: 'Polite question request',
      input: 'karuNaakaralaa mata mage poth tika dhenna puLuvandha?',
      expected: 'කරුණාකරලා මට මගෙ පොත් ටික දෙන්න පුළුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },

    
    
   {
    tcId: 'Neg_Fun_002',
    name: 'Conditional complex sentence',
    input: 'oyaa paadam vaeda hariyata karanavanam man oyaata phone ekak aran dhennam',
    expected: 'ඔයා පාඩම් වැඩ හරියට කරනවනම් මන් ඔයාට phone එකක් අරන් දෙන්නම්',
    category: 'Daily language usage',
    grammar: 'Complex sentence',
    length: 'M'
    },
      
{
  tcId: 'Neg_Fun_003',
  name: 'Repeated word emphasis about eating',
  input: 'ape malli podda podda kanne kama',
  expected: 'අපේ මල්ලී පොඩ්ඩ පොඩ්ඩ කන්නේ කෑම',
  category: 'Repeated word expressions',
  grammar: 'Simple sentence',
  length: 'S'
},
{
  tcId: 'Neg_Fun_004',
  name: 'Future tense plan for job',
  input: 'mama anivarYAyenma heta udheema job ekata yanavaa',
  expected: 'මම අනිවර්‍යයෙන්ම හෙට උදේම job එකට යනවා',
  category: 'Daily language usage',
  grammar: 'Future tense',
  length: 'S'
},
{
  tcId: 'Neg_Fun_005',
  name: 'Warning message for English abbreviation click',
  input: 'mee URL ekee mokakhari avulak thiyenavaa click karanakota warning ekak enavaa',
  expected: 'මේ URL එකේ මොකක්හරි අලුක තියෙනවා click කරනකොට warning එකක් එනවා',
  category: 'English abbreviations',
  grammar: 'Simple sentence',
  length: 'S'
},
{
  tcId: 'Neg_Fun_006',
  name: 'Mentioning a date in a sentence',
  input: 'ape annavasatry eka 2021/01/02',
  expected: 'අපේ annavasatry එක 2021/01/02',
  category: 'Punctuation / numbers',
  grammar: 'Simple sentence',
  length: 'S'
},

    
  ],






  ui: {
    tcId: 'Pos_UI_001',
    name: 'Real-time translation updates as typing',
    input: 'mama kaeema kannavaa',
    partialInput: 'mama kaeema kanava',
    expectedFull: 'මම කෑම කනවා',
    category: 'Usability flow',
    grammar: 'Present tense',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});