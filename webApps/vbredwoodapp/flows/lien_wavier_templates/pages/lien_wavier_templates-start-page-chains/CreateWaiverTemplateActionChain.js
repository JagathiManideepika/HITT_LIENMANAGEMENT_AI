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

  class CreateWaiverTemplateActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $functions.validateGroup('validation');

      try {

        if (validateGroup === "valid") {

          // debugger;
          const result = await $functions.shouldProceed($variables.headerObj.state, $variables.headerObj.lienwaviertype);
          if (result) {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });
            let resultData = "";
            if (document.getElementById('waiContainer')) {
              resultData = document.getElementById('waiContainer').innerHTML;
            }
            const stateDetails = await $functions.getStateDetails($variables.headerObj.state);
            const userLgn = $application.user.username;
            let isWaveTemplate = true;

            if (stateDetails) {
              const results = await ActionUtils.forEach(stateDetails, async (item, index) => {
                const waverTemplats = await $functions.getWaveTemplatePayload($variables.headerObj, item, resultData, userLgn);

                const response = await Actions.callRest(context, {
                  endpoint: 'PWP_ORDS/postLM_Wavier_Templates_HDR',
                  body: waverTemplats,
                  headers: {
                    'R_PAGE_NAME': 'templates page -define button-ORDS-postLM_Wavier_Templates_HDR',
                    'R_TRACE_ID': $application.variables.traceIdDisplay,
                    'R_USER_NAME': $application.variables.user,
                  },
                });

                if (!response.ok) {
                  throw response;
                }
                if (response.ok) {
                  const ojDialog15339727531Close = await Actions.callComponentMethod(context, {
                    selector: '#oj-dialog-1533972753-1',
                    method: 'close',
                  });
                }
                else {
                  isWaveTemplate = false;
                }

              }, { mode: 'serial' });
            }

            if (isWaveTemplate) {
              await Actions.fireNotificationEvent(context, {
                summary: 'Wave Templates Saved Successfully',
                type: 'confirmation',
                displayMode: 'transient',
              });
            }
            else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Wave Templates Save Failed',
                type: 'error',
                displayMode: 'transient',
              });
            }

            await Actions.callChain(context, {
              chain: 'SearchButtonActionChain',
            });

            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          }
          else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Conditional Lien waivers not allowed for Indiana, Tennessee and Illinois.',
              displayMode: 'transient',
              type: 'error',
            });

          }
        }
        else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Kindly ensure all required fields are completed before proceeding',
            type: 'error',
            displayMode: 'transient',
          });

        }
      } catch (error) {

        const errorMessage =
          error?.body?.detail ||
          error?.body?.message ||
          error?.message.summary !== "" ||
          (error?.status ? `HTTP ${error.status}` : 'Wave Templates Save Failed');

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
              'R_PAGE_NAME': 'templates page -define button-ORDS-postLM_Wavier_Templates_HDR',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
            body: {
              p_api_name: 'LM_Wavier_Templates_HDR',
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

  return CreateWaiverTemplateActionChain;
});
