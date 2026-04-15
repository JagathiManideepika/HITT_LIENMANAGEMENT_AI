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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_Wavier_Templates_Lines',
        uriParams: {
          'p_template_name': $variables.srchTemplate ? $variables.srchTemplate : "",
        },
      });

      if (response.ok) {
        $variables.waveTemplateADP.data = response.body.items;               
      }
      else{
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          summary: 'No Records Found',
          displayMode: 'transient',
        });
        
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return SearchButtonActionChain;
});
