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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response4 = await Actions.callRest(context, {
        endpoint: 'getarapdetails/getGetaraplinkdetails',
      });

      $variables.arapdata.data = response4.body.items;

      await Actions.fireNotificationEvent(context, {
        summary: 'Table refreshed',
        type: 'info',
      });
    }
  }

  return ButtonActionChain1;
});
