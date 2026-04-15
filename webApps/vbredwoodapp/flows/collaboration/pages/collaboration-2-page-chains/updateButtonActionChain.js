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

  class updateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/putLM_Payment_Type',
        uriParams: {
          'P_WORKBENCH_PK': current.row.workbench_pk,
          'p_payment_type': current.row.payment_type,
        },
      });

      // const response = await Actions.callRest(context, {
      //   endpoint: 'getCriteriaall/putLM_Payment_Type',
      //   uriParams: {
      //     'p_payment_type': current.row.payment_type,
      //     'P_WORKBENCH_PK': current.row.workbench_pk,
      //   },
      // });

      if (response2.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Record Updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Update the Record',
          displayMode: 'transient',
          type: 'error',
        });
        
      }

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
    }
  }

  return updateButtonActionChain;
});
