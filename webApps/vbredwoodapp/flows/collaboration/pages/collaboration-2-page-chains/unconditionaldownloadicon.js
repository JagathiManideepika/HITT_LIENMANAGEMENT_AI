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

  class unconditionaldownloadicon extends ActionChain {

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
      ? "UWF"
      : current.row.payment_type === "Progress"
      ? "UWP"
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

      if (response.ok) {
        await $application.functions.downloadPDF(response.body.fileBase64Content, response.body.fileName);
        
      }else{
        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          type: 'warning',
          summary: 'Failed To Download Receipt',
        });

      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return unconditionaldownloadicon;
});
