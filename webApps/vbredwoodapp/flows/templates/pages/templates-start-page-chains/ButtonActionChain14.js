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

  class ButtonActionChain14 extends ActionChain {

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

        debugger;

        if (validateGroup === 'valid') {

          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          if (($variables.createDialogObj.condPar_Val === 'Yes' && $variables.createDialogObj.condPar_docID === undefined) || ($variables.createDialogObj.condFinal_Val === 'Yes' && $variables.createDialogObj.condFin_docID === undefined) || ($variables.createDialogObj.condFinal_Val === 'Yes' && $variables.createDialogObj.uncondFinal_docID === undefined) || ($variables.createDialogObj.uncond_Par === 'Yes' && $variables.createDialogObj.uncondPar_docID === undefined)) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Please Upload the Documents for the YES Status',
              displayMode: 'transient',
              type: 'error',
            });


          } else {
            let savePayload = {
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
              endpoint: 'PWP_ORDS/postLM_INSERT_STATES-2',
              body: savePayload,
            });



            if (response.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: 'Template Created Successfully',
                displayMode: 'transient',
                type: 'confirmation',
              });
            } else {
              throw response;
            }

            const iUDialogClose = await Actions.callComponentMethod(context, {
              selector: '#IUDialog',
              method: 'close',
            });
          }
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getLM_HITT_TEMPLATES',
          });

          const addIds = await $page.functions.addIds(response.body.items);

          $variables.tableADP.data = addIds;
        } else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Please fill all the required feilds',
            displayMode: 'transient',
            type: 'error',
          });

        }
      } catch (error) {
        debugger;

        const errorMessage =
          error?.body?.detail ||
          error?.body?.message ||
          error?.message?.summary ||
          error?.message ||
          (error?.status ? `HTTP ${error.status}` : 'Templates Save Failed');

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'templates- create svae button -ORDS- postLM_INSERT_STATES ',
            'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            'R_USER_NAME': $application.variables.user,
          },
          body: {
            p_api_name: 'postLM_INSERT_STATES',
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
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return ButtonActionChain14;
});
