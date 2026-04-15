/* Copyright (c) 2024, Oracle and/or its affiliates */


define([
  'vb/action/actionChain',
  'vb/action/actions'
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class checkBeforeExitActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $application } = context;

      if ($page.variables.dirtyDataFlag) {
        // Open dialog
        $page.variables.dirtyDialogOpen = true;

        // Pause navigation
        const callOpenDialog = await $page.functions.checkWithUser();

        if (callOpenDialog === 'YES') {
          return { cancelled: false };
        } else {
          await Actions.navigateToPage(context, {
            page: $application.currentPage.id,
            params: {
              dirtyDataFlag: $page.variables.dirtyDataFlag,
              endDisplay: $page.variables.endDisplayStatus,
              endOpen: $page.variables.endOpenStatus,
              bottomDisplay: $page.variables.bottomDisplayStatus,
              bottomOpen: $page.variables.bottomOpenStatus
            },
            history: "push"
          });

          return { cancelled: true };
        }
      }
    }
  }

  return checkBeforeExitActionChain;
});