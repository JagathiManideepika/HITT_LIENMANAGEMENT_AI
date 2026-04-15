define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class ButtonActionChain10 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

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
    }
  }

  return ButtonActionChain10;
});
