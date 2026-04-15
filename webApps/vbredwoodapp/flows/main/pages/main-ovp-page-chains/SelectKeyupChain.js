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

  class SelectKeyupChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.curr 
     */
    async run(context, { curr }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createobj.top_task_id',
    '$page.variables.createobj.top_task_name',
    '$page.variables.createobj.task_name',
    '$page.variables.createobj.task_id',
  ],
      });
    }
  }

  return SelectKeyupChain;
});
