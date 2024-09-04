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
            .toggle-container {
              text-align: right;
              margin-bottom: 20px;
            }
            #mode-toggle {
              padding: 5px 10px;
              cursor: pointer;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            body.light-mode {
              background-color: #f4ecd8;
              color: #5c4b51;
            }
            body.dark-mode {
              background-color: #000;
              color: #fff;
            }
          </style>
        </head>
        <body class="light-mode">
          <div class="container">
            <div class="toggle-container">
              <button id="mode-toggle">Dark Mode</button>
            </div>
            <h1>${content.title}</h1>
            ${content.byline ? `<p><em>${content.byline}</em></p>` : ''}
            ${content.content}
          </div>
        </body>
        </html>
      `);
      readerDocument.close();
  
      // Inject the external script
      const script = readerDocument.createElement('script');
      script.src = chrome.runtime.getURL('reader-mode.js');
      readerDocument.body.appendChild(script);
    }
  
    const extractedContent = extractContent();
    createReaderMode(extractedContent);
  })();