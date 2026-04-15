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

  class SwitchValueChangeChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { value, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.frontscreenenableflagswitchbutton = value;

      $variables.selectedprojectidontable = $variables.tableData.data[index].project_id;

      const response3 = await Actions.callRest(context, {
        endpoint: 'updateflagh/postUpdateflag',
        uriParams: {
          'p_enabled_flag': $variables.frontscreenenableflagswitchbutton,
          'p_project_id': $variables.selectedprojectidontable,
        },
      });
    }
  }

  return SwitchValueChangeChain2;
});
