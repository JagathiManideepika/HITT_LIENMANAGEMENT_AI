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

  class generateToken extends ActionChain {

    /**
     * used for "Role based Authentication"
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables, $functions } = context;

      const username = await $functions.getUsernameFromJwt($variables.jwt);
      // $variables.user = "rite.user";
      // $variables.user = "veera.ganapabattula@rite.digital";
      $variables.user = "RGorremuchu@hitt-gc.com";
      // $variables.user = username;
      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_Page_Restriction',
        uriParams: {
          username: $variables.user,
        },
      });


      const menuItems = await $functions.getMenuItems([
         {
          "name": "Templates",
          "id": "shell/templates",
          "iconClass": "oj-ux-ico-list"
        },  
        {
          "name": "Lien Management Criteria",
          "id": "shell/main",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Lien Management Workbench",
          "id": "shell/collaboration",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Lien Management Approval",
          "id": "shell/approvals",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Signed Documents",
          "id": "shell/documents",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Log Screen",
          "id": "shell/logscreen",
          "iconClass": "oj-ux-ico-list"
        }
        
       

      ], response.body.items);

      $variables.navigationData = menuItems;
    }
  }

  return generateToken;
});
