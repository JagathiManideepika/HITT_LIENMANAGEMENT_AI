/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class firePageLayoutEventChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page } = context;

      await Actions.fireEvent(context, {
        event: 'ojSpRedwoodPageLayout',
        payload: {
          pageType: $page.variables.pageType,
        },
      });
    }
  }

  return firePageLayoutEventChain;
});