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

  class createProjectsCriteriaChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Sets the progress variable to true
      $page.variables.createProjectsCriteriaChainInProgress = true;

      try {
        // Validates Projects_Criteria form
        const validateFormResult = await Actions.callChain(context, {
          chain: 'flow:validateFormChain',
          params: {
            validationGroupId: 'validation-group',
          },
        }, { id: 'validateProjectsCriteria' });

        if (!validateFormResult) {
          return;
        }

        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Projects_Criteria',
          body: $page.variables.projectsCriteria,
        }, { id: 'createProjectsCriteria' });

        if (!callRestResult.ok) {
          // Create error message
          const errorMessage = callRestResult.body?.detail || callRestResult.body?.['o:errorDetails']?.[0]?.detail || `Could not create new Projects_Criteria: status ${callRestResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });

          return;
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'Projects_Criteria saved',
          message: 'Projects_Criteria record successfully created',
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });

        await Actions.navigateBack(context, {}, { id: 'navigateBack' });
      } finally {
        // Sets the progress variable to false
        $page.variables.createProjectsCriteriaChainInProgress = false;
      }
    }
  }

  return createProjectsCriteriaChain;
});
