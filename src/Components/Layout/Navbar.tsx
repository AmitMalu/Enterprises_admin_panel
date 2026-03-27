import React from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { useNavigate } from 'react-router-dom'
import { Avatar, Group, Menu } from '@mantine/core'
import TextComponent from '../Atoms/TextComponent'
import { fetchWalletBalance } from '../../Redux/Features/Auth/Thunk'
import { logoutUser } from '../../Utils/utils'
import { IconRefresh } from '@tabler/icons-react'
import profileIcon from '../../assets/Images/user.png'
import { toast } from 'react-toastify'

const Navbar: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const hierarchyId = JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId;
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

  return (
    <Group justify="flex-end" w="100%" gap="lg">
      
      {/* Prepaid Balance */}
      <TextComponent fontWeight={600} fontSize={14}>
        Prepaid: ₹{prepaid}
      </TextComponent>

      {/* Postpaid Balance */}
      <TextComponent fontWeight={600} fontSize={14}>
        Postpaid: ₹{postpaid}
      </TextComponent>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        title="Refresh Wallet Balance"
      >
        <IconRefresh size={20} />
      </button>

      {/* Profile Dropdown */}
      <Menu shadow="md" width={180} position="bottom-end">
        <Menu.Target>
          <Avatar
            radius="lg"
            size="md"
            className="cursor-pointer"
            src={profileIcon}
          >
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item onClick={() => navigate("/account/profile")}>Profile</Menu.Item>
          <Menu.Item onClick={() => navigate("/change-password")}>
            Change Password
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={() => logoutUser("You are now logged Out.")}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>

  )
}

export default Navbar
