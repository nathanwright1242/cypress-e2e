```javascript
const fs = require('fs').promises;

async function readAndValidateJson(filePath, validator = null) {
    try {
        // Check if file exists
        await fs.access(filePath);
        
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        
        // Optional validation
        if (validator && typeof validator === 'function') {
            if (!validator(jsonData)) {
                throw new Error('JSON data failed validation');
            }
        }
        
        return jsonData;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`File not found: ${filePath}`);
        } else if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON format: ${error.message}`);
        }
        throw error;
    }
}

// Example with validation
async function analyzeWithValidation() {
    const validator = (data) => {
        return data && typeof data === 'object';
    };
    
    try {
        const data = await readAndValidateJson('./data.json', validator);
        // Your analysis code here
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```
