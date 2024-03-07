import type { PiniaPluginContext } from 'pinia';

import { cloneDeep } from 'lodash-es';
import { SetupStoreId } from '@/enum';

export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[];
  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;
    const defaultStore = cloneDeep($state);
    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
