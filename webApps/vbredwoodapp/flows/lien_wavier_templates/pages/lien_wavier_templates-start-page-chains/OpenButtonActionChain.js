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

  class OpenButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.headerObj',
        ],
      });

      const ojDialog15339727531Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1533972753-1',
        method: 'open',
      });


      const response2 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_US_STATES',
      });
      debugger;
      $variables.applicablestates.data = response2.body.items;
      const lienWaverType = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_Templates',
      });
      if (lienWaverType.ok) {
        const lineWaverData = await $functions.checkBoxPayloadDtls(lienWaverType.body.items);
        $variables.checkboxDataADP.data = lineWaverData;
        $variables.headerObj.lienwaviertype = lineWaverData[0].template_name;
        document.getElementById('waiverContainer').innerText = lineWaverData[0].template_text;
      }

      // const response = await Actions.callRest(context, {
      //   endpoint: 'businessObjects/getall_Applicablestate',
      // });


    }






  }

  return OpenButtonActionChain;
});
