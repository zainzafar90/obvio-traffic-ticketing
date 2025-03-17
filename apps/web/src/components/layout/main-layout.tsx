import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "@/providers/theme/theme-provider";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  CommandLineIcon,
  HomeIcon,
  LightBulbIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";

import { ShortcutsDialog } from "@/components/shortcuts-dialog";
import { Avatar } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { Navbar, NavbarItem, NavbarSpacer } from "@/components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/ui/sidebar";
import { useLogout, useMe } from "@/hooks/api/auth.hooks";

import { LogoBox } from "../common/logo-box";
import { StackedLayout } from "../ui/stacked-layout";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  const navigate = useNavigate();
  const { mutateAsync: logoutMutation } = useLogout();
  const { theme, setTheme } = useTheme();
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logoutMutation(undefined, {
      onSettled: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <DropdownMenu className="min-w-64" anchor={anchor}>
        <DropdownItem onClick={() => setShortcutsDialogOpen(true)}>
          <CommandLineIcon />
          <DropdownLabel>Keyboard shortcuts</DropdownLabel>
        </DropdownItem>
        <DropdownItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          <DropdownLabel>
            Switch to {theme === "dark" ? "Light mode" : "Dark mode"}
          </DropdownLabel>
        </DropdownItem>

        <DropdownDivider />
        <DropdownItem href="#">
          <UserCircleIcon />
          <DropdownLabel>My account</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="#">
          <LightBulbIcon />
          <DropdownLabel>Share feedback</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleLogout}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>

      <ShortcutsDialog
        isOpen={shortcutsDialogOpen}
        onOpenChange={setShortcutsDialogOpen}
      />
    </>
  );
}

export const MainLayout = () => {
  const { pathname } = useLocation();
  const { data: user } = useMe();

  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <LogoBox className="size-10 sm:size-8" />{" "}
            <span className="text-lg font-semibold uppercase tracking-tight">
              Obvio
            </span>
          </Link>
          <NavbarSpacer />
          <Dropdown>
            <DropdownButton as={NavbarItem} aria-label="Account menu">
              <Avatar src="/users/profile.png" square />
            </DropdownButton>
            <AccountDropdownMenu anchor="bottom end" />
          </Dropdown>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="/users/profile.png" square />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user?.name}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Outlet />
    </StackedLayout>
  );
};
