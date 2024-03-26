'use client';

import UseCountExample from '@/app/concepts/custom-hooks/examples/UseCountExample';
import UseCountdownExample from '@/app/concepts/custom-hooks/examples/UseCountdownExample';
import UseLocalStorageExample from '@/app/concepts/custom-hooks/examples/UseLocalStorageExample';
import UseToggleExample from '@/app/concepts/custom-hooks/examples/UseToggleExample';

const CustomHooks = () => {

  return (
    <div className="min-h-screen p-12">
      <UseCountExample />
      <UseCountdownExample />
      <UseLocalStorageExample />
      <UseToggleExample />
    </div>
  )
}

export default CustomHooks;
