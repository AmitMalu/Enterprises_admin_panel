import { useMemo, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import { mapUserDetails, USER_MAPPING_KEY, USER_MAPPING_URL, UserMappingInitialValues, validationSchema } from "../../Config/Management/UserMappingConfig";
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
import PopupModal from "../../Components/Atoms/PopupModal";
import { CustomCarousel } from "../../Components/Atoms/CustomCarousel";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const throttledSubmit = useThrottledFormSubmit(
    async (values: any, { resetForm }: any) => {
      setIsConfirmOpen(false)
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
        {({ values, setFieldValue, submitForm, validateForm, setTouched }) => {
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
                      inputHeight={40}
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
                      data={userList?.map((item: any) => ({
                        label: item.displayName,
                        value: String(item.id),
                      }))}
                      disabled={loadingUserList}
                    />
                  </div>

                  {/* User Details Section */}
                  {Array.isArray(values.userId) && values.userId.length > 1 ? (
                    <CustomCarousel
                      slideSize="100%"
                      height="full"
                      controlsOffset="xs"
                      shouldAutoPlay
                      autoplayDelay={5000}
                      controlSize={28}
                      withIndicators
                      loop={false}
                      indicatorColor="gray"
                    >
                      {values.userId?.map((userId: string) => {
                        // Find the full user object from userList
                        const userDetails = userList?.find((u: any) => String(u.id) === userId);
                        return (
                          <UserMappingUserDetailsCard
                            key={userId}
                            title="User Details"
                            userDetails={mapUserDetails(userDetails)}
                          />
                        )
                      })}
                    </CustomCarousel>
                  ) : (
                    <UserMappingUserDetailsCard
                      title="User Details"
                      userDetails={mapUserDetails(
                        userList?.find((u: any) => String(u.id) === values.userId[0]),
                      )}
                    />
                  )}
                </Grid.Col>

                {/* Middle Section */}
                <Grid.Col span={{ base: 12, md: 2 }} className="flex justify-center items-center">
                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    fontSize="14"
                    borderColor="#fff"
                    variant="filled"
                    // type="submit"
                    bgColor="#C30305"
                    textColor="#FFFFFF"
                    rightIcon={<IconArrowLeftFromArc />}
                    style={{ padding: "5px 10px" }}
                    onClick={async () => {
                      const errors = await validateForm(); // run validation
                      if (Object.keys(errors).length === 0) {
                        // ✅ valid → open confirm modal
                        setIsConfirmOpen(true);
                      } else {
                        // ❌ invalid → show errors
                        setTouched(
                          Object.keys(errors).reduce(
                            (acc, key) => ({ ...acc, [key]: true }),
                            {}
                          )
                        );
                      }
                    }}                  >
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
                      data={ParentUserList?.map((item: any) => ({
                        label: item.displayName,
                        value: String(item.id),
                      }))}
                      disabled={loadingParentUserList}
                      withAsterisk
                      required
                    />
                  </div>

                  {/* Parent Details Card */}
                  <UserMappingUserDetailsCard
                    title="Parent Details"
                    userDetails={mapUserDetails(
                      ParentUserList?.find((u: any) => String(u.id) === values.parentId),
                    )}
                  />
                </Grid.Col>
              </Grid>
              {/* Confirmation Modal */}
              <PopupModal
                opened={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                size="sm"
                padding="md"
              >
                <div className="flex flex-col gap-4">
                  <TextComponent
                    fontSize={18}
                    fontWeight={600}
                    align="center"
                  >
                    Confirm Migration
                  </TextComponent>
                  <TextComponent fontSize={14} color="gray" align="center">
                    Are you sure you want to migrate the selected{" "}
                    <b>{values.mode ? "Users" : "User"}</b>{" "}
                    under <b>{values.parentId}</b>?
                  </TextComponent>

                  <div className="flex justify-end gap-3 mt-4">
                    <ButtonComponent
                      variant="outline"
                      bgColor="#f1f1f1"
                      textColor="#333"
                      onClick={() => setIsConfirmOpen(false)}
                    >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent
                      bgColor="#C30305"
                      textColor="#fff"
                      onClick={() => {
                        setIsConfirmOpen(false);
                        submitForm(); // <-- call Formik submit programmatically
                      }}
                    >
                      Confirm
                    </ButtonComponent>
                  </div>
                </div>
              </PopupModal>
            </Form>
          )
        }}

      </Formik>
    </div>
  );
};

export default UserMapping;
