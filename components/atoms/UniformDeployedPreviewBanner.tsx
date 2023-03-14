import React from 'react';
import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';

/**
 * Renders banner only on deployed by Uniform preview environment
 */
export const UniformDeployedPreviewBanner = () => {
  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const isOpenedByInContextEditor =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has(
        IN_CONTEXT_EDITOR_QUERY_STRING_PARAM
      );

    if (isOpenedByInContextEditor && process.env.NEXT_PUBLIC_SHOW_DEPLOYED_BANNER) {
      setVisible(true);
      document.body.classList.add('mt-[40px]');
    }
  }, []);

  return isVisible ? (
    <div className="fixed deployed-preview-banner bg-red-700 w-full mx-auto py-2 flex justify-center mt-[-40px]">
      <p>
        This is a Uniform-deploy preview.{" "}
        <a
          className="underline cursor-pointer uniform-allow-click"
          target="_blank"
          href="https://docs.uniform.app/getting-started/starters"
        >
          Click here to learn how switch to your own!
        </a>
      </p>
    </div>
  ) : null;
}