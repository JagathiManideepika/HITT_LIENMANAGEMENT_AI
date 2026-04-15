define([], () => {
  'use strict';

  class PageModule {


    addIds(data) {
      return data.map((item, index) => ({
        ...item,
        id: index + 1   // put this LAST
      }));
    }


    base64ToDocxBlob(base64Data) {
      try {
        if (!base64Data) {
          throw new Error("Base64 data is empty");
        }

        // Step 1: Clean Base64
        const cleanedBase64 = base64Data.replace(/\s/g, "");

        // Step 2: Convert Base64 → binary
        const byteCharacters = atob(cleanedBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Step 3: Create Blob (THIS is your file variable)
        const fileBlob = new Blob(
          [new Uint8Array(byteNumbers)],
          {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          }
        );

        //  Return the file
        return fileBlob;

      } catch (error) {
        console.error("Conversion failed:", error);
        return null;
      }
    }



    downloadDocxFromBlob(fileBlob, fileName = "MyDocument.docx") {
      debugger;
      try {
        if (!fileBlob) {
          throw new Error("File blob is empty");
        }

        const url = URL.createObjectURL(fileBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return "DOWNLOAD_TRIGGERED";

      } catch (error) {
        console.error("Download failed:", error);
        return "ERROR: " + error.message;
      }
    }

    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        try {
          if (!file) {
            reject("No file provided");
            return;
          }

          const reader = new FileReader();

          reader.onload = function () {
            // result = "data:...;base64,XXXXX"
            const base64String = reader.result.split(",")[1]; // remove prefix
            resolve(base64String);
          };

          reader.onerror = function (error) {
            reject(error);
          };

          // Read file as Base64
          reader.readAsDataURL(file);

        } catch (err) {
          reject(err);
        }
      });
    }
  }

  return PageModule;
});