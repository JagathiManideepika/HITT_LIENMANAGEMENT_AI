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

  class CreateBtnActione extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

        const validateGroup = await $application.functions.validateGroup('criteriagrp');

      try {

          if (validateGroup === 'valid') {
          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });
            const createPayloadGenerator = await $functions.createPayloadGenerator($variables.createobj, JSON.parse(JSON.stringify($variables.wavier_type_dtls ?$variables.wavier_type_dtls:'')));

          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postGetCriteria',
            body: createPayloadGenerator,
            headers: {
              'R_PAGE_NAME': 'Lien Management Criteria ORDS-postGetCriteria API',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
          });

            if (!response.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: 'Failed to Create Criteria',
                displayMode: 'transient',
              });
            
              return;
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Criteria Created Successfully',
                displayMode: 'transient',
                type: 'confirmation',
              });

              await Actions.callChain(context, {
                chain: 'SearchButtonActionChain4',
              });

              const addCriteriaModalClose = await Actions.callComponentMethod(context, {
                selector: '#Add-criteria-modal',
                method: 'close',
              });
            }
          }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Fill all the Required Feilds to Proceed',
            displayMode: 'transient',
            type: 'error',
          });
            
          }
      } catch (error) {
       

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
              'R_PAGE_NAME': 'Lien Management Criteria-create Criteria - ORDS-postGetCriteria',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
            body: {
              'p_api_name': 'getCriteria',
              'p_debug_message': error.message,
            },
          });
          await Actions.fireNotificationEvent(context, {
            summary: error.message,
            message: 'Failed to Create Criteria',
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

  return CreateBtnActione;
});
