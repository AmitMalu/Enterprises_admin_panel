import { useMemo, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import { USER_MAPPING_KEY, USER_MAPPING_URL, UserMappingInitialValues, validationSchema } from "../../Config/Management/UserMappingConfig";
import FormikSwitchComponent from "../../Components/Molecules/FormikSwitchComponent";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { IconArrowLeftFromArc } from "@tabler/icons-react";
import { UserMappingUserDetailsCard } from "../../Components/Molecules/UserMappingUserDetailsCard";
import FormikMultiSelectComponent from "../../Components/Molecules/FormikMultiSelectComponent";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useAppDispatch } from "../../Redux/hooks";
import { createMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";

const switchClassNames = {
  label: "mantine-Switch-label text-[14px] font-medium w-[180px] ", // fixed width outer label
  description: "mantine-Switch-description !text-[12px] !leading-[14px] w-full ", // fixed width & line height
  trackLabel: "mantine-Switch-trackLabel text-[14px] font-semibold", // inside switch track label bigger
  track: "mantine-Switch-track w-[70px] p-2", // optional: set track min-width
  thumb: "mantine-Switch-thumb",
};

const UserMapping = () => {

  const dispatch = useAppDispatch();
  const [formKey, setFormKey] = useState(0);

  const throttledSubmit = useThrottledFormSubmit(
    async (values: any, { resetForm }: any) => {
      const payload = {
        userIds: values.userId,
        newParentId: values.parentId,
      };

      try {
        const res = await dispatch(
          createMasterItem({
            key: USER_MAPPING_KEY,
            data: payload,
            url: `${USER_MAPPING_URL}/remap`,
          })
        ).unwrap();

        toast.success(res.message || "User Mapping successful");
        resetForm();
        setFormKey(k => k + 1);
      } catch (err: any) {
        toast.error(
          err?.message || "Something went wrong while mapping users"
        );
      }
    },
    3000
  );


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        User Mapping
      </TextComponent>

      <Formik
        key={formKey}
        enableReinitialize
        initialValues={UserMappingInitialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {

          console.log(values, "values");

          // Left section: user hierarchy
          const {
            hierarchyList: userTypeList,
            loadingHierarchyList: loadingUserTypeList,
            subHierarchyList: userList,
            loadingSubHierarchyList: loadingUserList,
            subHierarchyKey: userListKey,
          } = useHierarchySubHierarchy({
            selectedHierarchyCode: values.userType,
            onSubHierarchyReset: () => setFieldValue("userId", ""),
          });

          // Right section: parent hierarchy
          const {
            hierarchyList: parentUserTypeList,
            loadingHierarchyList: loadingParentUserTypeList,
            subHierarchyList: ParentUserList,
            loadingSubHierarchyList: loadingParentUserList,
            subHierarchyKey: parentUserListKey,
          } = useHierarchySubHierarchy({
            selectedHierarchyCode: values.parentUserType,
            onSubHierarchyReset: () => setFieldValue("parentId", ""),
          });

          const filteredParentUserTypeList = useMemo(() => {
            if (!values.userType || !userTypeList?.length) return parentUserTypeList;

            const index = userTypeList.findIndex((item: any) => item.value === values.userType);

            // Only keep higher hierarchy (items above the selected index)
            return parentUserTypeList.filter((_, i) => i < index);
          }, [values.userType, userTypeList, parentUserTypeList]);

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <FormikSwitchComponent
                    name="mode"
                    // label="Update Bulk User"
                    onLabel="Bulk"
                    offLabel="Single"
                    description={
                      values.mode
                        ? "Bulk User Mapping allows you to update multiple users at once"
                        : "Single User Mapping lets you update one user at a time"
                    }
                    size="md"
                    classNames={switchClassNames}
                  />
                </Grid.Col>
              </Grid >

              <Grid gutter="lg" mt="xs">
                {/* Left Section */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <TextComponent
                    fontSize={12}
                    fontWeight={500}
                    color="gray"
                  >
                    Select the <b>{values.mode ? "Users" : "User"}</b> you want to migrate
                  </TextComponent>
                  <div className="flex gap-4">
                    <FormikSelectComponent
                      name="userType"
                      size="xs"
                      className="w-[40%]"
                      label="User Type"
                      placeholder="Select User Type"
                      data={userTypeList}
                      disabled={loadingUserTypeList}
                      withAsterisk
                      required
                    />

                    <FormikMultiSelectComponent
                      key={userListKey}
                      name="userId"
                      label="User"
                      placeholder={`Select ${values.mode ? "Users" : "User"}`}
                      maxValues={values.mode ? 5 : 1}
                      withScrollArea
                      maxDropdownHeight={100}
                      size="xs"
                      checkIconPosition="right"
                      // hidePickedOptions
                      nothingFoundMessage="No Users found for Selected Type"
                      className="w-[60%]"
                      clearable
                      withAsterisk
                      data={userList}
                      disabled={loadingUserList}
                      inputHeight="10"
                    />
                  </div>

                  {/* User Details Card */}
                  <UserMappingUserDetailsCard
                    title="User Details"
                    userDetails={{
                      parentName: "—",
                      userName: "Amaan Chaudhary",
                      mobileNumber: "—",
                      email: "—",
                      userType: "—",
                      balance: { main: 0, settlement: 0 },
                    }}
                  />
                </Grid.Col>

                {/* Middle Section */}
                <Grid.Col span={{ base: 12, md: 2 }} className="flex justify-center items-center">
                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    fontSize="14"
                    borderColor="#fff"
                    variant="filled"
                    type="submit"
                    bgColor="#C30305"
                    textColor="#FFFFFF"
                    rightIcon={<IconArrowLeftFromArc />}
                    style={{ padding: "5px 10px" }}
                  >
                    Migrate User
                  </ButtonComponent>
                </Grid.Col>

                {/* Right Section */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <TextComponent
                    fontSize={12}
                    fontWeight={500}
                    color="gray"
                  >
                    Select the <b>Parent</b> where the {values.mode ? "Users" : "User"} should be migrated
                  </TextComponent>
                  <div className="flex gap-4">
                    <FormikSelectComponent
                      key={`${parentUserListKey}-${values.userType}`}
                      name="parentUserType"
                      size="xs"
                      className="w-[40%]"
                      label="Parent Type"
                      placeholder="Select Parent Type"
                      data={filteredParentUserTypeList}
                      nothingFoundMessage="No Parent Types found for Selected User Type"
                      disabled={!values.userType || loadingParentUserTypeList}
                      withAsterisk
                      required
                    />

                    <FormikSelectComponent
                      key={parentUserListKey}
                      size="xs"
                      name="parentId"
                      className="w-[60%]"
                      nothingFoundMessage="No Users found for Selected Type"
                      label="Parent"
                      placeholder="Select Parent"
                      data={ParentUserList}
                      disabled={loadingParentUserList}
                      withAsterisk
                      required
                    />
                  </div>

                  {/* User Details Card */}
                  <UserMappingUserDetailsCard
                    title="Parent Details"
                    userDetails={{
                      parentName: "—",
                      userName: "Amaan Chaudhary",
                      mobileNumber: "—",
                      email: "—",
                      userType: "—",
                      balance: { main: 0, settlement: 0 },
                    }}
                  />
                </Grid.Col>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default UserMapping;
