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

  class ButtonActionChain11 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

          let payload =
      {
        "OperationName": "uploadFileToUCM",
        "DocumentContent": $variables.base64Val_CF,
        "DocumentAccount": "fin$/payments$/import$",
        "ContentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "FileName": $variables.createDialogObj.condFin_DocName,
        "DocumentId": null
      }

      const response = await Actions.callRest(context, {
        endpoint: 'fsmRestApi/postFscmRestApiResources11_13_18_05Erpintegrations',
        body: payload,
      });

      $variables.createDialogObj.condFin_docID = response.body.DocumentId;
    }
  }

  return ButtonActionChain11;
});
