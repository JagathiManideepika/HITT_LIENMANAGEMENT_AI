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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.collabration2ADP.data',
    '$page.variables.comments',
  ],
      });

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getGetaraplinkdetails',
        uriParams: {
          'p_ap_invoice': $variables.headers.apInvoice ? $variables.headers.apInvoice:'',
          'p_project_number': $variables.headers.project? $variables.headers.project:'',
          'p_supplier_name': $variables.headers.supplier? $variables.headers.supplier:'',
          'p_status': $variables.headers.status ? $variables.headers.status : "",
          USERNAME: $application.variables.user,
        },
      });

      if (!response.ok) {
      
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch WorkBench Details',
          displayMode: 'transient',
        });
      } else {
        // const dataObject = await $functions.addPaymentTypeTemporarily(response.body.items);

          $variables.collabration2ADP.data = response.body.items;
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

    }
  }

  return SearchBtnAction;
});
