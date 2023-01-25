import { FormlyFieldConfig } from '@ngx-formly/core';

export const PROJECT_BASICS_FORM: FormlyFieldConfig[] = [
  {
    key: 'basics',
    fieldGroup: [{
      key: 'name',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'text',
        label: 'Name',
      },
    },
    {
      key: 'name_short',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Short name',
      },
    },
    {
      key: 'status_slug',
      type: 'select',
      templateOptions: {
        required: true,
        label: 'Status',
        options: [
          {
            label: "Initiating",
            value: "initiating",
          },
          {
            label: "Planning",
            value: "planning"
          },
          {
            label: "Building",
            value: "building"
          },
          {
            label: "Living",
            value: "living"
          },
          {
            label: "Dissolved",
            value: "dissolved"
          },
          {
            label: "Demolished",
            value: "demolished"
          }
        ],
      },
    },
    {
      key: 'coordinates',
      fieldGroup: [{
        key: 'latitude',
      }, {
        key: 'longitude',
      }]
    }
    ],
  }
];
