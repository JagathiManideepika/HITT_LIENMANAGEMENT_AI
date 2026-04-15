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

  class fetchLOVS extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await Promise.all([
        async () => {

          try {

            const response6 = await Actions.callRest(context, {
              endpoint: 'LM_OIC/getLM_PROJECTS_LOV_SYNC1_0Projects',
              uriParams: {
                'p_username': $application.variables.user,
              },
              headers: {
                'R_PAGE_NAME': 'Create  Criteria Page -Projects LOV - LM_OIC/getLM_PROJECTS_LOV_SYNC1_0Projects',
                'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });
             
             if(!response6.ok){
              throw response6;
             }

            $variables.projectsAdp.data = response6.body.DATA_DS.G_1;
            $variables.projectsLoaded = true;
            $variables.projectsError = null;
          } catch (error) {

            $variables.projectsError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
            $variables.projectsLoaded = false;

          } finally {
          }
        },
        async () => {

          try {

            const response7 = await Actions.callRest(context, {
              endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_EXP_CATEGORY_SYNC1_0EXP_Category',
              headers: {
                'R_PAGE_NAME': 'Create  Criteria Page -Expenditure Category LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_EXP_CATEGORY_SYNC1_0EXP_Category',
                'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

             if(!response7.ok){
              throw response7;
             }

            $variables.expCatADP.data = response7.body.DATA_DS.G_1;
            $variables.expenditureCategoryLoaded = true;
            $variables.expenditureCategoryError = null;
          } catch (error) {
            $variables.expenditureCategoryLoaded = false;
            $variables.expenditureCategoryError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
          } finally {
          }
        },
        async () => {


          try {

            const response8 = await Actions.callRest(context, {
              endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIERS_LOV_SYNC1_0Suppliers2',
              uriParams: {
                'p_username': $application.variables.user,
              },
              headers: {
                'R_PAGE_NAME': 'Create  Criteria Page - SSuppliers LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIERS_LOV_SYNC1_0Suppliers2',
                'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

             if(!response8.ok){
              throw response8;
             }

            $variables.supplierAdp.data = response8.body.items;
            $variables.supplierLoaded = true;
            $variables.SupplierError = null;
          } catch (error) {
              $variables.supplierLoaded = false;
            $variables.SupplierError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
          } finally {
          }
        },
        async () => {

        },
      ].map(sequence => sequence()));

      // const response = await Actions.callRest(context, {
      //   endpoint: 'LM_OIC/getLM_PROJECTS_LOV_SYNC1_0Projects',
      //   uriParams: {
      //     'p_username': $application.variables.user,
      //   },
      // });

      // $variables.projectsADP_OIC.data = response.body.projects;
      // const response4 = await Actions.callRest(context, {
      //   endpoint: 'fsmRestApi/getSuppliersLOV',
      // });
      // if (response4.ok) {
      //   $variables.supplierADP.data = response4.body.items;        
      // }

      // const response2 = await Actions.callRest(context, {
      //   endpoint: 'fsmRestApi/get11_13_18_05Projects',
      // });

      // if (response2.ok) {
      //   const uniqueProjects = await $functions.getUniqueProjects(response2.body.items);

      //   $variables.projectsADP.data = uniqueProjects;
      // }

      // const response3 = await Actions.callRest(context, {
      //   endpoint: 'fsmRestApi/get11_13_18_05ExpenditureTypesLOV',
      // });

      // if (response3.ok) {
      //  const uniquefilters = await $functions.getUniquefilters(response3.body.items);

      //  $variables.expenditureADP.data = uniquefilters;
      // }

      // const response5 = await Actions.callRest(context, {
      //   endpoint: 'fsmRestApi/get11_13_18_05Suppliers',
      // });

      // if (response5.ok) {
      //   $variables.supplierADP_new.data = response5.body.items;

      // }
    }
  }

  return fetchLOVS;
});
