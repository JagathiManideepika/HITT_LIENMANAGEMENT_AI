define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], function (
  ActionChain,
  Actions,
  ActionUtils
) {
  'use strict';

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createDialogObj.condPar_DopcName',
  ],
      });

      try {
        if (!files || files.length === 0) {
          await Actions.fireNotificationEvent(context, {
            summary: 'No file selected',
            displayMode: 'transient',
            type: 'error',
          });
          return;
        }

        const file = files[0];


      
        const fileName = file.name.toLowerCase().trim();

      
        const isValid = fileName.endsWith(".doc") || fileName.endsWith(".docx");

        if (!isValid) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Only .doc or .docx files are allowed',
            displayMode: 'transient',
            type: 'error',
          });
          return;
        }
        
        $variables.createDialogObj.condPar_DopcName = file.name;

        const fileToBase64 = await $functions.fileToBase64(file);

        $variables.base64Val_CP = fileToBase64;

              if ($variables.createDialogObj.condPar_DopcName) {

        let payload =
        {
          "OperationName": "uploadFileToUCM",
          "DocumentContent": $variables.base64Val_CP,
          "DocumentAccount": "fin$/payments$/import$",
          "ContentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "FileName": $variables.createDialogObj.condPar_DopcName,
          "DocumentId": null
        }

        const response = await Actions.callRest(context, {
          endpoint: 'fsmRestApi/postFscmRestApiResources11_13_18_05Erpintegrations',
          body: payload,
        });

        $variables.createDialogObj.condPar_docID = response.body.DocumentId;
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select the Document to Proceed',
          displayMode: 'transient',
          type: 'error',
        });
        
      }


      } catch (error) {
        console.error("Error in FilePickerSelectChain:", error);

        await Actions.fireNotificationEvent(context, {
          summary: 'Something went wrong while processing file',
          displayMode: 'transient',
          type: 'error',
        });
      }
    }
  }

  return FilePickerSelectChain;
});