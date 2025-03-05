```javascript
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

const TestingScopeEditor = () => {
  const editorRef = useRef(null);
  const [submittedValue, setSubmittedValue] = useState(null);
  
  // Default JSON template with comments that will appear in the editor
  const defaultJsonWithComments = `// Testing Scope Override Configuration
// Modify the JSON below to customize your certification test scope
// Example: To override only specific modules, update the "modules" array
{
  "override": {
    "enabled": true,
    "modules": [
      "module1",
      "module2"
    ],
    "excludeQuestions": [
      "question-id-123",
      "question-id-456"
    ],
    "timeLimit": 60 // time in minutes
  }
}`;

  // Handle when the editor is mounted
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco to allow comments in JSON
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemas: [],
      enableSchemaRequest: true,
      schemaValidation: 'warning'
    });
  };

  // Function to extract and validate the JSON on submission
  const handleSubmit = () => {
    try {
      // Get current value from editor
      const editorValue = editorRef.current.getValue();
      
      // Remove comments before parsing JSON
      const jsonWithoutComments = editorValue.replace(/\/\/.*$/gm, '');
      
      // Parse the JSON
      const parsedJson = JSON.parse(jsonWithoutComments);
      
      // Store the parsed value
      setSubmittedValue(parsedJson);
      console.log("Submitted value:", parsedJson);
      
      // Here you would typically send this to your backend or process it further
      
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div className="testing-scope-editor">
      <h2>Testing Scope Override</h2>
      <p>Use the editor below to customize your certification test scope:</p>
      
      <div className="editor-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
        <Editor
          height="50vh"
          defaultLanguage="json"
          defaultValue={defaultJsonWithComments}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
      
      <div className="actions" style={{ marginTop: '1rem' }}>
        <button 
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Override
        </button>
      </div>
      
      {submittedValue && (
        <div className="result" style={{ marginTop: '1rem' }}>
          <h3>Submitted Configuration:</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(submittedValue, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestingScopeEditor;
```

### Handle block comments
```javascript
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

const TestingScopeEditor = () => {
  const editorRef = useRef(null);
  const [submittedValue, setSubmittedValue] = useState(null);
  
  // Default JSON template with comments that will appear in the editor
  const defaultJsonWithComments = `/* Testing Scope Override Configuration
 * Modify the JSON below to customize your certification test scope
 */

// Example: To override only specific modules, update the "modules" array
{
  "override": {
    "enabled": true,
    /* You can enable or disable the entire override by setting this to true/false */
    "modules": [
      "module1",
      "module2"
    ],
    "excludeQuestions": [
      "question-id-123",
      "question-id-456" // Add question IDs to exclude
    ],
    "timeLimit": 60 // time in minutes
  }
}`;

  // Handle when the editor is mounted
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco to allow comments in JSON
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      comments: 'ignore', // Ensure both comment types are supported
      schemas: [],
      enableSchemaRequest: true,
      schemaValidation: 'warning'
    });
    
    // Additional customization for better comment handling
    editor.updateOptions({
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      }
    });
  };

  // Function to extract and validate the JSON on submission
  const handleSubmit = () => {
    try {
      // Get current value from editor
      const editorValue = editorRef.current.getValue();
      
      // Remove both line comments (//) and block comments (/* */)
      let jsonWithoutComments = editorValue
        .replace(/\/\/.*$/gm, '')         // Remove line comments
        .replace(/\/\*[\s\S]*?\*\//gm, ''); // Remove block comments
      
      // Parse the JSON
      const parsedJson = JSON.parse(jsonWithoutComments);
      
      // Store the parsed value
      setSubmittedValue(parsedJson);
      console.log("Submitted value:", parsedJson);
      
      // Here you would typically send this to your backend or process it further
      
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div className="testing-scope-editor">
      <h2>Testing Scope Override</h2>
      <p>Use the editor below to customize your certification test scope:</p>
      
      <div className="editor-container" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
        <Editor
          height="50vh"
          defaultLanguage="json"
          defaultValue={defaultJsonWithComments}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
      
      <div className="actions" style={{ marginTop: '1rem' }}>
        <button 
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Override
        </button>
      </div>
      
      {submittedValue && (
        <div className="result" style={{ marginTop: '1rem' }}>
          <h3>Submitted Configuration:</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(submittedValue, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestingScopeEditor;
```
