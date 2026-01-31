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
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap',
    clearButton: '🗑️ Clear'  // exact text on the button
  }
};

// UI Test Cases
const uiTests = [
  {
    tcId: 'Pos_UI_0001',
    name: 'Clear button clears input and output',
    input: 'mama gamee yanavaa havasata',
    expected: 'මම ගමේ යනවා හවසට',
    category: 'Usability flow',
    action: 'clear'
  },
  {
    tcId: 'Pos_UI_0002',
    name: 'Placeholder is visible on page load',
    category: 'UI verification'
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

  async getClearButton() {
    return this.page.getByText(CONFIG.selectors.clearButton);
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

// Test Suite for UI Tests
test.describe('SwiftTranslator - UI Functionality Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // UI_0001: Clear button
  test(`${uiTests[0].tcId} - ${uiTests[0].name}`, async ({ page }) => {
    const input = await translator.getInputField();
    const output = await translator.getOutputField();
    const clearBtn = await translator.getClearButton();

    // Enter text and wait for translation
    await translator.typeInput(uiTests[0].input);
    await translator.waitForOutput();
    expect(await translator.getOutputText()).toBe(uiTests[0].expected);

    // Click Clear
    await clearBtn.click();
    await page.waitForTimeout(1000);

    // Verify cleared
    const inputValue = await input.inputValue();
    expect(inputValue).toBe('');
    const outputText = await output.textContent();
    expect(outputText.trim()).toBe('');

    await page.waitForTimeout(CONFIG.timeouts.betweenTests);
  });

  // UI_0002: Placeholder visible
  test(`${uiTests[1].tcId} - ${uiTests[1].name}`, async ({ page }) => {
    const input = await translator.getInputField();
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).toContain('Input Your Singlish Text Here');
    await page.waitForTimeout(CONFIG.timeouts.betweenTests);
  });
});