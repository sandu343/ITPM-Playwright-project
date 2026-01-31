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

// Test Data - Negative Test Cases
const negativeTests = [
  {
    tcId: 'Neg_Fun_0001',
    name: 'Multi-spaces input conversion',
    input: 'api  havasata  ennam   ehenam.                 vena   monaa  karannadha?  balan   inna eka     theerumak naethi    vaedak ne',
    expected: 'අපි හවසට එන්නම් එහෙනම්. වෙන මොනා කරන්නද? බලන් ඉන්න එක තේරුමක් නැති වැඩක් නේ',
    category: 'Formatting (spaces / line breaks / paragraph)',
    grammar: 'compound sentence',
    length: 'M'
  },
  {
    tcId: 'Neg_Fun_0002',
    name: 'Joined words stress test',
    input: 'mataadhanambaeriveevi',
    expected: 'මට අද නම් බැරි වේවි',
    category: 'Formatting (spaces / line breaks / paragraph)',
    grammar: 'Future tense',
    length: 'S'
  },
  {
    tcId: 'Neg_Fun_0003',
    name: 'Mispelled phrase conversion',
    input: 'mama etanata yannava',
    expected: 'මම එතනට යනවා',
    category: 'Typographical error handling',
    grammar: 'Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Neg_Fun_0004',
    name: 'Convert long narrative mixing greetings, tenses, places,brands, slang and questions with varied grammar',
    input: 'mama suba udhaesanak vagee dinayak pathan karanavaa. iiyee api Colombo giyaa saha passe Kandy valata train eke giyaa. eka hari ela trip ekak unee. mata oona vagee thiyenavaa, namuth vahina nisaa dhaen yanne naee. oyaa enavadha maath ekka? karuNaakaralaa mata WhatsApp eke message eka evanna puLuvandha? api heta office yanavaa saha meeting ekak thiyennee Zoom eke. documents tika attach karalaa email karanna oone. dhaen ithin monavadha karanne? machan, ela kiri!! mama gedhara innee, namuth nidhimath naee. suba raethreak veth!',
    expected: 'මම සුබ උදැසනක් වගේම දිනයක් ප්‍රාර්තනා කරනවා. ඊයේ අපි Colombo ගියා සහ පස්සෙ Kandy වලට train eke ගියා. එක හරි එල trip එකක් උනා. මට ඕන වගේ තියෙනවා, නමුත් වහින නිසා දැන් යන්නෙ නෑ. ඔයා එනවද මාත් එක්ක? කරුණාකරලා මට WhatsApp eke message එක එවන්න පුළුවන්ද? අපි හෙට office යනවා සහ meeting එකක් තියෙන්නේ Zoom eke. documents ටික attach කරලා email කරන්න ඕනෙ. දැන් ඉතින් මොනවද කරන්නේ? මචන්, එල කිරි!! මම ගෙදර ඉන්නේ, නමුත් නිදිමත නෑ. සුබ රාත්‍රියක් වේවා!',
    category: 'Typographical error handling',
    grammar: 'Compound sentence',
    length: 'L'
  },
  {
    tcId: 'Neg_Fun_0005',
    name: 'Mismatch source language word included phrase conversion',
    input: 'adha mama alışveriş karanna yanavaa',
    expected: 'අද මම shopping කරන්න යනවා',
    category: 'Mixed Singlish + English',
    grammar: 'Present tense',
    length: 'M'
  },
  {
    tcId: 'Neg_Fun_0006',
    name: 'Incorrect vowel usage',
    input: 'kthw',
    expected: 'කතාව',
    category: 'Typographical error handling',
    grammar: 'Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Neg_Fun_0007',
    name: 'Convert word with excessive use of special characters',
    input: 'vass@an@ya!!',
    expected: 'වස්සානය',
    category: 'Typographical error handling',
    grammar: ' Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Neg_Fun_0008',
    name: 'Other language input convrsion',
    input: 'Nous devons partir à Dubaï demain',
    expected: 'Nous devons partir à Dubaï demain',
    category: ' Typographical error handling',
    grammar: 'Simple sentence',
    length: 'M'
  },
  {
    tcId: 'Neg_Fun_0009',
    name: 'Too many repeated letters include word conversion',
    input: 'vaaaaasssssssaaaaanaaayaaa',
    expected: 'වස්සානය',
    category: 'Typographical error handling',
    grammar: 'Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Neg_Fun_0010',
    name: 'English technical terms embedded words+ slang,english words mixed request conversion',
    input: 'Adoo bokka, mata Hotspot tikak dhiyanko tikakata. sure sure vaediya use karan naee mee form eka fill karala submit karagannayi data package ekak dhaagannayi vitharayi baQQ',
    expected: 'අඩෝ බොක්ක, මට Hotspot ටිකක් දියන්කො ටිකකට. sure sure වැඩිය use කරන් නෑ මේ form එක fill කරල submit කරගන්නයි data package එකක් දාගන්නයි විතරයි බං',
    category: 'Slang / informal language',
    grammar: 'Compound sentence',
    length: 'M'
  },
  {
    tcId: 'Neg_Fun_0011',
    name: 'Convert incorrect English/Sinhala grammar mixing',
    input: 'mama school yanavaa, nevertheless gedharin yanavaa',
    expected: 'මම school යනවා, කෙසේ වෙතත් ගෙදරින් යනවා',
    category: 'Mixed Singlish + English',
    grammar: 'Compound sentence',
    length: 'M'
  }
];

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

// Test Suite for Negative Tests
test.describe('SwiftTranslator - Negative Functional Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  for (const testCase of negativeTests) {
    test(`${testCase.tcId} - ${testCase.name}`, async () => {
      const actualOutput = await translator.performTranslation(testCase.input);
      expect(actualOutput).toBe(testCase.expected);
      await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  }
});