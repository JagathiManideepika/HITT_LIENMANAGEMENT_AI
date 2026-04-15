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

  class ButtonActionChain15 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('IU');

      try {

        if (validateGroup === 'valid') {
          if (($variables.createDialogObj.condPar_Val === 'Yes' && $variables.createDialogObj.condPar_docID === undefined) || ($variables.createDialogObj.condFinal_Val === 'Yes' && $variables.createDialogObj.condFin_docID === undefined) || ($variables.createDialogObj.condFinal_Val === 'Yes' && $variables.createDialogObj.uncondFinal_docID === undefined) || ($variables.createDialogObj.uncond_Par === 'Yes' && $variables.createDialogObj.uncondPar_docID === undefined)) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Please Upload the Documents for the YES Status',
              displayMode: 'transient',
              type: 'error',
            });

          } else {
            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            let payload = {
              "p_state_name": $variables.createDialogObj.stateVal,
              "p_conditional_partial": $variables.createDialogObj.condPar_Val,
              "p_unconditional_partial": $variables.createDialogObj.uncond_Par,
              "p_conditional_final": $variables.createDialogObj.condFinal_Val,
              "p_unconditional_final": $variables.createDialogObj.uncond_Final,
              "p_docid_cond_partial": $variables.createDialogObj.condPar_docID,
              "p_docid_uncond_partial": $variables.createDialogObj.uncondPar_docID,
              "p_docid_cond_final": $variables.createDialogObj.condFin_docID,
              "p_docid_uncond_final": $variables.createDialogObj.uncondFinal_docID
            }

            const response = await Actions.callRest(context, {
              endpoint: 'PWP_ORDS/putLM_UPDATE_TEMPLATES',
              body: payload,
            });

          }
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          const iUDialogClose = await Actions.callComponentMethod(context, {
            selector: '#IUDialog',
            method: 'close',
          });

          const response1 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getLM_HITT_TEMPLATES',
          });

          const addIds = await $page.functions.addIds(response1.body.items);

          $variables.tableADP.data = addIds;

        }
      } catch (error) {
        const errorMessage =
          error?.body?.detail ||
          error?.body?.message ||
          error?.message?.summary ||
          error?.message ||
          (error?.status ? `HTTP ${error.status}` : 'Failed to Update');

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'templates page -update button-ORDS-putLM_UPDATE_TEMPLATES',
            'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            'R_USER_NAME': $application.variables.user,
          },
          body: {
            p_api_name: 'putLM_UPDATE_TEMPLATES',
            p_debug_message: errorMessage,
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: errorMessage,
          message: 'Failed to Create Template',
          displayMode: 'persist',
          type: 'error',
        });
      } finally {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }
  }

  return ButtonActionChain15;
});
