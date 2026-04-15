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

  class Search_DOCButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (
        ($variables.headerObj.startDate && $variables.headerObj.endDate) ||
        ($variables.headerObj.projectNumber ||
         $variables.headerObj.supplierName ||
         $variables.headerObj.invoiceNumber)
      ) {

         const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/getLMSupSignDocExt',
          uriParams: {
            'P_AP_INVOICE': $variables.headerObj.invoiceNumber ? $variables.headerObj.invoiceNumber : '',
            'P_END_DATE': $variables.headerObj.endDate ? $page.functions.formatDate.formatDate($variables.headerObj.endDate) : '',
            'P_START_DATE': $variables.headerObj.startDate ? $page.functions.formatDate.formatDate($variables.headerObj.startDate) : '',
            'P_PROJECT_NUMBER': $variables.headerObj.projectNumber ? $variables.headerObj.projectNumber : '',
                // 'P_PROJECT_NUMBER': 2046,
            'P_SUPPLIER_NAME': $variables.headerObj.supplierName ? $variables.headerObj.supplierName : '',
          },
        });

        $variables.docData.data = response.body.items;

      } else {

        await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: 'Pls Select Start and End Dates or any one of Project Number,Supplier,Invoice Number',
          type: 'error',
        });

      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      
    }
  }

  return Search_DOCButtonActionChain;
});
