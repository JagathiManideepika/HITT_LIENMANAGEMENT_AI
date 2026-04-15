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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.releaseapprojectnumber = $variables.select_mutliple_rows_release;

      await Actions.fireNotificationEvent(context, {
        summary: $variables.releaseapprojectnumber,
        type: 'info',
        message: 'Released Project Number',
      });
    }
  }

  return ButtonActionChain2;
});
