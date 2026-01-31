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

// Test Data - Positive Test Cases
const positiveTests = [
  // Sentence structures
  {
    tcId: 'Pos_Fun_0001',
    name: 'Convert simple sentence structure',
    input: 'api aramuNu hadhaagannavaa',
    expected: 'අපි අරමුණු හදාගන්නවා',
    category: 'Daily language usage',
    grammar: 'Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Pos_Fun_0002',
    name: 'Convert compound sentence structure',
    input: 'mama haemadhaama panthi yanavaa, haebaeyi adha viBhaagayak thiyena nisaa yanna venne naee, aparaadhee adha hoDHAma paadamak thiyennee',
    expected: 'මම හැමදාම පන්ති යනවා, හැබැයි අද විභාගයක් තියෙන නිසා යන්න වෙන්නෙ නෑ, අපරාදේ අද හොඳම පාඩමක් තියෙන්නේ',
    category: 'Daily language usage',
    grammar: 'Compound sentence',
    length: 'M'
  },
  {
    tcId: 'Pos_Fun_0003',
    name: 'Convert complex sentence structure',
    input: 'mama aevidhinna yanna hari aasa unath  vaeda vaedi nisaa velaavak naee. haemooma aasa dheeval kochchara thiyenavaa aethdha? kaalaya haemadheetama haras velaa',
    expected: 'මම ඇවිදින්න යන්න හරි ආස උනත්  වැඩ වැඩි නිසා වෙලාවක් නෑ. හැමෝම ආස දේවල් කොච්චර තියෙනවා ඇත්ද? කාලය හැමදේටම හරස් වෙලා',
    category: 'Daily language usage',
    grammar: 'Complex sentence',
    length: 'M'
  },
  
  // Interrogative and imperative forms
  {
    tcId: 'Pos_Fun_0004',
    name: 'Interrogative (questions) conversion',
    input: 'oyaa mee gaena ammaava edhaama hariyata dhaenuvath karaadha? naedhdha?',
    expected: 'ඔයා මේ ගැන අම්මාව එදාම හරියට දැනුවත් කරාද? නැද්ද?',
    category: 'Daily language usage',
    grammar: 'Interrogative (question)',
    length: 'M'
  },
  {
    tcId: 'Pos_Fun_0005',
    name: 'Imparative (commands) conversion',
    input: 'kiyavana eka navaththaganna',
    expected: 'කියවන එක නවත්තගන්න',
    category: 'Daily language usage',
    grammar: 'Imperative (command)',
    length: 'S'
  },
  
  // Positive vs negative sentence forms
  {
    tcId: 'Pos_Fun_0006',
    name: 'Positive sentence form conversion',
    input: 'api Bhaara gaththa vaedee hariyata ivara karana kalma api methana innavaa',
    expected: 'අපි භාර ගත්ත වැඩේ හරියට ඉවර කරන කල්ම අපි මෙතන ඉන්නවා',
    category: 'Daily language usage',
    grammar: 'Complex sentence',
    length: 'M'
  },
  
  {
    tcId: 'Pos_Fun_0007',
    name: 'Negative sentence form conversion',
    input: 'api vagakiima gannee naehae',
    expected: 'අපි වගකීම ගන්නේ නැහැ',
    category: 'Daily language usage',
    grammar: 'Negation (negative form)',
    length: 'S'
  },
  //Common greetings, requests, and responses
  {
    tcId: 'Pos_Fun_0008',
    name: 'Convert short greeting',
    input: 'aayu boo veevaa!',
    expected: 'ආයු බෝ වේවා!',
    category: 'Greeting / request / response',
    grammar: 'Simple sentence',
    length: 'S'
  },
  {
    tcId: 'Pos_Fun_0009',
    name: 'Request sentence conversion',
    input: 'karuNaakaralaa mee karadharayen maava galavaganna naethnam eyaalaa maava maralaa dhaavi',
    expected: 'කරුණාකරලා මේ කරදරයෙන් මාව ගලවගන්න නැත්නම් එයාලා මාව මරලා දාවි',
    category: 'Greeting / request / response',
    grammar: 'Complex sentence',
    length: 'M'
  },
  
  {
    tcId: 'Pos_Fun_0010',
    name: 'Convert daily response phase',
    input: 'naee eekata kamak naee, mama ma eekath karannam. naethnam ooka hariyata vennee naee maQQ dhannavanee',
    expected: 'නෑ ඒකට කමක් නෑ, මම ම ඒකත් කරන්නම්. නැත්නම් ඕක හරියට වෙන්නේ නෑ මං දන්නවනේ',
    category: 'Greeting / request / response',
    grammar: 'Compound sentence',
    length: 'M'
  },
  //5.Polite vs informal phrasing
  {
    tcId: 'Pos_Fun_0011',
    name: 'Polite phrase conversion',
    input: 'mata samaavenna, mata dhaen aethulata enna puLuvandha?',
    expected: 'මට සමාවෙන්න, මට දැන් ඇතුලට එන්න පුළුවන්ද?',
    category: 'Greeting / request / response',
    grammar: 'Interrogative (question)',
    length: 'M'
  },
  
  {
    tcId: 'Pos_Fun_0012',
    name: 'Informal phrase conversion',
    input: 'ooyi, meheta varen',
    expected: 'ඕයි, මෙහෙට වරෙන්',
    category: 'Slang / informal language',
    grammar: 'Imperative (command)',
    length: 'S'
  },
  //6.Frequently used day-to-day expressions
  {
    tcId: 'Pos_Fun_0013',
    name: 'Simple day-to-day expression conversion',
    input: 'mata hoDHAta kanna ooni',
    expected: 'මට හොඳට කන්න ඕනි',
    category: 'Daily language usage',
    grammar: 'Simple sentence',
    length: 'S'
  },
  //7.Multi-word expressions and frequent collocations
  {
    tcId: 'Pos_Fun_0014',
    name: 'Convert multi-word expression',
    input: 'leesi naee',
    expected: 'ලේසි නෑ',
    category: 'Daily language usage',
    grammar: 'Negation (negative form)',
    length: 'S'
  },
  //8.segmented word variations (with spaces)
  {
    tcId: 'Pos_Fun_0015',
    name: 'Future tense plan',
    input: 'mata adha nam baeri veevi',
    expected: 'මට අද නම් බැරි වේවි',
    category: 'Daily language usage',
    grammar: 'Future tense',
    length: 'S'
  },
  
  //Repeated word expressions used for emphasis
  {
    tcId: 'Pos_Fun_0016',
    name: 'Repeated expressions conversion',
    input: 'podda podda dhannee naedhdha',
    expected: 'පොඩ්ඩ පොඩ්ඩ දන්නේ නැද්ද',
    category: 'Daily language usage',
    grammar: 'Simple sentence',
    length: 'S'
  },
  //Tense variations (past / present / future)
  {
    tcId: 'Pos_Fun_0017',
    name: 'Convert past tense response sentence ',
    input: 'eyaa pereedhaa mehee aavee naee. maLa gedharak velaa eekata gihin. kohomahari ee hindhaa eyaata apee panthiyath maga aerunaa',
    expected: 'එයා පෙරේදා මෙහේ ආවේ නෑ. මළ ගෙදරක් වෙලා ඒකට ගිහින්. කොහොමහරි ඒ හින්දා එයාට අපේ පන්තියත් මග ඇරුනා',
    category: 'Daily language usage',
    grammar: 'Past tense',
    length: 'M'
  },
  {
    tcId: 'Pos_Fun_0018',
    name: 'Convert present tense sentence',
    input: 'ammayi mamayi poLee yanavaa',
    expected: 'අම්මයි මමයි පොළේ යනවා',
    category: 'Daily language usage',
    grammar: 'Present tense',
    length: 'S'
  },
  {
    tcId: 'Pos_Fun_0019',
    name: 'Convert future tense sentence',
    input: 'labana sathiyee api ehee yamu',
    expected: 'ලබන සතියේ අපි එහේ යමු',
    category: 'Daily language usage',
    grammar: 'Future tense',
    length: 'S'
  },
  
  // Negation patterns
  {
    tcId: 'Pos_Fun_0020',
    name: 'Negation pattern sentence conversion',
    input: 'mata nam baehae thavadhuratath ee thathveta vaetenna. oyaa dhannavanee eyaage haeti. mata nam ee muuNa pennannavath baee dhaen nam',
    expected: 'මට නම් බැහැ තවදුරටත් ඒ තත්වෙට වැටෙන්න. ඔයා දන්නවනේ එයාගෙ හැටි. මට නම් ඒ මූණ පෙන්නන්නවත් බෑ දැන් නම්',
    category: 'Word combination / phrase pattern',
    grammar: 'Negation (negative form)',
    length: 'M'
  },
  //Singular/plural usage and pronoun variations
  {
    tcId: 'Pos_Fun_0021',
    name: 'Singular pronoun question conversion',
    input: 'oyaa kaemathiyidha eekata?',
    expected: 'ඔයා කැමතියිද ඒකට?',
    category: 'Daily language usage',
    grammar: 'Interrogative (question)',
    length: 'S'
  },
  
  {
    tcId: 'Pos_Fun_0022',
    name: 'Plural pronoun sentence conversion',
    input: 'api sahaBhaagi vemu',
    expected: 'අපි සහභාගි වෙමු',
    category: 'Daily language usage',
    grammar: 'Plural form',
    length: 'S'
  },
  
  // Request forms with varying degrees of politeness
  {
    tcId: 'Pos_Fun_0023',
    name: 'Convert request forms with varying degrees of politeness',
    input: 'puLuvannam mata oyaagee sampuurNa namayi, gamayi vitharak kiyanna',
    expected: 'පුළුවන්නම් මට ඔයාගේ සම්පූර්ණ නමයි, ගමයි විතරක් කියන්න',
    category: 'Greeting / request / response',
    grammar: 'Simple sentence',
    length: 'M'
  },
  
  // English technical/brand terms embedded in Singlish
  {
    tcId: 'Pos_Fun_0024',
    name: 'English technical/brand terms embedded in Singlish+ common english words response conversion',
    input: 'oya device eka connect karaganna oona nam oyaagee phone ekee Bluetooth on karagena inna issellaama. ethakota available list ekee device ekata adhaaLa nama pennaavi eeka touch karanna ethakota auto connect venavaa',
    expected: 'ඔය device එක connect කරගන්න ඕන නම් ඔයාගේ phone එකේ Bluetooth on කරගෙන ඉන්න ඉස්සෙල්ලාම. එතකොට available list එකේ device එකට අදාළ නම පෙන්නාවි ඒක touch කරන්න එතකොට auto connect වෙනවා',
    category: 'Mixed Singlish + English',
    grammar: 'Compound sentence',
    length: 'M'
  },
  // Sentences containing places and common English words
  {
    tcId: 'Pos_Fun_0025',
    name: 'English technical/brand terms embedded in Singlish+ common english words response conversion',
    input: 'oya device eka connect karaganna oona nam oyaagee phone ekee Bluetooth on karagena inna issellaama. ethakota available list ekee device ekata adhaaLa nama pennaavi eeka touch karanna ethakota auto connect venavaa',
    expected: 'ඔය device එක connect කරගන්න ඕන නම් ඔයාගේ phone එකේ Bluetooth on කරගෙන ඉන්න ඉස්සෙල්ලාම. එතකොට available list එකේ device එකට අදාළ නම පෙන්නාවි ඒක touch කරන්න එතකොට auto connect වෙනවා',
    category: 'Mixed Singlish + English',
    grammar: 'Compound sentence',
    length: 'M'
  },

  // English abbreviations and short forms
  {
    tcId: 'Pos_Fun_0026',
    name: 'English abbreviations conversion',
    input: 'OMG, oyaa dhaekkadha anee eyaagee OTD eka?',
    expected: 'OMG, ඔයා දැක්කද අනේ එයාගේ OTD එක?',
    category: 'Mixed Singlish + English',
    grammar: 'Interrogative (question)',
    length: 'S'
  },

  // Inputs containing punctuation marks
  {
    tcId: 'Pos_Fun_0027',
    name: 'Convert input containing punctuation marks',
    input: '"adha hari mahansiyi" kiyalaa aeya giyaa. thava eyaata kiya unaa "apoo ikmanata methanin yanna oona" kiyalath',
    expected: '"අද හරි මහන්සියි" කියලා ඇය ගියා. තව එයාට කිය උනා "අපෝ ඉක්මනට මෙතනින් යන්න ඕන" කියලත්',
    category: 'Punctuation / numbers',
    grammar: 'Compound sentence',
    length: 'M'
  },

  // Currency, time formats, dates, and units of measurement
  {
    tcId: 'Pos_Fun_0028',
    name: 'Convert date,currency,time format, units include sentences',
    input: 'saepthaembar 18 thamayi dhavasa. naethnam ithin aaya dhesaembar 17.00 PM venakan inna venavaa. meeka gaththeth Rs. 5670 kata 10 kg venakan maninnath puLuvan',
    expected: 'සැප්තැම්බර් 18 තමයි දවස. නැත්නම් ඉතින් ආය දෙසැම්බර් 17.00 PM වෙනකන් ඉන්න වෙනවා. මේක ගත්තෙත් Rs. 5670 කට 10 kg වෙනකන් මනින්නත් පුළුවන්',
    category: 'Punctuation / numbers',
    grammar: 'Compound sentence',
    length: 'M'
  },

  // Multiple spaces, line breaks, and paragraph inputs
  {
    tcId: 'Pos_Fun_0029',
    name: 'Convert long multi-line inputs',
    input: 'oyaalaa enna\nmama yanavaa\nmata velaa\nyanavaa naethnam\nmata inna oona\nunath\ninna vennee\nnaehae\nsamaavenna\nyaaluvee',
    expected: 'ඔයාලා එන්න\nමම යනවා\nමට වෙලා\nයනවා නැත්නම්\nමට ඉන්න ඕන\nඋනත්\nඉන්න වෙන්නේ\nනැහැ\nසමාවෙන්න\nයාලුවේ',
    category: 'Formatting (spaces / line breaks / paragraph)',
    grammar: 'Simple sentence',
    length: 'M'
  },

  {
    tcId: 'Pos_Fun_0030',
    name: 'Convert pharagraph-style input',
    input: 'siini pariBhoojanaya saha sauKYAya athara mee shakthimath sambandhathaava apa ipadhuna pasu aKaNdava pavathina bava dhaena gaeniima pudhumayak novee. saralava kivahoth, apa kumana vayasa siimaavak pasuvudha pramaaNaya ikmavaa paeNi rasa siini sahitha keti aahaara anuBhava kirima apata nusudhusuyi.namuth venath aahaara varga sambanDhayen gath kala pooShaNa prathilaaBha raDHAa pavathinnee oba jiivithayee kumana avaDhiyak pasuvannee dha yana karuNa matha ya. UdhaaharaNayak lesa kudaa dharuvanta saha LaDHAruvanta kiri niShpaadhana saha sampuurNa kirivala adaQQgu meedha yahamin avashYA vana namuth evaeni aahaara veelak avurudhu 20 saha 30 vayasa siimaaval pasuvana pudhgalayekuta sauKYA sampanna novee.',
    expected: 'සීනි පරිභෝජනය සහ සෞඛ්‍යය අතර මේ ශක්තිමත් සම්බන්දතාව අප ඉපදුන පසු අඛණ්ඩව පවතින බව දැන ගැනීම පුදුමයක් නොවේ. සරලව කිවහොත්, අප කුමන වයස සීමාවක් පසුවුද ප්‍රමාණය ඉක්මවා පැණි රස සීනි සහිත කෙටි ආහාර අනුභව කිරිම අපට නුසුදුසුයි.නමුත් වෙනත් ආහාර වර්ග සම්බන්ධයෙන් ගත් කල පෝෂණ ප්‍රතිලාභ රඳා පවතින්නේ ඔබ ජීවිතයේ කුමන අවධියක් පසුවන්නේ ද යන කරුණ මත ය. උදාහරණයක් ලෙස කුඩා දරුවන්ට සහ ළඳරුවන්ට කිරි නිෂ්පාදන සහ සම්පූර්ණ කිරිවල අඩංගු මේද යහමින් අවශ්‍ය වන නමුත් එවැනි ආහාර වේලක් අවුරුදු 20 සහ 30 වයස සීමාවල් පසුවන පුද්ගලයෙකුට සෞඛ්‍ය සම්පන්න නොවේ.',
    category: ' Formatting (spaces / line breaks / paragraph)',
    grammar: 'Compound sentence',
    length: 'L'
  },

  // Slang and colloquial phrasing
  {
    tcId: 'Pos_Fun_0031',
    name: 'Slang and colloquial phrase conversion',
    input: 'adoo kaetha vaeda karanna purudhu venna epaa baQQ. matath ekka hari naee uBA karapu ee nosandaala vaedeeta',
    expected: 'අඩෝ කැත වැඩ කරන්න පුරුදු වෙන්න එපා බං. මටත් එක්ක හරි නෑ උඹ කරපු ඒ නොසන්ඩාල වැඩේට',
    category: 'Slang / informal language',
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

// Test Suite for Positive Tests
test.describe('SwiftTranslator - Positive Functional Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  for (const testCase of positiveTests) {
    test(`${testCase.tcId} - ${testCase.name}`, async () => {
      const actualOutput = await translator.performTranslation(testCase.input);
      expect(actualOutput).toBe(testCase.expected);
      await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  }
});