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

  class ExpendCatValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

        if (data) {
          $variables.createobj.EXPENDITURE_CATEGORY_ID = data.EXPENDITURE_CATEGORY_ID;

          const response = await Actions.callRest(context, {
            endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_EXP_TYPE_SYNC1_0EXP_TYPE2',
            uriParams: {
              'P_EXPENDITURE_CATEGORY_ID': $variables.createobj.EXPENDITURE_CATEGORY_ID,
            },
            headers: {
              'R_PAGE_NAME': 'Create  Criteria Page -Expenditure Types LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_EXP_TYPE_SYNC1_0EXP_TYPE2',
              'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
              'R_USER_NAME': $application.variables.user,
            },
          });

          $variables.expTypeAdp.data = response.body.DATA_DS.G_1;
          $variables.expenditureTypeLoaded = true;
          $variables.expenditureTypeError = null;

        }
      } catch (error) {
        $variables.expenditureTypeLoaded = false;
        $variables.expenditureTypeError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
      }


    }
  }

  return ExpendCatValueChangeAction;
});
