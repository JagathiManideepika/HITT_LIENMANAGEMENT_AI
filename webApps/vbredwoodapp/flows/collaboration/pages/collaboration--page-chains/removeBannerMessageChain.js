/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class removeBannerMessageChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.detail 
     */
    async run(context, { detail }) {
      const { $page } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $page.variables.msgsBanner,
        remove: {
          keys: [detail.messageId],
        },
      });
    }
  }

  return removeBannerMessageChain;
});