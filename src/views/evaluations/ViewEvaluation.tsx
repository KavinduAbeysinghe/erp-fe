import { Stack } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomizedAccordions from "../../components/accordions/CustomAccordion";
import { AvatarDetail } from "../../components/avatars/AvatarDetail";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormTextField } from "../../components/inputs/FormTextField";
import DenseTable from "../../components/tables/DenseTable";
import { currentUser, employees, teamEvaluationData } from "../../util";

export const ViewEvaluation = () => {
  const tableHeads = ["#", "Name", "Rating", "Comments"];

  const selfEvalTableHeads = ["#", "Name", "Rating", "Comments", "Review"];

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [isSelfEval, setIsSelfEval] = useState<boolean>(false);

  const [id, setId] = useState<any>("");

  const [teamMemberDetails, setTeamMemberDetails] = useState<any>(null);

  useLayoutEffect(() => {
    const evalObj = searchParams.get("eval");
    if (evalObj) {
      const evaluation = JSON.parse(evalObj);
      setIsSelfEval(evaluation?.type === "Self");
      const teamEval = teamEvaluationData?.find(
        (d: any) => d?.id === evaluation?.id
      );

      if (teamEval) {
        setId(evaluation?.id);
        const tm = employees?.find(
          (e: any) => e?.empId === teamEval?.teamMember
        );
        if (tm) {
          setTeamMemberDetails({
            profileImg: tm?.profileImg,
            designation: tm?.designation,
            name: tm?.name,
            empNo: tm?.empNo,
          });
        }
      }
    } else {
      setTeamMemberDetails({
        profileImg: currentUser?.profileImg,
        designation: currentUser?.designation,
        name: currentUser?.name,
        empNo: currentUser?.empNo,
      });
    }
  }, [location]);

  const selfEvalTableData = [
    {
      no: 1,
      name: "Sample KPI 001",
      rating: 4,
      comments: "Sample comment has been added",
      review: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
    },
    {
      no: 2,
      name: "Sample KPI 002",
      rating: 4,
      comments: "Sample comment has been added",
      review: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
    },
    {
      no: 3,
      name: "Sample KPI 003",
      rating: 4,
      comments: "Sample comment has been added",
      review: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
    },
    {
      no: 4,
      name: "Sample KPI 004",
      rating: 4,
      comments: "Sample comment has been added",
      review: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
    },
    {
      no: 5,
      name: "Sample KPI 005",
      rating: 4,
      comments: "Sample comment has been added",
      review: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
    },
  ];

  const tableData = [
    {
      no: 1,
      name: "Sample Name 001",
      rating: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
      comments: (
        <FormTextField register={undefined} type={"text"} fullWidth={false} />
      ),
    },
    {
      no: 1,
      name: "Sample Name 002",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 003",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 004",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 005",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
  ];

  const AccordionBody = (props: any) => {
    return (
      <>
        <DenseTable
          tableData={props.tableData}
          tableHeaders={props.tableHeads}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={2}
          mt={3}
        >
          <CustomButton text={"Clear"} variant="outlined" />
          <CustomButton text={"Save"} variant="contained" />
        </Stack>
      </>
    );
  };

  const accordionOptions = [
    {
      title: "Development KPI",
      body: (
        <AccordionBody
          tableData={isSelfEval ? selfEvalTableData : tableData}
          tableHeads={isSelfEval ? selfEvalTableHeads : tableHeads}
        />
      ),
    },
    {
      title: "Non-Development KPI",
      body: (
        <AccordionBody
          tableData={isSelfEval ? selfEvalTableData : tableData}
          tableHeads={isSelfEval ? selfEvalTableHeads : tableHeads}
        />
      ),
    },
    {
      title: "Other",
      body: (
        <AccordionBody
          tableData={isSelfEval ? selfEvalTableData : tableData}
          tableHeads={isSelfEval ? selfEvalTableHeads : tableHeads}
        />
      ),
    },
  ];

  return (
    <>
      <AvatarDetail
        profileImg={teamMemberDetails?.profileImg}
        name={teamMemberDetails?.name}
        designation={teamMemberDetails?.designation}
        empNo={teamMemberDetails?.empNo}
      />
      <div>
        <CustomizedAccordions options={accordionOptions} />
      </div>
    </>
  );
};
