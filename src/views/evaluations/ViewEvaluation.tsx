import CustomAccordion from "../../components/accordions/CustomAccordion";
import CustomizedAccordions from "../../components/accordions/CustomAccordion";
import DenseTable from "../../components/tables/DenseTable";
import { FormTextField } from "../../components/inputs/FormTextField";
import { Box, Stack } from "@mui/material";
import { CustomButton } from "../../components/buttons/CustomButton";

export const ViewEvaluation = () => {
  const tableHeads = ["#", "Name", "Rating", "Comments"];

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
      title: "Development KPI - 5 November 2023",
      body: <AccordionBody tableData={tableData} tableHeads={tableHeads} />,
    },
    {
      title: "Non-Development KPI - 5 November 2023",
      body: <AccordionBody tableData={tableData} tableHeads={tableHeads} />,
    },
    {
      title: "Other - 5 November 2023",
      body: <AccordionBody tableData={tableData} tableHeads={tableHeads} />,
    },
  ];

  return (
    <div>
      <CustomizedAccordions options={accordionOptions} />
    </div>
  );
};
