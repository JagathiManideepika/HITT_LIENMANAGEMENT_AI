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

  class SelectClickChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

            // debugger;
      if ($variables.createobj.top_task_name) {

        // If data already loaded → do nothing (fast open)
        if ($variables.tasksLoaded) {
          return;
        }

        // If there was an error during background load
        if ($variables.tasksError) {

            await Actions.fireNotificationEvent(context, {
              summary: $variables.tasksError,
              displayMode: 'transient',
              type: 'error',
            });

      

          return;
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select Top Tasks to get Tasks',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return SelectClickChain2;
});
