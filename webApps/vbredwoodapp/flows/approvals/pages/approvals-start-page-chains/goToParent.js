/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class goToParent extends ActionChain {

    /**
     * go to parent
     * @param {Object} context
     */
    async run(context) {
      const toCollaboration = await Actions.navigateToPage(context, {
        page: 'collaboration-',
      });
    }
  }

  return goToParent;
});
