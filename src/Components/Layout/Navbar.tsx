import React from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { useNavigate } from 'react-router-dom'
import { ActionIcon, Avatar, Group, Menu, Tooltip, UnstyledButton } from '@mantine/core'
import { fetchWalletBalance } from '../../Redux/Features/Auth/Thunk'
import { logoutUser } from '../../Utils/utils'
import { IconChevronDown, IconKey, IconLogout, IconRefresh, IconUser, IconWallet } from '@tabler/icons-react'
import profileIcon from '../../assets/Images/user.png'
import BrandLogo from '../Brand/BrandLogo'
import { toast } from 'react-toastify'

const Navbar: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const hierarchyId = userInfo?.hierarchyId;
  const userRole = userInfo?.role || hierarchyId?.split("-")[1] || "";
  const isWhiteLabel = ["WLAD", "WLAU", "WL"].includes(userRole);
  const logoPath = userInfo?.logoPath || "";
  const displayName = userInfo?.name || userInfo?.userName || userInfo?.username || hierarchyId || "Account";
  const wallet = useAppSelector((state) => state.auth.walletBalance); // Assuming you store it in auth slice

  const postpaid = wallet?.postpaidBalance || 0;
  const prepaid = wallet?.prepaidBalance || 0;

  const handleRefresh = () => {
    if (!hierarchyId) return;

    toast.loading("Refreshing...", {
      toastId: "wallet-refresh",
      position: "bottom-right",
      className: "!text-sm",
    });

    dispatch(fetchWalletBalance(hierarchyId))
      .unwrap()
      .then(() => {
        toast.update("wallet-refresh", {
          render: "Wallet updated!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          className: "!text-sm",
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast.update("wallet-refresh", {
          render: "Failed to refresh wallet balance",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      });
  };

  const formatInr = (value: number | string) =>
    `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <Group justify="space-between" w="100%" wrap="nowrap">
      {isWhiteLabel && logoPath ? (
        <div className="flex h-10 items-center rounded-lg bg-white px-2">
          <img src={logoPath} alt="logo" className="max-h-8 w-auto max-w-[140px] object-contain" />
        </div>
      ) : (
        <BrandLogo tone="light" size={34} subtitle="Admin Console" />
      )}

      <Group gap="sm" wrap="nowrap" ml="auto">
        {/* Wallet balances */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5">
            <IconWallet size={16} className="text-emerald-400" />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">Prepaid</div>
              <div className="text-sm font-bold text-white">{formatInr(prepaid)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <IconWallet size={16} className="text-slate-400" />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Postpaid</div>
              <div className="text-sm font-bold text-white">{formatInr(postpaid)}</div>
            </div>
          </div>
        </div>

        <Tooltip label="Refresh wallet balance">
          <ActionIcon variant="subtle" color="gray" size="lg" radius="md" onClick={handleRefresh} aria-label="Refresh wallet balance" className="!text-slate-300 hover:!bg-white/10">
            <IconRefresh size={18} />
          </ActionIcon>
        </Tooltip>

        {/* Profile Dropdown */}
        <Menu shadow="md" width={200} position="bottom-end" radius="md">
          <Menu.Target>
            <UnstyledButton className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/10">
              <Avatar radius="xl" size="md" src={profileIcon} />
              <div className="hidden lg:block leading-tight text-left">
                <div className="text-sm font-semibold text-white max-w-[140px] truncate">{displayName}</div>
                <div className="text-[11px] text-slate-400">Administrator</div>
              </div>
              <IconChevronDown size={14} className="text-slate-400" />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconUser size={16} />} onClick={() => navigate("/account/profile")}>Profile</Menu.Item>
            <Menu.Item leftSection={<IconKey size={16} />} onClick={() => navigate("/change-password")}>
              Change Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={() => logoutUser("You are now logged Out.")}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* Always-visible logout */}
        <Tooltip label="Logout">
          <UnstyledButton
            aria-label="Logout"
            onClick={() => logoutUser("You are now logged Out.")}
            className="!hidden md:!flex !h-9 items-center gap-1.5 !rounded-lg !border !border-solid !border-white/20 !px-3 !text-sm !font-semibold !text-slate-200 transition-colors hover:!border-red-400/50 hover:!bg-red-500/15 hover:!text-red-200"
          >
            <IconLogout size={16} />
            Logout
          </UnstyledButton>
        </Tooltip>
      </Group>
    </Group>
  )
}

export default Navbar
