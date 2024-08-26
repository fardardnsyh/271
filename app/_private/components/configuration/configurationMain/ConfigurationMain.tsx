import {
  Input, Tab, Tabs,
} from '@nextui-org/react';
import React, { Key, useCallback } from 'react';

// Components
import AdvancedMode from './tabs/AdvancedTab';
import DefaultMode from './tabs/defaultTab/DefaultTab';

// Utils
import { getLatestVersion } from '@/_private/utils/pages';

// Actions
import formActionCreators from '@/_private/lib/actions/formActions';

// Types
import { Form, FormAction } from '@/_private/types/lib/formTypes';

export default function BuildMain(
  {
    form, dispatchForm,
  }:
  {
    form: Form,
    dispatchForm: React.Dispatch<FormAction>,
  },
) {
  const onTitleChange = useCallback((value: string) => {
    formActionCreators.updateFormTitle(dispatchForm, value);
  }, []);

  const onVersionChange = useCallback((value: string) => {
    formActionCreators.updateFormVersion(dispatchForm, value);
  }, []);

  const onSelectionChange = useCallback((key: Key) => {
    formActionCreators.updateFormAdvanced(dispatchForm, key === 'advanced');
  }, []);

  const onSubjobsChange = useCallback((value: string) => {
    formActionCreators.updateFormSubjobs(dispatchForm, value);
  }, []);

  return (
    <form>
      <Input
        className="m-0 py-2"
        type="text"
        label="Write title"
        variant="faded"
        color="default"
        value={form.title}
        onValueChange={onTitleChange}
      />
      <div className="m-0 py-2 flex justify-between gap-4">
        <Input
          label="Select version"
          type="date"
          min="2021-09-22"
          variant="faded"
          color="default"
          max={getLatestVersion()}
          value={form.version}
          onValueChange={onVersionChange}
        />
        <Input
          label="Set number of sub-jobs"
          type="number"
          min="1"
          variant="faded"
          color="default"
          value={form.subjobs}
          onValueChange={onSubjobsChange}
        />
      </div>
      <div className="mb-2">
        <Tabs
          aria-label="Select mode"
          className="m-0 py-2 flex flex-col"
          selectedKey={form.advanced ? 'advanced' : 'default'}
          onSelectionChange={onSelectionChange}
        >
          <Tab key="default" title="Default mode" className="px-0 py-2 flex flex-col">
            <DefaultMode form={form} dispatchForm={dispatchForm} />
          </Tab>
          <Tab key="advanced" title="Advanced mode" className="px-0 py-2 flex flex-col">
            <AdvancedMode form={form} dispatchForm={dispatchForm} />
          </Tab>
        </Tabs>
      </div>
    </form>
  );
}
