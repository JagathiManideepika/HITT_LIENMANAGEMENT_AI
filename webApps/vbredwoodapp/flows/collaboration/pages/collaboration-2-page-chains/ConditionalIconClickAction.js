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

  class ConditionalIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let obj = {
        ProjectNumber: current.row.project_number,
        InvoiceNumber: current.row.ap_invoice,
        InstallmentNumber: current.row.inv_installment_number,
        TemplateCode:
          current.row.payment_type === "Final"
            ? "CWF"
            : current.row.payment_type === "Progress"
              ? "CWP"
              : current.row.template_code,
      };


      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'LM_OIC/postLM_GENERATE_LIEN_REPORT1_0GetLeinReport',
        body: obj,
      });
      debugger;
      // const response = await Actions.callRest(context, {
      //   endpoint: 'ReceiptDownloadOICServices/postGetLeinReport',
      //   body: obj,
      // });

      if (!response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'failed to Download Receipt',
          displayMode: 'transient',
        });
      } else {
        await $application.functions.downloadPDF(response.body.fileBase64Content, response.body.fileName);
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });



    }
  }

  return ConditionalIconClickAction;
});
