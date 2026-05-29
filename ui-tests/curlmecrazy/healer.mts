import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Handle ESM path resolutions cleanly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORT_PATH = path.resolve(__dirname, '../summary-report.json');
const API_KEY = process.env.OPENAI_API_KEY;

async function runAutonomousPipeline() {
    console.log('[Healer] Initiating test execution...');
    try {
        // Run tests natively using Playwright's env variables to write the json report
        execSync('npm run test:curlmecrazy', {
            stdio: 'inherit',
            env: {
                ...process.env,
                CI: 1,
                PLAYWRIGHT_REPORTER: 'json',
                PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT_PATH,
            }
        });
        console.log('[Healer] All tests completed successfully. No self healing required.');
    } catch (failure) {
        console.log('[Healer] Test failures detected. Analyzing reports...');
        if (!fs.existsSync(REPORT_PATH)) {
            console.log(`[Healer] Reports not found at ${REPORT_PATH}. Cannot heal.` );
            return;
        }
        const testResults = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
        await parseAndHealFailures(testResults);
    }
}

async function parseAndHealFailures(testResults: any) {
    const failedSuites: Array<{file: string, errorMessage: string}> = [];
    if (testResults?.suites) {
        for (const suite of testResults.suites) {
            for (const spec of suite.specs || []) {
                const hasFailure = spec.tests?.some(
                    (t: any) => t.status !== 'expected'
                );
                if (hasFailure) {
                    const firstError = spec.tests[0]?.results[0]?.error?.message || 'Unknown layout timeout';
                    failedSuites.push({
                        file: spec.file,
                        errorMessage: firstError
                    });
                }
            }
        }
    }

    console.log(`[Healer] Identified ${failedSuites.length} distinct failure(s)`);
    for (const suite of failedSuites) {
        const absoluteFilePath = path.resolve(__dirname, '../', suite.file);
        if (!fs.existsSync(absoluteFilePath)) {
            console.error(`[Healer] Could not find test source file at ${absoluteFilePath}. Skipping...`);
            continue;
        }

        console.log(`[Healer] Repairing selector layouts in ${suite.file}`);
        const originalCode = fs.readFileSync(absoluteFilePath, 'utf8');
        const patchedCode = await callAIOrchestrator(absoluteFilePath, originalCode, suite.errorMessage);
        
        if (patchedCode && patchedCode.includes('test')) {
            fs.writeFileSync(absoluteFilePath, patchedCode, 'utf8');
            console.log(`[Healer] Successfully applied code patch to ${suite.file}`);
        }

        // Final verification to ensure the fix works.
        verifyPatches();
    }

    async function callAIOrchestrator(file: string, code: string, errorMessage: string) {
        if (!API_KEY) {
            console.error('[Healer] OPENAI_API_KEY environment variable is not set. Cannot proceed.');
            process.exit(1);
        }

        const prompt = `
        You are an enterprise-grade AI engine operating inside an automated self-healing CI/CD pipeline.

        FAILURE DIAGNOSTICS:
        Target File: ${file}
        Execution Error: ${errorMessage}

        ORIGINAL SOURCE CODE: 
        \`\`\`
        ${code}
        \`\`\`

        TASK:
        1. Identify the locator or selector failing due to application UI element changes.
        2. Rewrite the file to repair the specific selector while preserving the structural logic, imports, and framework flow identical.
        3. Output ONLY the raw executable Typescript code. Do NOT wrap response in markdown formatting blocks (\`\`\`) and do not add conversational text.
        `;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1,
                }),
            });
            const data = await response.json();
            return data.choices[0].message.content.trim();

            // Clean off accidental LLM markdown wrap if present
            if (code.startsWith('```')) {
                code = code.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '');
            }
            return code;
        } catch (error) {
            console.error(`[Healer] Error calling OpenAI: ${error}`);
            return '';
        }
    }

    async function verifyPatches() {
        console.log('[Verification] Re-running test framework to validate AI code patches...');
        try {
            execSync('npm run test:curlmecrazy', {
                stdio: 'inherit',
                // env: {
                //     ...process.env,
                //     CI: 1,
                //     PLAYWRIGHT_REPORTER: 'json',
                //     PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT_PATH,
                // }
            });
            console.log('[Success] Self healing process completed successfully.');
        } catch (error) {
            console.error('[Verification] Self-healing process failed.');
            process.exit(1);
        }
    }
}

runAutonomousPipeline().catch(error => {
    console.error('Engine crashed : ', error);
    process.exit(1);
});