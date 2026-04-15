define([
  "knockout",
  "ojs/ojknockout-keyset",
  "ojs/ojarraytreedataprovider",
], function (ko, keySet, ArrayTreeDataProvider) {
  "use strict";
  let navigationMenu = [

    {
      id: "ConfigurationFlow",
      label: "Configuration Flow",
      icon: "",
      node: "parent",
      items: [
        {
          id: "crew_admin",
          label: "Equipment Master",
          icon: ""

        },
         {
          id: "equipmentsettings",
          label: "Equipment Settings",
          icon: ""

        },
        {
          id: "rate-schedule",
          label: "Equipment Rate Schedule",
          icon: ""

        }
      ],
    },

    {
      id: "TransactionFlow",
      label: "Transaction Flow",
      icon: "library",
      node: "parent",
      items: [
        {
          id: "equipment-requisition",
          label: "Equipment Request",
          icon: "",
        },
        {
          id: "equipment-multilevel-requisition",
          label: "Equipment Request Cart",
          icon: "",
        },
        {
          id: "crew-schedule",
          label: "Equipment Schedule",
          icon: "",
        },
        {
          id: "equip-approval",
          label: "Equipment Manager Workbench",
          icon: "",
        },
        {
          id: "equipment-reservations",
          label: "Equipment Acceptence",
          icon: "",
        },
        {
          id: "crew-time-entry",
          label: "Equipment Timesheet",
          icon: "",
        },
        {
          id: "equipment-approver-screen",
          label: "Equipment Approver",
          icon: "",
        },
        {
          id: "adhoctimesheet",
          label: "Manual Equipment Timesheet",
          icon: "",
        },

      ],
    },

    {
      id: "Analytics",
      label: "Analytics",
      icon: "book",
      node: "parent",
      items: [
        {
          id: "analytics",
          label: "Equipment Analytics",
          icon: "",
        }

      ],
    },
  ];

  class FragmentModule {

    constructor() {
      this.metadata = {
        navigationMenu: navigationMenu,
      };
      this.navlistExpanded = new keySet.ObservableKeySet();
    }
    closeDrawer() {
      document.querySelector('#navDrawer').startOpened = false;
    }

    getMetadata() {
      return this.metadata;
    }

    getNavigationContent(metadata) {
      if (this.navigationContent === undefined) {
        this.navigationContent = ko.observable(
          new ArrayTreeDataProvider(
            this._getNavigationData(metadata.navigationMenu),
            {
              keyAttributes: "attr.id",
            }
          )
        );
      }
      return this.navigationContent;
    }

    _getNavigationData(menu) {
      let navData = [],
        self = this;

      for (let i = 0; i < menu.length; i++) {
        let menuItem = {};
        let origMenuItem = menu[i];
        if (typeof origMenuItem === "object") {
          menuItem.attr = {
            id: origMenuItem.id,
            name: origMenuItem.label,
            icon: origMenuItem.icon,
            badge: origMenuItem.badge,
            node: origMenuItem.node,
          };
        }
        if (origMenuItem.items && origMenuItem.items.length > 0)
          menuItem.children = this._getNavigationData(origMenuItem.items);
        navData.push(menuItem);
      }
      return navData;
    }

    itemSelectable(context) {
      return context.leaf;
    }
  }

  return FragmentModule;
});