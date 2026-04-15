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

  class DownloadTemplateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($variables.templateVal) {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_UCM_FILES_SYNC_V1_1_0GetFiles',
          uriParams: {
            dDocID: $variables.docIds.DOCID,
          },
        });

     let file =  await $functions.base64ToDocxBlob(response.body.UCM_FILE);

        await $functions.downloadDocxFromBlob(file, $variables.templateVal);

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'File Downloaded Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        const downloadDialogClose = await Actions.callComponentMethod(context, {
          selector: '#downloadDialog',
          method: 'close',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select the Document to download',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
      

      // debugger;
    }
  }

  return DownloadTemplateButtonActionChain;
});
