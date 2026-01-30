import { test, expect } from '@playwright/test';

test('Pos_Fun_0001 - Convert simple Singlish sentence to Sinhala', async ({ page }) => {
  
  // 1: Navigate to Swift Translator
  await page.goto('https://www.swifttranslator.com');

  // 2: Locate Singlish input field
  const singlishInput = page.getByRole('textbox', {
    name: 'Input Your Singlish Text Here.'
  });

  // 3: Enter Singlish text
  await singlishInput.fill('api aramuNu hadhaagannavaa');

  // 4: Locate Sinhala output area
  const sinhalaOutput = page.locator('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'); 
  

  // 5: Verify Sinhala output is generated correctly
  await expect(sinhalaOutput).toContainText('අපි අරමුණු හදාගන්නවා');
});
