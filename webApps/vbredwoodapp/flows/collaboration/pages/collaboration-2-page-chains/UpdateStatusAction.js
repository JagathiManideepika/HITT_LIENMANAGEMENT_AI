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

  class UpdateStatusAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/putLienManagement_Workbench_Search',
        uriParams: {
          'ap_invoice': current.row.ap_invoice,
          'attachement_status': current.row.attchment_status,
        },
      });

      if (!response.ok) {
      
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Update the Status',
          displayMode: 'transient',
        });

        return;
      } else {
         await Actions.fireNotificationEvent(context, {
           summary: 'Status Updated Successfully',
           displayMode: 'transient',
           type: 'confirmation',
         });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      }
    }
  }

  return UpdateStatusAction;
});
