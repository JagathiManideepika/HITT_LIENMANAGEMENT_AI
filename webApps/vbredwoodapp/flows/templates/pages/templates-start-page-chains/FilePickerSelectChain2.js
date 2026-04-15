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

  class FilePickerSelectChainUncond extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.createDialogObj.uncondpar_DocName',
          '$page.variables.base64Val_UCP',
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

        // Validate extension
        const isValid = fileName.endsWith(".doc") || fileName.endsWith(".docx");

        if (!isValid) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Only .doc or .docx files are allowed',
            displayMode: 'transient',
            type: 'error',
          });
          return;
        }
        $variables.createDialogObj.uncondpar_DocName = file.name;

        // Convert file to Base64
        const fileToBase64 = await $page.functions.fileToBase64(file);
        $variables.base64Val_UCP = fileToBase64;

        let payload =
        {
          "OperationName": "uploadFileToUCM",
          "DocumentContent": $variables.base64Val_UCP,
          "DocumentAccount": "fin$/payments$/import$",
          "ContentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "FileName": $variables.createDialogObj.uncondpar_DocName,
          "DocumentId": null
        }

        const response = await Actions.callRest(context, {
          endpoint: 'fsmRestApi/postFscmRestApiResources11_13_18_05Erpintegrations',
          body: payload,
        });

        $variables.createDialogObj.uncondPar_docID = response.body.DocumentId;


      } catch (error) {
        console.error("Error in FilePickerSelectChainUncond:", error);
        await Actions.fireNotificationEvent(context, {
          summary: 'Something went wrong while processing the file',
          displayMode: 'transient',
          type: 'error',
        });
      }
    }
  }

  return FilePickerSelectChainUncond;
});