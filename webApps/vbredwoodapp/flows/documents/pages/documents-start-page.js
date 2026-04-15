define([
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
], function (JSZip) {
  'use strict';

  class PageModule {


  // date format
    formatDate(dateStr) {
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);

      return `${day}-${month}-${year}`;
    }
    
    // generate ZIP
    generateZip(data) {
      const items = data;
      const zip = new JSZip();

      // Create folders
      const conditionalFolder = zip.folder("Conditional_Documents");
      const unconditionalFolder = zip.folder("Unconditional_Documents");

      items.forEach(function (item, index) {
        // Conditional document
        if (item.conditional_signed_doc) {
          const base64 = item.conditional_signed_doc.includes(',')
            ? item.conditional_signed_doc.split(',')[1]
            : item.conditional_signed_doc;
          const fileName = item.con_file_name || "conditional_" + index + ".pdf";

          conditionalFolder.file(fileName, base64, { base64: true });
        }

        // Unconditional document
        if (item.unconditional_signed_doc) {
          const base64 = item.unconditional_signed_doc.includes(',')
            ? item.unconditional_signed_doc.split(',')[1]
            : item.unconditional_signed_doc;
          const fileName = item.uncon_file_name || "unconditional_" + index + ".pdf";

          unconditionalFolder.file(fileName, base64, { base64: true });
        }
      });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "documents.zip";
        link.click();
      });
    }

  }

  return PageModule;
});
