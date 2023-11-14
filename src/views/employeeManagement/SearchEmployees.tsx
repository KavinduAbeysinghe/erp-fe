import { Box, Stack, Grid, Typography } from "@mui/material";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { useForm } from "react-hook-form";
import { CustomButton } from "../../components/buttons/CustomButton";
import { EmployeeCard } from "./EmployeeCard";
import SearchTable from "../../components/tables/SearchTable";
import { useLayoutEffect, useState } from "react";
import { departments, employees } from "../../util";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faEye,
  faPenToSquare,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";

export const SearchEmployees = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const [deptList, setDeptList] = useState<Array<any>>([]);

  const [empList, setEmpList] = useState<Array<any>>([]);

  const [empTableData, setEmpTableData] = useState<Array<any>>([]);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const empTableHeads = [
    "Emp No",
    "Employee",
    "Department",
    "Hired Date",
    "Email",
    "Telephone",
    "Mobile",
  ];

  const handleNavigateView = (id: any) => {
    const emp = { page: "view", id: id };
    searchParams.set("emp", JSON.stringify(emp));
    navigate(`/control/employee-management/view-employee?${searchParams}`);
  };

  const handleNavigateEdit = (id: any) => {
    const emp = { page: "edit", id: id };
    searchParams.set("emp", JSON.stringify(emp));
    navigate(`/control/employee-management/edit-employee?${searchParams}`);
  };

  const inactivateItem = (id: any) => {
    setOpenAlert(true);
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleNavigateView },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNavigateEdit },
    { tooltip: "Delete", icon: faTrash, handleClick: inactivateItem },
  ];

  const User = (props: any) => {
    return (
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <img
          src={props?.img}
          alt="pro-usr-img"
          height={40}
          width={40}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
        <Typography fontSize={14}>{props?.name}</Typography>
      </Box>
    );
  };

  const formatData = (data: Array<any>) => {
    return data?.map((e: any) => ({
      empID: e?.empId,
      empNo: e?.empNo,
      name: <EmployeeColumn id={e?.empId} />,
      department: departments?.find(
        (d: any) => d?.departmentId === e?.departmentId
      )?.departmentName,
      hiredDate: e?.hiredDate,
      email: e?.email,
      telephone: e?.telephone,
      mobile: e?.mobile,
    }));
  };

  useLayoutEffect(() => {
    setEmpTableData(formatData(employees));
    setEmpList(
      employees?.map((e: any) => ({ label: e?.name, value: e?.empId }))
    );
    setDeptList(
      departments?.map((d: any) => ({
        label: d?.departmentName,
        value: d?.departmentId,
      }))
    );
  }, []);

  const handleSearch = (data: any) => {
    const employeeName = data?.employeeName;
    const department = data?.department;

    setShowBackdrop(true);
    setTimeout(() => {
      setEmpTableData(
        employeeName && !department
          ? formatData(employees?.filter((e: any) => e?.empId === employeeName))
          : !employeeName && department
          ? formatData(
              employees?.filter((e: any) => e?.departmentId === department)
            )
          : employeeName && department
          ? formatData(
              employees?.filter(
                (e: any) =>
                  e?.empId === employeeName && e?.departmentId === department
              )
            )
          : formatData(employees)
      );
      setShowBackdrop(false);
    }, 1000);
  };

  const reset = () => {
    setValue("employeeName", "");
    setValue("department", "");
    setEmpTableData(formatData(employees));
  };

  const handleNavigateCreate = () => {
    navigate("/control/employee-management/create-employee");
  };

  return (
    <>
      <AlertDialogSlide
        message={"Do you want to remove selected employee?"}
        handleYesClick={() => {}}
        handleNoClick={() => setOpenAlert(false)}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Box>
        <CustomButton
          text={"+ Add Employee"}
          variant={"contained"}
          onClick={handleNavigateCreate}
        />
        <Grid container spacing={2} my={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Employee Name"}
              options={empList}
              id={"employeeName"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Department"}
              options={deptList}
              id={"department"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            display={"flex"}
            gap={2}
            alignItems={"center"}
          >
            <CustomButton
              text={"Search"}
              variant={"contained"}
              onClick={handleSubmit(handleSearch)}
            />
            <CustomButton text={"Clear"} variant={"outlined"} onClick={reset} />
          </Grid>
        </Grid>
        <SearchTable
          tableData={empTableData}
          id={"empID"}
          paginate={true}
          tableHeaders={empTableHeads}
          actionButtons={actionButtons}
        />
      </Box>
    </>
  );
};
