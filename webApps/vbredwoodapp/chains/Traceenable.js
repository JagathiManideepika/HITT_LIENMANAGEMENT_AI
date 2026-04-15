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

  class Traceenable extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {boolean} params.value
     */
    async run(context, { value }) {
      const { $application, $constants, $variables } = context;

      // debugger;

      try {
        $variables.enableTrace = true;

        if (value === true) {
          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getLM_ORCL_REST_API',
          });

          if (!response.ok) {
            throw response;
          } else {
            $application.variables.traceIdDisplay = response.body.trace_id;
          }
        }else{
            $application.variables.enableTrace = false;

          await Actions.resetVariables(context, {
            variables: [
    '$application.variables.traceIdDisplay',
  ],
          });
        }
      } catch (error) {
        console.error('API failed:', error);
      } finally {
      }
    }
  }

  return Traceenable;
});
