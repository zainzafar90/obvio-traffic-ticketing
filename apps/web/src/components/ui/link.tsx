/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import * as Headless from '@headlessui/react';

export const Link = React.forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <ReactRouterLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  );
});
