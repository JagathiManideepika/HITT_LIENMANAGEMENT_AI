/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], ActionChain => {
  'use strict';

  class containerPrimaryActionsChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.detail 
     */
    async run(context, { detail }) {
      const { $page } = context;

      if (detail.actionId === 'EndModalDrawer') {
        $page.variables.endOpenStatus = "outer";
        $page.variables.endDisplayStatus = "overlayModal";
      }
    }
  }

  return containerPrimaryActionsChain;
});