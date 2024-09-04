// content.js
(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function extractContent() {
    const article = new Readability(document.cloneNode(true)).parse();
    return {
      title: article.title,
      content: article.content,
      textContent: article.textContent,
      length: article.length,
      excerpt: article.excerpt,
      byline: article.byline,
      dir: article.dir
    };
  }

  function createReaderMode(content) {
    const readerWindow = window.open('', '_blank');
    const readerDocument = readerWindow.document;

    readerDocument.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${content.title} - Reader Mode</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            transition: background-color 0.3s, color 0.3s;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          button {
            padding: 5px 10px;
            cursor: pointer;
          }
          select {
            padding: 5px;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
          }
          body.light-mode {
            background-color: #f4ecd8;
            color: #5c4b51;
          }
          body.dark-mode {
            background-color: #1a1a1a;
            color: #e0e0e0;
          }
          .content-area {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          body.dark-mode .content-area {
            background-color: #2a2a2a;
            box-shadow: 0 0 10px rgba(255,255,255,0.1);
          }
          @media print {
            .controls {
              display: none;
            }
            body, .content-area {
              background-color: white;
              color: black;
            }
          }
        </style>
      </head>
      <body class="light-mode">
        <div class="container">
          <div class="controls">
            <button id="mode-toggle">Dark Mode</button>
            <select id="font-selector">
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
            </select>
            <button id="download-pdf">Download PDF</button>
          </div>
          <div class="content-area">
            <h1>${content.title}</h1>
            ${content.byline ? `<p><em>${content.byline}</em></p>` : ''}
            ${content.content}
          </div>
        </div>
      </body>
      </html>
    `);
    readerDocument.close();

    // Inject the reader-mode.js script
    const script = readerDocument.createElement('script');
    script.src = chrome.runtime.getURL('reader-mode.js');
    readerDocument.body.appendChild(script);
  }

  const extractedContent = extractContent();
  createReaderMode(extractedContent);
})();
